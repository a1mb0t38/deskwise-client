import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Rules — DeskWise",
  description: "Responsible use guidelines for the DeskWise security exercise.",
};

export default function RulesPage() {
  return (
    <>
      <Navbar />
      <main className="page-shell" style={{ maxWidth: "680px" }}>
        <h1 className="page-title">Rules & responsible use</h1>

        <div className="card" style={{ lineHeight: 1.8, fontSize: "14px", color: "var(--text-secondary)" }}>
          <section style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "10px",
              }}
            >
              What this is
            </h2>
            <p>
              DeskWise is a <strong>deliberately vulnerable application</strong> designed for
              educational purposes. It is used to demonstrate and practise identifying the{" "}
              <strong>OWASP Top 10:2025</strong> vulnerability categories in a safe, controlled
              environment.
            </p>
          </section>

          <section style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "10px",
              }}
            >
              Ground rules
            </h2>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <strong>Practise safely.</strong> Only attack this application in your own local
                instance or on a lab environment you have explicit permission to use.
              </li>
              <li>
                <strong>No real targets.</strong> Skills learned here must never be used against
                systems you do not own or have written authorisation to test.
              </li>
              <li>
                <strong>Don&apos;t spoil it.</strong> If you&apos;re in a group exercise, avoid sharing flag
                values or detailed exploitation steps publicly.
              </li>
              <li>
                <strong>Keep it clean.</strong> Do not attempt denial-of-service attacks, data
                destruction, or anything that could disrupt other participants.
              </li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "10px",
              }}
            >
              Getting started
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Use DeskWise as a normal IT helpdesk user. Create tickets, explore the API, inspect
              network traffic, and look for behaviours that shouldn&apos;t be there.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link href="/flags" className="btn btn-primary btn-sm">
                Submit a flag
              </Link>
              <Link href="/progress" className="btn btn-secondary btn-sm">
                Track progress
              </Link>
              <Link href="/dashboard" className="btn btn-secondary btn-sm">
                Go to dashboard
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
