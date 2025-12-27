"use client";

import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import ReviewForm from "./ReviewForm";

export default function SalonReviews({ salonId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reviews?salonId=${salonId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [salonId]);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-2">Reviews</h2>

      {avgRating && (
        <div className="flex items-center gap-2 mb-4">
          <RatingStars value={avgRating} />
          <span className="text-sm text-gray-600">
            {avgRating} / 5 ({reviews.length})
          </span>
        </div>
      )}

      {loading && <p>Loading reviews…</p>}

      {!loading && reviews.length === 0 && (
        <p className="text-gray-500">Chưa có review nào.</p>
      )}

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-1">
              <strong>{r.name || "Anonymous"}</strong>
              <RatingStars value={r.rating} />
            </div>
            <p className="text-sm text-gray-700">{r.comment}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <ReviewForm salonId={salonId} />
      </div>
    </section>
  );
}
