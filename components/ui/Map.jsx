// components/ui/Map.jsx
"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "450px",
};

export default function Map({ salons = [] }) {
  // Load Google Maps + Places API
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // ⭐ QUAN TRỌNG: FIX LỖI
  });

  // Default center = Budapest
  const center =
    salons.length > 0
      ? { lat: salons[0].lat, lng: salons[0].lng }
      : { lat: 47.4979, lng: 19.0402 };

  if (loadError) {
    return (
      <p className="text-center text-red-500 py-6">
        ❌ Google Maps không tải được. Vui lòng kiểm tra API Key.
      </p>
    );
  }

  if (!isLoaded) {
    return <p className="text-center py-6">Đang tải bản đồ…</p>;
  }

  return (
    <div className="mt-6 rounded-2xl overflow-hidden shadow">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {salons.map((s) => (
          <Marker key={s.id} position={{ lat: s.lat, lng: s.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
}
