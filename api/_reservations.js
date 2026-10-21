// Reservation sheets for every Echelon division, shared by api/lead.js (writes new
// requests), api/portal.js (Reservations tab) and api/digest.js (morning email).
//
// Each division's form writes to the first tab of its own Google Sheet. Exotics and
// Economy go through their Apps Scripts; the rest are written with the service account.
// The portal and digest find each column by its header name and only ever write the
// Status / Follow-up / Notes columns.
//
// Boats, Jets and Experiences sheets start out blank: ensureSheet() lays them out on the
// first request (headers, Status dropdown, formatting, a Summary tab with live counts).

import { batchGet, batchUpdate, listTabs, tabRange, updateRange } from "./_google.js";

export const STATUSES = ["New", "Contacted", "Booked", "Completed", "Not a Fit"];
const TEAM_COLS = ["Status", "Follow-up Date", "Notes"];

export const RES_SHEETS = {
  exotics: { label: "Exotics", id: "1S-r52l5vyU1qSWeHTf0ADD8sJ-kIF1S8v3uUejctug8" },
  economy: { label: "Economy", id: "1yLtkutu_BCfYvo9a32T6U7CilrZ6cFkTgoQvq8XAUaA" },
  chauffeur: { label: "Chauffeur", id: "1zDNYG4I4GnKNGQWWE4l5xobWg5_ZxsqpV01pmL-EMyc" },
  boats: {
    label: "Boats", id: "1Ql7Lzpe-4mLwTnAvnGlY28TRM_vrWQ69TmorYNbWXFc",
    setup: {
      heading: "BOAT CHARTER RESERVATIONS", upcoming: "Charters in the next 7 days",
      headers: ["Submitted", "First Name", "Last Name", "Phone", "Email", "Charter Date", "Duration", "Party Size", "Boat", "Departure Marina"],
      widths: [170, 110, 130, 130, 210, 120, 150, 90, 170, 180],
      top: ["TOP BOATS", "I"],
    },
  },
  jets: {
    label: "Jets", id: "1_AQfYacZ2VqO-7-cg_fX02wg9FS1WpF24-m3S4jIk3g",
    setup: {
      heading: "JET CHARTER RESERVATIONS", upcoming: "Flights in the next 7 days",
      headers: ["Submitted", "First Name", "Last Name", "Phone", "Email", "Flight Date", "Passengers", "Aircraft", "From", "To"],
      widths: [170, 110, 130, 130, 210, 120, 90, 180, 180, 180],
      top: ["TOP AIRCRAFT", "H"],
    },
  },
  experiences: {
    label: "Experiences", id: "1s2EW8gJPHFiWLy0CSUePSHKacPA9dMOe-ekym9W3kWo",
    setup: {
      heading: "EXPERIENCE REQUESTS", upcoming: "Experiences in the next 7 days",
      headers: ["Submitted", "First Name", "Last Name", "Phone", "Email", "Date", "Group Size", "Occasion", "Include", "Details"],
      widths: [170, 110, 130, 130, 210, 120, 90, 170, 260, 320],
      top: ["OCCASIONS", "H"],
    },
  },
};

// Header patterns → field keys. Exotics falls back to its original A:L layout.
const COMMON_COLS = {
  submitted: /time|submitted|created/i, firstName: /first/i, lastName: /last/i, phone: /phone/i,
  email: /e-?mail/i, status: /status/i, followUp: /follow/i, notes: /^notes?$/i,
};
const BRAND_COLS = {
  exotics: { pickup: /pick/i, returnDate: /return/i, vehicle: /vehicle|car/i, delivery: /deliver|location|address/i },
  economy: { pickup: /pick/i, returnDate: /return/i, vehicle: /^car|vehicle/i, useCase: /use/i },
  chauffeur: {
    pickup: /ride date/i, pickupTime: /pickup time/i, serviceType: /service/i, passengers: /passenger/i,
    vehicle: /vehicle/i, delivery: /pickup address/i, dropoff: /drop/i,
  },
  boats: { pickup: /charter date/i, duration: /duration/i, passengers: /party/i, vehicle: /^boat/i, delivery: /marina|departure/i },
  jets: { pickup: /flight date/i, passengers: /passenger/i, vehicle: /aircraft/i, delivery: /^from$/i, dropoff: /^to$/i },
  experiences: { pickup: /^date$/i, passengers: /group|party/i, vehicle: /occasion/i, include: /include/i, details: /details/i },
};
const EXOTIC_FALLBACK = {
  submitted: 0, firstName: 1, lastName: 2, phone: 3, email: 4, pickup: 5, returnDate: 6,
  vehicle: 7, delivery: 8, status: 9, followUp: 10, notes: 11,
};

