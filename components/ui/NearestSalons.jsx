"use client";

import { useEffect, useState } from "react";
import salons from "@/data/salons.json";

export default function NearestSalons() {
  const [nearest, setNearest] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;

        const list = salons
          .map((s) => ({
            ...s,
            distance: Math.sqrt(
              (s.lat - latitude) ** 2 + (s.lng - longitude) ** 2
            ),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3);

        setNearest(list);
      });
    }
  }, []);

  return (
    <section className="mt-12">
      <h2 className="text-center text-2xl font-bold">📍 Salon Gần Bạn Nhất</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {nearest.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-xl shadow">
            <img src={s.image} className="w-full h-48 object-cover rounded-lg" />

            <h3 className="font-bold mt-3">{s.name}</h3>
            <p>{s.address}</p>

            <p className="text-pink-600 font-semibold">
              Cách bạn khoảng: {s.distance.toFixed(2)} km
            </p>

            <a
              target="_blank"
              href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
              className="block mt-3 text-center bg-pink-500 text-white p-2 rounded-lg"
            >
              Chỉ đường
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
