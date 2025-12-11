"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import salons from "@/data/salons.json";

// Fix icon missing issue in Leaflet
const icon = L.icon({
  iconUrl: "/images/marker.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export default function Map() {
  const center = { lat: 47.4979, lng: 19.0402 }; // Budapest center

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-3">Budapest Nail Salon Map</h2>

      <div className="w-full h-[420px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          {/* OpenStreetMap tiles */}
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Add markers from salons.json */}
          {salons.map((s) => (
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              icon={icon}
            >
              <Popup>
                <div className="font-bold">{s.name}</div>
                <div>{s.address}</div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                  target="_blank"
                  className="text-pink-600 underline"
                >
                  Directions →
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
