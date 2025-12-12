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

/**
 * ⛔️ BẮT BUỘC
 * Trang chủ KHÔNG được prerender
 */
export const dynamic = "force-dynamic"
export const revalidate = 0

/**
 * Google Map chỉ load ở client
 */
const MapClient = dynamic(
  () => import("@/components/ui/MapClient"),
  { ssr: false }
)

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="container mx-auto px-4">

        {/* HERO + SEARCH */}
        <section className="mt-6">
          <Hero />
          <div className="mt-6">
            <SearchBar />
          </div>
        </section>

        {/* CATEGORY */}
        <section className="mt-10">
          <h2 className="section-title">Dịch vụ nổi bật</h2>
          <CategoryList />
        </section>

        {/* FEATURED SALONS */}
        <section className="mt-12">
          <h2 className="section-title">Salon nổi bật</h2>
          <FeaturedSalons />
        </section>

        {/* ADS / PROMO */}
        <section className="mt-12 space-y-6">
          <FeaturedAds />
          <PromoBanner />
          <PromoSlider />
        </section>

        {/* GOOGLE MAP */}
        <section className="mt-14">
          <h2 className="section-title">Xem salon trên bản đồ</h2>
          <div className="rounded-xl overflow-hidden min-h-[420px] bg-gray-100">
            <MapClient />
          </div>
        </section>

        {/* NEAREST SALONS */}
        <section className="mt-14">
          <h2 className="section-title">Salon gần bạn nhất</h2>
          <NearestSalons />
        </section>

        {/* BLOG */}
        <section className="mt-16">
          <BlogSection />
        </section>

      </main>

      <Footer />
    </>
  )
}
