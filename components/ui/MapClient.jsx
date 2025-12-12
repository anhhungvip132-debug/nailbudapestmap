"use client"

import GoogleMap from "./GoogleMap"

export default function MapClient({ salons }) {
  if (!Array.isArray(salons)) return null
  return <GoogleMap salons={salons} />
}
