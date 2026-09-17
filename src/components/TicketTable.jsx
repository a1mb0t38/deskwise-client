import Link from "next/link";
import TicketStatusBadge from "@/components/TicketStatusBadge";

/**
 * TicketTable — renders a list of tickets as a table.
 * Props:
 *   tickets: array
 */
export default function TicketTable({ tickets }) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-state">
          No tickets found. Open a new ticket to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t._id}>
              <td>
                <Link
                  href={`/tickets/${t._id}`}
                  style={{ color: "var(--accent)", fontWeight: 500 }}
                >
                  {t.title}
                </Link>
              </td>
              <td>
                <TicketStatusBadge type="status" value={t.status} />
              </td>
              <td>
                <TicketStatusBadge type="priority" value={t.priority} />
              </td>
              <td style={{ color: "var(--text-secondary)" }}>
                {new Date(t.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
