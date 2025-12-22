"use client";

import { useState } from "react";

export default function ReviewForm({ salonId, onSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!comment.trim()) {
      setError("Vui lòng nhập nội dung đánh giá.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salonId,
          name: name || "Ẩn danh",
          rating,
          comment,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await res.json();

      // append review tạm thời (chờ duyệt)
      onSubmit?.(data);
      setComment("");
      setName("");
      setRating(5);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Không thể gửi đánh giá. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 bg-white border border-pink-100 rounded-2xl p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4 text-pink-600">
        Viết đánh giá của bạn
      </h2>

      {/* NAME */}
      <input
        type="text"
        placeholder="Tên của bạn (không bắt buộc)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-xl px-4 py-2 mb-3 text-sm"
      />

      {/* RATING */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm text-gray-600">Đánh giá:</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className={`text-lg ${
              rating >= n ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* COMMENT */}
      <textarea
        rows={4}
        placeholder="Chia sẻ trải nghiệm của bạn..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 text-sm mb-3"
      />

      {/* ERROR */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* SUCCESS */}
      {success && (
        <p className="text-green-600 text-sm mb-2">
          ✔️ Đã gửi đánh giá. Chờ quản trị viên duyệt.
        </p>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-xl bg-pink-600 text-white font-medium hover:bg-pink-700 disabled:opacity-50"
      >
        {loading ? "Đang gửi..." : "Gửi đánh giá"}
      </button>
    </form>
  );
}
