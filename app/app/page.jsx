"use client";

import HeroSlider from "@/components/HeroSlider";
import CategoryList from "@/components/CategoryList";
import PromoBanner from "@/components/PromoBanner";
import SalonSlider from "@/components/SalonSlider";
import PromoSlider from "@/components/PromoSlider";
import BlogSection from "@/components/BlogSection";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <CategoryList />
      <PromoBanner />
      <SalonSlider />
      <PromoSlider />
      <BlogSection />
      <ChatWidget />
    </div>
  );
}
