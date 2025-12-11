"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

// ICON
const salonIcon = L.icon({
  iconUrl: "/images/map-pin-pink.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28],
});

export default function Map({ salons }) {
  const center = salons.length
    ? [salons[0].lat, salons[0].lng]
    : [47.4979, 19.0402];

  return (
    <div className="w-full h-full">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {salons.map((salon) => (
          <Marker
            key={salon.id}
            position={[salon.lat, salon.lng]}
            icon={salonIcon}
          >
            <Popup>
              <b>{salon.name}</b>
              <br />
              {salon.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
