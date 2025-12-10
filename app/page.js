"use client";

import HeroSlider from "@/components/ui/HeroSlider";
import SearchBar from "@/components/ui/SearchBar";
import CategoryList from "@/components/ui/CategoryList";
import FeaturedAds from "@/components/ui/FeaturedAds";
import FeaturedSalons from "@/components/ui/FeaturedSalons";  // <<< THÊM MỚI
import NearestSalons from "@/components/ui/NearestSalons";
import Map from "@/components/ui/Map";
import BlogSection from "@/components/ui/BlogSection";
import RegisterSection from "@/components/ui/RegisterSection";
import salons from "@/data/salons.json";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-[#fafafa] pb-20">

      {/* HERO SLIDER */}
      <section className="section">
        <HeroSlider />
      </section>

      {/* SEARCH BAR */}
      <section className="section">
        <div className="container">
          <SearchBar />
        </div>
      </section>

      {/* CATEGORY LIST */}
      <section className="section">
        <div className="container">
          <CategoryList />
        </div>
      </section>

      {/* FEATURED ADS */}
      <section className="section">
        <div className="container">
          <FeaturedAds />
        </div>
      </section>

      {/* SALON NỔI BẬT (QUẢNG CÁO) */}
      <section className="section">
        <div className="container">
          <FeaturedSalons />   {/* <<< THÊM SECTION NÀY */}
        </div>
      </section>

      {/* MAP + SALON LIST */}
      <section className="section">
        <div className="container space-y-8">
          <h2 className="heading">Bản Đồ Các Tiệm Nail Tại Budapest</h2>
          <Map salons={salons} />
        </div>
      </section>

      {/* NEAREST SALONS */}
      <section className="section">
        <div className="container">
          <NearestSalons />
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="section">
        <div className="container">
          <BlogSection />
        </div>
      </section>

      {/* REGISTER SECTION */}
      <section className="section">
        <div className="container">
          <RegisterSection />
        </div>
      </section>
      
    </main>
  );
}
