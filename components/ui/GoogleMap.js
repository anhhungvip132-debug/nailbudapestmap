"use client"

import { useEffect, useRef } from "react"

export default function GoogleMap({ salons }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.google || !ref.current) return

    const map = new window.google.maps.Map(ref.current, {
      center: { lat: 47.4979, lng: 19.0402 },
      zoom: 12,
    })

    salons.forEach((s) => {
      if (!s.lat || !s.lng) return
      new window.google.maps.Marker({
        map,
        position: { lat: Number(s.lat), lng: Number(s.lng) },
        title: s.name,
      })
    })
  }, [salons])

  return <div ref={ref} style={{ width: "100%", height: 420 }} />
}
