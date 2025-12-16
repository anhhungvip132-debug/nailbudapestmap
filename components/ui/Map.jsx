"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] rounded-xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
      Đang tải bản đồ…
    </div>
  ),
});

export default function Map({
  salons = [],
  selectedId = null,
  onSelectSalon,
}) {
  const list = Array.isArray(salons) ? salons : [];

  // ✅ EMPTY STATE
  if (list.length === 0) {
    return (
      <div className="h-[520px] rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
        Không có salon để hiển thị trên bản đồ
      </div>
    );
  }

  return (
    <div className="h-[520px] rounded-xl overflow-hidden">
      <MapClient
        salons={list}
        selectedId={selectedId}
        onSelectSalon={onSelectSalon}
      />
    </div>
  );
}
