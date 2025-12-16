"use client";

import { useEffect, useState, useCallback } from "react";

import Hero from "@/components/ui/Hero";
import SearchBar from "@/components/ui/SearchBar";
import CategoryList from "@/components/ui/CategoryList";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import Map from "@/components/ui/Map";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

export default function HomeClient() {
  const [salons, setSalons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD SALONS
  useEffect(() => {
    let alive = true;

    fetch("/api/salons")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!alive) return;
        const list = Array.isArray(data) ? data : [];
        setSalons(list);
        setFiltered(list);
        setSelectedSalonId(list[0]?.id ?? null);
      })
      .catch(() => {
        if (!alive) return;
        setSalons([]);
        setFiltered([]);
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, []);

  // SEARCH
  const handleSearch = useCallback(
    (filters = {}) => {
      let list = [...salons];
      const { name = "", district = "", service = "", featuredOnly = false } =
        filters;

      if (name)
        list = list.filter((s) =>
          `${s.name} ${s.address}`.toLowerCase().includes(name.toLowerCase())
        );

      if (district)
        list = list.filter((s) =>
          String(s.district).toLowerCase().includes(district.toLowerCase())
        );

      if (service)
        list = list.filter((s) =>
          s.services?.some((x) =>
            String(x).toLowerCase().includes(service.toLowerCase())
          )
        );

      if (featuredOnly) list = list.filter((s) => s.featured);

      setFiltered(list);
      setSelectedSalonId(list[0]?.id ?? null);
    },
    [salons]
  );

  // GEOLOCATION
  useEffect(() => {
    if (!navigator?.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(
          `/api/nearest?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
        )
          .then((r) => (r.ok ? r.json() : []))
          .then((d) => setNearby(Array.isArray(d) ? d : []))
          .catch(() => setNearby([]));
      },
      () => setNearby([])
    );
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
          onSearch={handleSearch}
        />
      </div>

      {/* MAP */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        {loading ? (
          <div className="h-[520px] rounded-xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
            Đang tải bản đồ…
          </div>
        ) : filtered.length === 0 ? (
          <div className="h-[520px] rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
            Không tìm thấy salon phù hợp
          </div>
        ) : (
          <Map
            salons={filtered}
            selectedId={selectedSalonId}
            onSelectSalon={handleSelectSalon}
          />
        )}
      </div>

      <CategoryList onSelect={(v) => handleSearch({ service: v })} />

      <FeaturedSalons
        salons={filtered}
        onSelectSalon={handleSelectSalon}
      />

      <NearestSalons salons={nearby} onSelectSalon={handleSelectSalon} />

      <BlogSection />
      <OwnerSection />
    </div>
  );
}
