"use client";
import { useEffect, useState } from "react";
import salons from "@/data/salons.json";

export default function NearestSalons() {
  const [list, setList] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      const sorted = salons
        .map((s) => ({
          ...s,
          distance: calcDistance(latitude, longitude, s.lat, s.lng)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setList(sorted);
    });
  }, []);

  return (
    <div className="section card p-6">
      <h2 className="heading">Salon gần bạn</h2>

      <div className="space-y-4">
        {list.map((s) => (
          <div key={s.id} className="card p-4 shadow-sm">
            <h3 className="font-bold text-lg text-pink-600">{s.name}</h3>
            <p className="text-gray-600">{s.address}</p>

            <p className="text-pink-600 font-semibold mt-2">
              📍 {s.distance.toFixed(1)} km
            </p>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
              target="_blank"
              className="block mt-3 bg-pink-500 text-white text-center py-2 rounded-xl"
            >
              Chỉ đường →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
