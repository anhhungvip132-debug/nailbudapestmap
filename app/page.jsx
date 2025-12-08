"use client";

import HeroSlider from "@/components/ui/HeroSlider";
import CategoryList from "@/components/ui/CategoryList";
import PromoBanner from "@/components/ui/PromoBanner";
import PromoSlider from "@/components/ui/PromoSlider";
import FeaturedAds from "@/components/ui/FeaturedAds";
import NearestSalons from "@/components/ui/NearestSalons";
import MapComponent from "@/components/ui/Map";

import salons from "@/lib/salons.json";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Category List */}
      <div className="container mx-auto mt-10">
        <CategoryList />
      </div>

      {/* Promo Banner */}
      <div className="container mx-auto mt-10">
        <PromoBanner />
      </div>

      {/* Promo Slider */}
      <div className="container mx-auto mt-10">
        <PromoSlider />
      </div>

      {/* Google Map */}
      <div className="container mx-auto mt-12">
        <MapComponent salons={salons} />
      </div>

      {/* Nearest Salons */}
      <div className="container mx-auto mt-12">
        <NearestSalons />
      </div>

      {/* Featured Ads */}
      <div className="container mx-auto mt-12 mb-20">
        <FeaturedAds />
      </div>
    </div>
  );
}
