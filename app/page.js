// app/page.js
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

  /* ================= ORGANIZATION SCHEMA ================= */
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Nail Budapest Map",
      url: "https://nailbudapestmap.com",
      logo: "https://nailbudapestmap.com/images/og-cover.jpg",
      description:
        "Find the best nail salons in Budapest. Compare services, read reviews and book appointments.",
      areaServed: {
        "@type": "City",
        name: "Budapest",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);

  /* ================= LOAD SALONS ================= */
  useEffect(() => {
    fetch("/api/salons", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setSalons(list);
        setFiltered(list);
        setSelectedSalonId(list[0]?.id || null);
      })
      .catch(() => {
        setSalons([]);
        setFiltered([]);
      });
  }, []);

  /* ================= SEARCH + FILTER ================= */
  function handleSearch(filters = {}) {
    const {
      name = "",
      district = "",
      service = "",
      featuredOnly = false,
    } = filters;

    let list = [...salons];

    if (name) {
      const q = name.toLowerCase();
      list = list.filter((s) =>
        `${s.name} ${s.address}`.toLowerCase().includes(q)
      );
    }

    if (district) {
      const d = String(district).toLowerCase();
      list = list.filter((s) =>
        String(s.district).toLowerCase().includes(d)
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

    if (featuredOnly) {
      list = list.filter((s) => s.featured);
    }

    setFiltered(list);
    setSelectedSalonId(list[0]?.id || null);
  }

  /* ================= LOAD NEAREST SALONS ================= */
  useEffect(() => {
    if (!navigator?.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(
          `/api/nearest?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`,
          { cache: "no-store" }
        )
          .then((res) => res.json())
          .then((data) =>
            setNearby(Array.isArray(data) ? data : [])
          )
          .catch(() => setNearby([]));
      },
      () => setNearby([])
    );
  }, []);

  function handleCategory(value) {
    handleSearch({ service: value || "" });
  }

  function handleSelectSalon(salon) {
    if (!salon?.id) return;
    setSelectedSalonId(salon.id);
  }

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
        <Map
          salons={filtered}
          heightClass="h-[520px]"
          selectedId={selectedSalonId}
        />
      </div>

      <CategoryList onSelect={handleCategory} />
      <FeaturedSalons salons={filtered} onSelectSalon={handleSelectSalon} />
      <NearestSalons salons={nearby} onSelectSalon={handleSelectSalon} />
      <BlogSection />
      <OwnerSection />
    </div>
  );
}
