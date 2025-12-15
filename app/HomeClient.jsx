"use client";

import { useEffect, useState, useCallback } from "react";

import Hero from "@/components/ui/Hero";
import SearchBar from "@/components/ui/SearchBar";
import CategoryList from "@/components/ui/CategoryList";
import FeaturedSalons from "@/components/ui/FeaturedSalons";

export default function HomeClient() {
  const [salons, setSalons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedSalonId, setSelectedSalonId] = useState(null);

  useEffect(() => {
    let alive = true;

    fetch("/api/salons")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!alive) return;
        const safe = Array.isArray(data) ? data : [];
        setSalons(safe);
        setFiltered(safe);
        setSelectedSalonId(safe.length ? safe[0].id : null);
      })
      .catch(() => {
        if (!alive) return;
        setSalons([]);
        setFiltered([]);
      });

    return () => {
      alive = false;
    };
  }, []);

  const handleCategory = useCallback(() => {
    // tạm thời không lọc, chỉ test render
  }, []);

  const handleSelectSalon = useCallback((salon) => {
    if (salon?.id) setSelectedSalonId(salon.id);
  }, []);

  return (
    <div className="pb-24">
      <Hero />

      <div className="max-w-5xl mx-auto px-4 -mt-10 mb-8">
        <SearchBar
          size="lg"
          salons={salons}
          totalResults={filtered.length}
          onSearch={() => {}}
        />
      </div>

      <CategoryList onSelect={handleCategory} />

      <FeaturedSalons
        salons={filtered}
        onSelectSalon={handleSelectSalon}
      />

      <div className="mt-6 text-green-600 text-sm text-center">
        ✅ FeaturedSalons rendered successfully
      </div>
    </div>
  );
}
