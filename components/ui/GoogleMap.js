"use client";
import { useEffect, useRef } from "react";

export default function GoogleMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new window.google.maps.importLibrary("maps");
    const markerLib = new window.google.maps.importLibrary("marker");

    Promise.all([loader, markerLib]).then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 47.4979, lng: 19.0402 },
        zoom: 13,
      });

      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 47.4979, lng: 19.0402 },
      });
    });
  }, []);

  return <div ref={mapRef} className="w-full h-[400px] rounded-xl shadow-lg" />;
}
