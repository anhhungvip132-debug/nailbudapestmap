"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapComponent = dynamic(() => import("./MapClient"), {
  ssr: false,
});

export default function MapWrapper({ salons }) {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <MapComponent salons={salons} />
    </div>
  );
}
