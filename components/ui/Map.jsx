"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(
  () => import("@/components/ui/MapClient"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] flex items-center justify-center text-sm text-gray-500">
        Đang tải bản đồ…
      </div>
    ),
  }
);

export default function Map({
  salons = [],
  heightClass = "h-[520px]",
  selectedId = null,
  onSelectSalon,
}) {
  const safeSalons = Array.isArray(salons) ? salons : [];

  return (
    <div className={heightClass}>
      <MapClient
        salons={safeSalons}
        selectedId={selectedId}
        onSelectSalon={onSelectSalon}
      />
    </div>
  );
}
