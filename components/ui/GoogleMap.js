"use client"

import { useEffect, useMemo, useRef } from "react"

export default function GoogleMap({ salons = [] }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  const safeSalons = useMemo(() => (Array.isArray(salons) ? salons : []), [salons])

  useEffect(() => {
    if (!mapRef.current) return
    if (!window.google || !window.google.maps) return

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 47.4979, lng: 19.0402 }, // Budapest
        zoom: 12,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      })
    }

    // clear old markers
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    const map = mapInstanceRef.current

    safeSalons.forEach((s) => {
      const lat = Number(s?.lat)
      const lng = Number(s?.lng)
      if (Number.isNaN(lat) || Number.isNaN(lng)) return

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: s?.name || "Salon",
      })

      const info = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family: Arial; max-width:240px">
            <div style="font-weight:700; margin-bottom:6px">${escapeHtml(s?.name || "Salon")}</div>
            <div style="font-size:12px; opacity:.85; margin-bottom:8px">${escapeHtml(s?.address || "")}</div>
            <a href="/salon/${encodeURIComponent(s?.id || "")}" style="text-decoration:none; font-weight:600">
              Xem chi tiết →
            </a>
          </div>
        `,
      })

      marker.addListener("click", () => info.open({ anchor: marker, map }))

      markersRef.current.push(marker)
    })
  }, [safeSalons])

  // load google script once
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.google && window.google.maps) return

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!key) return

    const existing = document.querySelector('script[data-nbm="gmaps"]')
    if (existing) return

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
    script.async = true
    script.defer = true
    script.dataset.nbm = "gmaps"
    document.head.appendChild(script)
  }, [])

  return (
    <div
      style={{ width: "100%", height: "420px", borderRadius: 16, overflow: "hidden" }}
      ref={mapRef}
    />
  )
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}
