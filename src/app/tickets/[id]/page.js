"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getSession, getTicket, updateTicket } from "@/lib/api";
import PageShell from "@/components/PageShell";
import TicketStatusBadge from "@/components/TicketStatusBadge";

export default function TicketDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [denied, setDenied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Staff edit state
  const [editMode, setEditMode] = useState(false);
  const [edits, setEdits] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const { ok: sessOk, data: sessData } = await getSession();
      if (!sessOk || !sessData?.user) {
        router.push("/login");
        return;
      }
      setSession(sessData.user);

      const { ok, status, data } = await getTicket(id);

      if (!ok) {
        if (status === 403 || status === 404) {
          setDenied(true);
        }
        setLoading(false);
        return;
      }

      setTicket(data);
      setEdits({
        status: data.status,
        priority: data.priority,
        assignedTo: data.assignedTo || "",
      });
      setLoading(false);
    }
    load();
  }, [id, router]);

  // Determine if the current user is staff based on what the backend returns.
  // We use the presence of all tickets in API scope as an indirect signal —
  // but actually the cleanest approach is to let the server tell us.
  // For now, we allow edit UI if the backend didn't 403 AND the session exists.
  // The PATCH /api/tickets/:id will itself 403 for non-staff, so there's no security risk.
  const isStaff = session && ticket && ticket.createdBy !== session.id;

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    const { ok, data } = await updateTicket(id, edits);
    if (ok) {
      setTicket((prev) => ({ ...prev, ...edits }));
      setSaveSuccess(true);
      setEditMode(false);
    } else {
      setSaveError(data?.error || "Failed to save changes.");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <PageShell>
        <div className="empty-state">Loading ticket…</div>
      </PageShell>
    );
  }

  if (denied || !ticket) {
    return (
      <PageShell title="Access denied">
        <div
          className="card"
          style={{ maxWidth: "480px", textAlign: "center", padding: "48px 32px" }}
        >
          <p
            style={{
              fontSize: "32px",
              marginBottom: "12px",
              color: "var(--text-muted)",
            }}
          >
            🔒
          </p>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "var(--text-primary)",
            }}
          >
            Ticket not found or access denied
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px" }}>
            This ticket may not exist, or you may not have permission to view it.
          </p>
          <Link href="/dashboard" className="btn btn-secondary btn-sm">
            Back to dashboard
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={ticket.title}
      actions={
        isStaff && !editMode ? (
          <button
            id="edit-ticket-btn"
            className="btn btn-secondary btn-sm"
            onClick={() => setEditMode(true)}
          >
            Edit ticket
          </button>
        ) : null
      }
    >
      <div style={{ maxWidth: "720px" }}>
        <Link
          href="/dashboard"
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "20px",
            textDecoration: "none",
          }}
        >
          ← Back to dashboard
        </Link>

        {saveSuccess && (
          <div className="alert alert-success" style={{ marginBottom: "16px" }}>
            Ticket updated successfully.
          </div>
        )}
        {saveError && (
          <div className="alert alert-error" style={{ marginBottom: "16px" }}>
            {saveError}
          </div>
        )}

        <div className="card" style={{ marginBottom: "20px" }}>
          {/* Meta grid */}
          {editMode ? (
            <form
              id="edit-ticket-form"
              onSubmit={handleSave}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div className="detail-grid">
                <div className="form-group">
                  <label htmlFor="edit-status" className="form-label">Status</label>
                  <select
                    id="edit-status"
                    className="form-select"
                    value={edits.status}
                    onChange={(e) => setEdits((p) => ({ ...p, status: e.target.value }))}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-priority" className="form-label">Priority</label>
                  <select
                    id="edit-priority"
                    className="form-select"
                    value={edits.priority}
                    onChange={(e) => setEdits((p) => ({ ...p, priority: e.target.value }))}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-assigned" className="form-label">
                  Assigned to (user ID)
                </label>
                <input
                  id="edit-assigned"
                  type="text"
                  className="form-input"
                  placeholder="Leave empty for unassigned"
                  value={edits.assignedTo}
                  onChange={(e) => setEdits((p) => ({ ...p, assignedTo: e.target.value }))}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  id="save-ticket-btn"
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={saving}
                >
                  {saving ? <span className="spinner" /> : "Save changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setEditMode(false);
                    setSaveError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="detail-grid">
              <div className="detail-field">
                <label>Status</label>
                <p>
                  <TicketStatusBadge type="status" value={ticket.status} />
                </p>
              </div>
              <div className="detail-field">
                <label>Priority</label>
                <p>
                  <TicketStatusBadge type="priority" value={ticket.priority} />
                </p>
              </div>
              <div className="detail-field">
                <label>Opened</label>
                <p>
                  {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="detail-field">
                <label>Assigned to</label>
                <p style={{ color: ticket.assignedTo ? "var(--text-primary)" : "var(--text-muted)" }}>
                  {ticket.assignedTo || "Unassigned"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="card">
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}
          >
            Description
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-primary)",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
            }}
          >
            {ticket.description}
          </p>
        </div>
      </div>
    </PageShell>
  );
}
