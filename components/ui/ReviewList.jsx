"use client";

import { useState } from "react";
import RatingStars from "./RatingStars";

export default function ReviewList() {
  const [reviews, setReviews] = useState([
    { name: "Ngọc", rating: 5, text: "Rất đẹp và chuyên nghiệp!" }
  ]);

  const [text, setText] = useState("");

  const submitReview = () => {
    if (!text.trim()) return;
    setReviews([...reviews, { name: "Ẩn danh", rating: 5, text }]);
    setText("");
  };

  return (
    <div className="card p-6 mt-8">
      <h2 className="heading text-left">Đánh giá</h2>

      {reviews.map((r, i) => (
        <div key={i} className="border-b py-3">
          <RatingStars rating={r.rating} />
          <p className="mt-1">{r.text}</p>
        </div>
      ))}

      <textarea
        className="w-full p-3 border rounded-xl mt-4"
        placeholder="Viết đánh giá..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submitReview}
        className="mt-3 bg-pink-600 text-white py-2 px-4 rounded-xl"
      >
        Gửi đánh giá
      </button>
    </div>
  );
}
