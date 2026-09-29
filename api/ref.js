// /api/ref — public side of the ambassador program (no sign-in).
//
//   GET  ?code=MARCUS           → { ok, name: "Marcus", perk } for an active ambassador, else 404
//   POST { code, page, visitor } → logs one link click on the CRM's Clicks tab
//
// brand-pages.js calls both when someone lands on an Exotics page with ?ref=CODE (the
// /r/<code> short link redirects there). It logs at most one click per code per visitor
// per day; "visitor" is a random id kept in that browser, not personal data.

import { activeAmbassador, appendRow, DEFAULT_PERK, firstName, nowEastern, readJson, sendJson } from "./_crm.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const code = new URL(req.url, "http://x").searchParams.get("code");
      const person = await activeAmbassador(code);
      if (!person) return sendJson(res, 404, { ok: false });
      return sendJson(res, 200, { ok: true, code: person.code, name: firstName(person.name), perk: person.perk || DEFAULT_PERK });
    }
    if (req.method === "POST") {
      const body = await readJson(req);
      const person = await activeAmbassador(body.code);
      if (!person) return sendJson(res, 404, { ok: false });
      const page = String(body.page || "").replace(/[^\w\-./]/g, "").slice(0, 80) || "/";
      const visitor = String(body.visitor || "").replace(/[^\w-]/g, "").slice(0, 40);
      await appendRow("Clicks", [nowEastern(), person.code, page, visitor]);
      return sendJson(res, 200, { ok: true });
    }
    return sendJson(res, 405, { error: "Method not allowed" });
  } catch (err) {
    console.error("Ref error:", err);
    return sendJson(res, 500, { ok: false });
  }
}
