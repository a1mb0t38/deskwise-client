"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getSession, logout } from "@/lib/api";

export default function Navbar() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getSession().then(({ ok, data }) => {
      if (ok && data?.user) setSession(data.user);
      setLoading(false);
    });
  }, [pathname]);

  async function handleLogout() {
    await logout();
    setSession(null);
    router.push("/login");
  }

  const isAuth =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/profile/complete";

  if (isAuth) return null;

  return (
    <nav
      style={{
        background: "var(--bg-header)",
        borderBottom: "1px solid #334155",
        padding: "0 24px",
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Brand */}
      <Link
        href="/"
        style={{
          color: "var(--text-on-dark)",
          fontWeight: 700,
          fontSize: "16px",
          letterSpacing: "-0.01em",
          textDecoration: "none",
        }}
      >
        DeskWise
        <span
          style={{
            marginLeft: "8px",
            fontSize: "11px",
            fontWeight: 400,
            color: "#94a3b8",
            letterSpacing: 0,
          }}
        >
          IT Helpdesk
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {!loading && session ? (
          <>
            <NavLink href="/dashboard" current={pathname}>
              Dashboard
            </NavLink>
            <NavLink href="/flags" current={pathname}>
              Flags
            </NavLink>
            <NavLink href="/progress" current={pathname}>
              Progress
            </NavLink>

            <div
              style={{
                height: "20px",
                width: "1px",
                background: "#334155",
                margin: "0 8px",
              }}
            />

            <span
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                maxWidth: "180px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {session.email}
            </span>

            <button
              onClick={handleLogout}
              className="btn btn-sm"
              style={{
                marginLeft: "8px",
                background: "transparent",
                color: "#cbd5e1",
                border: "1px solid #475569",
                borderRadius: "var(--radius)",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Sign out
            </button>
          </>
        ) : !loading ? (
          <>
            <NavLink href="/login" current={pathname}>
              Sign in
            </NavLink>
            <Link
              href="/signup"
              className="btn btn-primary btn-sm"
              style={{ marginLeft: "4px" }}
            >
              Sign up
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}

function NavLink({ href, current, children }) {
  const active = current === href;
  return (
    <Link
      href={href}
      style={{
        padding: "6px 12px",
        borderRadius: "var(--radius)",
        fontSize: "14px",
        color: active ? "#f8fafc" : "#94a3b8",
        background: active ? "#334155" : "transparent",
        fontWeight: active ? 500 : 400,
        textDecoration: "none",
        transition: "color 0.1s, background 0.1s",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = "#f8fafc";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = "#94a3b8";
      }}
    >
      {children}
    </Link>
  );
}
