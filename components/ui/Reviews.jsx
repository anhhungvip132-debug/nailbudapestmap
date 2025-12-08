export default function Reviews({ reviews }) {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6">Đánh giá</h2>

      {reviews.map((r, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow mb-4">
          <p className="font-semibold">{r.name}</p>
          <p className="text-yellow-500">⭐ {r.rating}</p>
          <p className="text-gray-600 mt-2">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
