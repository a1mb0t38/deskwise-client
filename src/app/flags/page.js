"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, submitFlag } from "@/lib/api";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";

export default function FlagsPage() {
  const router = useRouter();
  const [flag, setFlag] = useState("");
  const [result, setResult] = useState(null); // { success, message, category }
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    getSession().then(({ ok, data }) => {
      if (!ok || !data?.user) router.push("/login");
      else setAuthLoading(false);
    });
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!flag.trim()) return;
    setLoading(true);
    setResult(null);

    const { ok, status, data } = await submitFlag(flag.trim());

    if (status === 404 || status === 500) {
      setResult({ success: false, message: "Flag submission is not available yet." });
    } else if (ok) {
      setResult({
        success: true,
        message: data?.message || "Correct! Flag accepted.",
        category: data?.category || null,
      });
      setFlag("");
    } else {
      setResult({
        success: false,
        message: data?.message || data?.error || "Incorrect flag. Try again.",
      });
    }
    setLoading(false);
  }

  if (authLoading) {
    return (
      <PageShell>
        <div className="empty-state">Loading…</div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Submit a flag">
      <div style={{ maxWidth: "540px" }}>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
          Found a vulnerability? Paste the flag you captured below. Flags are in{" "}
          <code
            style={{
              background: "#f1f5f9",
              padding: "1px 6px",
              borderRadius: "4px",
              fontSize: "13px",
              fontFamily: "monospace",
            }}
          >
            DW{"{...}"}
          </code>{" "}
          format.
        </p>

        {result && (
          <div
            className={`alert ${result.success ? "alert-success" : "alert-error"}`}
            style={{ marginBottom: "20px" }}
          >
            <strong>{result.success ? "✓ Correct!" : "✗ Incorrect"}</strong>{" "}
            {result.message}
            {result.success && result.category && (
              <span
                style={{
                  display: "block",
                  marginTop: "4px",
                  fontSize: "13px",
                  opacity: 0.85,
                }}
              >
                Category: {result.category}
              </span>
            )}
          </div>
        )}

        <div className="card">
          <form
            id="flag-submit-form"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div className="form-group">
              <label htmlFor="flag-input" className="form-label">
                Flag
              </label>
              <input
                id="flag-input"
                type="text"
                className="form-input"
                placeholder='DW{your_flag_here}'
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                required
                spellCheck={false}
                autoComplete="off"
                style={{ fontFamily: "monospace" }}
              />
            </div>

            <button
              id="flag-submit-btn"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : "Submit flag"}
            </button>
          </form>
        </div>

        <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--text-muted)" }}>
          Each flag corresponds to one of the OWASP Top 10:2025 categories.{" "}
          <a href="/progress">View your progress →</a>
        </p>
      </div>
    </PageShell>
  );
}
