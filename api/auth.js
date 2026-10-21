// /api/auth — sign-in for the Echelon Portal (/portal, the team and ambassadors) and the
// member area (/member, Echelon Members).
//
//   GET                                  → { user } for the current session, or 401
//   POST { action: "login", email, password, kind? }
//   POST { action: "logout" }
//   POST { action: "checkSetup", token }  → who a setup link is for
//   POST { action: "setup", token, password } → set a password from a setup link, signs in
//   POST { action: "forgot", email, kind? }   → emails a fresh setup link (always answers ok)
//
// kind "member" works against the CRM's Members tab; anything else against the Team tab
// (see api/_crm.js). The team copies setup links from the portal and texts them; people
// set their own password.

import {
  checkPassword, clearCookie, currentMember, currentUser, hashPassword, isActive, memberName, passwordVersion, readCrm,
  readJson, readToken, ROLES, sameOrigin, sendJson, sessionCookie, setupLink, writeCells,
} from "./_crm.js";

const MAX_FAILS = 5;
const LOCK_MINUTES = 15;
const MIN_PASSWORD = 10;

// Where each kind of account keeps its password and lockout columns.
const ACCOUNTS = {
  team: { tab: "Team", password: "K", fails: ["L", "M"] },
  member: { tab: "Members", password: "W", fails: ["X", "Y"] },
};
const kindOf = (kind) => (kind === "member" ? "member" : "team");

export const publicUser = (p) => ({ email: p.email, name: p.name, role: p.role, code: p.code });
export const publicMember = (m) => ({ email: m.email, name: memberName(m), role: "member", tier: m.tier || "Member", no: m.no });
const publicFor = (kind, p) => (kind === "member" ? publicMember(p) : publicUser(p));

async function findAccount(kind, email) {
  const tab = ACCOUNTS[kind].tab;
  const list = (await readCrm([tab]))[tab];
  const person = list.find((p) => p.email === String(email || "").trim().toLowerCase()) || null;
  if (!person || !isActive(person)) return null;
  return kind === "member" || ROLES.includes(person.role) ? person : null;
}

const failCells = (kind, row) => `${ACCOUNTS[kind].fails[0]}${row}:${ACCOUNTS[kind].fails[1]}${row}`;

async function login(req, res, { email, password, kind: rawKind }) {
  const kind = kindOf(rawKind);
  const person = await findAccount(kind, email);
  const fail = () => sendJson(res, 401, { error: "That email and password don't match." });
  if (!person || !person.password) return fail();
  if (person.lockedUntil > Date.now()) {
    return sendJson(res, 429, { error: `Too many attempts. Try again in ${LOCK_MINUTES} minutes or reset your password.` });
  }
  const { tab } = ACCOUNTS[kind];
  if (!(await checkPassword(String(password || ""), person.password))) {
    const fails = person.failed + 1;
    const lock = fails >= MAX_FAILS ? Date.now() + LOCK_MINUTES * 60_000 : "";
    await writeCells(tab, failCells(kind, person.row), [lock ? 0 : fails, lock]);
    return fail();
  }
  if (person.failed || person.lockedUntil) await writeCells(tab, failCells(kind, person.row), [0, ""]);
  return sendJson(res, 200, { user: publicFor(kind, person) }, { "Set-Cookie": sessionCookie(req, person, kind === "member" ? "member" : "") });
}

async function personForSetup(token) {
  const payload = readToken(token);
  if (payload?.t !== "setup") return null;
  const kind = kindOf(payload.k);
  const person = await findAccount(kind, payload.e);
  if (!person || passwordVersion(person) !== payload.pv) return null;
  return { kind, person };
}

const EXPIRED = "This link has expired or was already used. Ask an Echelon team member for a new one.";

async function setup(req, res, { token, password }) {
  const found = await personForSetup(token);
  if (!found) return sendJson(res, 400, { error: EXPIRED });
  if (String(password || "").length < MIN_PASSWORD) {
    return sendJson(res, 400, { error: `Use at least ${MIN_PASSWORD} characters.` });
  }
  const { kind, person } = found;
  const { tab, password: col, fails } = ACCOUNTS[kind];
  person.password = await hashPassword(String(password));
  await writeCells(tab, `${col}${person.row}:${fails[1]}${person.row}`, [person.password, 0, ""]);
  return sendJson(res, 200, { user: publicFor(kind, person) }, { "Set-Cookie": sessionCookie(req, person, kind === "member" ? "member" : "") });
}

// The first owner is seeded with the placeholder name "Owner"; don't greet anyone by a role.
function firstName(kind, person) {
  const name = String(kind === "member" ? person.firstName : person.name || "").trim();
  return name && !ROLES.includes(name.toLowerCase()) ? name.split(/\s+/)[0] : "there";
}

// Lead alerts go out as "Echelon Leads"; people setting a password should see the company name.
function senderAddress() {
  const from = process.env.LEAD_ALERT_FROM || "onboarding@resend.dev";
  return (from.match(/<([^>]+)>/) || [, from])[1].trim();
}

async function forgot(req, res, { email, kind: rawKind }) {
  const kind = kindOf(rawKind);
  const person = await findAccount(kind, email);
  const apiKey = process.env.RESEND_API_KEY;
  if (person && apiKey) {
    const link = setupLink(req, person, kind === "member" ? "member" : "", 2);
    const area = kind === "member" ? "Echelon Members" : "Echelon Portal";
    const res2 = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Echelon Rental Group <${senderAddress()}>`,
        to: person.email,
        subject: `Set your ${area} password`,
        text: `Hi ${firstName(kind, person)},\n\nUse this link within 2 hours to set your ${area} password:\n${link}\n\nIf you didn't ask for this, you can ignore this email.`,
      }),
    }).catch((err) => ({ ok: false, err }));
    if (!res2.ok) console.error("Setup email failed:", res2.status || res2.err);
  }
  // Same answer either way, so the form can't be used to find out who has an account.
  return sendJson(res, 200, { ok: true });
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const user = await currentUser(req);
      if (user) return sendJson(res, 200, { user: publicUser(user) });
      const member = await currentMember(req);
      return member ? sendJson(res, 200, { user: publicMember(member) }) : sendJson(res, 401, { error: "Signed out" });
    }
    if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });
    if (!sameOrigin(req)) return sendJson(res, 403, { error: "Forbidden" });

    const body = await readJson(req);
    switch (body.action) {
      case "login": return await login(req, res, body);
      case "setup": return await setup(req, res, body);
      case "forgot": return await forgot(req, res, body);
      case "checkSetup": {
        const found = await personForSetup(body.token);
        if (!found) return sendJson(res, 400, { error: EXPIRED });
        const { kind, person } = found;
        return sendJson(res, 200, { name: kind === "member" ? memberName(person) : person.name, email: person.email, kind });
      }
      case "logout": return sendJson(res, 200, { ok: true }, { "Set-Cookie": clearCookie(req) });
      default: return sendJson(res, 400, { error: "Unknown action" });
    }
  } catch (err) {
    console.error("Auth error:", err);
    return sendJson(res, 500, { error: "Something went wrong. Please try again." });
  }
}
