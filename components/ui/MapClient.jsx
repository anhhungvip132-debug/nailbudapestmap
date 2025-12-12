"use client"

import { useEffect, useMemo, useState } from "react"
import GoogleMap from "@/components/ui/GoogleMap"

export default function MapClient({ salons = [] }) {
  const safeSalons = useMemo(() => (Array.isArray(salons) ? salons : []), [salons])

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return <GoogleMap salons={safeSalons} />
}
