import Header from "@/components/ui/Header"
import Hero from "@/components/ui/Hero"
import SearchBar from "@/components/ui/SearchBar"
import CategoryList from "@/components/ui/CategoryList"
import FeaturedSalons from "@/components/ui/FeaturedSalons"
import PromoBanner from "@/components/ui/PromoBanner"
import BlogSection from "@/components/ui/BlogSection"
import Footer from "@/components/ui/Footer"

import dynamicImport from "next/dynamic"

export const dynamic = "force-dynamic"
export const revalidate = 0

const MapClient = dynamicImport(
  () => import("@/components/ui/MapClient"),
  { ssr: false }
)

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

async function getBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blog`,
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
  const blogs = await getBlogs()

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 space-y-16">
        <Hero />

        <SearchBar />

        <CategoryList />

        <FeaturedSalons salons={salons ?? []} />

        <PromoBanner />

        <section>
          <h2 className="text-2xl font-bold mb-4">
            📍 Xem salon trên bản đồ
          </h2>
          <MapClient salons={salons ?? []} />
        </section>

        <BlogSection posts={blogs ?? []} />
      </main>

      <Footer />
    </>
  )
}
