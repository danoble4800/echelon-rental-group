// /api/portal — data for the Echelon Portal (/portal). Every request needs a session from
// /api/auth, and the caller's role (Team tab) decides what they can see:
//
//   owner       Reservations (Exotics, Economy, Chauffeur), Referrals, Ambassadors, Applications, Team, payouts, any
//               ambassador's dashboard
//   employee    Reservations, Referrals
//   ambassador  their own dashboard only (customers shown as "Jane D.", no contact details)
//
//   GET  ?view=reservations | referrals | ambassadors | applications | team | dashboard[&code=XYZ]
//   POST { action: "updateReservation" | "updateReferral" | "addPerson" | "updatePerson"
//                  | "setupLink" | "recordPayout" | "approveApplication"
//                  | "declineApplication", ... }

import { batchGet, dropdownOptions, listTabs, sheetSafe, tabRange, updateRange } from "./_google.js";
import {
  appendRow, currentUser, DEFAULT_COMMISSION, DEFAULT_PERK, MAX_COMMISSION, MIN_COMMISSION, EXOTIC_SHEET_ID, firstName, isActive, money,
  nowEastern, readCrm, readJson, REFERRAL_STATUSES, ROLES, sameOrigin, sendJson, setupToken, siteOrigin,
  todayEastern, writeCells,
} from "./_crm.js";

const STAFF = ["owner", "employee"];
const FALLBACK_STATUSES = ["New", "Contacted", "Booked", "Completed", "Not a Fit"];
const round2 = (n) => Math.round(n * 100) / 100;
const colLetter = (i) => (i >= 26 ? colLetter(Math.floor(i / 26) - 1) : "") + String.fromCharCode(65 + (i % 26));

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
const need = (ok, message = "You don't have access to this.") => { if (!ok) throw new HttpError(403, message); };

// ── Reservation sheets (Exotics, Economy, Chauffeur) ──
//
// Each brand's form keeps writing to its own sheet (api/lead.js). The portal reads the
// first tab of each and only ever writes the Status / Follow-up / Notes columns.

const RES_SHEETS = {
  exotics: { label: "Exotics", id: EXOTIC_SHEET_ID },
  economy: { label: "Economy", id: "1yLtkutu_BCfYvo9a32T6U7CilrZ6cFkTgoQvq8XAUaA" },
  chauffeur: { label: "Chauffeur", id: "1zDNYG4I4GnKNGQWWE4l5xobWg5_ZxsqpV01pmL-EMyc" },
};

// Finds each field's column from the header row, so the portal keeps working if columns
// are renamed or moved. Exotics falls back to its original A:L layout.
const COMMON_COLS = {
  submitted: /time|submitted|created/i, firstName: /first/i, lastName: /last/i, phone: /phone/i,
  email: /e-?mail/i, status: /status/i, followUp: /follow/i, notes: /note/i,
};
const BRAND_COLS = {
  exotics: { pickup: /pick/i, returnDate: /return/i, vehicle: /vehicle|car/i, delivery: /deliver|location|address/i },
  economy: { pickup: /pick/i, returnDate: /return/i, vehicle: /^car|vehicle/i, useCase: /use/i },
  chauffeur: {
    pickup: /ride date/i, pickupTime: /pickup time/i, serviceType: /service/i, passengers: /passenger/i,
    vehicle: /vehicle/i, delivery: /pickup address/i, dropoff: /drop/i,
  },
};
const EXOTIC_FALLBACK = {
  submitted: 0, firstName: 1, lastName: 2, phone: 3, email: 4, pickup: 5, returnDate: 6,
  vehicle: 7, delivery: 8, status: 9, followUp: 10, notes: 11,
};

function mapColumns(brand, headers) {
  const cols = {};
  for (const [key, re] of Object.entries({ ...COMMON_COLS, ...BRAND_COLS[brand] })) {
    const i = headers.findIndex((h) => re.test(h || ""));
    cols[key] = i >= 0 ? i : brand === "exotics" ? EXOTIC_FALLBACK[key] ?? -1 : -1;
  }
  return cols;
}

async function reservationSheet(brand) {
  const { id } = RES_SHEETS[brand];
  const tab = (await listTabs(id))[0].title;   // the forms write to the first tab
  const [head, rows] = await batchGet(id, [tabRange(tab, "A1:Z1"), tabRange(tab, "A2:Z")]);
  return { id, tab, cols: mapColumns(brand, head[0] || []), rows };
}

