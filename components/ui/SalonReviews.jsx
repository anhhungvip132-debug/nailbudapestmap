"use client";

export default function SalonReviews({ reviews }) {
  if (!reviews.length)
    return <p className="text-gray-500">Chưa có đánh giá nào.</p>;

  return (
    <div className="space-y-6">
      {reviews.map((r, i) => (
        <div key={i} className="bg-white shadow p-5 rounded-xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{r.name}</h3>
            <p className="text-yellow-500">{ "★".repeat(r.rating) }</p>
          </div>
          <p className="text-gray-600 mt-2">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
