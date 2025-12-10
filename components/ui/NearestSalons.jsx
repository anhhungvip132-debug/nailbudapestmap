"use client";
import { useEffect, useState } from "react";
import salons from "@/data/salons.json";

export default function NearestSalons() {
  const [nearest, setNearest] = useState([]);

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      const sorted = salons
        .map((salon) => ({
          ...salon,
          distance: getDistance(latitude, longitude, salon.lat, salon.lng),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setNearest(sorted);
    });
  }, []);

  return (
    <section className="section">
      <h2 className="text-3xl font-bold text-center mb-6">📍 Salon Gần Bạn Nhất</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nearest.map((salon) => (
          <div
            key={salon.id}
            className="rounded-xl shadow-lg p-4 bg-white border border-gray-200"
          >
            <img
              src={`/images/salon${salon.id}.jpg`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-3">{salon.name}</h3>
            <p className="text-gray-600">{salon.address}</p>

            <p className="mt-2 text-sm font-medium text-gray-800">
              📏 {salon.distance?.toFixed(1)} km
            </p>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${salon.lat},${salon.lng}`}
              target="_blank"
              className="mt-3 inline-block bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600"
            >
              🧭 Chỉ đường
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
