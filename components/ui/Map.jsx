"use client";

import React, { useEffect, useRef } from "react";

export default function Map({
  salons = [],
  heightClass = "h-[520px]",
  className = "",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const leaflet = await import("leaflet");
      const L = leaflet.default || leaflet;

      if (!containerRef.current || !isMounted) return;

      if (!mapRef.current) {
        const map = L.map(containerRef.current, {
          center: [47.4979, 19.0402],
          zoom: 13,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapRef.current = map;

        setTimeout(() => {
          map.invalidateSize();
        }, 300);

        window.addEventListener("resize", () => {
          map.invalidateSize();
        });
      }

      const map = mapRef.current;

      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      if (Array.isArray(salons) && salons.length > 0) {
        const leaflet = await import("leaflet");
        const L = leaflet.default || leaflet;

        salons.forEach((s) => {
          if (typeof s.lat === "number" && typeof s.lng === "number") {
            const marker = new L.Marker([s.lat, s.lng]).addTo(map);
            marker.bindPopup(
              `<strong>${s.name || ""}</strong><br/>${s.address || ""}`
            );
            markersRef.current.push(marker);
          }
        });

        if (markersRef.current.length > 0) {
          const group = new L.FeatureGroup(markersRef.current);
          map.fitBounds(group.getBounds().pad(0.2));
        }
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, [salons]);

  return (
    <div
      className={`rounded-2xl border border-pink-100 overflow-hidden bg-gray-100 ${className}`}
    >
      <div ref={containerRef} className={`w-full ${heightClass}`} />
    </div>
  );
}