import Header from "@/components/ui/Header"
import SearchBar from "@/components/ui/SearchBar"
import CategoryList from "@/components/ui/CategoryList"
import FeaturedSalons from "@/components/ui/FeaturedSalons"
import NearestSalons from "@/components/ui/NearestSalons"
import dynamicImport from "next/dynamic"

export const dynamic = "force-dynamic"

const MapClient = dynamicImport(
  () => import("@/components/ui/MapClient"),
  { ssr: false }
)

export default async function HomePage() {
  let salons = []

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/salons`,
      { cache: "no-store" }
    )
    if (res.ok) salons = await res.json()
  } catch (e) {
    console.error(e)
  }

  return (
    <>
      <Header />

      <main>
        <section className="section hero">
          <h1 className="section-title">
            Tìm tiệm nail đẹp nhất <br /> gần bạn ở Budapest
          </h1>

          <p className="section-subtitle">
            So sánh các tiệm nail theo quận, dịch vụ, giá và đánh giá khách hàng.
          </p>

          <SearchBar />
        </section>

        <section className="section">
          <h2 className="section-title">Dịch vụ nổi bật</h2>
          <CategoryList />
        </section>

        <section className="section">
          <h2 className="section-title">💖 Salon nổi bật</h2>
          <FeaturedSalons salons={salons} />
        </section>

        <section className="section">
          <h2 className="section-title">📍 Xem salon trên bản đồ</h2>
          <div className="map-container">
            <MapClient salons={salons} />
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">📌 Salon gần bạn nhất</h2>
          <NearestSalons salons={salons} />
        </section>
      </main>
    </>
  )
}
