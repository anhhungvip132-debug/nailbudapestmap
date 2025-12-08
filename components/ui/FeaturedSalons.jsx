"use client";

import Link from "next/link";

export default function FeaturedSalons({ salons }) {
  return (
    <section id="featured" className="max-w-7xl mx-auto mt-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Featured Nail Salons in Budapest
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {salons.map((salon) => (
          <div
            key={salon.id}
            className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-2xl transition"
          >
            <img src={salon.image} className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-xl">{salon.name}</h3>
              <p className="text-gray-500">{salon.address}</p>
              <p className="text-yellow-500 text-lg mt-2">
                ⭐ {salon.rating}
              </p>

              <Link
                href={`/salon/${salon.id}`}
                className="text-pink-600 underline mt-3 inline-block"
              >
                Xem chi tiết →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
