"use client";

import Image from "next/image";

export default function FeaturedSalons({ salons = [], onSelectSalon }) {
  const list = Array.isArray(salons)
    ? salons.filter((s) => s.featured)
    : [];

  if (list.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mb-12">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💖</span>
        <h2 className="text-2xl md:text-3xl font-bold">
          Featured Nail Salons
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((salon) => (
          <article
            key={salon.id}
            onClick={() => onSelectSalon?.(salon)}
            className="bg-white rounded-2xl shadow-sm border border-pink-50 overflow-hidden cursor-pointer hover:shadow-md transition"
          >
            <div className="relative h-52">
              <Image
                src={salon.image || "/images/salon-default.jpg"}
                alt={salon.name}
                fill
                className="object-cover"
              />

              {salon.premium && (
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                  PREMIUM
                </span>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1">
                {salon.name}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {salon.address}
              </p>

              <p className="text-sm text-gray-600 mb-3">
                <span className="font-semibold">Services:</span>{" "}
                {salon.services?.join(", ")}
              </p>

              <span className="inline-flex items-center rounded-full bg-pink-50 text-pink-600 text-xs font-semibold px-3 py-1">
                Recommended
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
