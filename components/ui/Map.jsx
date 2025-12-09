"use client";

import { useEffect, useRef } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Map({ salons = [] }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (typeof window === "undefined") return;

    const safeSalons = Array.isArray(salons) ? salons : [];

    const loadMap = async () => {
      if (!GOOGLE_MAPS_API_KEY) {
        console.error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
        return;
      }

      if (!window.google || !window.google.maps) {
        await new Promise((resolve, reject) => {
          const existingScript = document.getElementById("google-maps-script");
          if (existingScript) {
            existingScript.addEventListener("load", resolve);
            existingScript.addEventListener("error", reject);
            return;
          }

          const script = document.createElement("script");
          script.id = "google-maps-script";
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const center =
        safeSalons.length > 0
          ? { lat: safeSalons[0].lat, lng: safeSalons[0].lng }
          : { lat: 47.4979, lng: 19.0402 };

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      });

      safeSalons.forEach((salon) => {
        if (
          typeof salon.lat !== "number" ||
          typeof salon.lng !== "number"
        ) {
          return;
        }

        const marker = new window.google.maps.Marker({
          position: { lat: salon.lat, lng: salon.lng },
          map: mapInstanceRef.current,
          title: salon.name,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="font-family: system-ui; max-width: 220px;">
              <strong>${salon.name}</strong><br/>
              <span style="font-size: 12px;">${salon.address || ""}</span><br/>
              <span style="font-size: 12px;">⭐ ${salon.rating || "N/A"}</span>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map: mapInstanceRef.current,
          });
        });
      });
    };

    loadMap().catch((err) => console.error("Error loading Google Map", err));
  }, [salons]);

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
