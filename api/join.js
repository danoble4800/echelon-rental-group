// /api/join — public Echelon Members sign-up (/members).
//
// POST saves the new member to the CRM's Members tab (tier "Member", Status "Active",
// Nº blank) and emails the team (RESEND_API_KEY + LEAD_ALERT_EMAIL). The Nº is assigned
// later, when the member's first booking in any division is complete. Members must be 21
// or older. GET returns how many founding numbers (Nº 0001–0099) are still unissued, for
// the counter on the page.

import { activeAmbassador, appendRow, nowEastern, readCrm, readJson, sameOrigin, sendJson } from "./_crm.js";

const MIN_AGE = 21;
const FOUNDING = 99;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INTERESTS = ["Exotics", "Chauffeur", "Boats", "Jets", "Experiences"];
const HEARD = ["Instagram", "A friend or ambassador", "Google", "I've booked before", "Other"];
const LANGS = ["en", "es", "pt"];
const LIMITS = { firstName: 40, lastName: 40, email: 120, phone: 30, birthdate: 10, city: 80, heard: 40, code: 24, lang: 2 };

// Age in whole years on today's date (US Eastern), from "YYYY-MM-DD".
function ageFrom(birthdate) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthdate);
  if (!m) return null;
  const [y, mo, d] = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }).split("-").map(Number);
  let age = y - +m[1];
  if (mo < +m[2] || (mo === +m[2] && d < +m[3])) age--;
  return age;
}

const escapeHtml = (val) =>
  String(val).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// The founding counter is read on every page view, so it's cached briefly.
let foundingCache = { at: 0, remaining: null };
async function foundingRemaining() {
  if (foundingCache.remaining == null || Date.now() - foundingCache.at > 60_000) {
    const { Members } = await readCrm(["Members"]);
    const issued = Members.filter((m) => {
      const n = Number(String(m.no).replace(/\D/g, ""));
      return n >= 1 && n <= FOUNDING;
    }).length;
    foundingCache = { at: Date.now(), remaining: Math.max(0, FOUNDING - issued) };
  }
  return foundingCache.remaining;
}

async function sendAlert(member) {
  if (globalThis.__SHEETS_DEMO) return;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!apiKey || !to) return console.warn("Member alert skipped: RESEND_API_KEY or LEAD_ALERT_EMAIL is not set");

  const e = escapeHtml;
  const name = `${member.firstName} ${member.lastName}`;
  const interests = member.interests.join(", ") || "Not given";
  const row = (k, v) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#111">${v}</td></tr>`;
  const html = `
<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:520px">
  <p style="margin:0 0 4px;color:#b08d57;font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:12px">New Echelon Member</p>
  <h2 style="margin:0 0 16px">${e(name)}</h2>
  <table style="border-collapse:collapse;font-size:15px">
    ${row("Interests", e(interests))}
    ${row("Phone", `<a href="tel:${e(member.phone.replace(/[^\d+]/g, ""))}">${e(member.phone)}</a>${member.sms ? " · OK to text" : ""}`)}
    ${row("Email", `<a href="mailto:${e(member.email)}">${e(member.email)}</a>`)}
    ${row("City", e(member.city))}
    ${row("Age", e(member.age))}
    ${row("Heard from", e(member.heard))}
    ${member.code ? row("Referred by", e(member.code)) : ""}
  </table>
  <p style="margin:16px 0 0;color:#6b6b6b;font-size:13px">Saved to the Members tab of the Echelon CRM sheet. Reach out to welcome them.</p>
</div>`;
  const text = [
    `New Echelon Member: ${name}`, `Interests: ${interests}`, `Phone: ${member.phone}${member.sms ? " (OK to text)" : ""}`,
    `Email: ${member.email}`, `City: ${member.city}`, `Age: ${member.age}`, `Heard from: ${member.heard}`,
    ...(member.code ? [`Referred by: ${member.code}`] : []),
    "Saved to the Members tab of the Echelon CRM sheet.",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_ALERT_FROM || "Echelon Leads <onboarding@resend.dev>",
        to, reply_to: member.email, subject: `✦ New member: ${name} (${interests})`, html, text,
      }),
    });
    if (!res.ok) console.error("Member alert error:", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("Member alert error:", err);
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      return sendJson(res, 200, { remaining: await foundingRemaining() });
    } catch (err) {
      console.error("Founding count failed:", err);
      return sendJson(res, 502, { error: "Unavailable" });
    }
  }
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });
  if (!sameOrigin(req)) return sendJson(res, 403, { error: "Forbidden" });

  let body;
  try {
    body = await readJson(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid request" });
  }
  // Hidden "website" field: people never see it, bots fill it in.
  if (body.website) return sendJson(res, 200, { success: true });

  const member = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    member[key] = typeof body[key] === "string" ? body[key].trim().slice(0, max) : "";
  }
  member.email = member.email.toLowerCase();
  member.interests = Array.isArray(body.interests) ? INTERESTS.filter((i) => body.interests.includes(i)) : [];
  member.sms = body.sms === true;
  if (!HEARD.includes(member.heard)) member.heard = "Other";
  if (!LANGS.includes(member.lang)) member.lang = "en";

  if (!member.firstName || !member.lastName || !member.phone || !member.city) {
    return sendJson(res, 400, { error: "Please fill in every field.", code: "missing" });
  }
  if (!EMAIL_RE.test(member.email)) return sendJson(res, 400, { error: "Please enter a valid email address.", code: "email" });
  if (member.phone.replace(/\D/g, "").length < 10) return sendJson(res, 400, { error: "Please enter a 10-digit mobile number.", code: "phone" });
  if (body.agree !== true) return sendJson(res, 400, { error: "Please agree to the Membership Terms.", code: "agree" });
  member.age = ageFrom(member.birthdate);
  if (member.age == null || member.age > 110) return sendJson(res, 400, { error: "Please enter your date of birth.", code: "dob" });
  if (member.age < MIN_AGE) return sendJson(res, 400, { error: `Echelon Members must be ${MIN_AGE} or older.`, code: "age" });

  try {
    // Only an active ambassador's code is kept, so the Referral Code column stays clean.
    const code = member.code.toUpperCase();
    member.code = code && (await activeAmbassador(code)) ? code : "";

    const { Members } = await readCrm(["Members"]);
    if (Members.some((m) => m.email === member.email)) {
      return sendJson(res, 409, { error: "You're already an Echelon Member. Text us at 508-444-2276 if you need anything.", code: "exists" });
    }
    await appendRow("Members", [
      "", nowEastern(), member.firstName, member.lastName, member.email, member.phone, member.birthdate, member.city,
      member.interests.join(", "), member.heard, member.code, member.sms ? "Yes" : "No", member.lang.toUpperCase(),
      "Member", "Active", "", 0, "", "", "", "", "",
    ]);
  } catch (err) {
    console.error("Member save failed:", err);
    return sendJson(res, 502, { error: "We couldn't send your request. Please try again, or text us at 508-444-2276.", code: "send" });
  }

  await sendAlert(member);
  return sendJson(res, 200, { success: true });
}
