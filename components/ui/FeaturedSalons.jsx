export default function FeaturedSalons({ salons = [] }) {
  if (!Array.isArray(salons) || salons.length === 0) {
    return <p className="text-gray-500">Không có salon nổi bật.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {salons.map((salon) => (
        <div
          key={salon.id}
          className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg">{salon.name}</h3>
          {salon.address && (
            <p className="text-sm text-gray-500 mt-1">{salon.address}</p>
          )}
          {typeof salon.rating === "number" && (
            <p className="text-sm mt-2">⭐ {salon.rating.toFixed(1)}</p>
          )}
        </div>
      ))}
    </div>
  )
}