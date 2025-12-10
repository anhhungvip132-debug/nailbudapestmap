"use client";

export default function RatingStars({ rating }) {
  return (
    <div className="flex text-yellow-400 text-lg">
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </div>
  );
}
