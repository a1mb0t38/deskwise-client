"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, getProgress } from "@/lib/api";
import PageShell from "@/components/PageShell";

const OWASP_CATEGORIES = [
  { id: "A01", name: "Broken Access Control" },
  { id: "A02", name: "Cryptographic Failures" },
  { id: "A03", name: "Injection" },
  { id: "A04", name: "Insecure Design" },
  { id: "A05", name: "Security Misconfiguration" },
  { id: "A06", name: "Vulnerable and Outdated Components" },
  { id: "A07", name: "Identification and Authentication Failures" },
  { id: "A08", name: "Software and Data Integrity Failures" },
  { id: "A09", name: "Security Logging and Monitoring Failures" },
  { id: "A10", name: "Server-Side Request Forgery" },
];

export default function ProgressPage() {
  const router = useRouter();
  const [solved, setSolved] = useState([]); // array of solved category IDs or names
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { ok: sessOk, data: sessData } = await getSession();
      if (!sessOk || !sessData?.user) {
        router.push("/login");
        return;
      }

      const { ok, status, data } = await getProgress();
      if (ok) {
        setSolved(data?.solved || []);
      } else if (status === 404) {
        // Backend route not yet implemented — render empty progress
        setSolved([]);
      } else {
        setError("Could not load progress.");
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const solvedCount = OWASP_CATEGORIES.filter((c) =>
    solved.includes(c.id) || solved.includes(c.name)
  ).length;

  if (loading) {
    return (
      <PageShell>
        <div className="empty-state">Loading progress…</div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Your progress">
      <div style={{ maxWidth: "640px" }}>
        {error && (
          <div className="alert alert-error" style={{ marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {/* Score summary */}
        <div className="card" style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--accent)",
              minWidth: "60px",
              textAlign: "center",
            }}
          >
            {solvedCount}/{OWASP_CATEGORIES.length}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "2px" }}>
              Categories solved
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Find all 10 OWASP Top 10:2025 vulnerabilities to complete the exercise.
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: "6px",
            background: "var(--border)",
            borderRadius: "3px",
            marginBottom: "24px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(solvedCount / OWASP_CATEGORIES.length) * 100}%`,
              background: "var(--success)",
              borderRadius: "3px",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        {/* Checklist */}
        <ul className="owasp-list">
          {OWASP_CATEGORIES.map((cat) => {
            const isSolved = solved.includes(cat.id) || solved.includes(cat.name);
            return (
              <li key={cat.id} className={`owasp-item ${isSolved ? "solved" : "unsolved"}`}>
                <div className={`check-icon ${isSolved ? "solved" : "unsolved"}`}>
                  {isSolved ? "✓" : ""}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginRight: "8px",
                    }}
                  >
                    {cat.id}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: isSolved ? "var(--text-primary)" : "var(--text-secondary)",
                    }}
                  >
                    {cat.name}
                  </span>
                </div>
                {isSolved && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "12px",
                      color: "var(--success)",
                      fontWeight: 500,
                    }}
                  >
                    Solved
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <p style={{ marginTop: "20px", fontSize: "13px", color: "var(--text-muted)" }}>
          Submit a flag on the <a href="/flags">flags page</a> to mark a category as solved.
        </p>
      </div>
    </PageShell>
  );
}
