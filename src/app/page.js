import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "DeskWise — IT Helpdesk",
  description:
    "DeskWise is your internal IT support portal. Submit and track helpdesk tickets easily.",
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            background: "var(--bg-header)",
            color: "var(--text-on-dark)",
            padding: "72px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#64748b",
                marginBottom: "12px",
              }}
            >
              Internal Tool — IT Support
            </p>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "16px",
                color: "#f8fafc",
              }}
            >
              DeskWise IT Helpdesk
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#94a3b8",
                marginBottom: "32px",
                lineHeight: 1.7,
              }}
            >
              Submit support requests, track their status, and get help from the
              IT team — all in one place.
            </p>
            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
            >
              <Link href="/login" className="btn btn-primary">
                Sign in to your account
              </Link>
              <Link href="/signup" className="btn btn-secondary"
                style={{ color: "#e2e8f0", borderColor: "#475569", background: "transparent" }}
              >
                Create account
              </Link>
            </div>
          </div>
        </section>

        {/* Feature blurbs */}
        <section style={{ padding: "56px 24px", maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                icon: "📋",
                title: "Submit Tickets",
                body: "Open a support request with a title, description, and priority level. We'll route it to the right team.",
              },
              {
                icon: "🔍",
                title: "Track Status",
                body: "Monitor the status of your open and resolved tickets from your personal dashboard.",
              },
              {
                icon: "👥",
                title: "Team Collaboration",
                body: "IT agents can view, assign, and update tickets across all departments.",
              },
            ].map((f) => (
              <div key={f.title} className="card">
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>{f.icon}</div>
                <h2
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "var(--text-primary)",
                  }}
                >
                  {f.title}
                </h2>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTF section */}
        <section
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--bg-surface)",
            padding: "48px 24px",
          }}
        >
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: "10px",
                color: "var(--text-primary)",
              }}
            >
              About this exercise
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              DeskWise is a deliberately vulnerable application for learning the{" "}
              <strong>OWASP Top 10:2025</strong>. Use normal helpdesk features,
              explore the API, and capture flags hidden across the ten vulnerability
              categories.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link href="/flags" className="btn btn-primary btn-sm">
                Submit a flag
              </Link>
              <Link href="/progress" className="btn btn-secondary btn-sm">
                View progress
              </Link>
              <Link href="/rules" className="btn btn-secondary btn-sm">
                Rules
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "20px 24px",
            textAlign: "center",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          DeskWise IT Helpdesk — Internal use only
        </footer>
      </main>
    </>
  );
}
