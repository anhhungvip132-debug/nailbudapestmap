"use client";

import { useEffect, useState } from "react";

export default function AdminReviewDashboard() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadReviews() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/admin/reviews?status=${status}`,
        { cache: "no-store" }
      );
      const json = await res.json();
      setReviews(json.data || []);
    } catch (e) {
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  async function updateReview(id, newStatus) {
    if (!confirm(`Confirm ${newStatus.toUpperCase()} this review?`)) return;

    try {
      await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      loadReviews(); // refresh
    } catch {
      alert("Update failed");
    }
  }

  useEffect(() => {
    loadReviews();
  }, [status]);

  return (
    <div style={{ padding: 24 }}>
      <h1>🛠 Admin – Review Dashboard</h1>

      {/* FILTER */}
      <div style={{ margin: "16px 0" }}>
        {["pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            style={{
              marginRight: 8,
              padding: "6px 12px",
              background: status === s ? "#e91e63" : "#eee",
              color: status === s ? "#fff" : "#000",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* LIST */}
      {reviews.map((r) => (
        <div
          key={r.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <p>
            <b>Salon:</b> {r.salonId}
          </p>
          <p>
            <b>Rating:</b> ⭐ {r.rating}
          </p>
          <p>{r.comment}</p>
          <p>
            <small>Status: {r.status}</small>
          </p>

          {status === "pending" && (
            <div style={{ marginTop: 8 }}>
              <button
                onClick={() => updateReview(r.id, "approved")}
                style={{
                  marginRight: 8,
                  background: "green",
                  color: "#fff",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Approve
              </button>
              <button
                onClick={() => updateReview(r.id, "rejected")}
                style={{
                  background: "crimson",
                  color: "#fff",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}

      {!loading && reviews.length === 0 && <p>No reviews</p>}
    </div>
  );
}
