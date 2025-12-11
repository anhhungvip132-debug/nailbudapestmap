"use client";
import { useEffect, useState } from "react";
import salons from "@/data/salons.json";
import SalonCard from "./SalonCard";

export default function NearestSalons() {
  const [userPos, setUserPos] = useState(null);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(loc);

        const withDist = salons.map((s) => {
          const dx = s.lat - loc.lat;
          const dy = s.lng - loc.lng;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { ...s, distance: dist };
        });

        setSorted(withDist.sort((a, b) => a.distance - b.distance));
      },
      () => console.warn("Location blocked")
    );
  }, []);

  return (
    <section>
      <h2 className="text-xl font-bold mb-3">Nearest Salons</h2>

      {userPos ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sorted.slice(0, 4).map((s) => (
            <div key={s.id} className="rounded-xl border p-3 shadow">
              <SalonCard salon={s} />
              <p className="text-sm mt-2">
                Distance: {(s.distance * 100).toFixed(1)} km
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                target="_blank"
                className="text-pink-600 underline text-sm"
              >
                Get Directions →
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Waiting for location…</p>
      )}
    </section>
  );
}
