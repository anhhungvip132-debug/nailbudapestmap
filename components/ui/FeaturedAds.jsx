"use client";

export default function FeaturedAds({ salons = [] }) {
  return (
    <div className="section card p-6">
      <h2 className="heading">Dịch vụ nổi bật</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {salons.slice(0, 4).map((s) => (
          <div key={s.id} className="card p-4">
            <h3 className="font-bold">{s.name}</h3>
            <p className="text-sm text-gray-600">{s.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
