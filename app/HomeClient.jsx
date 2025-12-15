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

  // Fetch salons
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
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, []);

  // Search / filter
  const handleSearch = useCallback(
    (filters = {}) => {
      const {
        name = "",
        district = "",
        service = "",
        featuredOnly = false,
      } = filters;

      let list = Array.isArray(salons) ? [...salons] : [];

      if (name) {
        const q = name.toLowerCase();
        list = list.filter((s) =>
          `${s.name ?? ""} ${s.address ?? ""}`.toLowerCase().includes(q)
        );
      }

      if (district) {
        const d = String(district).toLowerCase();
        list = list.filter((s) =>
          String(s.district ?? "").toLowerCase().includes(d)
        );
      }

      if (service) {
        const sv = service.toLowerCase();
        list = list.filter(
          (s) =>
            Array.isArray(s.services) &&
            s.services.some((x) =>
              String(x).toLowerCase().includes(sv)
            )
        );
      }

      if (featuredOnly) {
        list = list.filter((s) => s.featured);
      }

      setFiltered(list);
      setSelectedSalonId(list.length ? list[0].id : null);
    },
    [salons]
  );

  // Geolocation
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setNearby([]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(
          `/api/nearest?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
        )
          .then((res) => (res.ok ? res.json() : []))
          .then((data) =>
            setNearby(Array.isArray(data) ? data : [])
          )
          .catch(() => setNearby([]));
      },
      () => setNearby([])
    );
  }, []);

  const handleCategory = useCallback(
    (value) => handleSearch({ service: value || "" }),
    [handleSearch]
  );

  const handleSelectSalon = useCallback((salon) => {
    if (salon?.id) setSelectedSalonId(salon.id);
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

        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-4">
          <span>⭐ Gợi ý salon uy tín</span>
          <span>📍 Xem salon trên bản đồ</span>
          <span>⚡ Đặt lịch nhanh chóng</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-16">
        {!loading && (
          <Map
            salons={filtered}
            heightClass="h-[520px]"
            selectedId={selectedSalonId}
          />
        )}
      </div>

      <CategoryList onSelect={handleCategory} />

      <FeaturedSalons
        salons={filtered}
        onSelectSalon={handleSelectSalon}
      />

      <NearestSalons
        salons={nearby}
        onSelectSalon={handleSelectSalon}
      />

      <BlogSection />
      <OwnerSection />
    </div>
  );
}
