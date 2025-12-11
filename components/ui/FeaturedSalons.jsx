"use client";

import salons from "@/data/salons.json";

export default function FeaturedSalons() {
  const featured = salons.filter((s) => s.featured);

  return (
    <section className="mt-12">
      <h2 className="text-center text-2xl font-bold">💖 Salon Nổi Bật</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {featured.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={s.image}
              alt={s.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-3 font-bold">{s.name}</h3>
            <p>{s.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
