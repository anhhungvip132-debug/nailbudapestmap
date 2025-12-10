import HeroSlider from "@/components/ui/HeroSlider";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

export default function HomePage() {
  return (
    <main className="container">
      <HeroSlider />
      <FeaturedSalons />
      <BlogSection />
      <OwnerSection />
    </main>
  );
}
