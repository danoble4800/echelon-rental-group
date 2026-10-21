// /api/portal — data for the Echelon Portal (/portal). Every request needs a session from
// /api/auth, and the caller's role (Team tab) decides what they can see:
//
//   owner       Reservations (all six divisions), Members, Referrals, Ambassadors, Applications, Team,
//               payouts, any ambassador's dashboard
//   employee    Reservations, Members, Requests, Referrals
//   ambassador  their own dashboard only (customers shown as "Jane D.", no contact details)
//
//   GET  ?view=reservations | members | requests | referrals | ambassadors | applications | team | dashboard[&code=XYZ]
//   POST { action: "updateReservation" | "updateReferral" | "addPerson" | "updatePerson"
//                  | "setupLink" | "recordPayout" | "approveApplication"
//                  | "declineApplication" | "updateMember" | "memberSetupLink" | "updateRequest", ... }

import { dropdownOptions, sheetSafe, tabRange, updateRange } from "./_google.js";
import { colLetter, readReservations, reservationSheet, RES_SHEETS } from "./_reservations.js";
import {
  appendRow, currentUser, DEFAULT_COMMISSION, DEFAULT_PERK, MAX_COMMISSION, MIN_COMMISSION, firstName, isActive, money,
  nowEastern, readCrm, readJson, REFERRAL_STATUSES, REQUEST_STATUSES, ROLES, sameOrigin, sendJson, setupLink, setupToken,
  siteOrigin, todayEastern, writeCells,
} from "./_crm.js";

const STAFF = ["owner", "employee"];
const FALLBACK_STATUSES = ["New", "Contacted", "Booked", "Completed", "Not a Fit"];
const round2 = (n) => Math.round(n * 100) / 100;

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
const need = (ok, message = "You don't have access to this.") => { if (!ok) throw new HttpError(403, message); };

// ── Reservation sheets (every division, see api/_reservations.js) ──
//
// The portal only ever writes the Status / Follow-up / Notes columns.

async function brandReservations(brand, refByEmail, names) {
  const { id, tab, cols, list } = await readReservations(brand);
  const options = cols.status >= 0
    ? (await dropdownOptions(id, tabRange(tab, `${colLetter(cols.status)}2`)).catch(() => [])) || []
    : [];
  for (const r of list) {
    // Only Exotics bookings carry ambassador referrals.
    const code = brand === "exotics" ? refByEmail.get(r.email) : "";
    r.referral = code ? { code, name: names.get(code) || code } : null;
  }
  return { label: RES_SHEETS[brand].label, reservations: list.reverse(), statusOptions: options.length ? options : FALLBACK_STATUSES };
}

// Every division at once. A sheet that can't be read is reported on its own instead
// of hiding the others.
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

// ── Members (/members sign-ups, CRM Members tab) ──

export const MEMBER_TIERS = ["Member", "Silver", "Black", "Upper Echelon"];
export const MEMBER_STATUSES = ["Active", "Paused", "Closed"];

async function membersView() {
  const { Members, Requests } = await readCrm(["Members", "Requests"]);
  const open = new Map();
  for (const r of Requests) if (/new|progress/i.test(r.status)) open.set(r.email, (open.get(r.email) || 0) + 1);
  // Password hashes and lockout state never leave the server.
  const members = Members.reverse().map(({ password, failed, lockedUntil, ...m }) =>
    ({ ...m, hasPassword: !!password, openRequests: open.get(m.email) || 0 }));
  return { members, tiers: MEMBER_TIERS, statuses: MEMBER_STATUSES };
}

async function findMember({ row, email }) {
  const { Members } = await readCrm(["Members"]);
  const member = Members.find((m) => m.row === Number(row));
  if (!member || member.email !== String(email || "").toLowerCase()) throw new HttpError(409, "This member moved in the sheet. Refresh and try again.");
  return { member, Members };
}

