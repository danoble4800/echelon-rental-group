// /api/member — the signed-in member's own area (/member). Every request needs a member
// session from /api/auth (kind "member"); a team session gets 401 here.
//
//   GET                                   → { member, drives, requests }
//   POST { action: "chat", messages }     → { text, draft?, remember? } from the concierge
//   POST { action: "sendRequest", ask, draft } → saves to the CRM's Requests tab, emails the team
//   POST { action: "setPrefs", prefs }    → replaces what the concierge remembers (Preferences)
//
// The concierge is Claude with the Exotics knowledge base plus this member's own details.
// It never confirms anything: it drafts a request, the member sends it, and a person on the
// team confirms from the portal's Requests tab. Team notes are never sent to the model.

import Anthropic from "@anthropic-ai/sdk";
import { randomBytes } from "node:crypto";
import { SYSTEM_PROMPTS } from "./_knowledge.js";
import { readReservations, RES_SHEETS } from "./_reservations.js";
import {
  appendRow, currentMember, memberName, nowEastern, readCrm, readJson, sameOrigin, sendJson, todayEastern, writeCells,
} from "./_crm.js";

const MODEL = "claude-opus-5";
const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;
const CHAT_LIMIT = 15;          // concierge messages per member per minute (best effort, per instance)
const MAX_OPEN_REQUESTS = 10;
const MAX_PREFS = 20;
const PREF_CHARS = 80;
const DRAFT_LIMITS = { what: 120, when: 80, where: 120, extras: 200 };
const ASK_CHARS = 600;

const FALLBACK =
  "Sorry, I can't answer right now. Text the team at 508-444-2276 and they'll take care of you.";

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

// ── Drives: the member's reservations in every division, matched by email ──

