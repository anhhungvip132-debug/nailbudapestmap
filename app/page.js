// app/page.js
import Header from "@/components/ui/Header"
import Hero from "@/components/ui/Hero"
import SearchBar from "@/components/ui/SearchBar"
import CategoryList from "@/components/ui/CategoryList"
import FeaturedSalons from "@/components/ui/FeaturedSalons"
import FeaturedAds from "@/components/ui/FeaturedAds"
import PromoBanner from "@/components/ui/PromoBanner"
import PromoSlider from "@/components/ui/PromoSlider"
import NearestSalons from "@/components/ui/NearestSalons"
import BlogSection from "@/components/ui/BlogSection"
import Footer from "@/components/ui/Footer"

import dynamic from "next/dynamic"

export const dynamic = "force-dynamic"
export const revalidate = 0

const MapClient = dynamic(() => import("@/components/ui/MapClient"), {
  ssr: false,
})

async function getSalons() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/salons`,
      { cache: "no-store" }
    )
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const salons = await getSalons()

  return (
    <>
      <Header />

      <main className="container mx-auto px-4">
        <Hero />
        <SearchBar salons={salons} />

        <section className="mt-10">
          <h2 className="section-title">Dịch vụ nổi bật</h2>
          <CategoryList />
        </section>

        <section className="mt-12">
          <h2 className="section-title">Salon nổi bật</h2>
          <FeaturedSalons salons={salons} />
        </section>

        <FeaturedAds />
        <PromoBanner />
        <PromoSlider />

        <section className="mt-14">
          <h2 className="section-title">Xem salon trên bản đồ</h2>
          <div className="map-wrapper">
            <MapClient salons={salons} />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="section-title">Salon gần bạn nhất</h2>
          <NearestSalons salons={salons} />
        </section>

        <BlogSection />
      </main>

      <Footer />
    </>
  )
}
