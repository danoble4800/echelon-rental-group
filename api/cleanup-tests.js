// TEMPORARY (Oct 21, 2026): one-time removal of setup/QA test data. Deleted in the next
// commit once it has run.
//
//   GET  ?token=…   → what would change (dry run)
//   POST ?token=…   → does it
//
// • Chauffeur, Boats, Jets, Experiences: test rows deleted (no Zapier watches these).
// • Exotics, Economy: test rows only set to "Not a Fit". Rows there are never deleted,
//   because the Zapier text alerts track new rows by position.
// • CRM: the test ambassador application deleted, and the blank "Sheet1" tab removed if
//   it is empty.

import { createHash } from "node:crypto";
import { batchGet, batchUpdate, listTabs, tabRange, updateRange } from "./_google.js";
import { crmSheetId, readCrm, sendJson } from "./_crm.js";
import { colLetter, isTestRow, reservationSheet, RES_SHEETS } from "./_reservations.js";

const TOKEN_SHA256 = "12a47e30681cd875afa92e979a0b413c0ca259c392563f1e3f34d22f33749cea";
const KEEP_ROWS = new Set(["exotics", "economy"]);

const deleteRows = (sheetId, rows) =>
  [...rows].sort((a, b) => b - a).map((row) => ({
    deleteDimension: { range: { sheetId, dimension: "ROWS", startIndex: row - 1, endIndex: row } },
  }));

async function plan() {
  const out = { reservations: {}, application: null, blankTab: false };
  for (const brand of Object.keys(RES_SHEETS)) {
    const { id, tab, cols, rows } = await reservationSheet(brand);
    const tests = rows
      .map((v, i) => ({ row: i + 2, firstName: v[cols.firstName], lastName: v[cols.lastName], email: v[cols.email], status: v[cols.status] || "" }))
      .filter(isTestRow);
    out.reservations[brand] = { id, tab, statusCol: cols.status, action: KEEP_ROWS.has(brand) ? "mark Not a Fit" : "delete", tests };
  }
  const { Applications } = await readCrm(["Applications"]);
  const app = Applications.find((a) => a.email === "test.applicant@example.com" && /TEST APPLICATION/.test(a.pitch));
  if (app) out.application = { row: app.row, name: `${app.firstName} ${app.lastName}` };
  const tabs = await listTabs(crmSheetId());
  const sheet1 = tabs.find((t) => t.title === "Sheet1");
  if (sheet1 && tabs.length > 1) {
    const [cells] = await batchGet(crmSheetId(), [tabRange("Sheet1", "A1:Z50")]);
    out.blankTab = cells.length === 0 ? sheet1.sheetId : false;
  }
  return out;
}

async function apply(p) {
  const done = [];
  for (const [brand, r] of Object.entries(p.reservations)) {
    if (!r.tests.length) continue;
    if (r.action === "delete") {
      const sheetId = (await listTabs(r.id)).find((t) => t.title === r.tab).sheetId;
      await batchUpdate(r.id, deleteRows(sheetId, r.tests.map((t) => t.row)));
      done.push(`${brand}: deleted ${r.tests.length}`);
    } else {
      const open = r.tests.filter((t) => !/not a fit/i.test(t.status));
      for (const t of open) await updateRange(r.id, tabRange(r.tab, `${colLetter(r.statusCol)}${t.row}`), [["Not a Fit"]]);
      done.push(`${brand}: marked ${open.length} Not a Fit (${r.tests.length - open.length} already were)`);
    }
  }
  const crm = crmSheetId();
  const tabs = await listTabs(crm);
  if (p.application) {
    const sheetId = tabs.find((t) => t.title === "Applications").sheetId;
    await batchUpdate(crm, deleteRows(sheetId, [p.application.row]));
    done.push(`CRM: deleted application ${p.application.name}`);
  }
  if (p.blankTab !== false) {
    await batchUpdate(crm, [{ deleteSheet: { sheetId: p.blankTab } }]);
    done.push("CRM: removed blank Sheet1 tab");
  }
  return done;
}

export default async function handler(req, res) {
  const token = new URL(req.url, "http://x").searchParams.get("token") || "";
  if (createHash("sha256").update(token).digest("hex") !== TOKEN_SHA256) return sendJson(res, 404, { error: "Not found" });
  try {
    const p = await plan();
    if (req.method === "GET") return sendJson(res, 200, p);
    if (req.method === "POST") return sendJson(res, 200, { done: await apply(p), after: await plan() });
    return sendJson(res, 405, { error: "Method not allowed" });
  } catch (err) {
    console.error("Cleanup error:", err);
    return sendJson(res, 500, { error: String(err.message || err) });
  }
}
