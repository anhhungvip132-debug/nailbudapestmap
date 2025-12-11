"use client";

import React, { useEffect, useRef } from "react";

export default function Map({
  salons = [],
  center,
  zoom = 13,
  className = "",
  heightClass = "h-80",
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const defaultCenter = center || { lat: 47.4979, lng: 19.0402 }; // Budapest

  useEffect(() => {
    let isCancelled = false;

    if (!mapContainerRef.current) return;

    async function initMap() {
      const leaflet = await import("leaflet");
      const L = leaflet.default || leaflet;

      if (isCancelled || !mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current).setView(
          [defaultCenter.lat, defaultCenter.lng],
          zoom
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Clear old markers by creating a new layer group each time
      const markersLayer = L.layerGroup().addTo(map);

      if (Array.isArray(salons)) {
        salons.forEach((salon) => {
          if (typeof salon.lat === "number" && typeof salon.lng === "number") {
            const marker = L.marker([salon.lat, salon.lng]).addTo(markersLayer);
            const popupHtml = `
              <div style="font-size: 13px;">
                <strong>${salon.name || "Nail salon"}</strong><br/>
                <span>${salon.address || ""}</span>
              </div>
            `;
            marker.bindPopup(popupHtml);
          }
        });
      }
    }

    initMap();

    return () => {
      isCancelled = true;
    };
  }, [
    salons,
    defaultCenter.lat,
    defaultCenter.lng,
    zoom,
  ]);

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-pink-100 ${className}`}
    >
      <div
        ref={mapContainerRef}
        className={`w-full ${heightClass} bg-gray-100`}
      />
    </div>
  );
}