// POST /api/apply — public Echelon Ambassador application (/ambassadors).
//
// Saves the application to the CRM's Applications tab with Status "New" and emails the
// team (RESEND_API_KEY + LEAD_ALERT_EMAIL). Nothing else happens until an owner approves
// it in the portal (api/portal.js → approveApplication), which adds the person to Team
// and hands back their setup link. Applicants must be 21 or older.

import { appendRow, nowEastern, readCrm, readJson, sameOrigin, sendJson } from "./_crm.js";

const MIN_AGE = 21;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FOLLOWERS = ["Under 1K", "1K–10K", "10K–50K", "50K–100K", "100K+"];
const LIMITS = { firstName: 40, lastName: 40, email: 120, phone: 30, instagram: 40, city: 80, birthdate: 10, followers: 20, pitch: 600 };

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

async function sendAlert(app) {
  if (globalThis.__SHEETS_DEMO) return;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!apiKey || !to) return console.warn("Application alert skipped: RESEND_API_KEY or LEAD_ALERT_EMAIL is not set");

  const e = escapeHtml;
  const name = `${app.firstName} ${app.lastName}`;
  const handle = app.instagram.replace(/^@/, "");
  const row = (k, v) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#111">${v}</td></tr>`;
  const html = `
<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:520px">
  <p style="margin:0 0 4px;color:#b08d57;font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:12px">Ambassador Application</p>
  <h2 style="margin:0 0 16px">${e(name)}</h2>
  <table style="border-collapse:collapse;font-size:15px">
    ${row("Instagram", `<a href="https://instagram.com/${encodeURIComponent(handle)}">@${e(handle)}</a> · ${e(app.followers)}`)}
    ${row("Phone", `<a href="tel:${e(app.phone.replace(/[^\d+]/g, ""))}">${e(app.phone)}</a>`)}
    ${row("Email", `<a href="mailto:${e(app.email)}">${e(app.email)}</a>`)}
    ${row("City", e(app.city))}
    ${row("Age", e(app.age))}
    ${app.pitch ? row("Their plan", e(app.pitch)) : ""}
  </table>
  <p style="margin:20px 0 0"><a href="https://www.echelonrentalgroup.com/portal" style="background:#0e0e10;color:#fff;padding:10px 16px;text-decoration:none;font-weight:600">Review in the Portal</a></p>
</div>`;
  const text = [
    `Ambassador application: ${name}`, `Instagram: @${handle} (${app.followers})`, `Phone: ${app.phone}`,
    `Email: ${app.email}`, `City: ${app.city}`, `Age: ${app.age}`, ...(app.pitch ? [`Their plan: ${app.pitch}`] : []),
    "Review in the Portal: https://www.echelonrentalgroup.com/portal",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_ALERT_FROM || "Echelon Leads <onboarding@resend.dev>",
        to, reply_to: app.email, subject: `⭐ New ambassador application: ${name} (@${handle})`, html, text,
      }),
    });
    if (!res.ok) console.error("Application alert error:", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("Application alert error:", err);
  }
}

export default async function handler(req, res) {
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

  const app = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    app[key] = typeof body[key] === "string" ? body[key].trim().slice(0, max) : "";
  }
  app.email = app.email.toLowerCase();
  app.instagram = app.instagram.replace(/^@+/, "").replace(/^(https?:\/\/)?(www\.)?instagram\.com\//i, "").replace(/\/.*$/, "");

  if (!app.firstName || !app.lastName || !app.phone || !app.city || !app.instagram) {
    return sendJson(res, 400, { error: "Please fill in every required field." });
  }
  if (!EMAIL_RE.test(app.email)) return sendJson(res, 400, { error: "Please enter a valid email address." });
  if (!FOLLOWERS.includes(app.followers)) return sendJson(res, 400, { error: "Please choose your follower count." });
  if (body.agree !== true) return sendJson(res, 400, { error: "Please agree to the program terms." });
  app.age = ageFrom(app.birthdate);
  if (app.age == null || app.age > 110) return sendJson(res, 400, { error: "Please enter your date of birth." });
  if (app.age < MIN_AGE) return sendJson(res, 400, { error: `Echelon Ambassadors must be ${MIN_AGE} or older.` });

  try {
    const { Team, Applications } = await readCrm(["Team", "Applications"]);
    if (Team.some((p) => p.email === app.email)) {
      return sendJson(res, 409, { error: "You're already part of the Echelon team. Sign in at /portal." });
    }
    if (Applications.some((a) => a.email === app.email && /^new$/i.test(a.status))) {
      return sendJson(res, 409, { error: "We already have your application. We'll be in touch soon." });
    }
    await appendRow("Applications", [
      nowEastern(), app.firstName, app.lastName, app.email, app.phone, `@${app.instagram}`, app.city,
      app.birthdate, app.followers, app.pitch, "New", "", "",
    ]);
  } catch (err) {
    console.error("Application save failed:", err);
    return sendJson(res, 502, { error: "We couldn't send your application. Please try again, or text us at 508-444-2276." });
  }

  await sendAlert(app);
  return sendJson(res, 200, { success: true });
}