async function brandReservations(brand, refByEmail, names) {
  const { id, tab, cols, rows } = await reservationSheet(brand);
  const options = cols.status >= 0
    ? (await dropdownOptions(id, tabRange(tab, `${colLetter(cols.status)}2`)).catch(() => [])) || []
    : [];
  const list = rows
    .map((v, i) => {
      const r = { brand, row: i + 2 };
      for (const [key, col] of Object.entries(cols)) r[key] = col >= 0 ? String(v[col] ?? "").trim() : "";
      r.email = r.email.toLowerCase();
      // Only Exotics bookings carry ambassador referrals.
      const code = brand === "exotics" ? refByEmail.get(r.email) : "";
      r.referral = code ? { code, name: names.get(code) || code } : null;
      return r;
    })
    .filter((r) => r.firstName || r.lastName || r.email || r.phone)
    .reverse();                                                // newest first
  return { label: RES_SHEETS[brand].label, reservations: list, statusOptions: options.length ? options : FALLBACK_STATUSES };
}

// All three brands at once. A sheet that can't be read is reported on its own instead
// of hiding the other two.
async function reservations() {
  const crm = await readCrm(["Referrals", "Team"]);
  const refByEmail = new Map(crm.Referrals.map((r) => [r.email, r.code]));
  const names = new Map(crm.Team.map((p) => [p.code, p.name]));
  const brands = Object.keys(RES_SHEETS);
  const results = await Promise.allSettled(brands.map((b) => brandReservations(b, refByEmail, names)));
  const out = {};
  results.forEach((res, i) => {
    if (res.status === "fulfilled") out[brands[i]] = res.value;
    else {
      console.error(`Reservations read failed (${brands[i]}):`, res.reason);
      out[brands[i]] = { label: RES_SHEETS[brands[i]].label, reservations: [], statusOptions: FALLBACK_STATUSES, error: "Couldn't load this sheet." };
    }
  });
  return { brands: out };
}

async function updateReservation({ brand = "exotics", row, email, status, followUp, notes }) {
  if (!RES_SHEETS[brand]) throw new HttpError(400, "Unknown brand");
  const { id, tab, cols, rows } = await reservationSheet(brand);
  const current = rows[Number(row) - 2];
  // The row must still hold the same customer (rows can shift if someone sorts the sheet).
  if (!current || String(current[cols.email] || "").trim().toLowerCase() !== String(email || "").toLowerCase()) {
    throw new HttpError(409, "This reservation moved in the sheet. Refresh and try again.");
  }
  const writes = { status, followUp, notes };
  for (const [key, val] of Object.entries(writes)) {
    if (typeof val !== "string") continue;
    if (cols[key] < 0) throw new HttpError(500, `The ${RES_SHEETS[brand].label} sheet has no ${key} column.`);
    await updateRange(id, tabRange(tab, `${colLetter(cols[key])}${row}`), [[sheetSafe(val.slice(0, 1000))]]);
  }
  return { ok: true };
}

// ── Ambassadors ──

function ambassadorStats(person, crm) {
  const since = Date.now() - 30 * 864e5;
  const clicks = crm.Clicks.filter((c) => c.code === person.code);
  const referrals = crm.Referrals.filter((r) => r.code === person.code);
  const completed = referrals.filter((r) => r.status === "Completed");
  const earned = round2(completed.reduce((sum, r) => sum + money(r.commission), 0));
  const payouts = crm.Payouts.filter((p) => p.code === person.code);
  const paid = round2(payouts.reduce((sum, p) => sum + p.amount, 0));
  return {
    clicks30: clicks.filter((c) => Date.parse(c.time) > since).length,
    clicksAll: clicks.length,
    referred: referrals.length,
    booked: referrals.filter((r) => r.status === "Booked").length,
    completed: completed.length,
    earned, paid, balance: round2(earned - paid),
    referrals, payouts,
  };
}

const referralLink = (req, code) => `${siteOrigin(req)}/r/${code.toLowerCase()}`;

