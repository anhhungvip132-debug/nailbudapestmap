// components/ui/Map.jsx
"use client";

import { useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px", // tăng để map chắc chắn hiển thị
};

export default function Map({ salons = [] }) {
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const defaultCenter =
    salons.length > 0
      ? { lat: salons[0].lat, lng: salons[0].lng }
      : { lat: 47.4979, lng: 19.0402 };

  const onLoad = useCallback((map) => {
    mapRef.current = map;

    if (salons.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      salons.forEach((s) => bounds.extend({ lat: s.lat, lng: s.lng }));
      map.fitBounds(bounds);
    }
  }, [salons]);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  if (loadError) {
    return (
      <p className="text-center text-red-500 py-6">
        ❌ Google Maps không tải được. Kiểm tra API Key trên Vercel.
      </p>
    );
  }

  if (!isLoaded) {
    return <p className="text-center py-6">Đang tải bản đồ…</p>;
  }

  return (
    <div className="mt-6 rounded-2xl overflow-hidden shadow-md border border-gray-200">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {salons.map((s) => (
          <Marker key={s.id} position={{ lat: s.lat, lng: s.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
}
