"use client";

import dynamic from "next/dynamic";
import ClientErrorBoundary from "@/components/ui/ClientErrorBoundary";

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
}) {
  const safeSalons = Array.isArray(salons) ? salons : [];

  if (safeSalons.length === 0) {
    return (
      <div className={`${heightClass} flex items-center justify-center text-sm text-gray-400`}>
        Chưa có salon để hiển thị trên bản đồ
      </div>
    );
  }

  return (
    <div className={heightClass}>
      <ClientErrorBoundary>
        <MapClient
          salons={safeSalons}
          selectedId={selectedId}
        />
      </ClientErrorBoundary>
    </div>
  );
}
