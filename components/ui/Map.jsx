"use client";

import { useEffect, useRef } from "react";

export default function Map({ salons = [] }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const safe = Array.isArray(salons) ? salons : [];

    const loadGoogle = () => {
      return new Promise((resolve) => {
        if (window.google) return resolve();

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    const init = async () => {
      await loadGoogle();

      const map = new window.google.maps.Map(mapRef.current, {
        center: safe.length
          ? { lat: safe[0].lat, lng: safe[0].lng }
          : { lat: 47.4979, lng: 19.0402 },
        zoom: 12,
        fullscreenControl: false,
        mapTypeControl: false,
      });

      safe.forEach((s) => {
        new window.google.maps.Marker({
          map,
          position: { lat: s.lat, lng: s.lng },
          title: s.name,
        });
      });
    };

    init();
  }, [salons]);

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
