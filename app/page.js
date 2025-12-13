// app/page.js

import Header from "@/components/ui/Header"
import Hero from "@/components/ui/Hero"
import SearchAdvanced from "@/components/ui/SearchAdvanced"
import CategoryList from "@/components/ui/CategoryList"
import FeaturedSalons from "@/components/ui/FeaturedSalons"
import PromoBanner from "@/components/ui/PromoBanner"
import PromoSlider from "@/components/ui/PromoSlider"
import BlogSection from "@/components/ui/BlogSection"
import Footer from "@/components/ui/Footer"

// ⚠️ ĐỔI TÊN – KHÔNG DÙNG dynamic
import dynamicImport from "next/dynamic"

// ⚠️ GIỮ NGUYÊN – BẮT BUỘC
export const dynamic = "force-dynamic"
export const revalidate = 0

// Google Map – CLIENT ONLY
const MapClient = dynamicImport(
  () => import("@/components/ui/MapClient"),
  { ssr: false }
)

// SAFE FETCH
async function getSalons() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/salons`,
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

      <main className="container">
        <Hero />

        <SearchAdvanced salons={salons} />

        <section className="section">
          <h2>Dịch vụ nổi bật</h2>
          <CategoryList />
        </section>

        <section className="section">
          <h2>Salon nổi bật</h2>
          <FeaturedSalons salons={salons} />
        </section>

        <PromoBanner />
        <PromoSlider />

        <section className="section">
          <h2>Xem salon trên bản đồ</h2>
          <MapClient salons={salons} />
        </section>

        <BlogSection />
      </main>

      <Footer />
    </>
  )
}
