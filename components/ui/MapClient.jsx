"use client"

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

export default function MapClient({ salons = [] }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  if (!isLoaded) return <div className="h-[400px] bg-gray-100 rounded-xl" />

  return (
    <div className="h-[500px] rounded-xl overflow-hidden">
      <GoogleMap
        zoom={13}
        center={{ lat: 47.4979, lng: 19.0402 }}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {(salons ?? []).map(
          (s) =>
            s?.lat &&
            s?.lng && (
              <Marker
                key={s.id}
                position={{ lat: s.lat, lng: s.lng }}
              />
            )
        )}
      </GoogleMap>
    </div>
  )
}
