"use client";

import { useState } from "react";

export default function ReviewForm({ salonId, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Vui lòng nhập nội dung đánh giá.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonId: String(salonId),
          rating,
          comment,
        }),
      });

      if (!res.ok) throw new Error("submit_failed");

      const saved = await res.json();

      if (onSubmit) onSubmit(saved);

      setRating(5);
      setComment("");
    } catch (err) {
      setError("Không thể gửi đánh giá. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-pink-100 rounded-xl p-4 mt-4 shadow-sm"
    >
      <h3 className="font-semibold mb-2">Viết đánh giá</h3>

      {/* Rating */}
      <label className="block mb-2 text-sm font-medium">
        Chọn số sao:
      </label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded-lg px-3 py-2 mb-3 w-full"
        disabled={loading}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} sao
          </option>
        ))}
      </select>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Viết cảm nhận của bạn..."
        className="border rounded-lg px-3 py-2 w-full h-24 mb-3"
        disabled={loading}
      />

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-500 hover:bg-pink-600 disabled:opacity-60 text-white px-4 py-2 rounded-lg font-semibold"
      >
        {loading ? "Đang gửi..." : "Gửi đánh giá"}
      </button>
    </form>
  );
}
