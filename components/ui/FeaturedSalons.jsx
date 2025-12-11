"use client";

import salons from "@/data/salons.json";

export default function FeaturedSalons() {
  return (
    <section className="mt-12 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        💅 Featured Nail Salons
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {salons.slice(0, 3).map((salon) => (
          <div
            key={salon.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={salon.image}
              alt={salon.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h3 className="font-bold text-xl">{salon.name}</h3>
              <p className="text-gray-600">{salon.address}</p>

              <p className="mt-2 text-sm">
                <span className="font-semibold">Dịch vụ:</span> {salon.services.join(", ")}
              </p>

              <div className="flex gap-3 mt-3">
                <span className="text-sm bg-pink-100 text-pink-600 px-3 py-1 rounded-lg">
                  District {salon.district}
                </span>

                {salon.featured && (
                  <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg flex items-center gap-1">
                    ⭐ Đề xuất
                  </span>
                )}
              </div>

              <div className="mt-4 text-right">
                <a href="#" className="text-pink-500 font-semibold hover:underline">
                  Xem chi tiết →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
