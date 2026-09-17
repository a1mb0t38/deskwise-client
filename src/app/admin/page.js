"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/api";
import PageShell from "@/components/PageShell";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then(({ ok, data }) => {
      if (!ok || !data?.user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <PageShell>
        <div className="empty-state">Loading…</div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Admin panel">
      <div style={{ maxWidth: "640px" }}>
        <div className="alert alert-info" style={{ marginBottom: "24px" }}>
          This area is for IT agents and administrators. Use the links below to
          manage support tickets.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          <div className="card">
            <h2
              style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}
            >
              All tickets
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "16px",
              }}
            >
              View and manage every support ticket in the system.
            </p>
            <Link href="/dashboard" className="btn btn-secondary btn-sm">
              Go to ticket list
            </Link>
          </div>

          <div className="card">
            <h2
              style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}
            >
              Open a ticket
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "16px",
              }}
            >
              Submit a new support request on behalf of a user.
            </p>
            <Link href="/tickets/new" className="btn btn-secondary btn-sm">
              New ticket
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
