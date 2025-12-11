"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const customIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapFocus({ selectedId, salons }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const target = salons.find((s) => s.id === selectedId);
    if (!target || !target.lat || !target.lng) return;

    map.flyTo([target.lat, target.lng], 15, { duration: 0.8 });
  }, [selectedId, salons, map]);

  return null;
}

export default function MapLeaflet({ salons = [], selectedId }) {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "/leaflet/marker-icon.png",
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={[47.4979, 19.0402]}
      zoom={13}
      scrollWheelZoom
      className="w-full h-full"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {salons.map((s) => (
        <Marker
          key={s.id}
          position={[s.lat, s.lng]}
          icon={customIcon}
        >
          <Popup>
            <b>{s.name}</b>
            <br />
            {s.address}
          </Popup>
        </Marker>
      ))}

      <MapFocus selectedId={selectedId} salons={salons} />
    </MapContainer>
  );
}
