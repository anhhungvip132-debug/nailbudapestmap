"use client";

import { useEffect, useState } from "react";
import salons from "@/lib/salons.json";
import Link from "next/link";

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function NearbySalons() {
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const sortedSalons = salons
          .map((s) => ({
            ...s,
            distance: getDistance(latitude, longitude, s.lat, s.lng),
          }))
          .sort((a, b) => a.distance - b.distance);

        setSorted(sortedSalons.slice(0, 5)); // Gần nhất 5 tiệm
      },
      () => {
        // Nếu user từ chối location → hiển thị 5 salon mặc định
        setSorted(salons.slice(0, 5));
      }
    );
  }, []);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Nearby Nail Salons</h2>

      <ul className="space-y-4">
        {sorted.map((salon) => (
          <li
            key={salon.id}
            className="p-4 bg-white shadow rounded-xl hover:shadow-lg transition"
          >
            <Link href={`/salon/${salon.id}`} className="block">
              <p className="font-semibold text-lg">{salon.name}</p>
              <p className="text-gray-600 text-sm">{salon.address}</p>

              {"distance" in salon && (
                <p className="text-blue-600 mt-1">
                  📍 {salon.distance.toFixed(1)} km away
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
