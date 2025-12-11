"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/ui/Hero";
import SearchBar from "@/components/ui/SearchBar";
import CategoryList from "@/components/ui/CategoryList";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import Map from "@/components/ui/Map";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

export default function HomePage() {
  const [salons, setSalons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    fetch("/api/salons")
      .then((r) => r.json())
      .then((d) => {
        setSalons(d);
        setFiltered(d);
      })
      .catch(() => {
        setSalons([]);
        setFiltered([]);
      });
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(
          `/api/nearby?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
        )
          .then((r) => r.json())
          .then((d) => setNearby(d))
          .catch(() => setNearby([]));
      },
      () => setNearby([])
    );
  }, []);

  function handleSearch(filters = {}) {
    const { name = "", district = "", service = "" } = filters;

    let list = [...salons];

    if (name) {
      const q = name.toLowerCase();
      list = list.filter((s) =>
        (s.name + " " + s.address).toLowerCase().includes(q)
      );
    }

    if (district) {
      list = list.filter(
        (s) => String(s.district).toLowerCase() === String(district).toLowerCase()
      );
    }

    if (service) {
      const sv = service.toLowerCase();
      list = list.filter(
        (s) =>
          Array.isArray(s.services) &&
          s.services.some((x) => x.toLowerCase().includes(sv))
      );
    }

    setFiltered(list);
  }

  function handleCategory(value) {
    handleSearch({ name: "", district: "", service: value || "" });
  }

  return (
    <div className="pb-20">
      <Hero />

      <div className="max-w-5xl mx-auto px-4 -mt-8 mb-10">
        <SearchBar onSearch={handleSearch} size="lg" />
        <div className="flex flex-wrap gap-6 text-sm text-gray-500 mt-3">
          <span>⭐ Gợi ý salon uy tín</span>
          <span>📍 Xem salon trên bản đồ</span>
          <span>⚡ Đặt lịch nhanh chóng</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-16">
        <Map salons={filtered} heightClass="h-[520px]" />
      </div>

      <CategoryList onSelect={handleCategory} />

      <FeaturedSalons salons={filtered} />

      <NearestSalons salons={nearby} />

      <BlogSection />

      <OwnerSection />
    </div>
  );
}
