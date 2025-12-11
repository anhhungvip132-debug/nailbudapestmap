import Hero from "@/components/ui/Hero";
import SearchBar from "@/components/ui/SearchBar";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";
import dynamic from "next/dynamic";
import salons from "@/data/salons.json";

const Map = dynamic(() => import("@/components/ui/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <FeaturedSalons salons={salons} />
      <NearestSalons salons={salons} />

      <Map salons={salons} />

      <BlogSection />
      <OwnerSection />
    </main>
  );
}
