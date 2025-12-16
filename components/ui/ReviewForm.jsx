"use client";

import { useState } from "react";
import RatingStars from "@/components/ui/RatingStars";

export default function ReviewForm({ salonId, onSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !comment) return;

    setLoading(true);

    const review = {
      id: Date.now(),
      salonId,
      name,
      rating,
      comment,
      date: new Date().toISOString(),
      status: "pending", // ⛔ CHỜ DUYỆT
    };

    onSubmit(review);

    setName("");
    setRating(5);
    setComment("");
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-pink-100 rounded-2xl p-5 mt-8"
    >
      <h3 className="font-semibold mb-3">Viết đánh giá</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên của bạn"
        className="w-full border rounded-xl px-4 py-2 mb-3"
        required
      />

      <RatingStars rating={rating} onChange={setRating} />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Nội dung đánh giá…"
        className="w-full border rounded-xl px-4 py-2 mt-3"
        rows={3}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-pink-500 text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition"
      >
        Gửi đánh giá
      </button>

      <p className="text-xs text-gray-400 mt-2">
        Đánh giá sẽ hiển thị sau khi được duyệt
      </p>
    </form>
  );
}