function parseDay(v) {
  const s = String(v || "").trim();
  let m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/.exec(s);
  if (m) return `${m[3].length === 2 ? "20" + m[3] : m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
  const d = new Date(s);
  return isNaN(d) ? "" : d.toISOString().slice(0, 10);
}

async function drivesFor(email) {
  const brands = Object.keys(RES_SHEETS);
  const results = await Promise.allSettled(brands.map((b) => readReservations(b)));
  const today = todayEastern();
  const drives = [];
  results.forEach((res, i) => {
    if (res.status !== "fulfilled") return console.error(`Member drives read failed (${brands[i]}):`, res.reason);
    for (const r of res.value.list) {
      if (r.email !== email || /not a fit|cancel/i.test(r.status)) continue;
      const day = parseDay(r.pickup);
      drives.push({
        division: RES_SHEETS[brands[i]].label, vehicle: r.vehicle, pickup: r.pickup, returnDate: r.returnDate || "",
        day, where: r.delivery || "", status: r.status || "Requested",
        upcoming: !/complete/i.test(r.status) && (!day || day >= today),
      });
    }
  });
  drives.sort((a, b) => (a.day || "9999").localeCompare(b.day || "9999"));
  return {
    upcoming: drives.filter((d) => d.upcoming),
    past: drives.filter((d) => !d.upcoming).reverse(),
    completed: drives.filter((d) => /complete/i.test(d.status)).length,
  };
}

const MEMBER_STATUS = { New: "Sent to the team", "In Progress": "Being arranged", Confirmed: "Confirmed", Closed: "Closed" };

function requestsFor(all, email) {
  return all.filter((r) => r.email === email).reverse().map((r) => ({
    ref: r.ref, submitted: r.submitted, ask: r.ask, what: r.what, when: r.when, where: r.where, extras: r.extras,
    status: r.status, label: MEMBER_STATUS[r.status] || r.status, handler: r.handler, reply: r.reply, replied: r.replied,
  }));
}

const conciergeName = (m) => m.concierge || "the Echelon team";

function memberView(m) {
  return {
    name: memberName(m), firstName: m.firstName, email: m.email, no: m.no, tier: m.tier || "Member",
    joined: m.joined, prefs: m.prefs, concierge: conciergeName(m),
  };
}

// ── Concierge ──

const RULES = `# You are now inside the signed-in member area
Everything above still applies, with these changes for this conversation:
- You are this member's personal Echelon concierge. You know who they are (details below). Greet them by first name when it fits, and use what you know about them naturally, the way a hotel concierge remembers a regular guest. Never recite their profile back to them.
- When the member wants something arranged (a car, a chauffeur, a charter, an experience, a change to a booking), don't send them to the reservation form or the phone. Ask only what you truly need (usually the date and where), then call draft_request with a clear summary. The member reviews it and sends it to the team; a person confirms availability, price and the booking. Say so in a short sentence.
- You still cannot confirm availability, prices or bookings, and you never say something is booked or held. You may suggest which car would suit them.
- When the member tells you a lasting preference (a favorite car, a usual delivery spot, an anniversary, how they like to be contacted), call remember_preference with a short phrase. They choose whether to keep it. Don't save one-off details.
- Only discuss this member's own details. Never mention other members or clients, and never claim to know anything about them.
- Keep replies short: two to four sentences. Plain text, no headings.`;

const TOOLS = [
  {
    name: "draft_request",
    description: "Draft a request for the Echelon team to arrange. The member reviews it before it is sent; a person on the team confirms availability, price and the booking.",
    strict: true,
    input_schema: {
      type: "object",
      additionalProperties: false,
      required: ["what", "when", "where", "extras"],
      properties: {
        what: { type: "string", description: "What to arrange, e.g. 'Lamborghini Urus' or 'Chauffeur + dinner reservation'." },
        when: { type: "string", description: "Date and time as the member gave it, e.g. 'Sat Nov 1, 10:00am'. 'To confirm' if unknown." },
        where: { type: "string", description: "Delivery or pickup place. 'To confirm' if unknown." },
        extras: { type: "string", description: "Anything else the team should know. '—' if nothing." },
      },
    },
  },
  {
    name: "remember_preference",
    description: "Suggest saving a lasting preference about the member, such as 'Prefers black interiors' or 'Anniversary in November'. The member chooses whether to keep it.",
    strict: true,
    input_schema: {
      type: "object",
      additionalProperties: false,
      required: ["preference"],
      properties: { preference: { type: "string", description: "A short phrase, under 60 characters." } },
    },
  },
];

function memberContext(m, drives, requests) {
  const line = (d) => `- ${d.vehicle || d.division} (${d.division}), ${d.pickup}${d.returnDate ? ` to ${d.returnDate}` : ""}${d.where ? `, ${d.where}` : ""}, status ${d.status}`;
  return [
    "# This member",
    `Name: ${memberName(m)}`,
    `Tier: ${m.tier || "Member"}${m.no ? `, Member Nº ${m.no}` : " (no member number yet; it comes with the first completed booking)"}`,
    `Member since: ${m.joined || "recently"}`,
    `Interests when joining: ${m.interests || "not given"}`,
    `Their concierge on the team: ${conciergeName(m)}`,
    `What you remember about them:\n${m.prefs.length ? m.prefs.map((p) => `- ${p}`).join("\n") : "- nothing yet"}`,
    `Upcoming drives:\n${drives.upcoming.length ? drives.upcoming.map(line).join("\n") : "- none"}`,
    `Past drives:\n${drives.past.length ? drives.past.slice(0, 8).map(line).join("\n") : "- none"}`,
    `Open requests with the team:\n${requests.filter((r) => /new|progress/i.test(r.status)).map((r) => `- ${r.what}, ${r.when} (${r.label})`).join("\n") || "- none"}`,
    `Today is ${new Date().toLocaleDateString("en-US", { timeZone: "America/New_York", weekday: "long", month: "long", day: "numeric", year: "numeric" })} (Boston time).`,
  ].join("\n");
}

function cleanMessages(input) {
  if (!Array.isArray(input)) return [];
  const messages = input
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_MESSAGES);
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return [];
  return messages;
}

const clip = (v, n) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);

const recentChats = new Map();
function chatLimited(email) {
  const now = Date.now();
  const times = (recentChats.get(email) || []).filter((t) => now - t < 60_000);
  times.push(now);
  recentChats.set(email, times);
  if (recentChats.size > 5000) recentChats.clear();
  return times.length > CHAT_LIMIT;
}

let client;

async function chat(m, body) {
  if (chatLimited(m.email)) throw new HttpError(429, "You're sending messages a little quickly. Give it a moment.");
  const messages = cleanMessages(body.messages);
  if (!messages.length) throw new HttpError(400, "Invalid request");
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[member chat] ANTHROPIC_API_KEY is not set");
    return { text: FALLBACK };
  }
  const [drives, { Requests }] = await Promise.all([drivesFor(m.email), readCrm(["Requests"])]);
  client ??= new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 4096,
      output_config: { effort: "low" },
      // If the model declines a request, Anthropic retries it on its recommended fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      // Stable knowledge + rules first (cached); this member's details last.
      system: [
        { type: "text", text: SYSTEM_PROMPTS.exotics },
        { type: "text", text: RULES, cache_control: { type: "ephemeral" } },
        { type: "text", text: memberContext(m, drives, requestsFor(Requests, m.email)) },
      ],
      tools: TOOLS,
      messages,
    });
    if (response.stop_reason === "refusal") {
      console.warn("[member chat] refusal", response.stop_details);
      return { text: FALLBACK };
    }
    let text = "";
    let draft = null;
    let remember = "";
    for (const block of response.content) {
      if (block.type === "text") text += block.text;
      else if (block.type === "tool_use" && block.name === "draft_request") {
        draft = Object.fromEntries(Object.entries(DRAFT_LIMITS).map(([k, n]) => [k, clip(block.input?.[k], n) || "To confirm"]));
      } else if (block.type === "tool_use" && block.name === "remember_preference") {
        const p = clip(block.input?.preference, PREF_CHARS);
        if (p && !m.prefs.some((x) => x.toLowerCase() === p.toLowerCase())) remember = p;
      }
    }
    text = text.trim() || (draft ? "Here's what I'll send to the team. Take a look:" : "Noted.");
    return { text, draft, remember: remember || undefined };
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) console.error("[member chat] Anthropic rejected the API key");
    else if (err instanceof Anthropic.RateLimitError) console.error("[member chat] Anthropic rate limit reached");
    else if (err instanceof Anthropic.APIError) console.error("[member chat] Anthropic API error", err.status, err.message);
    else console.error("[member chat] unexpected error", err);
    return { text: FALLBACK };
  }
}

// ── Requests ──

const escapeHtml = (val) =>
  String(val).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

async function alertTeam(m, r) {
  if (globalThis.__SHEETS_DEMO) return;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL;
  if (!apiKey || !to) return console.warn("Request alert skipped: RESEND_API_KEY or LEAD_ALERT_EMAIL is not set");
  const e = escapeHtml;
  const name = memberName(m);
  const row = (k, v) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#111">${v}</td></tr>`;
  const html = `
<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:520px">
  <p style="margin:0 0 4px;color:#b08d57;font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:12px">Concierge request · ${e(m.tier || "Member")}${m.no ? ` Nº ${e(m.no)}` : ""}</p>
  <h2 style="margin:0 0 16px">${e(name)}: ${e(r.what)}</h2>
  <table style="border-collapse:collapse;font-size:15px">
    ${row("When", e(r.when))}${row("Where", e(r.where))}${row("Extras", e(r.extras))}
    ${row("They said", `“${e(r.ask)}”`)}
    ${row("Phone", `<a href="tel:${e(m.phone.replace(/[^\d+]/g, ""))}">${e(m.phone)}</a>`)}
    ${row("Email", `<a href="mailto:${e(m.email)}">${e(m.email)}</a>`)}
  </table>
  <p style="margin:16px 0 0;color:#6b6b6b;font-size:13px">Confirm or reply in the Portal's Requests tab: https://www.echelonrentalgroup.com/portal</p>
</div>`;
  const text = [
    `Concierge request from ${name} (${m.tier || "Member"})`, `What: ${r.what}`, `When: ${r.when}`, `Where: ${r.where}`,
    `Extras: ${r.extras}`, `They said: "${r.ask}"`, `Phone: ${m.phone}`, `Email: ${m.email}`,
    "Confirm or reply in the Portal's Requests tab: https://www.echelonrentalgroup.com/portal",
  ].join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_ALERT_FROM || "Echelon Leads <onboarding@resend.dev>",
        to, reply_to: m.email, subject: `✦ Concierge request: ${name} — ${r.what}`, html, text,
      }),
    });
    if (!res.ok) console.error("Request alert error:", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("Request alert error:", err);
  }
}

