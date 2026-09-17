"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeProfile } from "@/lib/api";

const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Legal",
  "Operations",
  "Other",
];

export default function ProfileCompletePage() {
  const router = useRouter();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { ok, data } = await completeProfile({ department });

    if (ok) {
      router.push("/dashboard");
    } else {
      setError(data?.error || "Could not save your profile. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card" style={{ maxWidth: "440px" }}>
        <div className="auth-logo">Welcome to DeskWise</div>
        <p className="auth-tagline">
          Tell us which department you&apos;re in to finish setting up your account.
        </p>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <form id="profile-complete-form" className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              id="department"
              name="department"
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select your department…</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <button
            id="profile-complete-submit"
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ marginTop: "4px" }}
          >
            {loading ? <span className="spinner" /> : "Save and continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
