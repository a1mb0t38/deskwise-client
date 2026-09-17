"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createTicket } from "@/lib/api";
import PageShell from "@/components/PageShell";

export default function NewTicketPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { ok, data } = await createTicket(form);

    if (ok) {
      router.push("/dashboard");
    } else {
      setError(data?.error || "Failed to create ticket. Please try again.");
      setLoading(false);
    }
  }

  return (
    <PageShell title="Open a new ticket">
      <div style={{ maxWidth: "600px" }}>
        {error && (
          <div className="alert alert-error" style={{ marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <div className="card">
          <form
            id="new-ticket-form"
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="ticket-title" className="form-label">
                Title <span style={{ color: "var(--danger)" }}>*</span>
              </label>
              <input
                id="ticket-title"
                name="title"
                type="text"
                className="form-input"
                placeholder="Brief summary of the issue"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ticket-description" className="form-label">
                Description <span style={{ color: "var(--danger)" }}>*</span>
              </label>
              <textarea
                id="ticket-description"
                name="description"
                className="form-textarea"
                placeholder="Describe the issue in detail…"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ticket-priority" className="form-label">
                Priority
              </label>
              <select
                id="ticket-priority"
                name="priority"
                className="form-select"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
              <button
                id="submit-ticket-btn"
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : "Submit ticket"}
              </button>
              <Link href="/dashboard" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
