"use client";

import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import HeroSlider from "@/components/ui/HeroSlider";
import SearchBar from "@/components/ui/SearchBar";
import CategoryList from "@/components/ui/CategoryList";
import NearestSalons from "@/components/ui/NearestSalons";
import FeaturedAds from "@/components/ui/FeaturedAds";
import BlogList from "@/components/ui/BlogList";
import IntroSection from "@/components/ui/IntroSection";
import RegisterSection from "@/components/ui/RegisterSection";
import Map from "@/components/ui/Map";

export default function HomePage() {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/salons");
      const data = await res.json();
      const safe = Array.isArray(data) ? data : data?.data ?? [];
      setSalons(safe);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Header />

      <section className="container section">
        <HeroSlider salons={salons} />
        <SearchBar salons={salons} />
        <CategoryList salons={salons} />
        <NearestSalons salons={salons} />
        <FeaturedAds salons={salons} />
        <BlogList />
        <IntroSection />
        <RegisterSection />

        <div className="mt-10">
          <Map salons={salons} />
        </div>
      </section>
    </main>
  );
}
