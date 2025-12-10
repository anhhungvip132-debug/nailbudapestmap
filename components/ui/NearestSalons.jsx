"use client";
import { useState, useEffect } from "react";
import salons from "@/data/salons.json";
import SalonCard from "./SalonCard";

export default function NearestSalons() {
  const [nearest, setNearest] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      const withDistance = salons.map((s) => {
        const dist = calculateDistance(latitude, longitude, s.lat, s.lng);
        return { ...s, distance: dist };
      });

      withDistance.sort((a, b) => a.distance - b.distance);

      setNearest(withDistance.slice(0, 3));
    });
  }, []);

  return (
    <div className="section">
      <h2 className="heading">Salon gần bạn</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {nearest.map((salon) => (
          <div key={salon.id} className="rounded-3xl p-5 shadow-md bg-white">
            <h3 className="font-bold text-lg text-pink-600">{salon.name}</h3>
            <p className="text-gray-500">{salon.address}</p>

            <p className="mt-2 text-pink-600 font-semibold">
              📍 {salon.distance.toFixed(1)} km
            </p>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${salon.lat},${salon.lng}`}
              target="_blank"
              className="block bg-pink-500 text-white mt-4 py-2 rounded-xl text-center"
            >
              Chỉ đường →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
