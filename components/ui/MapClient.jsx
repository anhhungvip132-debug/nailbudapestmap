"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
});

export default function MapClient({ salons }) {
  return (
    <MapContainer
      center={[47.4979, 19.0402]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {salons.map((salon, i) => (
        <Marker key={i} position={[salon.lat, salon.lng]} icon={icon}>
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
