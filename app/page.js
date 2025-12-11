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
      });
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(`/api/nearby?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`)
          .then((r) => r.json())
          .then((d) => setNearby(d));
      },
      () => setNearby([])
    );
  }, []);

  function handleSearch(filters) {
    let list = [...salons];

    if (filters.name)
      list = list.filter((s) =>
        (s.name + s.address).toLowerCase().includes(filters.name.toLowerCase())
      );

    if (filters.district)
      list = list.filter((s) => String(s.district) === String(filters.district));

    if (filters.service)
      list = list.filter(
        (s) =>
          Array.isArray(s.services) &&
          s.services.some((sv) =>
            sv.toLowerCase().includes(filters.service.toLowerCase())
          )
      );

    setFiltered(list);
  }

  function handleCategory(value) {
    if (!value) {
      setFiltered(salons);
      return;
    }
    const list = salons.filter(
      (s) =>
        Array.isArray(s.services) &&
        s.services.some((sv) => sv.toLowerCase().includes(value.toLowerCase()))
    );
    setFiltered(list);
  }

  return (
    <div className="pb-20">
      <Hero />

      {/* SEARCH BAR (CHỈ GIỮ 1 THANH TÌM KIẾM NÀY) */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 mb-10">
        <SearchBar onSearch={handleSearch} size="lg" />
      </div>

      {/* MAP */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <Map salons={filtered} heightClass="h-[520px]" />
      </div>

      {/* CATEGORY (✨ Manicure Pedicure ...) */}
      <CategoryList onSelect={handleCategory} />

      {/* FEATURED SALONS */}
      <FeaturedSalons salons={salons} />

      {/* NEAREST SALONS */}
      <NearestSalons salons={nearby} />

      {/* BLOG */}
      <BlogSection />

      {/* ABOUT + CUSTOMER SIGNUP */}
      <OwnerSection />
    </div>
  );
}