function dashboard(req, person, crm) {
  const s = ambassadorStats(person, crm);
  return {
    ambassador: {
      name: person.name, code: person.code, link: referralLink(req, person.code),
      commission: person.commission, perk: person.perk || DEFAULT_PERK, payoutMethod: person.payoutMethod,
    },
    stats: { clicks30: s.clicks30, clicksAll: s.clicksAll, referred: s.referred, booked: s.booked, completed: s.completed, earned: s.earned, paid: s.paid, balance: s.balance },
    // Ambassadors see first name + last initial only — never contact details.
    referrals: s.referrals.reverse().map((r) => ({
      submitted: r.submitted, customer: `${r.firstName} ${r.lastName ? `${r.lastName[0]}.` : ""}`.trim(),
      vehicle: r.vehicle, pickup: r.pickup, status: r.status === "Not Eligible" ? "Not eligible" : r.status,
      commission: r.status === "Completed" ? money(r.commission) : null, paidOn: r.paidOn,
    })),
    payouts: s.payouts.reverse().map(({ date, amount, method }) => ({ date, amount, method })),
  };
}

function ambassadorsView(req, crm) {
  return {
    ambassadors: crm.Team.filter((p) => p.role === "ambassador").map((p) => {
      const s = ambassadorStats(p, crm);
      return {
        email: p.email, name: p.name, code: p.code, status: p.status, commission: p.commission, perk: p.perk,
        phone: p.phone, payoutMethod: p.payoutMethod, added: p.added, hasPassword: !!p.password,
        link: p.code ? referralLink(req, p.code) : "",
        stats: { clicks30: s.clicks30, referred: s.referred, booked: s.booked, completed: s.completed, earned: s.earned, paid: s.paid, balance: s.balance },
      };
    }),
    defaultPerk: DEFAULT_PERK, defaultCommission: DEFAULT_COMMISSION,
    minCommission: MIN_COMMISSION, maxCommission: MAX_COMMISSION,
  };
}

// ── Referrals ──

async function updateReferral({ row, email, status, rentalTotal, notes }) {
  const crm = await readCrm(["Referrals", "Team"]);
  const ref = crm.Referrals.find((r) => r.row === Number(row));
  if (!ref || ref.email !== String(email || "").toLowerCase()) throw new HttpError(409, "This referral moved. Refresh and try again.");
  if (status && !REFERRAL_STATUSES.includes(status)) throw new HttpError(400, "Unknown status");
  const next = { status: status || ref.status, total: rentalTotal ?? ref.rentalTotal, notes: notes ?? ref.notes };
  const rate = crm.Team.find((p) => p.code === ref.code)?.commission ?? DEFAULT_COMMISSION;
  const total = money(next.total);
  const commission = next.status === "Completed" && total > 0 ? round2((total * rate) / 100) : "";
  await writeCells("Referrals", `J${ref.row}:L${ref.row}`, [next.status, total || "", commission]);
  await writeCells("Referrals", `N${ref.row}`, [String(next.notes).slice(0, 1000)]);
  return { ok: true, commission };
}

async function recordPayout(user, { code, amount, method, note }) {
  const crm = await readCrm(["Team", "Referrals", "Clicks", "Payouts"]);
  const person = crm.Team.find((p) => p.code === String(code || "").toUpperCase() && p.role === "ambassador");
  if (!person) throw new HttpError(404, "Ambassador not found");
  const value = round2(money(amount));
  if (value <= 0) throw new HttpError(400, "Enter an amount");
  const { balance } = ambassadorStats(person, crm);
  await appendRow("Payouts", [todayEastern(), person.code, value, String(method || person.payoutMethod || "").slice(0, 100), String(note || "").slice(0, 300), user.email]);
  // Paying the whole balance marks every completed, unpaid referral as paid.
  if (value >= balance) {
    for (const r of crm.Referrals.filter((r) => r.code === person.code && r.status === "Completed" && !r.paidOn)) {
      await writeCells("Referrals", `M${r.row}`, [todayEastern()]);
    }
  }
  return { ok: true };
}

// ── Team ──

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeCode(name, team) {
  const base = (firstName(name).toUpperCase().replace(/[^A-Z0-9]/g, "") || "ECH").slice(0, 12);
  const taken = new Set(team.map((p) => p.code));
  if (!taken.has(base)) return base;
  for (let n = 2; ; n++) if (!taken.has(`${base}${n}`)) return `${base}${n}`;
}

// Blank → the default rate; anything outside the program's range is refused.
function cleanCommission(val) {
  const rate = money(val) || DEFAULT_COMMISSION;
  if (rate < MIN_COMMISSION || rate > MAX_COMMISSION) {
    throw new HttpError(400, `Commission must be between ${MIN_COMMISSION}% and ${MAX_COMMISSION}%.`);
  }
  return rate;
}

