// app/page.js
import Header from "@/components/ui/Header"
import Hero from "@/components/ui/Hero"
import SearchBar from "@/components/ui/SearchBar"
import CategoryList from "@/components/ui/CategoryList"
import FeaturedSalons from "@/components/ui/FeaturedSalons"
import NearestSalons from "@/components/ui/NearestSalons"
import BlogSection from "@/components/ui/BlogSection"
import Footer from "@/components/ui/Footer"

import dynamicImport from "next/dynamic"

// ❗ BẮT BUỘC: tắt prerender cho trang chủ
export const dynamic = "force-dynamic"
export const revalidate = 0

// ❗ Google Map chỉ load phía client
const MapClient = dynamicImport(
  () => import("@/components/ui/MapClient"),
  { ssr: false }
)

export default async function HomePage() {
  // ✅ AN TOÀN TUYỆT ĐỐI – không để undefined
  let salons = []

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/salons`, {
      cache: "no-store",
    })
    salons = await res.json()
    if (!Array.isArray(salons)) salons = []
  } catch (e) {
    salons = []
  }

  return (
    <>
      <Header />

      <main className="space-y-16">
        {/* HERO + SEARCH */}
        <Hero />
        <SearchBar />

        {/* CATEGORY */}
        <section className="container mx-auto px-4">
          <CategoryList />
        </section>

        {/* FEATURED SALONS */}
        <section className="container mx-auto px-4">
          <FeaturedSalons salons={salons} />
        </section>

        {/* GOOGLE MAP */}
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">
            📍 Xem salon trên bản đồ
          </h2>
          <MapClient salons={salons} />
        </section>

        {/* NEAREST SALONS */}
        <section className="container mx-auto px-4">
          <NearestSalons salons={salons} />
        </section>

        {/* BLOG */}
        <section className="container mx-auto px-4">
          <BlogSection />
        </section>
      </main>

      <Footer />
    </>
  )
}
