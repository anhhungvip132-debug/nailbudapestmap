"use client";

import Hero from "@/components/ui/Hero";
import SearchBar from "@/components/ui/SearchBar";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

import salons from "@/data/salons.json";
import { useState } from "react";

export default function Home() {
  const [filtered, setFiltered] = useState(salons);

  return (
    <main className="max-w-6xl mx-auto px-4 pb-20">
      <Hero />

      {/* SEARCH BAR */}
      <SearchBar salons={salons} setFiltered={setFiltered} />

      {/* FEATURED SALONS */}
      <FeaturedSalons salons={filtered.slice(0, 3)} />

      {/* NEAREST SALONS & MAP */}
      <NearestSalons salons={filtered} />

      {/* BLOG + OWNER */}
      <BlogSection />
      <OwnerSection />
    </main>
  );
}
