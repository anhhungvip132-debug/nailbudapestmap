"use client";

import { useEffect, useRef } from "react";

export default function Map({ salons = [] }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const safe = Array.isArray(salons) ? salons : [];

    // Xóa callback cũ (nếu có)
    delete window.initMap;

    // Tạo callback toàn cục cho Google
    window.initMap = () => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: safe.length
          ? { lat: safe[0].lat, lng: safe[0].lng }
          : { lat: 47.4979, lng: 19.0402 },
        zoom: 13,
      });

      safe.forEach((s) => {
        new window.google.maps.Marker({
          map,
          position: { lat: s.lat, lng: s.lng },
          title: s.name,
        });
      });
    };

    // Nạp script Google
    const loadScript = () => {
      const existing = document.getElementById("googlemaps-script");
      if (existing) {
        existing.remove();
      }

      const script = document.createElement("script");
      script.id = "googlemaps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadScript();
  }, [salons]);

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
