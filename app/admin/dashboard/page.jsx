export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState } from "react";

// ADMIN SERVER URL
const ADMIN_API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:3001";

export default function AdminDashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // LOAD REVIEW PENDING
  useEffect(() => {
    fetch(`${ADMIN_API_BASE}/reviews?status=pending`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((json) => {
        setReviews(json.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải review.");
        setLoading(false);
      });
  }, []);

  async function updateStatus(id, status) {
    try {
      await fetch(`${ADMIN_API_BASE}/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      // remove khỏi list sau khi duyệt
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Không thể cập nhật review");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Review chờ duyệt
      </h1>

      {loading && <p>Đang tải...</p>}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {!loading && reviews.length === 0 && (
        <p className="text-gray-500">
          Không có review chờ duyệt.
        </p>
      )}

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <strong>Salon ID: {r.salonId}</strong>
              <span>{r.rating} ⭐</span>
            </div>

            <p className="text-gray-700 mb-3">
              {r.comment}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  updateStatus(r.id, "approved")
                }
                className="px-4 py-2 rounded bg-green-600 text-white"
              >
                Duyệt
              </button>

              <button
                onClick={() =>
                  updateStatus(r.id, "rejected")
                }
                className="px-4 py-2 rounded bg-red-500 text-white"
              >
                Từ chối
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
