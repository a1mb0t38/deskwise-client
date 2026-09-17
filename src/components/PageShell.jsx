import Navbar from "@/components/Navbar";

/**
 * PageShell — wraps every authenticated page with Navbar + content area.
 * Props:
 *   title: string — page heading
 *   children: ReactNode
 *   actions: ReactNode — optional right-side action buttons in the header row
 */
export default function PageShell({ title, children, actions }) {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        {title && (
          <div className="section-header" style={{ marginBottom: "20px" }}>
            <h1 className="page-title" style={{ marginBottom: 0 }}>
              {title}
            </h1>
            {actions && <div>{actions}</div>}
          </div>
        )}
        {children}
      </main>
    </>
  );
}
