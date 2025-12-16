"use client";

import Image from "next/image";

export default function FeaturedSalons({ salons = [], onSelectSalon }) {
  const list = Array.isArray(salons)
    ? salons.filter((s) => s.featured)
    : [];

  // ✅ EMPTY STATE
  if (list.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          💖 Salon nổi bật
        </h2>
        <div className="rounded-2xl border border-dashed border-pink-200 bg-pink-50 p-8 text-center text-sm text-pink-600">
          Chưa có salon nổi bật được đề xuất
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        💖 Salon nổi bật
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((salon) => (
          <article
            key={salon.id}
            onClick={() => onSelectSalon?.(salon)}
            className="cursor-pointer bg-white rounded-2xl border border-pink-50 shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={salon.image || "/images/salon-placeholder.jpg"}
                alt={salon.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-1">{salon.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {salon.address}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Dịch vụ:</strong>{" "}
                {salon.services?.join(", ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
