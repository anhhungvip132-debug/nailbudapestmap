"use client";

import Link from "next/link";

export default function NearestSalons({ salons }) {
  if (!Array.isArray(salons)) return null;
  if (salons.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {salons.map((s) => (
        <div
          key={s.id}
          className="p-4 rounded-xl shadow bg-white hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg">{s.name}</h3>
          <p className="text-gray-600">{s.address}</p>
          <p className="text-pink-600 font-semibold mt-2">
            {s.distance?.toFixed(1)} km
          </p>
          <Link
            href={`/salon/${s.id}`}
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Xem chi tiết
          </Link>
        </div>
      ))}
    </div>
  );
}
