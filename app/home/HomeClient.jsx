"use client"

import { useEffect, useState } from "react"

import Header from "@/components/ui/Header"
import Hero from "@/components/ui/Hero"
import SearchBar from "@/components/ui/SearchBar"
import CategoryList from "@/components/ui/CategoryList"
import FeaturedSalons from "@/components/ui/FeaturedSalons"
import FeaturedAds from "@/components/ui/FeaturedAds"
import BlogSection from "@/components/ui/BlogSection"
import Footer from "@/components/ui/Footer"

import dynamic from "next/dynamic"

const MapClient = dynamic(
  () => import("@/components/ui/MapClient"),
  { ssr: false }
)

export default function HomeClient() {
  const [salons, setSalons] = useState([])

  useEffect(() => {
    fetch("/api/salons")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSalons(data)
        else setSalons([])
      })
      .catch(() => setSalons([]))
  }, [])

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-14">

        <Hero />

        <SearchBar salons={salons} />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dịch vụ nổi bật</h2>
          <CategoryList />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Salon nổi bật</h2>
          <FeaturedSalons salons={salons} />
        </section>

        <FeaturedAds />

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Xem salon trên bản đồ
          </h2>
          <div className="h-[480px] w-full rounded-xl overflow-hidden border">
            <MapClient salons={salons} />
          </div>
        </section>

        <BlogSection />

      </main>

      <Footer />
    </>
  )
}