function cleanCode(code) {
  const clean = String(code || "").trim().toUpperCase();
  if (clean && !/^[A-Z0-9-]{2,24}$/.test(clean)) throw new HttpError(400, "Codes use 2–24 letters, numbers or dashes.");
  return clean;
}

async function addPerson(req, body, team) {
  const Team = team || (await readCrm(["Team"])).Team;
  const email = String(body.email || "").trim().toLowerCase();
  const role = ROLES.includes(body.role) ? body.role : null;
  const name = String(body.name || "").trim().slice(0, 80);
  if (!EMAIL_RE.test(email) || !role || !name) throw new HttpError(400, "Enter a name, a valid email and a role.");
  if (Team.some((p) => p.email === email)) throw new HttpError(409, "Someone with that email is already on the team.");
  let code = "";
  if (role === "ambassador") {
    code = cleanCode(body.code) || makeCode(name, Team);
    if (Team.some((p) => p.code === code)) throw new HttpError(409, `The code ${code} is taken.`);
  }
  const person = {
    email, name, role, code, status: "Active",
    commission: role === "ambassador" ? cleanCommission(body.commission) : "",
    perk: role === "ambassador" ? String(body.perk || "").slice(0, 120) : "",
    phone: String(body.phone || "").slice(0, 40), payoutMethod: String(body.payoutMethod || "").slice(0, 100), password: "",
  };
  await appendRow("Team", [email, name, role, code, "Active", person.commission, person.perk, person.phone, person.payoutMethod, todayEastern(), "", "", ""]);
  return { ok: true, code, setupLink: `${siteOrigin(req)}/portal?setup=${setupToken(person)}` };
}

async function updatePerson(user, body) {
  const { Team } = await readCrm(["Team"]);
  const person = Team.find((p) => p.email === String(body.email || "").toLowerCase());
  if (!person) throw new HttpError(404, "Not found");
  const next = { ...person };
  if (body.name != null) next.name = String(body.name).trim().slice(0, 80) || person.name;
  if (body.role != null) next.role = ROLES.includes(body.role) ? body.role : person.role;
  if (body.status != null) next.status = /^active$/i.test(body.status) ? "Active" : "Paused";
  if (body.commission != null && next.role === "ambassador") next.commission = cleanCommission(body.commission);
  if (body.perk != null) next.perk = String(body.perk).slice(0, 120);
  if (body.phone != null) next.phone = String(body.phone).slice(0, 40);
  if (body.payoutMethod != null) next.payoutMethod = String(body.payoutMethod).slice(0, 100);
  if (body.code != null) {
    next.code = cleanCode(body.code);
    if (next.code && Team.some((p) => p !== person && p.code === next.code)) throw new HttpError(409, `The code ${next.code} is taken.`);
  }
  if (next.role === "ambassador" && !next.code) next.code = makeCode(next.name, Team);
  if (person.email === user.email && (next.role !== "owner" || next.status !== "Active")) {
    throw new HttpError(400, "You can't remove your own owner access.");
  }
  await writeCells("Team", `B${person.row}:I${person.row}`, [
    next.name, next.role, next.code, next.status, next.role === "ambassador" ? next.commission : "",
    next.perk, next.phone, next.payoutMethod,
  ]);
  return { ok: true };
}

// ── Ambassador applications (/ambassadors → api/apply.js) ──

async function findApplication(body) {
  const crm = await readCrm(["Applications", "Team"]);
  const app = crm.Applications.find((a) => a.row === Number(body.row));
  if (!app || app.email !== String(body.email || "").toLowerCase()) throw new HttpError(409, "This application moved. Refresh and try again.");
  if (!/^new$/i.test(app.status)) throw new HttpError(409, `This application was already ${app.status.toLowerCase()}.`);
  return { app, Team: crm.Team };
}

async function approveApplication(req, user, body) {
  const { app, Team } = await findApplication(body);
  const name = `${app.firstName} ${app.lastName}`.trim();
  const out = await addPerson(req, {
    role: "ambassador", name, email: app.email, phone: app.phone, code: body.code,
    commission: body.commission, perk: body.perk, payoutMethod: body.payoutMethod,
  }, Team);
  await writeCells("Applications", `K${app.row}:L${app.row}`, ["Approved", `${nowEastern()} · ${user.email}`]);
  return { ...out, name };
}

async function declineApplication(user, body) {
  const { app } = await findApplication(body);
  await writeCells("Applications", `K${app.row}:M${app.row}`, ["Declined", `${nowEastern()} · ${user.email}`, String(body.notes || app.notes).slice(0, 500)]);
  return { ok: true };
}

