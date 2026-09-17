/**
 * api.js — Client-safe API helpers.
 * All calls use credentials: "include" so the browser sends the Better Auth
 * session cookie automatically. Never import server-only modules here.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // Return { ok, status, data } so callers can handle errors uniformly
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

// ── Auth ────────────────────────────────────────────────────────────────────

export async function login(email, password) {
  return request("/api/auth/sign-in/email", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signup(name, email, password) {
  return request("/api/auth/sign-up/email", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function logout() {
  return request("/api/auth/sign-out", { method: "POST" });
}

export async function getSession() {
  return request("/api/auth/get-session");
}

// ── Profile ─────────────────────────────────────────────────────────────────

export async function completeProfile({ department }) {
  return request("/api/profile/complete", {
    method: "POST",
    body: JSON.stringify({ department }),
  });
}

// ── Tickets ─────────────────────────────────────────────────────────────────

export async function getTickets() {
  return request("/api/tickets");
}

export async function getTicket(id) {
  return request(`/api/tickets/${id}`);
}

export async function createTicket({ title, description, priority }) {
  return request("/api/tickets", {
    method: "POST",
    body: JSON.stringify({ title, description, priority }),
  });
}

export async function updateTicket(id, updates) {
  return request(`/api/tickets/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export async function deleteTicket(id) {
  return request(`/api/tickets/${id}`, { method: "DELETE" });
}

// ── Flags / Progress ─────────────────────────────────────────────────────────

export async function submitFlag(flag) {
  return request("/api/flags/submit", {
    method: "POST",
    body: JSON.stringify({ flag }),
  });
}

export async function getProgress() {
  return request("/api/flags/progress");
}
