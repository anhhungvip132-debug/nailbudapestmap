"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
});

const activeIcon = L.icon({
  iconUrl: "/marker-active.png",
  iconSize: [36, 36],
});

function FocusOnSalon({ salon }) {
  const map = useMap();

  useEffect(() => {
    if (!salon) return;
    map.setView([salon.lat, salon.lng], 15, { animate: true });
  }, [salon, map]);

  return null;
}

export default function MapClient({
  salons = [],
  selectedId,
  onSelectSalon,
}) {
  const list = Array.isArray(salons)
    ? salons.filter(
        (s) =>
          typeof s.lat === "number" &&
          typeof s.lng === "number"
      )
    : [];

  const selectedSalon = list.find((s) => s.id === selectedId);

  if (list.length === 0) {
    return (
      <div className="h-[520px] flex items-center justify-center text-sm text-gray-500">
        Không có salon để hiển thị bản đồ
      </div>
    );
  }

  return (
    <MapContainer
      center={[47.4979, 19.0402]}
      zoom={12}
      className="h-full w-full rounded-xl"
      scrollWheelZoom
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedSalon && <FocusOnSalon salon={selectedSalon} />}

      {list.map((salon) => (
        <Marker
          key={salon.id}
          position={[salon.lat, salon.lng]}
          icon={salon.id === selectedId ? activeIcon : defaultIcon}
          eventHandlers={{
            click: () => onSelectSalon && onSelectSalon(salon),
          }}
        >
          <Popup>
            <strong>{salon.name}</strong>
            <br />
            {salon.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
