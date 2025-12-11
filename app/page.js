import Hero from "@/components/ui/Hero";
import SearchBar from "@/components/ui/SearchBar";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar onSearch={(r) => console.log("Kết quả:", r)} />
      <FeaturedSalons />
      <NearestSalons />
      <BlogSection />
      <OwnerSection />
    </main>
  );
}