export const colLetter = (i) => (i >= 26 ? colLetter(Math.floor(i / 26) - 1) : "") + String.fromCharCode(65 + (i % 26));

function mapColumns(brand, headers) {
  const cols = {};
  for (const [key, re] of Object.entries({ ...COMMON_COLS, ...BRAND_COLS[brand] })) {
    let i = headers.findIndex((h) => re.test(String(h || "").trim()));
    // Older sheets label the notes column loosely ("Notes / comments"); fall back to any "note".
    if (i < 0 && key === "notes") i = headers.findIndex((h) => /note/i.test(h || ""));
    cols[key] = i >= 0 ? i : brand === "exotics" ? EXOTIC_FALLBACK[key] ?? -1 : -1;
  }
  return cols;
}

// The first tab of a division's sheet: its title, column map and data rows (row 2 on).
export async function reservationSheet(brand) {
  const { id } = RES_SHEETS[brand];
  const tab = (await listTabs(id))[0].title;   // the forms write to the first tab
  const [head, rows] = await batchGet(id, [tabRange(tab, "A1:Z1"), tabRange(tab, "A2:Z")]);
  return { id, tab, cols: mapColumns(brand, head[0] || []), rows };
}

// Setup and QA submissions: first name "TEST" plus a test email or surname. They stay in
// the Exotic and Economy sheets (deleting rows there breaks the Zapier text alerts, which
// track rows by position) but never show in the portal or the morning digest.
export const isTestRow = (r) =>
  /^test$/i.test(String(r.firstName || "").trim()) &&
  (/@example\.com$/i.test(r.email || "") || /^test$|delete me|claude check/i.test(String(r.lastName || "").trim()));

// Every real reservation in a division as plain objects (sheet row number included),
// oldest first. Test rows are left out.
export async function readReservations(brand) {
  const sheet = await reservationSheet(brand);
  const list = sheet.rows
    .map((v, i) => {
      const r = { brand, row: i + 2 };
      for (const [key, col] of Object.entries(sheet.cols)) r[key] = col >= 0 ? String(v[col] ?? "").trim() : "";
      r.email = r.email.toLowerCase();
      return r;
    })
    .filter((r) => (r.firstName || r.lastName || r.email || r.phone) && !isTestRow(r));
  return { ...sheet, list };
}

// ── First-time layout for the Boats / Jets / Experiences sheets ──

const laidOut = new Set();

export async function ensureSheet(brand) {
  const cfg = RES_SHEETS[brand];
  if (!cfg.setup || laidOut.has(brand)) return;
  const tabs = await listTabs(cfg.id);
  const first = tabs[0];
  const [head] = await batchGet(cfg.id, [tabRange(first.title, "A1:A1")]);
  if (!head.length) {
    // The header row is what the portal and digest read, so it must land before the first
    // request does. Formatting and the Summary tab are extras: a failure there is logged only.
    await updateRange(cfg.id, tabRange(first.title, "A1"), [[...cfg.setup.headers, ...TEAM_COLS]]);
    try {
      await layOut(cfg, first, tabs);
    } catch (err) {
      console.error(`Sheet layout failed (${brand}):`, err);
    }
  }
  // New Google Sheets default to the creator's account time zone, which made the
  // "waiting over 1 hr" flag fire early. Timestamps are written in Eastern time, so the
  // sheet's NOW() must be too. Cheap and idempotent, so it runs once per server start.
  await batchUpdate(cfg.id, [{ updateSpreadsheetProperties: { properties: { timeZone: "America/New_York" }, fields: "timeZone" } }])
    .catch((err) => console.error(`Sheet time zone update failed (${brand}):`, err));
  laidOut.add(brand);
}

