// Echelon CRM data layer + portal sign-in, shared by api/portal.js, api/auth.js, api/ref.js
// and api/lead.js.
//
// Everything lives in Google Sheets (no database):
//   • "Echelon CRM" spreadsheet (ECHELON_CRM_SHEET_ID) — tabs Team, Referrals, Clicks,
//     Payouts, Applications (the public /ambassadors form). Missing tabs and header rows
//     are created on first use, and when Team is empty the LEAD_ALERT_EMAIL address is
//     added as the first owner.
//   • "Echelon Exotic Rental Reservations" — read for the Reservations list; the portal
//     only ever writes its Status / Follow-up / Notes columns.
//
// Roles: owner (everything), employee (reservations + referrals), ambassador (their own
// dashboard only). The role is looked up from the Team tab on every request, so changing
// or pausing someone there takes effect immediately.

import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { appendRows, addTabs, batchGet, listTabs, sheetSafe, tabRange, updateRange } from "./_google.js";

export const EXOTIC_SHEET_ID = "1S-r52l5vyU1qSWeHTf0ADD8sJ-kIF1S8v3uUejctug8";
export const crmSheetId = () => process.env.ECHELON_CRM_SHEET_ID || "";

export const DEFAULT_COMMISSION = 10;            // % of the rental price, paid after the rental
export const MIN_COMMISSION = 5;                // allowed range for an ambassador's rate
export const MAX_COMMISSION = 10;
export const DEFAULT_PERK = "Complimentary delivery on your first rental";
export const REFERRAL_STATUSES = ["New", "Booked", "Completed", "Canceled", "Not Eligible"];
export const ROLES = ["owner", "employee", "ambassador"];

export const TABS = {
  Team: ["Email", "Name", "Role", "Code", "Status", "Commission %", "Customer Perk", "Phone", "Payout Method", "Added", "Password", "Failed Logins", "Locked Until"],
  Referrals: ["Submitted", "Code", "First Name", "Last Name", "Email", "Phone", "Vehicle", "Pickup", "Return", "Status", "Rental Total", "Commission", "Paid On", "Notes"],
  Clicks: ["Time", "Code", "Page", "Visitor"],
  Payouts: ["Date", "Code", "Amount", "Method", "Note", "Recorded By"],
  Applications: ["Submitted", "First Name", "Last Name", "Email", "Phone", "Instagram", "City", "Birthdate", "Followers", "How They'd Promote", "Status", "Reviewed", "Notes"],
};
const LAST_COL = { Team: "M", Referrals: "N", Clicks: "D", Payouts: "F", Applications: "M" };

export const nowEastern = () =>
  new Date().toLocaleString("en-US", { timeZone: "America/New_York" }).replace(",", "");
export const todayEastern = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });

// "$1,250.00" / "1250" → 1250
export const money = (val) => Number(String(val || "").replace(/[^\d.-]/g, "")) || 0;

// ── Spreadsheet setup ──

let ready = false;

async function ensureCrm() {
  const id = crmSheetId();
  if (!id) throw new Error("ECHELON_CRM_SHEET_ID is not set");
  if (ready) return id;
  const existing = new Set((await listTabs(id)).map((t) => t.title));
  const missing = Object.keys(TABS).filter((t) => !existing.has(t));
  if (missing.length) await addTabs(id, missing);
  const heads = await batchGet(id, Object.keys(TABS).map((t) => tabRange(t, "A1:A1")));
  for (const [i, tab] of Object.keys(TABS).entries()) {
    if (!heads[i].length) await updateRange(id, tabRange(tab, "A1"), [TABS[tab]]);
  }
  const team = await batchGet(id, [tabRange("Team", "A2:A")]);
  const owner = (process.env.LEAD_ALERT_EMAIL || "").split(",")[0].trim().toLowerCase();
  if (!team[0].length && owner) {
    await appendRows(id, tabRange("Team", "A:M"), [[owner, "Owner", "owner", "", "Active", "", "", "", "", todayEastern(), "", "", ""]]);
  }
  ready = true;
  return id;
}

// Reads whole CRM tabs → { Team: [{row, ...fields}], ... }. `row` is the sheet row number.
export async function readCrm(tabs) {
  const id = await ensureCrm();
  const data = await batchGet(id, tabs.map((t) => tabRange(t, `A2:${LAST_COL[t]}`)));
  const out = {};
  tabs.forEach((tab, i) => {
    out[tab] = data[i]
      .map((vals, j) => ({ row: j + 2, vals }))
      .filter(({ vals }) => vals.some((v) => v !== ""))
      .map(({ row, vals }) => ({ row, ...PARSERS[tab](vals) }));
  });
  return out;
}

