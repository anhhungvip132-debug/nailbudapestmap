"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon lỗi trên Next.js
const icon = new L.Icon({
  iconUrl: "/images/marker.png",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

export default function MapInner() {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[47.4979, 19.0402]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        <Marker position={[47.4979, 19.0402]} icon={icon}>
          <Popup>Budapest Center</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
