"use client";
import { useEffect, useState } from "react";
import salons from "@/data/salons.json";
import Image from "next/image";

export default function NearestSalons() {
  const [nearSalons, setNearSalons] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      const sorted = [...salons].map((s) => {
        const d = Math.sqrt(
          Math.pow(s.lat - latitude, 2) + Math.pow(s.lng - longitude, 2)
        );
        return { ...s, distance: d };
      });

      setNearSalons(sorted.sort((a, b) => a.distance - b.distance).slice(0, 3));
    });
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-center text-3xl font-bold mb-6">
        📍 Salon Gần Bạn Nhất
      </h2>

      <div className="grid md:grid-cols-3 gap-6 px-4">
        {nearSalons.map((salon) => (
          <div
            key={salon.id}
            className="p-4 shadow-md bg-white rounded-xl hover:shadow-xl"
          >
            <div className="relative w-full h-56 rounded-lg overflow-hidden">
              <Image
                src={`/images/${salon.image}`}
                alt={salon.name}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-semibold text-xl mt-3">{salon.name}</h3>
            <p className="text-gray-500">{salon.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
