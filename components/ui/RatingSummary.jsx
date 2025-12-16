"use client";

import RatingStars from "@/components/ui/RatingStars";

export default function RatingSummary({ reviews = [] }) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Chưa có đánh giá nào.
      </p>
    );
  }

  const avg =
    reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
    reviews.length;

  return (
    <div className="flex items-center gap-3 mb-4">
      <RatingStars rating={avg} />
      <span className="text-sm text-gray-600">
        {avg.toFixed(1)} / 5 ({reviews.length} đánh giá)
      </span>
    </div>
  );
}
