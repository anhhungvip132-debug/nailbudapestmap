"use client";

import salons from "@/data/salons.json";

export default function NearestSalons() {
  return (
    <section className="mt-12 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📍 Salon Gần Bạn Nhất
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {salons.slice(3, 6).map((salon) => (
          <div
            key={salon.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
          >
            <h3 className="font-bold text-xl">{salon.name}</h3>
            <p className="text-gray-600">{salon.address}</p>

            <p className="mt-2 text-sm text-gray-700">
              <span className="font-semibold">Cách bạn ~</span> {salon.distance} km
            </p>

            <div className="flex gap-3 mt-3">
              <button className="bg-pink-100 text-pink-600 px-4 py-2 rounded-lg font-semibold">
                Chỉ đường
              </button>

              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
