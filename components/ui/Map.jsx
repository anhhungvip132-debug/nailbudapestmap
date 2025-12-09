"use client";

import { useEffect, useRef } from "react";

export default function Map({ salons = [] }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const load = async () => {
      if (!window.google) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
          script.async = true;
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      const safe = Array.isArray(salons) ? salons : [];

      const map = new window.google.maps.Map(mapRef.current, {
        center: safe.length
          ? { lat: safe[0].lat, lng: safe[0].lng }
          : { lat: 47.4979, lng: 19.0402 },
        zoom: 13,
      });

      safe.forEach((s) => {
        new window.google.maps.Marker({
          position: { lat: s.lat, lng: s.lng },
          map,
          title: s.name,
        });
      });
    };

    load();
  }, [salons]);

  return <div className="map-container"><div ref={mapRef} style={{ width: "100%", height: "100%" }} /></div>;
}
