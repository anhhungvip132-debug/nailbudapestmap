"use client";
import { useEffect, useState } from "react";
import salons from "@/data/salons.json";

export default function NearestSalons() {
  const [userPos, setUserPos] = useState(null);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserPos(loc);

        const withDistance = salons.map((salon) => {
          const dist = Math.sqrt(
            Math.pow(salon.lat - loc.lat, 2) +
            Math.pow(salon.lng - loc.lng, 2)
          );
          return { ...salon, distance: dist };
        });

        setSorted(withDistance.sort((a, b) => a.distance - b.distance));
      },
      () => console.warn("User location blocked")
    );
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Nearest Nail Salons</h2>

      {!userPos ? (
        <p className="text-gray-500">Waiting for location permission…</p>
      ) : (
        <ul className="space-y-3">
          {sorted.slice(0, 5).map((s) => (
            <li key={s.id} className="border p-3 rounded-xl bg-gray-50">
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm">Distance: {(s.distance * 100).toFixed(2)} km</div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                target="_blank"
                className="text-pink-600 text-sm underline"
              >
                Get Directions →
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
