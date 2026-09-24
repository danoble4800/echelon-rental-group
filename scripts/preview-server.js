#!/usr/bin/env node
/*
 * Local preview of the site, including the chatbot.
 *
 *   npm run preview        then open http://localhost:3000
 *
 * Serves the static pages the same way Vercel does ("/" -> exotics.html) and
 * runs api/chat.js for /api/chat. Reads ANTHROPIC_API_KEY from .env.local.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PORT = Number(process.env.PORT) || 3000;

// Load .env.local (KEY=value lines) without overriding real env vars.
const envFile = path.join(ROOT, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

const { default: chatHandler } = await import("../api/chat.js");

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif",
  ".mp4": "video/mp4", ".mov": "video/quicktime", ".webm": "video/webm", ".ico": "image/x-icon",
};

function serveStatic(req, res) {
  let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  if (pathname === "/") pathname = "/exotics.html";
  const file = path.join(ROOT, path.normalize(pathname));
  if (!file.startsWith(ROOT) || /(^|[\\/])\.|node_modules/.test(path.relative(ROOT, file))) {
    res.writeHead(404).end("Not found");
    return;
  }
  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) return res.writeHead(404).end("Not found");
    const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
    const range = req.headers.range && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (range) {
      // Videos need range requests to play in Safari.
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Number(range[2]) : stat.size - 1;
      res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${end}/${stat.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { "Content-Type": type, "Content-Length": stat.size, "Accept-Ranges": "bytes" });
    fs.createReadStream(file).pipe(res);
  });
}

http
  .createServer((req, res) => {
    if (new URL(req.url, "http://localhost").pathname === "/api/chat") {
      chatHandler(req, res).catch((err) => {
        console.error(err);
        if (!res.headersSent) res.writeHead(500);
        res.end();
      });
      return;
    }
    serveStatic(req, res);
  })
  .listen(PORT, () => {
    console.log(`Echelon preview running at http://localhost:${PORT}`);
    console.log(process.env.ANTHROPIC_API_KEY
      ? "Chatbot: API key found"
      : "Chatbot: no API key yet. Add ANTHROPIC_API_KEY to .env.local and restart.");
  });
