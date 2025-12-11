"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const salonIcon = L.icon({
  iconUrl: "/images/map-pin-pink.png", // nếu chưa có, dùng luôn /images/placeholder.jpg
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28]
});

export default function Map({ salons }) {
  const center = salons.length
    ? [salons[0].lat, salons[0].lng]
    : [47.4979, 19.0402]; // trung tâm Budapest

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {salons.map((salon) => (
        <Marker
          key={salon.id}
          position={[salon.lat, salon.lng]}
          icon={salonIcon}
        >
          <Popup>
            <div className="text-sm">
              <strong>{salon.name}</strong>
              <br />
              {salon.address}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
