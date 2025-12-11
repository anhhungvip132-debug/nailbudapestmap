"use client";
import { useEffect, useState } from "react";
import salons from "@/data/salons.json";
import Image from "next/image";

export default function NearestSalons() {
  const [list, setList] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      const withDistance = salons.map((s) => {
        const dist = Math.sqrt(
          Math.pow(latitude - s.lat, 2) + Math.pow(longitude - s.lng, 2)
        );

        return { ...s, distance: dist };
      });

      withDistance.sort((a, b) => a.distance - b.distance);
      setList(withDistance.slice(0, 3));
    });
  }, []);

  return (
    <section className="my-12">
      <h2 className="text-center text-3xl font-bold mb-8">
        📍 Salon Gần Bạn Nhất
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map((salon) => (
          <div
            key={salon.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={salon.image}
                alt={salon.name}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-semibold text-lg mt-4">{salon.name}</h3>
            <p className="text-gray-600 text-sm">{salon.address}</p>

            <p className="mt-2 text-pink-600 font-semibold">
              📏 {(salon.distance * 10).toFixed(2)} km
            </p>

            <a
              target="_blank"
              href={`https://www.google.com/maps/dir/?api=1&destination=${salon.lat},${salon.lng}`}
              className="mt-3 inline-block bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              🚗 Chỉ đường
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
