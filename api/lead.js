// POST /api/lead — reservation forms backend (Vercel serverless function).
//
// Both reservation forms post here as JSON: { form: "exotics" | "economy", ...fields }.
// The lead is saved by forwarding it to that form's Google Apps Script (which appends
// it to the matching Google Sheet), then an alert email is sent via Resend.
//
// Alert email requires RESEND_API_KEY and LEAD_ALERT_EMAIL (Vercel project settings
// in production, .env.local for the local preview). Without them the lead is still
// saved — only the email is skipped.

const FORMS = {
  exotics: {
    label: "Exotic Reservation",
    endpoint:
      "https://script.google.com/macros/s/AKfycbztTb8TSdAMHOy-nq-csXu4FRjcKk8NGO_srQsZlbytJEMkFDY7MqKcd-bs0vDm7rPn/exec",
    fields: ["firstName", "lastName", "phone", "email", "pickupDate", "returnDate", "vehicleInterest", "deliveryLocation"],
    sheetUrl: "https://docs.google.com/spreadsheets/d/1S-r52l5vyU1qSWeHTf0ADD8sJ-kIF1S8v3uUejctug8/edit",
  },
  economy: {
    label: "Economy Reservation",
    endpoint:
      "https://script.google.com/macros/s/AKfycbwGxR_0jnB79jV918XK2q088lHf8b6J8el0IqKURr6XQ0yLd1yeWdH1VkkSofSSF4ehQA/exec",
    fields: ["firstName", "lastName", "phone", "email", "pickupDate", "returnDate", "useCase", "car"],
    sheetUrl: "https://docs.google.com/spreadsheets/d/1yLtkutu_BCfYvo9a32T6U7CilrZ6cFkTgoQvq8XAUaA/edit",
  },
};

const REQUIRED = ["firstName", "lastName", "phone", "email"];
const MAX_CHARS = 300;

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20_000) throw new Error("Body too large");
  }
  return JSON.parse(raw || "{}");
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

// Google Sheets treats text starting with + = or - as a formula (a "+1 (508) ..." phone
// number turns into #ERROR!). A leading apostrophe makes Sheets store it as plain text.
function sheetSafe(val) {
  return /^[+=-]/.test(val) ? `'${val}` : val;
}

function escapeHtml(val) {
  return val.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function formatDate(val) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(val);
  if (!m) return val;
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", timeZone: "UTC",
  });
}

async function sendLeadAlert(form, lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!apiKey || !to) {
    console.warn(`Lead alert email skipped: ${!apiKey ? "RESEND_API_KEY" : "LEAD_ALERT_EMAIL"} is not set`);
    return;
  }

  const e = escapeHtml;
  const name = `${lead.firstName} ${lead.lastName}`.trim();
  const tel = lead.phone.replace(/[^\d+]/g, "");
  const vehicle = lead.vehicleInterest || lead.car || "Not specified";
  const dates = `${formatDate(lead.pickupDate) || "?"} → ${formatDate(lead.returnDate) || "?"}`;
  const extraLabel = form === "exotics" ? "Delivery" : "Use";
  const extra = (form === "exotics" ? lead.deliveryLocation : lead.useCase) || "—";
  const { label, sheetUrl } = FORMS[form];

  const row = (k, v) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#111">${v}</td></tr>`;
  const html = `
<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:520px">
  <p style="margin:0 0 4px;color:#b08d57;font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:12px">${e(label)}</p>
  <h2 style="margin:0 0 4px">${e(vehicle)}</h2>
  <p style="margin:0 0 16px;color:#6b6b6b">${e(dates)}</p>
  <table style="border-collapse:collapse;font-size:15px">
    ${row("Name", e(name))}
    ${row("Phone", `<a href="tel:${e(tel)}">${e(lead.phone)}</a>`)}
    ${row("Email", `<a href="mailto:${e(lead.email)}">${e(lead.email)}</a>`)}
    ${row("Vehicle", e(vehicle))}
    ${row("Dates", e(dates))}
    ${row(extraLabel, e(extra))}
  </table>
  <p style="margin:20px 0 0"><a href="${sheetUrl}" style="background:#0e0e10;color:#fff;padding:10px 16px;text-decoration:none;font-weight:600">Open Reservations Sheet</a></p>
</div>`;
  const text = [
    `${label}: ${vehicle}`, `Dates: ${dates}`, `Name: ${name}`, `Phone: ${lead.phone}`,
    `Email: ${lead.email}`, `${extraLabel}: ${extra}`, `Sheet: ${sheetUrl}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_ALERT_FROM || "Echelon Leads <onboarding@resend.dev>",
        to,
        reply_to: lead.email,
        subject: `🚗 New ${label.toLowerCase()}: ${vehicle} — ${name}`,
        html,
        text,
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok) console.log("Lead alert email sent:", body.id);
    else console.error("Lead alert email error:", res.status, body);
  } catch (err) {
    console.error("Lead alert email error:", err);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });

  let body;
  try {
    body = await readJson(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid request" });
  }

  const form = FORMS[body.form] ? body.form : null;
  if (!form) return sendJson(res, 400, { error: "Unknown form" });

  const lead = {};
  for (const key of FORMS[form].fields) {
    lead[key] = typeof body[key] === "string" ? body[key].trim().slice(0, MAX_CHARS) : "";
  }
  if (REQUIRED.some((key) => !lead[key])) return sendJson(res, 400, { error: "Missing required fields" });

  // Save the lead — this must succeed, otherwise the visitor is told to call instead.
  const forSheet = Object.fromEntries(Object.entries(lead).map(([k, v]) => [k, sheetSafe(v)]));
  try {
    const saved = await fetch(FORMS[form].endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(forSheet),
      redirect: "follow",
    });
    if (!saved.ok) throw new Error(`Apps Script responded with HTTP ${saved.status}`);
  } catch (err) {
    console.error(`Lead save failed (${form}):`, err);
    return sendJson(res, 502, { error: "Could not save reservation" });
  }

  await sendLeadAlert(form, lead);
  return sendJson(res, 200, { success: true });
}
