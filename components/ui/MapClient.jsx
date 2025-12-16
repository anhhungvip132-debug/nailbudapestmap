"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/** ✅ ÉP Leaflet KHÔNG load icon mặc định (tránh ô vuông/broken image) */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "/images/marker.png",
  iconRetinaUrl: "/images/marker.png",
  // IMPORTANT: không set shadowUrl nếu bạn chưa có file shadow -> tránh request 404
  shadowUrl: undefined,
});

export default function MapClient({
  salons = [],
  selectedId = null,
  onSelectSalon,
}) {
  const mapRef = useRef(null);
  const markerRefs = useRef({}); // { [id]: markerInstance }

  const list = useMemo(() => {
    return Array.isArray(salons)
      ? salons.filter(
          (s) => typeof s.lat === "number" && typeof s.lng === "number"
        )
      : [];
  }, [salons]);

  const normalIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "/images/marker.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -28],
      }),
    []
  );

  const activeIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "/images/marker-active.png",
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -34],
      }),
    []
  );

  /** ✅ Khi selectedId đổi: flyTo + open popup */
  useEffect(() => {
    if (!selectedId) return;
    const s = list.find((x) => x.id === selectedId);
    if (!s) return;

    const map = mapRef.current;
    if (map) map.flyTo([s.lat, s.lng], 14, { duration: 0.6 });

    const mk = markerRefs.current[selectedId];
    if (mk) mk.openPopup();
  }, [selectedId, list]);

  if (list.length === 0) {
    return (
      <div className="h-[520px] flex items-center justify-center text-sm text-gray-500">
        Đang tải bản đồ…
      </div>
    );
  }

  return (
    <MapContainer
      center={[47.4979, 19.0402]}
      zoom={12}
      style={{ height: "520px", width: "100%" }}
      scrollWheelZoom
      whenCreated={(map) => {
        mapRef.current = map;
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {list.map((salon) => (
        <Marker
          key={salon.id}
          position={[salon.lat, salon.lng]}
          icon={salon.id === selectedId ? activeIcon : normalIcon}
          ref={(ref) => {
            if (ref) markerRefs.current[salon.id] = ref;
          }}
          eventHandlers={{
            click: () => {
              onSelectSalon?.(salon);
            },
          }}
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
