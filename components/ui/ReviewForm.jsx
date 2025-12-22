"use client";

import { useState } from "react";

export default function ReviewForm({ salonId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonId,
          rating,
          comment,
        }),
      });

      if (!res.ok) throw new Error("Submit failed");

      setSuccess(true);
      setComment("");
      setRating(5);
    } catch (err) {
      console.error(err);
      setError("Không thể gửi review. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 border rounded-xl p-5 bg-white"
    >
      <h3 className="text-lg font-semibold mb-4">
        Gửi đánh giá của bạn
      </h3>

      <label className="block mb-2 font-medium">
        Đánh giá
      </label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded px-3 py-2 mb-4 w-full"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} ⭐
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">
        Nhận xét
      </label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows={4}
        className="border rounded px-3 py-2 w-full mb-4"
        placeholder="Chia sẻ trải nghiệm của bạn..."
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && (
        <p className="text-green-600 mb-3">
          ✅ Review đã gửi và đang chờ duyệt
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-600 text-white px-5 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Đang gửi..." : "Gửi review"}
      </button>
    </form>
  );
}
