"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./MapContainer"), {
  ssr: false,
});

export default function Map({
  salons = [],
  heightClass = "h-[520px]",
  selectedId = null,
}) {
  return (
    <div
      className={`w-full rounded-3xl overflow-hidden bg-gray-50 border border-pink-100 ${heightClass}`}
    >
      <LeafletMap salons={salons} selectedId={selectedId} />
    </div>
  );
}
