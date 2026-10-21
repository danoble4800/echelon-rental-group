// POST /api/lead — reservation forms backend (Vercel serverless function).
//
// Reservation forms post here as JSON:
//   { form: "exotics" | "economy" | "chauffeur" | "boats" | "jets" | "experiences", ...fields }.
// Exotics bookings may also carry ref (an ambassador code), logged by logReferral() below.
// Exotics and Economy leads are saved by forwarding them to that form's Google Apps Script
// (which appends to the matching Google Sheet). Every other form is appended straight to
// its sheet (api/_reservations.js) through the Sheets API as a service account
// (GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY, shared as an editor on the sheet).
// Then an alert email is sent via Resend.
//
// Alert email requires RESEND_API_KEY and LEAD_ALERT_EMAIL (Vercel project settings
// in production, .env.local for the local preview). Without them the lead is still
// saved — only the email is skipped.

import { appendRows, sheetSafe } from "./_google.js";
import { activeAmbassador, appendRow, DEFAULT_PERK, EXOTIC_SHEET_ID, firstName } from "./_crm.js";
import { colLetter, ensureSheet, RES_SHEETS } from "./_reservations.js";

const sheetUrl = (id) => `https://docs.google.com/spreadsheets/d/${id}/edit`;
const pax = (n, word) => (n ? `${n} ${word}` : "");

// fields: what the form sends, in sheet column order (B onward; A is the submitted time).
// summary(lead): headline, when, and the detail rows for the alert email.
// newStatus: write "New" into the Status column right after the form columns.
const FORMS = {
  exotics: {
    label: "Exotic Reservation", emoji: "🚗",
    endpoint:
      "https://script.google.com/macros/s/AKfycbztTb8TSdAMHOy-nq-csXu4FRjcKk8NGO_srQsZlbytJEMkFDY7MqKcd-bs0vDm7rPn/exec",
    fields: ["firstName", "lastName", "phone", "email", "pickupDate", "returnDate", "vehicleInterest", "deliveryLocation"],
    summary: (l) => ({
      title: l.vehicleInterest || "Any vehicle", when: `${formatDate(l.pickupDate) || "?"} → ${formatDate(l.returnDate) || "?"}`,
      details: [["Vehicle", l.vehicleInterest], ["Dates", null], ["Delivery", l.deliveryLocation]],
    }),
  },
  economy: {
    label: "Economy Reservation", emoji: "🚗",
    endpoint:
      "https://script.google.com/macros/s/AKfycbwGxR_0jnB79jV918XK2q088lHf8b6J8el0IqKURr6XQ0yLd1yeWdH1VkkSofSSF4ehQA/exec",
    fields: ["firstName", "lastName", "phone", "email", "pickupDate", "returnDate", "useCase", "car"],
    summary: (l) => ({
      title: l.car || "Any car", when: `${formatDate(l.pickupDate) || "?"} → ${formatDate(l.returnDate) || "?"}`,
      details: [["Car", l.car], ["Dates", null], ["Use", l.useCase]],
    }),
  },
  chauffeur: {
    label: "Chauffeur Request", emoji: "🚗",
    fields: ["firstName", "lastName", "phone", "email", "rideDate", "pickupTime", "serviceType", "passengers", "vehicle", "pickup", "dropoff"],
    summary: (l) => ({
      title: l.vehicle || "Any vehicle", when: `${formatDate(l.rideDate) || "?"} at ${formatTime(l.pickupTime) || "?"}`,
      details: [["Vehicle", l.vehicle], ["When", null], ["Ride", [l.serviceType, pax(l.passengers, "pax"), `${l.pickup}${l.dropoff ? ` → ${l.dropoff}` : ""}`].filter(Boolean).join(" · ")]],
    }),
  },
  boats: {
    label: "Boat Charter Request", emoji: "⚓", newStatus: true,
    fields: ["firstName", "lastName", "phone", "email", "charterDate", "duration", "partySize", "boatInterest", "departureLocation"],
    summary: (l) => ({
      title: l.boatInterest || "Any boat", when: [formatDate(l.charterDate) || "?", l.duration].filter(Boolean).join(" · "),
      details: [["Boat", l.boatInterest], ["When", null], ["Party", pax(l.partySize, "guests")], ["Marina", l.departureLocation]],
    }),
  },
  jets: {
    label: "Jet Charter Request", emoji: "✈️", newStatus: true,
    fields: ["firstName", "lastName", "phone", "email", "flightDate", "passengers", "aircraftInterest", "departureCity", "destinationCity"],
    summary: (l) => ({
      title: `${l.departureCity || "?"} → ${l.destinationCity || "?"}`, when: formatDate(l.flightDate) || "?",
      details: [["Route", `${l.departureCity} → ${l.destinationCity}`], ["Date", null], ["Passengers", l.passengers], ["Aircraft", l.aircraftInterest]],
    }),
  },
  experiences: {
    label: "Experience Request", emoji: "✦", newStatus: true,
    fields: ["firstName", "lastName", "phone", "email", "date", "partySize", "experienceType", "include", "notes"],
    long: ["include", "notes"],
    summary: (l) => ({
      title: l.experienceType || "Custom experience", when: formatDate(l.date) || "?",
      details: [["Occasion", l.experienceType], ["Date", null], ["Group", pax(l.partySize, "guests")], ["Include", l.include], ["Details", l.notes]],
    }),
  },
};
for (const [key, cfg] of Object.entries(FORMS)) {
  cfg.sheetId = RES_SHEETS[key].id;
  cfg.sheetUrl = sheetUrl(cfg.sheetId);
}

