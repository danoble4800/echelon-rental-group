// /api/auth — sign-in for the Echelon Portal (/portal), shared by the team and ambassadors.
//
//   GET                                  → { user } for the current session, or 401
//   POST { action: "login", email, password }
//   POST { action: "logout" }
//   POST { action: "checkSetup", token }  → who a setup link is for
//   POST { action: "setup", token, password } → set a password from a setup link, signs in
//   POST { action: "forgot", email }      → emails a fresh setup link (always answers ok)
//
// Accounts are rows on the CRM's Team tab (see api/_crm.js). An owner adds someone in the
// portal, copies their setup link, and texts it to them; people set their own password.

import {
  checkPassword, clearCookie, currentUser, hashPassword, isActive, passwordVersion, readCrm, readJson,
  readToken, ROLES, sameOrigin, sendJson, sessionCookie, setupToken, siteOrigin, writeCells,
} from "./_crm.js";

const MAX_FAILS = 5;
const LOCK_MINUTES = 15;
const MIN_PASSWORD = 10;

export const publicUser = (p) => ({ email: p.email, name: p.name, role: p.role, code: p.code });

async function findPerson(email) {
  const { Team } = await readCrm(["Team"]);
  return Team.find((p) => p.email === String(email || "").trim().toLowerCase()) || null;
}

async function login(req, res, { email, password }) {
  const person = await findPerson(email);
  const fail = () => sendJson(res, 401, { error: "That email and password don't match." });
  if (!person || !isActive(person) || !ROLES.includes(person.role) || !person.password) {
    return fail();
  }
  if (person.lockedUntil > Date.now()) {
    return sendJson(res, 429, { error: `Too many attempts. Try again in ${LOCK_MINUTES} minutes or reset your password.` });
  }
  if (!(await checkPassword(String(password || ""), person.password))) {
    const fails = person.failed + 1;
    const lock = fails >= MAX_FAILS ? Date.now() + LOCK_MINUTES * 60_000 : "";
    await writeCells("Team", `L${person.row}:M${person.row}`, [lock ? 0 : fails, lock]);
    return fail();
  }
  if (person.failed || person.lockedUntil) await writeCells("Team", `L${person.row}:M${person.row}`, [0, ""]);
  return sendJson(res, 200, { user: publicUser(person) }, { "Set-Cookie": sessionCookie(req, person) });
}

async function personForSetup(token) {
  const payload = readToken(token);
  if (payload?.t !== "setup") return null;
  const person = await findPerson(payload.e);
  if (!person || !isActive(person) || passwordVersion(person) !== payload.pv) return null;
  return person;
}

async function setup(req, res, { token, password }) {
  const person = await personForSetup(token);
  if (!person) return sendJson(res, 400, { error: "This link has expired or was already used. Ask an owner for a new one." });
  if (String(password || "").length < MIN_PASSWORD) {
    return sendJson(res, 400, { error: `Use at least ${MIN_PASSWORD} characters.` });
  }
  person.password = await hashPassword(String(password));
  await writeCells("Team", `K${person.row}:M${person.row}`, [person.password, 0, ""]);
  return sendJson(res, 200, { user: publicUser(person) }, { "Set-Cookie": sessionCookie(req, person) });
}

async function forgot(req, res, { email }) {
  const person = await findPerson(email);
  const apiKey = process.env.RESEND_API_KEY;
  if (person && isActive(person) && ROLES.includes(person.role) && apiKey) {
    const link = `${siteOrigin(req)}/portal?setup=${setupToken(person, 2)}`;
    const res2 = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_ALERT_FROM || "Echelon Leads <onboarding@resend.dev>",
        to: person.email,
        subject: "Set your Echelon Portal password",
        text: `Hi ${person.name || "there"},\n\nUse this link within 2 hours to set your Echelon Portal password:\n${link}\n\nIf you didn't ask for this, you can ignore this email.`,
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
      return user ? sendJson(res, 200, { user: publicUser(user) }) : sendJson(res, 401, { error: "Signed out" });
    }
    if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });
    if (!sameOrigin(req)) return sendJson(res, 403, { error: "Forbidden" });

    const body = await readJson(req);
    switch (body.action) {
      case "login": return await login(req, res, body);
      case "setup": return await setup(req, res, body);
      case "forgot": return await forgot(req, res, body);
      case "checkSetup": {
        const person = await personForSetup(body.token);
        return person
          ? sendJson(res, 200, { name: person.name, email: person.email })
          : sendJson(res, 400, { error: "This link has expired or was already used. Ask an owner for a new one." });
      }
      case "logout": return sendJson(res, 200, { ok: true }, { "Set-Cookie": clearCookie(req) });
      default: return sendJson(res, 400, { error: "Unknown action" });
    }
  } catch (err) {
    console.error("Auth error:", err);
    return sendJson(res, 500, { error: "Something went wrong. Please try again." });
  }
}
