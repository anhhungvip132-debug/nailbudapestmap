import Hero from "@/components/ui/Hero";
import SearchBar from "@/components/ui/SearchBar";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 pb-20">
      <Hero />

      {/* Thanh tìm kiếm + lọc */}
      <SearchBar />

      {/* Salon nổi bật */}
      <FeaturedSalons />

      {/* Salon gần nhất có Google Map */}
      <NearestSalons />

      {/* Bài viết mới */}
      <BlogSection />

      {/* Founder */}
      <OwnerSection />
    </main>
  );
}