// ── Router ──

export default async function handler(req, res) {
  try {
    const user = await currentUser(req);
    if (!user) return sendJson(res, 401, { error: "Please sign in again." });
    const isStaff = STAFF.includes(user.role);
    const isOwner = user.role === "owner";

    if (req.method === "GET") {
      const params = new URL(req.url, "http://x").searchParams;
      switch (params.get("view")) {
        case "reservations":
          need(isStaff);
          return sendJson(res, 200, await reservations());
        case "referrals": {
          need(isStaff);
          const crm = await readCrm(["Referrals", "Team"]);
          const names = new Map(crm.Team.map((p) => [p.code, p.name]));
          return sendJson(res, 200, {
            referrals: crm.Referrals.map((r) => ({ ...r, ambassador: names.get(r.code) || r.code })).reverse(),
            statuses: REFERRAL_STATUSES,
          });
        }
        case "ambassadors":
          need(isOwner);
          return sendJson(res, 200, ambassadorsView(req, await readCrm(["Team", "Referrals", "Clicks", "Payouts"])));
        case "applications": {
          need(isOwner);
          const { Applications } = await readCrm(["Applications"]);
          return sendJson(res, 200, {
            // Waiting ones first, oldest at the top so nobody waits longest; then every
            // reviewed one, newest first.
            applications: [
              ...Applications.filter((a) => /^new$/i.test(a.status)),
              ...Applications.filter((a) => !/^new$/i.test(a.status)).reverse(),
            ],
            defaultPerk: DEFAULT_PERK, defaultCommission: DEFAULT_COMMISSION,
            minCommission: MIN_COMMISSION, maxCommission: MAX_COMMISSION,
          });
        }
        case "team": {
          need(isOwner);
          const { Team } = await readCrm(["Team"]);
          return sendJson(res, 200, {
            team: Team.filter((p) => p.role !== "ambassador").map(({ email, name, role, status, phone, added, password }) =>
              ({ email, name, role, status, phone, added, hasPassword: !!password, self: email === user.email })),
          });
        }
        case "dashboard": {
          const crm = await readCrm(["Team", "Referrals", "Clicks", "Payouts"]);
          // Ambassadors always get their own; owners can open anyone's (read-only preview).
          const code = user.role === "ambassador" ? user.code : String(params.get("code") || "").toUpperCase();
          need(user.role === "ambassador" || isOwner);
          const person = crm.Team.find((p) => p.role === "ambassador" && p.code === code);
          if (!person) throw new HttpError(404, "Ambassador not found");
          return sendJson(res, 200, dashboard(req, person, crm));
        }
        default:
          return sendJson(res, 400, { error: "Unknown view" });
      }
    }

    if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });
    if (!sameOrigin(req)) return sendJson(res, 403, { error: "Forbidden" });
    const body = await readJson(req);
    switch (body.action) {
      case "updateReservation":
        need(isStaff);
        return sendJson(res, 200, await updateReservation(body));
      case "updateReferral":
        need(isStaff);
        return sendJson(res, 200, await updateReferral(body));
      case "addPerson":
        need(isOwner);
        return sendJson(res, 200, await addPerson(req, body));
      case "updatePerson":
        need(isOwner);
        return sendJson(res, 200, await updatePerson(user, body));
      case "setupLink": {
        need(isOwner);
        const { Team } = await readCrm(["Team"]);
        const person = Team.find((p) => p.email === String(body.email || "").toLowerCase());
        if (!person || !isActive(person)) throw new HttpError(404, "Only active people can get a setup link.");
        return sendJson(res, 200, { setupLink: `${siteOrigin(req)}/portal?setup=${setupToken(person)}` });
      }
      case "recordPayout":
        need(isOwner);
        return sendJson(res, 200, await recordPayout(user, body));
      case "approveApplication":
        need(isOwner);
        return sendJson(res, 200, await approveApplication(req, user, body));
      case "declineApplication":
        need(isOwner);
        return sendJson(res, 200, await declineApplication(user, body));
      default:
        return sendJson(res, 400, { error: "Unknown action" });
    }
  } catch (err) {
    if (err instanceof HttpError) return sendJson(res, err.status, { error: err.message });
    console.error("Portal error:", err);
    return sendJson(res, 500, { error: "Something went wrong. Please try again." });
  }
}
