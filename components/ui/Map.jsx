"use client";

import dynamic from "next/dynamic";

// CHỈ import MapClient, KHÔNG import lại Map
const MapClient = dynamic(
  () => import("@/components/ui/MapClient.jsx"),
  { ssr: false }
);

export default function Map({
  salons = [],
  heightClass = "h-[520px]",
  selectedId = null,
}) {
  const safeSalons = Array.isArray(salons) ? salons : [];

  return (
    <div className={heightClass}>
      <MapClient
        salons={safeSalons}
        selectedId={selectedId}
      />
    </div>
  );
}
