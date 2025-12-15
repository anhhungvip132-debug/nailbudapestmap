"use client";

import { useState } from "react";

export default function ReviewForm({ salonId, onSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !comment) return;

    onSubmit?.({
      salonId,
      name,
      rating: Number(rating),
      comment,
      date: new Date().toISOString(),
    });

    setName("");
    setRating(5);
    setComment("");
  }

  return (
    <div className="bg-white border border-pink-100 rounded-2xl p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">
        Viết đánh giá của bạn
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} sao
            </option>
          ))}
        </select>

        <textarea
          placeholder="Nhận xét của bạn"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm resize-none"
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition"
        >
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
}
