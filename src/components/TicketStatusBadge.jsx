/**
 * TicketStatusBadge — renders a colour-coded pill for ticket status or priority.
 * Props:
 *   type: "status" | "priority"
 *   value: string
 */
export default function TicketStatusBadge({ type, value }) {
  if (!value) return null;

  const label =
    type === "status"
      ? value.replace("_", " ")
      : value;

  const style = {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    background: `var(--${type}-${value}-bg)`,
    color: `var(--${type}-${value}-text)`,
  };

  return <span style={style}>{label}</span>;
}
