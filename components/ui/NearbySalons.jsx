"use client";

import { useEffect, useState } from "react";
import salons from "@/lib/salons.json";

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function NearbySalons() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const loc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setUserLocation(loc);

      // Tính khoảng cách đến từng salon
      const sorted = salons
        .map((s) => ({
          ...s,
          distance: getDistance(loc.lat, loc.lng, s.lat, s.lng),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // 5 salon gần nhất

      setNearby(sorted);
    });
  }, []);

  if (!userLocation) return <p>Đang lấy vị trí của bạn…</p>;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Tiệm nail gần bạn nhất 💅</h2>
      {nearby.map((s) => (
        <div key={s.id} className="p-4 bg-white shadow rounded-lg mb-2">
          <h3 className="font-bold">{s.name}</h3>
          <p>{s.address}</p>
          <p>Khoảng cách: {s.distance.toFixed(2)} km</p>
        </div>
      ))}
    </div>
  );
}