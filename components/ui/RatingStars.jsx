"use client";

export default function RatingStars({ rating = 5, size = 20 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{
          fontSize: size,
          color: i <= rating ? "#facc15" : "#e5e7eb"
        }}
      >
        ★
      </span>
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}
