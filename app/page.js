import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import CategoryList from "@/components/CategoryList"
import FeaturedSalons from "@/components/FeaturedSalons"
import NearestSalons from "@/components/NearestSalons"
import Map from "@/components/ui/Map"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  // Lấy danh sách salon
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/salons`,
    { cache: "no-store" }
  )

  const salons = res.ok ? await res.json() : []

  return (
    <>
      {/* HEADER */}
      <Header />

      <main>
        {/* HERO + SEARCH */}
        <section className="section hero">
          <h1 className="section-title">
            Tìm tiệm nail đẹp nhất <br /> gần bạn ở Budapest
          </h1>
          <p className="section-subtitle">
            So sánh các tiệm nail theo quận, dịch vụ, giá và đánh giá khách hàng.
            Đặt lịch nhanh chỉ trong vài giây.
          </p>

          <SearchBar />
        </section>

        {/* CATEGORY / SERVICES */}
        <section className="section">
          <h2 className="section-title">Dịch vụ nổi bật</h2>
          <CategoryList />
        </section>

        {/* FEATURED SALONS */}
        <section className="section">
          <h2 className="section-title">💖 Salon nổi bật</h2>

          <FeaturedSalons salons={salons} />
        </section>

        {/* MAP */}
        <section className="section">
          <h2 className="section-title">📍 Xem salon trên bản đồ</h2>

          <div className="map-container">
            <Map salons={salons} />
          </div>
        </section>

        {/* NEAREST SALONS */}
        <section className="section">
          <h2 className="section-title">📌 Salon gần bạn nhất</h2>

          <NearestSalons salons={salons} />
        </section>
      </main>
    </>
  )
}
