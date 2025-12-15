"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
});

export default function MapClient({ salons = [] }) {
  const list = Array.isArray(salons)
    ? salons.filter(
        (s) =>
          typeof s.lat === "number" &&
          typeof s.lng === "number"
      )
    : [];

  if (list.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center text-sm text-gray-500">
        Đang tải bản đồ…
      </div>
    );
  }

  return (
    <MapContainer
      center={[47.4979, 19.0402]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {list.map((salon) => (
        <Marker
          key={salon.id}
          position={[salon.lat, salon.lng]}
          icon={icon}
        >
          <Popup>
            <b>{salon.name}</b>
            <br />
            {salon.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
