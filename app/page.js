import HeroSlider from "@/components/ui/HeroSlider";
import SearchBar from "@/components/ui/SearchBar";
import CategoryList from "@/components/ui/CategoryList";
import FeaturedAds from "@/components/ui/FeaturedAds";
import NearestSalons from "@/components/ui/NearestSalons";
import BlogSection from "@/components/ui/BlogSection";
import RegisterSection from "@/components/ui/RegisterSection";
import Map from "@/components/ui/Map";

export default function Home() {
  return (
    <main className="space-y-10 pb-10">
      <HeroSlider />

      <div className="container space-y-12">
        <SearchBar />
        <CategoryList />
        <FeaturedAds />
        <NearestSalons />
        <BlogSection />
        <RegisterSection />
        <Map />
      </div>
    </main>
  );
}
