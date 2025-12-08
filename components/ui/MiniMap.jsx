"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function MiniMap({ lat, lng }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.initMiniMap = () => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
      });

      new google.maps.Marker({
        position: { lat, lng },
        map,
      });
    };
  }, [lat, lng]);

  return (
    <div className="w-full h-72 rounded-2xl border shadow">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMiniMap`}
        strategy="lazyOnload"
      />
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
