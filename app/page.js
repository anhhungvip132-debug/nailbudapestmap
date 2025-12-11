"use client";

import Hero from "@/components/ui/Hero";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-20 pb-20">
      {/* Banner chính */}
      <Hero />

      {/* Salon Nổi Bật */}
      <section id="featured-salons" className="scroll-mt-20">
        <FeaturedSalons />
      </section>

      {/* Salon Gần Nhất */}
      <section id="nearest-salons" className="scroll-mt-20">
        <NearestSalons />
      </section>

      {/* Blog - Bài viết mới */}
      <section id="blogs" className="scroll-mt-20">
        <BlogSection />
      </section>

      {/* Người sáng lập */}
      <section id="owner" className="scroll-mt-20">
        <OwnerSection />
      </section>
    </main>
  );
}