async function sendRequest(m, { ask, draft }) {
  const r = Object.fromEntries(Object.entries(DRAFT_LIMITS).map(([k, n]) => [k, clip(draft?.[k], n)]));
  if (!r.what) throw new HttpError(400, "Say what you'd like arranged.");
  r.when ||= "To confirm";
  r.where ||= "To confirm";
  r.extras ||= "—";
  r.ask = clip(ask, ASK_CHARS) || r.what;
  const { Requests } = await readCrm(["Requests"]);
  const open = Requests.filter((x) => x.email === m.email && /new|progress/i.test(x.status)).length;
  if (open >= MAX_OPEN_REQUESTS) throw new HttpError(429, "You have a lot of requests open already. The team will be in touch shortly, or text 508-444-2276.");
  const ref = "R-" + randomBytes(3).toString("hex").toUpperCase();
  await appendRow("Requests", [nowEastern(), ref, m.email, memberName(m), m.tier || "Member", r.ask, r.what, r.when, r.where, r.extras, "New", "", "", "", ""]);
  await alertTeam(m, r);
  return { ok: true, ref };
}

async function setPrefs(m, { prefs }) {
  if (!Array.isArray(prefs)) throw new HttpError(400, "Invalid request");
  const seen = new Set();
  const clean = prefs.map((p) => clip(p, PREF_CHARS)).filter((p) => p && !seen.has(p.toLowerCase()) && seen.add(p.toLowerCase())).slice(0, MAX_PREFS);
  await writeCells("Members", `Z${m.row}`, [clean.join("\n")]);
  return { prefs: clean };
}

export default async function handler(req, res) {
  try {
    const m = await currentMember(req);
    if (!m) return sendJson(res, 401, { error: "Please sign in again." });

    if (req.method === "GET") {
      const [drives, { Requests }] = await Promise.all([drivesFor(m.email), readCrm(["Requests"])]);
      return sendJson(res, 200, { member: memberView(m), drives, requests: requestsFor(Requests, m.email) });
    }
    if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });
    if (!sameOrigin(req)) return sendJson(res, 403, { error: "Forbidden" });
    const body = await readJson(req);
    switch (body.action) {
      case "chat": return sendJson(res, 200, await chat(m, body));
      case "sendRequest": return sendJson(res, 200, await sendRequest(m, body));
      case "setPrefs": return sendJson(res, 200, await setPrefs(m, body));
      default: return sendJson(res, 400, { error: "Unknown action" });
    }
  } catch (err) {
    if (err instanceof HttpError) return sendJson(res, err.status, { error: err.message });
    console.error("Member error:", err);
    return sendJson(res, 500, { error: "Something went wrong. Please try again." });
  }
}