const REQUIRED = ["firstName", "lastName", "phone", "email"];
const MAX_CHARS = 300;
const MAX_LONG = 1500;   // free-text fields (Experiences "include" and "notes")

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

function formatTime(val) {
  const m = /^(\d{1,2}):(\d{2})/.exec(val);
  if (!m) return val;
  const h = +m[1];
  return `${h % 12 || 12}:${m[2]} ${h < 12 ? "AM" : "PM"}`;
}

// Writes [submitted time, ...fields] into the next empty row of the first tab. OVERWRITE
// (not INSERT_ROWS) keeps the pre-formatted rows and the Summary formulas in place.
// USER_ENTERED lets Sheets read the time, dates, and passenger count as real values;
// sheetSafe() keeps user text from being treated as a formula.
async function appendToSheet(cfg, lead) {
  const submitted = new Date().toLocaleString("en-US", { timeZone: "America/New_York" }).replace(",", "");
  const row = [submitted, ...cfg.fields.map((k) => sheetSafe(lead[k])), ...(cfg.newStatus ? ["New"] : [])];
  await appendRows(cfg.sheetId, `A:${colLetter(row.length - 1)}`, [row]);
}

// Exotics bookings that came through an ambassador's link (brand-pages.js sends the
// saved ?ref= code) get a row on the CRM's Referrals tab. Never blocks the booking.
async function logReferral(code, lead) {
  if (!code || !process.env.ECHELON_CRM_SHEET_ID) return null;
  try {
    const person = await activeAmbassador(code);
    if (!person) return null;
    const selfReferral = person.email === lead.email.toLowerCase();
    await appendRow("Referrals", [
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" }).replace(",", ""),
      person.code, lead.firstName, lead.lastName, lead.email, lead.phone, lead.vehicleInterest,
      lead.pickupDate, lead.returnDate, selfReferral ? "Not Eligible" : "New", "", "", "",
      selfReferral ? "Ambassador booked with their own code" : "",
    ]);
    return { code: person.code, name: firstName(person.name), perk: person.perk || DEFAULT_PERK };
  } catch (err) {
    console.error("Referral log failed:", err);
    return null;
  }
}

