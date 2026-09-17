/**
 * api-server.js — Server-only API helpers.
 * Import this ONLY in Server Components or route handlers.
 * Uses `headers()` from next/headers to forward the session cookie.
 */

import { headers } from "next/headers";

const BASE = process.env.API_URL || "http://localhost:5000";

async function serverRequest(path, options = {}) {
  const reqHeaders = await headers();
  const cookie = reqHeaders.get("cookie") || "";

  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      cookie,
      ...(options.headers || {}),
    },
    cache: "no-store",
    ...options,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  return { ok: res.ok, status: res.status, data };
}

// ── Auth (server) ────────────────────────────────────────────────────────────

export async function getSessionServer() {
  return serverRequest("/api/auth/get-session");
}

// ── Tickets (server) ─────────────────────────────────────────────────────────

export async function getTicketsServer() {
  return serverRequest("/api/tickets");
}

export async function getTicketServer(id) {
  return serverRequest(`/api/tickets/${id}`);
}

// ── Progress (server) ────────────────────────────────────────────────────────

export async function getProgressServer() {
  return serverRequest("/api/flags/progress");
}
