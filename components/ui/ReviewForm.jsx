"use client";

import { useState } from "react";

export default function ReviewForm({ salonId, onSuccess }) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ salonId, author, rating, comment }),
    });

    setAuthor("");
    setRating(5);
    setComment("");
    setLoading(false);

    onSuccess && onSuccess();
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        className="w-full border rounded-xl px-4 py-2"
        placeholder="Tên của bạn"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <select
        className="w-full border rounded-xl px-4 py-2"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} sao
          </option>
        ))}
      </select>

      <textarea
        className="w-full border rounded-xl px-4 py-2"
        placeholder="Nhận xét"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600"
      >
        Gửi đánh giá
      </button>
    </form>
  );
}
