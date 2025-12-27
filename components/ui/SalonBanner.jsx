"use client";

import Image from "next/image";

export default function SalonBanner({ salon }) {
  if (!salon) return null;

  return (
    <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-gray-100">
      <Image
        src={salon.bannerImage || "/images/salon-default-banner.jpg"}
        alt={salon.name}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Info */}
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h1 className="text-3xl font-bold">{salon.name}</h1>
        <p className="text-sm opacity-90">{salon.address}</p>

        <div className="mt-2 flex items-center gap-3">
          <span className="flex items-center gap-1 text-yellow-400">
            ★ {salon.rating || "4.8"} / 5.0
          </span>

          {salon.plan === "fresha" && (
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              Fresha Partner
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
