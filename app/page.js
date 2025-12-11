"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import Map from "@/components/ui/Map";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";
import salons from "@/data/salons.json";

export default function Home() {
  const [filters, setFilters] = useState({
    name: "",
    district: "all",
    service: "all"
  });

  const handleSearch = (payload) => {
    setFilters(payload);
  };

  const filteredSalons = useMemo(() => {
    return salons.filter((salon) => {
      const matchName = salon.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());

      const matchDistrict =
        filters.district === "all" ||
        salon.district.toLowerCase() === filters.district.toLowerCase();

      const matchService =
        filters.service === "all" ||
        salon.services.some(
          (s) => s.toLowerCase() === filters.service.toLowerCase()
        );

      return matchName && matchDistrict && matchService;
    });
  }, [filters]);

  return (
    <main className="min-h-screen bg-[#faf7fb]">
      {/* HERO đơn giản – dùng ảnh hero.jpg */}
      <section className="relative h-[260px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Nail Budapest Map"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center bg-black/30">
          <h1 className="px-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Tìm Salon Nail Tốt Nhất Tại Budapest
          </h1>
        </div>
      </section>

      {/* THANH TÌM KIẾM */}
      <section className="mx-auto mt-8 max-w-5xl px-4">
        <SearchBar salons={salons} onSearch={handleSearch} />
      </section>

      {/* SALON NỔI BẬT */}
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          💖 Featured Nail Salons
        </h2>
        <FeaturedSalons salons={filteredSalons} />
      </section>

      {/* SALON GẦN BẠN NHẤT + MAP */}
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          📍 Salon Gần Bạn Nhất
        </h2>
        <NearestSalons salons={filteredSalons} />
        <div className="mt-6 h-[420px] w-full overflow-hidden rounded-2xl shadow">
          <Map salons={filteredSalons} />
        </div>
      </section>

      {/* BLOG */}
      <section className="mx-auto mt-14 max-w-6xl px-4">
        <BlogSection />
      </section>

      {/* OWNER */}
      <section className="mx-auto my-14 max-w-6xl px-4">
        <OwnerSection />
      </section>
    </main>
  );
}
