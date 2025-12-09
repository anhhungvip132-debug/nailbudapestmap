"use client";

import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import HeroSlider from "@/components/ui/HeroSlider";
import SearchBar from "@/components/ui/SearchBar";
import CategoryList from "@/components/ui/CategoryList";
import NearestSalons from "@/components/ui/NearestSalons";
import FeaturedAds from "@/components/ui/FeaturedAds";
import Map from "@/components/ui/Map";

export default function HomePage() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const res = await fetch("/api/salons");
        const json = await res.json();

        const normalized = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
          ? json.data
          : [];

        setSalons(normalized);
      } catch (err) {
        console.error("Failed to load salons", err);
        setSalons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const safeSalons = Array.isArray(salons) ? salons : [];

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Header />
      <section className="container section">
        <HeroSlider salons={safeSalons} />
        <SearchBar salons={safeSalons} />
        <CategoryList salons={safeSalons} />
        <NearestSalons salons={safeSalons} />
        <FeaturedAds salons={safeSalons} />
        <div className="mt-6">
          {!loading && <Map salons={safeSalons} />}
        </div>
      </section>
    </main>
  );
}
