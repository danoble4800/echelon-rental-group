// Shared Google Sheets helpers for the serverless functions (files starting with "_" are
// not deployed as endpoints). Uses the service account in GOOGLE_SERVICE_ACCOUNT_EMAIL +
// GOOGLE_PRIVATE_KEY; every sheet it touches must be shared with that account as an editor.
//
// Local preview only: when scripts/preview-server.js runs with PORTAL_DEMO=1 it puts sample
// spreadsheets on globalThis.__SHEETS_DEMO, and these helpers read and write those instead.

import { createSign } from "node:crypto";

// Google Sheets treats text starting with + = or - as a formula (a "+1 (508) ..." phone
// number turns into #ERROR!). A leading apostrophe makes Sheets store it as plain text.
export function sheetSafe(val) {
  return typeof val === "string" && /^[+=-]/.test(val) ? `'${val}` : val;
}

let cachedToken = null;

// Service-account access token for the Sheets API (signed JWT, no extra dependency).
export async function googleAccessToken() {
  if (cachedToken && cachedToken.exp > Date.now() + 60_000) return cachedToken.value;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!email || !key) throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY not set");
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: email, scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Google token error ${res.status}: ${body.error || ""}`);
  cachedToken = { value: body.access_token, exp: Date.now() + 3500_000 };
  return body.access_token;
}

async function api(path, { method = "GET", body } = {}) {
  const token = await googleAccessToken();
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Sheets ${method} ${path.split("?")[0]} HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

const q = (range) => encodeURIComponent(range);
export const tabRange = (tab, cells) => `'${tab.replace(/'/g, "''")}'!${cells}`;

// ── Public helpers (same shape for the real API and the local demo) ──

// [{ title, sheetId }] in tab order.
export async function listTabs(spreadsheetId) {
  if (demo()) return demo().listTabs(spreadsheetId);
  const meta = await api(`${spreadsheetId}?fields=sheets.properties(title,sheetId)`);
  return meta.sheets.map((s) => ({ title: s.properties.title, sheetId: s.properties.sheetId }));
}

// Several ranges in one request → array of 2D arrays (formatted values, as shown in the sheet).
export async function batchGet(spreadsheetId, ranges) {
  if (demo()) return ranges.map((r) => demo().get(spreadsheetId, r));
  const params = ranges.map((r) => `ranges=${q(r)}`).join("&");
  const body = await api(`${spreadsheetId}/values:batchGet?${params}`);
  return body.valueRanges.map((v) => v.values || []);
}

export async function updateRange(spreadsheetId, range, values) {
  if (demo()) return demo().update(spreadsheetId, range, values);
  return api(`${spreadsheetId}/values/${q(range)}?valueInputOption=USER_ENTERED`, { method: "PUT", body: { values } });
}

// OVERWRITE (not INSERT_ROWS) fills the next empty row, keeping formatting and any
// formulas elsewhere in the sheet in place.
export async function appendRows(spreadsheetId, range, values) {
  if (demo()) return demo().append(spreadsheetId, range, values);
  return api(`${spreadsheetId}/values/${q(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=OVERWRITE`, {
    method: "POST", body: { values },
  });
}

export async function addTabs(spreadsheetId, titles) {
  if (demo()) return demo().addTabs(spreadsheetId, titles);
  return api(`${spreadsheetId}:batchUpdate`, {
    method: "POST",
    body: {
      requests: titles.map((title) => ({
        addSheet: { properties: { title, gridProperties: { frozenRowCount: 1 } } },
      })),
    },
  });
}

// Dropdown choices on one cell (e.g. the Status column's validation), or [] if none.
export async function dropdownOptions(spreadsheetId, cell) {
  if (demo()) return demo().dropdown(spreadsheetId, cell);
  const body = await api(`${spreadsheetId}?ranges=${q(cell)}&fields=sheets.data.rowData.values.dataValidation`);
  const rule = body.sheets?.[0]?.data?.[0]?.rowData?.[0]?.values?.[0]?.dataValidation;
  if (rule?.condition?.type !== "ONE_OF_LIST") return [];
  return rule.condition.values.map((v) => v.userEnteredValue).filter(Boolean);
}

// ── Local demo backend ──

function demo() {
  return globalThis.__SHEETS_DEMO ? demoApi : null;
}

function colNum(letters) {
  return [...letters.toUpperCase()].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0) - 1;
}

function parseRange(range) {
  const m = /^(?:'((?:[^']|'')+)'!|([^!]+)!)?([A-Z]+)(\d*)(?::([A-Z]+)(\d*))?$/i.exec(range);
  if (!m) throw new Error(`Demo: bad range ${range}`);
  return {
    tab: m[1] ? m[1].replace(/''/g, "'") : m[2] || null,
    c1: colNum(m[3]), r1: m[4] ? +m[4] - 1 : 0,
    c2: m[5] ? colNum(m[5]) : colNum(m[3]), r2: m[6] ? +m[6] - 1 : m[4] && !m[5] ? +m[4] - 1 : Infinity,
  };
}

const demoApi = {
  book(id) {
    const book = globalThis.__SHEETS_DEMO[id];
    if (!book) throw new Error(`Demo: no spreadsheet ${id}`);
    return book;
  },
  tab(id, title) {
    const book = this.book(id);
    const tab = title ? book.tabs.find((t) => t.title === title) : book.tabs[0];
    if (!tab) throw new Error(`Demo: no tab ${title}`);
    return tab;
  },
  listTabs(id) {
    return this.book(id).tabs.map((t, i) => ({ title: t.title, sheetId: i }));
  },
  get(id, range) {
    const r = parseRange(range);
    const rows = this.tab(id, r.tab).rows.slice(r.r1, r.r2 === Infinity ? undefined : r.r2 + 1);
    const out = rows.map((row) => (row || []).slice(r.c1, r.c2 + 1).map((v) => (v == null ? "" : String(v))));
    while (out.length && out[out.length - 1].every((v) => v === "")) out.pop();
    return out.map((row) => { while (row.length && row[row.length - 1] === "") row.pop(); return row; });
  },
  update(id, range, values) {
    const r = parseRange(range);
    const rows = this.tab(id, r.tab).rows;
    values.forEach((vals, i) => {
      const row = (rows[r.r1 + i] ||= []);
      vals.forEach((v, j) => { row[r.c1 + j] = typeof v === "string" ? v.replace(/^'/, "") : v; });
    });
  },
  append(id, range, values) {
    const r = parseRange(range);
    const rows = this.tab(id, r.tab).rows;
    let next = rows.length;
    while (next > 0 && (rows[next - 1] || []).every((v) => v == null || v === "")) next--;
    this.update(id, `'${r.tab || this.tab(id).title}'!A${next + 1}`, values);
  },
  addTabs(id, titles) {
    for (const title of titles) this.book(id).tabs.push({ title, rows: [] });
  },
  dropdown(id, cell) {
    return this.tab(id, parseRange(cell).tab).statusOptions || [];
  },
};
