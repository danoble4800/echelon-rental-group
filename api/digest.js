// GET /api/digest — morning follow-up email for the Echelon team (Vercel cron, see vercel.json).
//
// Reads every division's reservation sheet (api/_reservations.js) plus the CRM, and emails
// LEAD_ALERT_EMAIL a list of: follow-ups that are overdue or due today, requests nobody has
// worked yet (no status or "New"), ambassador applications waiting, and members who joined
// in the last day. Nothing is sent when the list is empty.
//
// Vercel calls it with "Authorization: Bearer <CRON_SECRET>"; any other caller gets a 401.
// Add ?dry=1 to get the digest back as JSON instead of emailing it.

import { readCrm, sendJson } from "./_crm.js";
import { readReservations, RES_SHEETS } from "./_reservations.js";

const PORTAL = "https://www.echelonrentalgroup.com/portal";
const CLOSED = /complete|fit|cancel|lost/i;

const escapeHtml = (val) =>
  String(val ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Today in US Eastern as a local-midnight Date, so day math matches what the team sees.
function todayEastern() {
  const [y, m, d] = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }).split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Sheet cells come back as displayed: "2026-10-22", "10/22/2026", "Thu, Oct 22" (no year).
function parseDay(v, today) {
  if (!v) return null;
  let m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(v);
  if (m) return new Date(+m[3], +m[1] - 1, +m[2]);
  const d = new Date(v);
  if (isNaN(d)) return null;
  if (d.getFullYear() < 2020) {
    // No year in the cell: take the date closest to today.
    d.setFullYear(today.getFullYear());
    if (d - today > 182 * 864e5) d.setFullYear(today.getFullYear() - 1);
    else if (today - d > 182 * 864e5) d.setFullYear(today.getFullYear() + 1);
  }
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const daysBetween = (a, b) => Math.round((a - b) / 864e5);

function describe(r) {
  const bits = [r.vehicle, r.pickup && `for ${r.pickup}`].filter(Boolean);
  if (r.brand === "jets" && (r.delivery || r.dropoff)) bits[0] = `${r.delivery || "?"} → ${r.dropoff || "?"}`;
  return bits.join(" ");
}

export async function buildDigest() {
  const today = todayEastern();
  const brands = Object.keys(RES_SHEETS);
  const results = await Promise.allSettled(brands.map((b) => readReservations(b)));
  const overdue = [], dueToday = [], untouched = [], errors = [];

  results.forEach((res, i) => {
    const label = RES_SHEETS[brands[i]].label;
    if (res.status === "rejected") {
      console.error(`Digest: ${label} sheet failed:`, res.reason);
      errors.push(label);
      return;
    }
    for (const r of res.value.list) {
      if (CLOSED.test(r.status)) continue;
      const item = { ...r, label };
      const follow = parseDay(r.followUp, today);
      if (follow && follow < today) overdue.push({ ...item, late: daysBetween(today, follow) });
      else if (follow && +follow === +today) dueToday.push(item);
      else if (!r.status || /^new$/i.test(r.status)) {
        const sent = parseDay(r.submitted, today);
        untouched.push({ ...item, age: sent ? daysBetween(today, sent) : null });
      }
    }
  });
  overdue.sort((a, b) => b.late - a.late);
  untouched.sort((a, b) => (b.age ?? 0) - (a.age ?? 0));

  let applications = [], members = [];
  try {
    const crm = await readCrm(["Applications", "Members"]);
    applications = crm.Applications.filter((a) => /^new$/i.test(a.status) && !/@example\.com$/i.test(a.email));
    members = crm.Members.filter((m) => {
      const joined = parseDay(m.joined, today);
      return joined && daysBetween(today, joined) <= 1;
    });
  } catch (err) {
    console.error("Digest: CRM read failed:", err);
    errors.push("Echelon CRM");
  }
  return { overdue, dueToday, untouched, applications, members, errors };
}

function render(d) {
  const e = escapeHtml;
  const person = (r, note) => {
    const tel = String(r.phone || "").replace(/[^\d+]/g, "");
    return `<tr><td style="padding:8px 0;border-top:1px solid #eee;vertical-align:top">
      <span style="display:inline-block;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#9a7810;margin-right:6px">${e(r.label)}</span>
      <strong>${e(`${r.firstName} ${r.lastName}`.trim() || r.email)}</strong>${note ? ` <span style="color:#b4321c">· ${e(note)}</span>` : ""}<br>
      <span style="color:#555">${e(describe(r))}</span><br>
      <a href="tel:${e(tel)}" style="color:#111">${e(r.phone)}</a>${r.email ? ` · <a href="mailto:${e(r.email)}" style="color:#111">${e(r.email)}</a>` : ""}
      ${r.notes ? `<br><span style="color:#777;font-size:13px">Notes: ${e(r.notes)}</span>` : ""}
    </td></tr>`;
  };
  const block = (title, color, rows) => rows.length
    ? `<h3 style="margin:24px 0 4px;font-size:15px;color:${color}">${e(title)} (${rows.length})</h3><table style="border-collapse:collapse;width:100%;font-size:14px">${rows.join("")}</table>`
    : "";
  return `
<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;color:#111">
  <p style="margin:0 0 4px;color:#b08d57;font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:12px">Echelon · Morning follow-ups</p>
  ${block("Overdue", "#b4321c", d.overdue.map((r) => person(r, `${r.late} day${r.late === 1 ? "" : "s"} late`)))}
  ${block("Follow up today", "#9a7810", d.dueToday.map((r) => person(r)))}
  ${block("Not contacted yet", "#111", d.untouched.map((r) => person(r, r.age == null ? "" : r.age === 0 ? "came in today" : `waiting ${r.age} day${r.age === 1 ? "" : "s"}`)))}
  ${d.applications.length ? `<h3 style="margin:24px 0 4px;font-size:15px">Ambassador applications waiting (${d.applications.length})</h3><p style="margin:0;color:#555;font-size:14px">${d.applications.map((a) => e(`${a.firstName} ${a.lastName} (${a.instagram})`)).join(", ")}</p>` : ""}
  ${d.members.length ? `<h3 style="margin:24px 0 4px;font-size:15px">New members (${d.members.length})</h3><p style="margin:0;color:#555;font-size:14px">${d.members.map((m) => e(`${m.firstName} ${m.lastName}${m.interests ? ` · ${m.interests}` : ""}`)).join("<br>")}</p>` : ""}
  ${d.errors.length ? `<p style="margin:20px 0 0;color:#b4321c;font-size:13px">Couldn't read: ${e(d.errors.join(", "))}. Check that the sheet is still shared with the site.</p>` : ""}
  <p style="margin:24px 0 0"><a href="${PORTAL}" style="background:#0e0e10;color:#fff;padding:10px 16px;text-decoration:none;font-weight:600">Open the Portal</a></p>
</div>`;
}

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return sendJson(res, 401, { error: "Unauthorized" });

  const d = await buildDigest();
  const count = d.overdue.length + d.dueToday.length + d.untouched.length;
  if (new URL(req.url, "http://x").searchParams.get("dry")) return sendJson(res, 200, d);
  if (!count && !d.applications.length && !d.members.length && !d.errors.length) return sendJson(res, 200, { sent: false, reason: "Nothing due" });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!apiKey || !to) return sendJson(res, 200, { sent: false, reason: "RESEND_API_KEY or LEAD_ALERT_EMAIL not set" });

  const parts = [];
  if (d.overdue.length) parts.push(`${d.overdue.length} overdue`);
  if (d.dueToday.length) parts.push(`${d.dueToday.length} due today`);
  if (d.untouched.length) parts.push(`${d.untouched.length} not contacted`);
  const subject = parts.length ? `Echelon follow-ups: ${parts.join(", ")}` : "Echelon: new members and applications";
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.LEAD_ALERT_FROM || "Echelon Leads <onboarding@resend.dev>", to, subject, html: render(d) }),
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) {
    console.error("Digest email error:", r.status, body);
    return sendJson(res, 502, { sent: false });
  }
  return sendJson(res, 200, { sent: true, id: body.id, count });
}
