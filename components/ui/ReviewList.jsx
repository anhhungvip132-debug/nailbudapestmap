export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-gray-500 mt-4">
        Chưa có đánh giá nào được duyệt.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {reviews.map((r, i) => (
        <div
          key={i}
          className="border border-pink-100 bg-white p-4 rounded-xl"
        >
          <div className="flex justify-between mb-1">
            <strong>{r.name}</strong>
            <span className="text-yellow-500">
              {"★".repeat(r.rating)}
            </span>
          </div>
          <p className="text-gray-700">{r.comment}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(r.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
