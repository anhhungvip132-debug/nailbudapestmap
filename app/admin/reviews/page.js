"use client";

import { useEffect, useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";

/* ================= FORMAT DATE ================= */
function formatDate(ts) {
  if (!ts?.seconds) return "";
  return new Date(ts.seconds * 1000).toLocaleString("vi-VN", {
    hour12: false,
  });
}

/* ================= STATUS BADGE ================= */
function StatusBadge({ status }) {
  const map = {
    pending: { bg: "#fff3cd", color: "#856404", label: "PENDING" },
    approved: { bg: "#d4edda", color: "#155724", label: "APPROVED" },
    rejected: { bg: "#f8d7da", color: "#721c24", label: "REJECTED" },
  };

  const cfg = map[status] || map.pending;

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
        border: "1px solid rgba(0,0,0,.05)",
      }}
    >
      {cfg.label}
    </span>
  );
}

/* ================= PAGE ================= */
export default function AdminReviewDashboard() {
  const router = useRouter();
  const timerRef = useRef(null);

  const [tab, setTab] = useState("pending");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  /* ================= LOAD ================= */
  async function load({ silent = false } = {}) {
    try {
      if (!silent) setLoading(true);
      setError("");

      const user = auth.currentUser;
      if (!user) {
        setItems([]);
        setError("Unauthorized");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch(
        `/api/admin/reviews?status=${tab}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const json = await res.json();

      if (!json?.success) {
        setItems([]);
        setError(json?.error || "Unauthorized");
      } else {
        setItems(Array.isArray(json.data) ? json.data : []);
      }
    } catch (err) {
      console.error("LOAD REVIEWS ERROR:", err);
      setItems([]);
      setError("Failed to load reviews");
    } finally {
      if (!silent) setLoading(false);
    }
  }

  /* ================= UPDATE ================= */
  async function update(id, status) {
    if (!confirm(`Confirm ${status.toUpperCase()} this review?`)) return;

    try {
      setUpdatingId(id);

      const user = auth.currentUser;
      if (!user) {
        alert("Unauthorized");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const json = await res.json();

      if (!json?.success) {
        alert(json?.error || "Update failed");
      } else {
        await load({ silent: true });
      }
    } catch (err) {
      console.error("UPDATE REVIEW ERROR:", err);
      alert("Update failed");
    } finally {
      setUpdatingId(null);
    }
  }

  /* ================= LOGOUT ================= */
  async function handleLogout() {
    try {
      await signOut(auth);
    } finally {
      router.replace("/admin/login");
    }
  }

  /* ================= EFFECTS ================= */
  useEffect(() => {
    load();

    // 🔁 Auto refresh mỗi 10 giây
    timerRef.current = setInterval(() => {
      load({ silent: true });
    }, 10000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  /* ================= RENDER ================= */
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0 }}>⭐ Admin – Reviews</h1>

        <button
          onClick={handleLogout}
          style={{
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>

      {/* TABS */}
      <div style={{ marginBottom: 16 }}>
        {["pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setTab(s)}
            style={{
              marginRight: 8,
              padding: "8px 14px",
              borderRadius: 8,
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              background: tab === s ? "#e91e63" : "#eee",
              color: tab === s ? "#fff" : "#333",
            }}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p>Loading…</p>}
      {error && !loading && <p style={{ color: "red" }}>{error}</p>}

      {!loading &&
        items.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              marginBottom: 14,
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
              <strong>Review #{r.id.slice(0, 6)}</strong>
              <StatusBadge status={r.status} />
            </div>

            <p style={{ margin: "4px 0" }}>
              ⭐ <b>{r.rating}</b> — Salon <b>{r.salonId}</b>
            </p>

            <p style={{ margin: "6px 0" }}>{r.comment}</p>

            <p style={{ fontSize: 12, color: "#666" }}>
              Created: {formatDate(r.createdAt)}
            </p>

            {tab === "pending" && (
              <div style={{ marginTop: 10 }}>
                <button
                  onClick={() => update(r.id, "approved")}
                  disabled={updatingId === r.id}
                  style={{
                    marginRight: 8,
                    background: "#28a745",
                    color: "#fff",
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    opacity: updatingId === r.id ? 0.6 : 1,
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => update(r.id, "rejected")}
                  disabled={updatingId === r.id}
                  style={{
                    background: "#dc3545",
                    color: "#fff",
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    opacity: updatingId === r.id ? 0.6 : 1,
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}

      {!loading && items.length === 0 && !error && <p>No reviews</p>}
    </div>
  );
}
