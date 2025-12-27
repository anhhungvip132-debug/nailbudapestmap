"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

/* ================= FORMAT DATE ================= */
function formatDate(ts) {
  if (!ts?.seconds) return "";
  return new Date(ts.seconds * 1000).toLocaleString("vi-VN", {
    hour12: false,
  });
}

/* ================= STATUS BADGE ================= */
function BookingStatusBadge({ status }) {
  const map = {
    pending: ["PENDING", "#FFF3CD", "#856404"],
    approved: ["APPROVED", "#D4EDDA", "#155724"],
    rejected: ["REJECTED", "#F8D7DA", "#721C24"],
  };

  const [label, bg, color] = map[status] || map.pending;

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 700,
        background: bg,
        color,
      }}
    >
      {label}
    </span>
  );
}

export default function AdminBookingDashboard() {
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function mapTabToApi(tab) {
    if (tab === "confirmed") return "approved";
    if (tab === "cancelled") return "rejected";
    return "pending";
  }

  async function load() {
    try {
      setLoading(true);
      setError("");

      const status = mapTabToApi(tab);
      const res = await adminFetch(
        `/api/admin/bookings?status=${status}`
      );

      if (!res.ok) throw new Error("Load failed");

      const json = await res.json();
      setItems(json.data || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load bookings");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function update(id, status) {
    if (!confirm(`Confirm ${status.toUpperCase()}?`)) return;

    await adminFetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    load();
  }

  useEffect(() => {
    load();
  }, [tab]);

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>🗓 Admin – Booking Dashboard</h1>

      <div style={{ marginBottom: 16 }}>
        {["pending", "confirmed", "cancelled"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              marginRight: 8,
              padding: "8px 14px",
              background: tab === t ? "#e91e63" : "#eee",
              color: tab === t ? "#fff" : "#333",
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && items.length === 0 && <p>No bookings</p>}

      {items.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>#{b.id.slice(0, 6)}</strong>
            <BookingStatusBadge status={b.status} />
          </div>

          <p><b>Salon:</b> {b.salonId}</p>
          <p><b>Name:</b> {b.name}</p>
          <p><b>Date:</b> {b.date} — {b.time}</p>

          {b.status === "pending" && (
            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => update(b.id, "approved")}
                style={{ marginRight: 8, background: "#28a745", color: "#fff", padding: "6px 12px", borderRadius: 6 }}
              >
                Approve
              </button>
              <button
                onClick={() => update(b.id, "rejected")}
                style={{ background: "#dc3545", color: "#fff", padding: "6px 12px", borderRadius: 6 }}
              >
                Reject
              </button>
            </div>
          )}

          {b.reviewedAt && (
            <p style={{ fontSize: 12, opacity: 0.6 }}>
              Reviewed at {formatDate(b.reviewedAt)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
