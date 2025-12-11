import Hero from "@/components/ui/Hero";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedSalons />
      <NearestSalons />
      <BlogSection />
      <OwnerSection />
    </main>
  );
}
