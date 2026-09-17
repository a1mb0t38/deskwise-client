"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, getTickets } from "@/lib/api";
import PageShell from "@/components/PageShell";
import TicketTable from "@/components/TicketTable";

export default function DashboardPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { ok: sessionOk, data: sessionData } = await getSession();
      if (!sessionOk || !sessionData?.user) {
        router.push("/login");
        return;
      }

      const { ok, data } = await getTickets();
      if (ok) {
        setTickets(data);
      } else {
        setError("Failed to load tickets.");
      }
      setLoading(false);
    }
    load();
  }, [router]);

  return (
    <PageShell
      title="My Tickets"
      actions={
        <Link href="/tickets/new" id="new-ticket-btn" className="btn btn-primary btn-sm">
          + New ticket
        </Link>
      }
    >
      {loading ? (
        <div className="empty-state">Loading tickets…</div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <TicketTable tickets={tickets} />
      )}
    </PageShell>
  );
}
