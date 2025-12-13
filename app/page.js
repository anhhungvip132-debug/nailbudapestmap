// app/page.js

import Header from "@/components/ui/Header"
import Hero from "@/components/ui/Hero"
import SearchBar from "@/components/ui/SearchBar"
import CategoryList from "@/components/ui/CategoryList"
import FeaturedSalons from "@/components/ui/FeaturedSalons"
import FeaturedAds from "@/components/ui/FeaturedAds"
import BlogSection from "@/components/ui/BlogSection"
import Footer from "@/components/ui/Footer"

import dynamicImport from "next/dynamic"

export const dynamic = "force-dynamic"
export const revalidate = 0

// GOOGLE MAP – CLIENT ONLY
const MapClient = dynamicImport(
  () => import("@/components/ui/MapClient"),
  { ssr: false }
)

// SAFE DATA FETCH
async function getSalons() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/salons`,
      { cache: "no-store" }
    )
    if (!res.ok) return []
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

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-14">

        {/* HERO */}
        <Hero />

        {/* SEARCH */}
        <SearchBar salons={salons} />

        {/* CATEGORY */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Dịch vụ nổi bật</h2>
          <CategoryList />
        </section>

        {/* FEATURED SALONS */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Salon nổi bật</h2>
          <FeaturedSalons salons={salons} />
        </section>

        {/* PROMO */}
        <FeaturedAds />

        {/* MAP */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Xem salon trên bản đồ
          </h2>
          <div className="h-[480px] w-full rounded-xl overflow-hidden border">
            <MapClient salons={salons} />
          </div>
        </section>

        {/* BLOG */}
        <BlogSection />

      </main>

      <Footer />
    </>
  )
}
