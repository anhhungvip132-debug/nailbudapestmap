"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix lỗi icon mặc định của Leaflet
const icon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function SalonMapSmallInner({ salon }) {
  if (!salon?.lat || !salon?.lng) return null;

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[salon.lat, salon.lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full rounded-xl overflow-hidden"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[salon.lat, salon.lng]} icon={icon}>
          <Popup>
            <strong>{salon.name}</strong>
            <br />
            {salon.address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
