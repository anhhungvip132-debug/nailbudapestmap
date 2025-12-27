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
  const [selectedSalonId, setSelectedSalonId] = useState(null);

  /* ================= LOAD SALONS ================= */
  useEffect(() => {
    fetch("/api/salons", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setSalons(list);
        setFiltered(list);
        setSelectedSalonId(list[0]?.id || null);
      });
  }, []);

  /* ================= SEARCH ================= */
  function handleSearch(filters = {}) {
    const { name = "", district = "", service = "", featuredOnly = false } =
      filters;

    let list = [...salons];

    if (name) {
      const q = name.toLowerCase();
      list = list.filter((s) =>
        `${s.name} ${s.address}`.toLowerCase().includes(q)
      );
    }

    if (district) {
      list = list.filter((s) =>
        String(s.district).toLowerCase().includes(String(district).toLowerCase())
      );
    }

    if (service) {
      list = list.filter(
        (s) =>
          Array.isArray(s.services) &&
          s.services.some((x) =>
            x.toLowerCase().includes(service.toLowerCase())
          )
      );
    }

    if (featuredOnly) list = list.filter((s) => s.featured);

    setFiltered(list);
    setSelectedSalonId(list[0]?.id || null);
  }

  /* ================= NEAREST ================= */
  useEffect(() => {
    if (!navigator?.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      fetch(
        `/api/nearest?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`,
        { cache: "no-store" }
      )
        .then((res) => res.json())
        .then((data) => setNearby(Array.isArray(data) ? data : []));
    });
  }, []);

  return (
    <div className="pb-24">
      <Hero />

      <div className="max-w-5xl mx-auto px-4 -mt-10 mb-8">
        <SearchBar
          size="lg"
          onSearch={handleSearch}
          salons={salons}
          totalResults={filtered.length}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-16">
        <Map salons={filtered} selectedId={selectedSalonId} />
      </div>

      <CategoryList onSelect={(v) => handleSearch({ service: v })} />
      <FeaturedSalons salons={filtered.filter((s) => s.featured)} />
      <NearestSalons salons={nearby} />
      <BlogSection />
      <OwnerSection />
    </div>
  );
}