async function sendLeadAlert(form, lead, referral) {
  if (globalThis.__SHEETS_DEMO) return;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!apiKey || !to) {
    console.warn(`Lead alert email skipped: ${!apiKey ? "RESEND_API_KEY" : "LEAD_ALERT_EMAIL"} is not set`);
    return;
  }

  const e = escapeHtml;
  const name = `${lead.firstName} ${lead.lastName}`.trim();
  const tel = lead.phone.replace(/[^\d+]/g, "");
  const { label, emoji, sheetUrl } = FORMS[form];
  const { title, when, details } = FORMS[form].summary(lead);
  // A null value in details stands for the "when" line.
  const extras = details.map(([k, v]) => [k, v === null ? when : v || "—"]);
  const row = (k, v) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#111">${v}</td></tr>`;
  const html = `
<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:520px">
  <p style="margin:0 0 4px;color:#b08d57;font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:12px">${e(label)}</p>
  <h2 style="margin:0 0 4px">${e(title)}</h2>
  <p style="margin:0 0 16px;color:#6b6b6b">${e(when)}</p>
  <table style="border-collapse:collapse;font-size:15px">
    ${row("Name", e(name))}
    ${row("Phone", `<a href="tel:${e(tel)}">${e(lead.phone)}</a>`)}
    ${row("Email", `<a href="mailto:${e(lead.email)}">${e(lead.email)}</a>`)}
    ${extras.map(([k, v]) => row(e(k), e(v))).join("\n    ")}
    ${referral ? row("Referred by", `${e(referral.name)} (${e(referral.code)}) · perk: ${e(referral.perk)}`) : ""}
  </table>
  <p style="margin:20px 0 0"><a href="${sheetUrl}" style="background:#0e0e10;color:#fff;padding:10px 16px;text-decoration:none;font-weight:600">Open Reservations Sheet</a></p>
</div>`;
  const text = [
    `${label}: ${title}`, `When: ${when}`, `Name: ${name}`, `Phone: ${lead.phone}`, `Email: ${lead.email}`,
    ...extras.map(([k, v]) => `${k}: ${v}`),
    ...(referral ? [`Referred by: ${referral.name} (${referral.code}) · perk: ${referral.perk}`] : []),
    `Sheet: ${sheetUrl}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_ALERT_FROM || "Echelon Leads <onboarding@resend.dev>",
        to,
        reply_to: lead.email,
        subject: `${emoji} New ${label.toLowerCase()}: ${title} — ${name}`,
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
    const max = FORMS[form].long?.includes(key) ? MAX_LONG : MAX_CHARS;
    lead[key] = typeof body[key] === "string" ? body[key].trim().slice(0, max) : "";
  }
  if (REQUIRED.some((key) => !lead[key])) return sendJson(res, 400, { error: "Missing required fields" });

  // Save the lead — this must succeed, otherwise the visitor is told to call instead.
  const forSheet = Object.fromEntries(Object.entries(lead).map(([k, v]) => [k, sheetSafe(v)]));
  try {
    if (globalThis.__SHEETS_DEMO && FORMS[form].endpoint) {
      // Local portal demo (scripts/preview-server.js): never touch the real sheets. The demo
      // has stand-ins for every sheet id, so the other forms fall through to appendToSheet.
      await appendToSheet({ ...FORMS[form], sheetId: form === "exotics" ? EXOTIC_SHEET_ID : RES_SHEETS.economy.id }, lead);
    } else if (!FORMS[form].endpoint) {
      await ensureSheet(form);
      await appendToSheet(FORMS[form], lead);
    } else {
      const saved = await fetch(FORMS[form].endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(forSheet),
        redirect: "follow",
      });
      if (!saved.ok) throw new Error(`Apps Script responded with HTTP ${saved.status}`);
    }
  } catch (err) {
    console.error(`Lead save failed (${form}):`, err);
    return sendJson(res, 502, { error: "Could not save reservation" });
  }

  const referral = form === "exotics" ? await logReferral(body.ref, lead) : null;
  await sendLeadAlert(form, lead, referral);
  return sendJson(res, 200, { success: true });
}
