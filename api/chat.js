// POST /api/chat — Echelon Concierge chatbot backend (Vercel serverless function).
//
// The chat widget (chat-widget.js) sends the conversation so far as
// { messages: [{ role: "user" | "assistant", content: "..." }, ...], lang }.
// The reply is streamed back as plain text so it appears word by word.
//
// Requires the ANTHROPIC_API_KEY environment variable (Vercel project settings
// in production, .env.local for the local preview).

import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./_knowledge.js";

const MODEL = "claude-opus-5";
const MAX_MESSAGES = 20;        // only the most recent turns are sent to the model
const MAX_CHARS = 1500;         // per message, matches the widget's input limit
const RATE_LIMIT = 12;          // requests per IP per minute (best effort, per instance)

const PHONE_FALLBACK =
  "Sorry, I'm having trouble answering right now. Please call or text our team at 508-444-2276, any time.";

let client;
const recentRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const times = (recentRequests.get(ip) || []).filter((t) => now - t < 60_000);
  times.push(now);
  recentRequests.set(ip, times);
  if (recentRequests.size > 5000) recentRequests.clear();
  return times.length > RATE_LIMIT;
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 100_000) throw new Error("Body too large");
  }
  return JSON.parse(raw || "{}");
}

// Keeps only well-formed text turns, trims them, and makes sure the
// conversation starts and ends with a visitor message.
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

function sendText(res, status, text) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(text);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendText(res, 405, "Method not allowed");
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim();
  if (isRateLimited(ip)) {
    return sendText(res, 429, "You're sending messages a little quickly. Please wait a moment and try again.");
  }

  let messages;
  try {
    messages = cleanMessages((await readJson(req)).messages);
  } catch {
    return sendText(res, 400, "Invalid request");
  }
  if (!messages.length) return sendText(res, 400, "Invalid request");

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[chat] ANTHROPIC_API_KEY is not set");
    return sendText(res, 503, PHONE_FALLBACK);
  }
  client ??= new Anthropic();

  let wroteText = false;
  try {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      // Quick, conversational answers: keep thinking light.
      output_config: { effort: "low" },
      // If the model declines a request, Anthropic retries it on its recommended fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages,
    });

    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        if (!wroteText) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.setHeader("X-Accel-Buffering", "no");
          wroteText = true;
        }
        res.write(event.delta.text);
      }
    }

    const final = await stream.finalMessage();
    if (!wroteText) {
      if (final.stop_reason === "refusal") console.warn("[chat] refusal", final.stop_details);
      return sendText(res, 200, PHONE_FALLBACK);
    }
    res.end();
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      console.error("[chat] Anthropic rejected the API key — check ANTHROPIC_API_KEY");
    } else if (err instanceof Anthropic.RateLimitError) {
      console.error("[chat] Anthropic rate limit reached");
    } else if (err instanceof Anthropic.APIError) {
      console.error("[chat] Anthropic API error", err.status, err.message);
    } else {
      console.error("[chat] unexpected error", err);
    }
    if (wroteText) return res.end();
    return sendText(res, 502, PHONE_FALLBACK);
  }
}
