"use client";

import Image from "next/image";

export default function FeaturedAds({ salons = [] }) {
  if (!salons || salons.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Không có salon nổi bật.
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center">🌟 Tiệm nổi bật</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {salons.map((s) => (
          <a
            key={s.id}
            href={`/salon/${s.id}`}
            className="bg-white shadow rounded-xl overflow-hidden hover:scale-[1.02] transition"
          >
            <Image
              src={s.image}
              alt={s.name}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg">{s.name}</h3>
              <p className="text-gray-600 text-sm">{s.address}</p>

              <p className="mt-1 text-yellow-500">⭐ {s.rating}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
