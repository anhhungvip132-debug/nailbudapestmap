"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import salons from "@/data/salons.json";

export default function NearestSalons() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  });

  if (!isLoaded) return <p>Đang tải bản đồ…</p>;

  return (
    <section>
      <h2>📍 Salon Gần Bạn Nhất</h2>

      <GoogleMap
        center={{ lat: 47.4979, lng: 19.0402 }}
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "12px" }}
      >
        {salons.map(s => (
          <Marker key={s.id} position={{ lat: s.lat, lng: s.lng }} />
        ))}
      </GoogleMap>
    </section>
  );
}