async function layOut(cfg, first, tabs) {
  const s = cfg.setup;
  const sheetId = first.sheetId;
  const width = s.headers.length + TEAM_COLS.length;
  const statusCol = s.headers.length;            // K on every new sheet
  const rows = { sheetId, startRowIndex: 1, endRowIndex: 2000 };
  const colRange = (c) => ({ ...rows, startColumnIndex: c, endColumnIndex: c + 1 });
  const rgb = (hex) => ({ red: parseInt(hex.slice(0, 2), 16) / 255, green: parseInt(hex.slice(2, 4), 16) / 255, blue: parseInt(hex.slice(4, 6), 16) / 255 });
  const numberFormat = (c, type, pattern) => ({
    repeatCell: { range: colRange(c), cell: { userEnteredFormat: { numberFormat: { type, pattern } } }, fields: "userEnteredFormat.numberFormat" },
  });

  const requests = [
    { updateSheetProperties: { properties: { sheetId, title: "Reservations", gridProperties: { frozenRowCount: 1 } }, fields: "title,gridProperties.frozenRowCount" } },
    {
      repeatCell: {
        range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: width },
        cell: { userEnteredFormat: { backgroundColor: rgb("0e0e10"), textFormat: { bold: true, foregroundColor: rgb("ffffff") } } },
        fields: "userEnteredFormat(backgroundColor,textFormat)",
      },
    },
    {
      repeatCell: {
        range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: statusCol, endColumnIndex: width },
        cell: { userEnteredFormat: { textFormat: { bold: true, foregroundColor: rgb("c8a020") } } },
        fields: "userEnteredFormat.textFormat",
      },
    },
    {
      setDataValidation: {
        range: colRange(statusCol),
        rule: { condition: { type: "ONE_OF_LIST", values: STATUSES.map((v) => ({ userEnteredValue: v })) }, showCustomUi: true, strict: false },
      },
    },
    numberFormat(0, "DATE_TIME", "mmm d, yyyy h:mm am/pm"),
    numberFormat(5, "DATE", "ddd, mmm d"),
    numberFormat(statusCol + 1, "DATE", "ddd, mmm d"),
    ...[...s.widths, 110, 120, 280].map((px, i) => ({
      updateDimensionProperties: {
        range: { sheetId, dimension: "COLUMNS", startIndex: i, endIndex: i + 1 }, properties: { pixelSize: px }, fields: "pixelSize",
      },
    })),
    {
      // Red row: still "New" an hour after it came in.
      addConditionalFormatRule: {
        index: 0,
        rule: {
          ranges: [{ ...rows, startColumnIndex: 0, endColumnIndex: width }],
          booleanRule: {
            condition: { type: "CUSTOM_FORMULA", values: [{ userEnteredValue: `=AND($${colLetter(statusCol)}2="New",$A2<>"",$A2<NOW()-1/24)` }] },
            format: { backgroundColor: rgb("f8d7d3") },
          },
        },
      },
    },
  ];
  if (!tabs.some((t) => t.title === "Summary")) requests.push({ addSheet: { properties: { title: "Summary", index: 1 } } });
  await batchUpdate(cfg.id, requests);

  // Live counts. Status is column K and the requested date column F on every new sheet.
  const R = (col) => `Reservations!${col}2:${col}`;
  const K = colLetter(statusCol);
  const [topLabel, topCol] = s.top;
  const grid = [
    [s.heading],
    ["Updates automatically from the Reservations tab"],
    [],
    ["OVERVIEW", "", "", topLabel],
    ["Total requests", `=COUNTA(${R("B")})`, "", `=IFERROR(QUERY(Reservations!${topCol}2:${topCol},"select ${topCol}, count(${topCol}) where ${topCol} is not null group by ${topCol} order by count(${topCol}) desc label count(${topCol}) ''",0),"None yet")`],
    ["Last 7 days", `=COUNTIF(${R("A")},">="&(NOW()-7))`],
    ["This month", `=COUNTIF(${R("A")},">="&(EOMONTH(TODAY(),-1)+1))`],
    [s.upcoming, `=COUNTIFS(${R("F")},">="&TODAY(),${R("F")},"<="&(TODAY()+7))`],
    ['Waiting over 1 hr (still "New")', `=COUNTIFS(${R(K)},"New",${R("A")},"<"&(NOW()-1/24))`],
    [],
    ["BY STATUS"],
    ...STATUSES.map((st) => [st, `=COUNTIF(${R(K)},"${st}")`]),
    ["No status yet", `=COUNTA(${R("B")})-COUNTA(${R(K)})`],
  ];
  await updateRange(cfg.id, tabRange("Summary", "A1"), grid);
  const summaryId = (await listTabs(cfg.id)).find((t) => t.title === "Summary")?.sheetId;
  if (summaryId == null) return;
  const bold = (r, c, extra = {}) => ({
    repeatCell: {
      range: { sheetId: summaryId, startRowIndex: r, endRowIndex: r + 1, startColumnIndex: c, endColumnIndex: c + 1 },
      cell: { userEnteredFormat: { textFormat: { bold: true, ...extra } } }, fields: "userEnteredFormat.textFormat",
    },
  });
  await batchUpdate(cfg.id, [
    bold(0, 0, { fontSize: 14 }), bold(3, 0, { foregroundColor: rgb("9a7810") }), bold(3, 3, { foregroundColor: rgb("9a7810") }),
    bold(10, 0, { foregroundColor: rgb("9a7810") }),
    { updateDimensionProperties: { range: { sheetId: summaryId, dimension: "COLUMNS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 260 }, fields: "pixelSize" } },
    { updateDimensionProperties: { range: { sheetId: summaryId, dimension: "COLUMNS", startIndex: 3, endIndex: 4 }, properties: { pixelSize: 220 }, fields: "pixelSize" } },
  ]);
}