// Nº (4 digits, unique), Tier, Status, Concierge, Notes and Preferences (what the concierge
// remembers, one per line) are the member fields the portal edits.
async function updateMember(user, { row, email, no, tier, status, notes, concierge, prefs }) {
  const { member, Members } = await findMember({ row, email });
  let number = String(no ?? member.no).replace(/\D/g, "");
  if (number) {
    if (number.length > 4 || Number(number) < 1) throw new HttpError(400, "Member numbers run from 0001 to 9999.");
    number = number.padStart(4, "0");
    const taken = Members.find((m) => m.row !== member.row && String(m.no).replace(/\D/g, "").padStart(4, "0") === number);
    if (taken) throw new HttpError(409, `Nº ${number} already belongs to ${taken.firstName} ${taken.lastName}.`);
  }
  const nextTier = MEMBER_TIERS.includes(tier) ? tier : member.tier;
  const nextStatus = MEMBER_STATUSES.includes(status) ? status : member.status;
  await writeCells("Members", `A${member.row}`, [number ? `'${number}` : ""]);
  await writeCells("Members", `N${member.row}:O${member.row}`, [nextTier, nextStatus]);
  if (typeof concierge === "string") await writeCells("Members", `T${member.row}`, [concierge.trim().slice(0, 60)]);
  if (typeof notes === "string") await writeCells("Members", `V${member.row}`, [notes.slice(0, 1000)]);
  if (typeof prefs === "string") {
    const list = prefs.split("\n").map((p) => p.trim().slice(0, 80)).filter(Boolean).slice(0, 20);
    await writeCells("Members", `Z${member.row}`, [list.join("\n")]);
  }
  return { ok: true, no: number };
}

// A sign-in link for the member area, for the team to text to a member.
async function memberSetupLink(req, body) {
  const { member } = await findMember(body);
  if (!isActive(member)) throw new HttpError(400, "Only active members can get a sign-in link.");
  return { setupLink: setupLink(req, member, "member") };
}

// ── Requests (what members asked the concierge to arrange) ──

async function requestsView() {
  const { Requests, Members } = await readCrm(["Requests", "Members"]);
  const byEmail = new Map(Members.map((m) => [m.email, m]));
  return {
    requests: Requests.reverse().map((r) => {
      const m = byEmail.get(r.email);
      return { ...r, phone: m?.phone || "", no: m?.no || "", tier: m?.tier || r.tier };
    }),
    statuses: REQUEST_STATUSES,
  };
}

// Status / Reply / Team Notes. Sending a reply stamps who handled it and when; the member
// sees the reply in their Requests and concierge chat.
async function updateRequest(user, { row, ref, status, reply, notes }) {
  const { Requests } = await readCrm(["Requests"]);
  const r = Requests.find((x) => x.row === Number(row));
  if (!r || r.ref !== String(ref || "")) throw new HttpError(409, "This request moved in the sheet. Refresh and try again.");
  const nextStatus = REQUEST_STATUSES.includes(status) ? status : r.status;
  const handler = r.handler || user.name || user.email;
  const newReply = typeof reply === "string" && reply.trim() && reply.trim() !== r.reply ? reply.trim().slice(0, 1000) : null;
  await writeCells("Requests", `K${r.row}:L${r.row}`, [nextStatus, nextStatus !== "New" || newReply ? handler : r.handler]);
  if (newReply) await writeCells("Requests", `M${r.row}:N${r.row}`, [newReply, nowEastern()]);
  if (typeof notes === "string") await writeCells("Requests", `O${r.row}`, [notes.slice(0, 1000)]);
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
        case "members":
          need(isStaff);
          return sendJson(res, 200, await membersView());
        case "requests":
          need(isStaff);
          return sendJson(res, 200, await requestsView());
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
      case "updateMember":
        need(isStaff);
        return sendJson(res, 200, await updateMember(user, body));
      case "memberSetupLink":
        need(isStaff);
        return sendJson(res, 200, await memberSetupLink(req, body));
      case "updateRequest":
        need(isStaff);
        return sendJson(res, 200, await updateRequest(user, body));
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
