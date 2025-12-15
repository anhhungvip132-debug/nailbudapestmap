"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/ui/Hero";
import SearchBar from "@/components/ui/SearchBar";

export default function HomeClient() {
  const [salons, setSalons] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let alive = true;

    fetch("/api/salons")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!alive) return;
        const safe = Array.isArray(data) ? data : [];
        setSalons(safe);
        setFiltered(safe);
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

        <div className="mt-6 text-green-600 text-sm">
          ✅ SearchBar rendered successfully
        </div>
      </div>
    </div>
  );
}
