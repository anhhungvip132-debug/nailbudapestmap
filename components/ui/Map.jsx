"use client";

import dynamic from "next/dynamic";

// ⚠️ BẮT BUỘC có loading fallback để tránh Suspense treo
const MapClient = dynamic(
  () => import("@/components/ui/MapClient.jsx"),
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