const PARSERS = {
  Team: (v) => ({
    email: (v[0] || "").trim().toLowerCase(), name: v[1] || "", role: (v[2] || "").trim().toLowerCase(),
    code: (v[3] || "").trim().toUpperCase(), status: v[4] || "", commission: v[5] === "" || v[5] == null ? DEFAULT_COMMISSION : money(v[5]),
    perk: v[6] || "", phone: v[7] || "", payoutMethod: v[8] || "", added: v[9] || "",
    password: v[10] || "", failed: Number(v[11]) || 0, lockedUntil: Number(v[12]) || 0,
  }),
  Referrals: (v) => ({
    submitted: v[0] || "", code: (v[1] || "").toUpperCase(), firstName: v[2] || "", lastName: v[3] || "",
    email: (v[4] || "").toLowerCase(), phone: v[5] || "", vehicle: v[6] || "", pickup: v[7] || "", returnDate: v[8] || "",
    status: v[9] || "New", rentalTotal: v[10] || "", commission: v[11] || "", paidOn: v[12] || "", notes: v[13] || "",
  }),
  Clicks: (v) => ({ time: v[0] || "", code: (v[1] || "").toUpperCase(), page: v[2] || "", visitor: v[3] || "" }),
  Applications: (v) => ({
    submitted: v[0] || "", firstName: v[1] || "", lastName: v[2] || "", email: (v[3] || "").trim().toLowerCase(),
    phone: v[4] || "", instagram: v[5] || "", city: v[6] || "", birthdate: v[7] || "", followers: v[8] || "",
    pitch: v[9] || "", status: v[10] || "New", reviewed: v[11] || "", notes: v[12] || "",
  }),
  Payouts: (v) => ({ date: v[0] || "", code: (v[1] || "").toUpperCase(), amount: money(v[2]), method: v[3] || "", note: v[4] || "", by: v[5] || "" }),
};

export const isActive = (person) => /^active$/i.test(person?.status || "");

export async function writeCells(tab, cells, values) {
  return updateRange(await ensureCrm(), tabRange(tab, cells), [values.map(sheetSafe)]);
}

export async function appendRow(tab, values) {
  return appendRows(await ensureCrm(), tabRange(tab, `A:${LAST_COL[tab]}`), [values.map(sheetSafe)]);
}

// Team lookups are cached briefly for the public referral endpoints (every page view with
// a ?ref= would otherwise read the sheet).
let teamCache = { at: 0, team: null };
export async function teamCached() {
  if (!teamCache.team || Date.now() - teamCache.at > 60_000) {
    teamCache = { at: Date.now(), team: (await readCrm(["Team"])).Team };
  }
  return teamCache.team;
}

export async function activeAmbassador(code) {
  const clean = String(code || "").trim().toUpperCase();
  if (!/^[A-Z0-9-]{2,24}$/.test(clean)) return null;
  const person = (await teamCached()).find((p) => p.code === clean && p.role === "ambassador");
  return isActive(person) ? person : null;
}

export const firstName = (name) => String(name || "").trim().split(/\s+/)[0] || "";

// ── Passwords + sessions ──

const scryptAsync = promisify(scrypt);

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 32);
  return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function checkPassword(password, stored) {
  const [kind, salt, hash] = String(stored || "").split("$");
  if (kind !== "scrypt" || !salt || !hash) return false;
  const actual = await scryptAsync(password, Buffer.from(salt, "base64"), 32);
  const expected = Buffer.from(hash, "base64");
  return expected.length === actual.length && timingSafeEqual(actual, expected);
}

function secret() {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!key) throw new Error("AUTH_SECRET is not set");
  return createHash("sha256").update(`echelon-portal:${key}`).digest("hex");
}

// Changes whenever the password does, so resetting it signs out old sessions and makes
// earlier setup links stop working.
export const passwordVersion = (person) =>
  createHash("sha256").update(person.password || "none").digest("base64url").slice(0, 12);

export function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${createHmac("sha256", secret()).update(body).digest("base64url")}`;
}

export function readToken(token) {
  const [body, sig] = String(token || "").split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    return payload.exp > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "echelon_portal";
export const SESSION_DAYS = 30;

export function sessionCookie(req, person) {
  const token = signToken({ t: "session", e: person.email, pv: passwordVersion(person), exp: Date.now() + SESSION_DAYS * 864e5 });
  return cookie(req, token, SESSION_DAYS * 86400);
}

export const clearCookie = (req) => cookie(req, "", 0);

function cookie(req, value, maxAge) {
  const local = /^(localhost|127\.0\.0\.1)(:|$)/.test(req.headers.host || "");
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${local ? "" : "; Secure"}`;
}

// The signed-in, active team member for this request, or null.
export async function currentUser(req) {
  const raw = (req.headers.cookie || "").split(/;\s*/).find((c) => c.startsWith(`${SESSION_COOKIE}=`));
  const payload = readToken(raw ? raw.slice(SESSION_COOKIE.length + 1) : "");
  if (payload?.t !== "session") return null;
  const { Team } = await readCrm(["Team"]);
  const person = Team.find((p) => p.email === payload.e);
  if (!person || !isActive(person) || !ROLES.includes(person.role)) return null;
  return passwordVersion(person) === payload.pv ? person : null;
}

export function setupToken(person, hours = 72) {
  return signToken({ t: "setup", e: person.email, pv: passwordVersion(person), exp: Date.now() + hours * 36e5 });
}

// ── Small HTTP helpers shared by the portal endpoints ──

export async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20_000) throw new Error("Body too large");
  }
  return JSON.parse(raw || "{}");
}

export function sendJson(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(body));
}

// Rejects form posts from other sites (the session cookie is SameSite=Lax, this is a
// second check).
export function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

// Links we hand out (setup, password reset, referral) always use the real domain,
// even when the portal was opened on a *.vercel.app address. Local preview keeps localhost.
const PUBLIC_ORIGIN = "https://www.echelonrentalgroup.com";
export const siteOrigin = (req) =>
  /^(localhost|127\.0\.0\.1)(:|$)/.test(req.headers.host || "") ? `http://${req.headers.host}` : PUBLIC_ORIGIN;
