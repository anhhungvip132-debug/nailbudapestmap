"use client";

import { useState } from "react";

/* ===== STATUS BADGE ===== */
function StatusBadge({ status }) {
  const map = {
    pending: { label: "PENDING", color: "#856404", bg: "#FFF3CD" },
    approved: { label: "APPROVED", color: "#155724", bg: "#D4EDDA" },
    rejected: { label: "REJECTED", color: "#721C24", bg: "#F8D7DA" },
  };

  const cfg = map[status] || map.pending;

  return (
    <span
      style={{
        padding: "4px 10px",
        fontSize: 12,
        borderRadius: 20,
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
      }}
    >
      {cfg.label}
    </span>
  );
}

/* ===== PAGE ===== */
export default function BookingStatusPage() {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkStatus(e) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");
    setItems([]);

    try {
      const res = await fetch(
        `/api/bookings?email=${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );

      const json = await res.json();
      setItems(Array.isArray(json?.data) ? json.data : []);
    } catch {
      setError("Failed to load booking status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: "50px auto", padding: 24 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>
        🔍 Check Your Booking Status
      </h1>

      {/* FORM */}
      <form onSubmit={checkStatus} style={{ marginBottom: 24 }}>
        <input
          type="email"
          placeholder="Enter your booking email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            marginBottom: 12,
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 10,
            border: "none",
            background: "#e91e63",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* LIST */}
      {items.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <strong>Booking #{b.id.slice(0, 6)}</strong>
            <StatusBadge status={b.status} />
          </div>

          <p><b>Salon:</b> {b.salonId}</p>
          <p><b>Service:</b> {b.service || "-"}</p>
          <p>
            <b>Date:</b> {b.date} — <b>Time:</b> {b.time}
          </p>
        </div>
      ))}

      {!loading && email && items.length === 0 && (
        <p>No bookings found for this email.</p>
      )}
    </div>
  );
}
