"use client"

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

export default function MapClient({ salons }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  if (!isLoaded) return <div>Loading map...</div>

  const safeSalons = Array.isArray(salons) ? salons : []

  return (
    <GoogleMap
      zoom={13}
      center={{ lat: 47.4979, lng: 19.0402 }}
      mapContainerStyle={{ width: "100%", height: "100%" }}
    >
      {safeSalons.map((salon) => (
        salon.lat && salon.lng && (
          <Marker
            key={salon.id}
            position={{ lat: salon.lat, lng: salon.lng }}
            title={salon.name}
          />
        )
      ))}
    </GoogleMap>
  )
}
