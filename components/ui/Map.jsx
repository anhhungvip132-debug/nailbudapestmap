"use client";

import { useEffect, useRef } from "react";

export default function Map({ salons = [] }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      console.error("❌ Google Maps API KEY is missing!");
      return;
    }

    const script = document.createElement("script");
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=` +
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY +
      `&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 47.4979, lng: 19.0402 }, // Budapest
        zoom: 13,
        mapId: "DEMO_MAP_ID",
      });

      salons.forEach((s) => {
        new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: s.lat, lng: s.lng },
          title: s.name,
        });
      });
    };

    document.body.appendChild(script);

    return () => {
      delete window.initMap;
    };
  }, [salons]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[450px] rounded-xl shadow-md bg-gray-200"
    />
  );
}
