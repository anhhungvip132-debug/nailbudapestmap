"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function distanceKm(aLat, aLng, bLat, bLng) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const aa =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) *
      Math.cos(toRad(bLat)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

export default function NearestSalons({ salons }) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => {
        setCoords(null);
      }
    );
  }, []);

  let list = salons;

  if (coords) {
    list = [...salons]
      .map((s) => ({
        ...s,
        distance: distanceKm(coords.lat, coords.lng, s.lat, s.lng)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  } else {
    list = salons.slice(0, 3);
  }

  if (!list.length) {
    return <p className="text-sm text-gray-500">Không tìm thấy salon.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {list.map((salon) => (
        <div
          key={salon.id}
          className="flex flex-col rounded-2xl bg-white p-4 shadow"
        >
          <h3 className="text-sm font-semibold text-gray-900">
            {salon.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500">{salon.address}</p>
          {salon.distance != null && (
            <p className="mt-1 text-xs text-pink-600">
              Cách bạn ~ {salon.distance.toFixed(1)} km
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                `${salon.lat},${salon.lng}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-pink-500 px-3 py-1 text-xs font-semibold text-white hover:bg-pink-600"
            >
              Chỉ đường
            </a>
            <Link
              href={`/salon/${salon.id}`}
              className="rounded-xl border border-pink-200 px-3 py-1 text-xs font-semibold text-pink-600 hover:bg-pink-50"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
