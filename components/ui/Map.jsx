"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const pin = new L.Icon({
  iconUrl: "/images/pin.png",
  iconSize: [35, 35],
});

export default function Map({ salons }) {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow">
      <MapContainer
        center={[47.4979, 19.0402]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {salons.map((s, i) => (
          <Marker key={i} icon={pin} position={[s.lat, s.lng]}>
            <Popup>
              <strong>{s.name}</strong>
              <br />
              {s.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
