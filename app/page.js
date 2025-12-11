"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/ui/Hero";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import CategoryList from "@/components/ui/CategoryList";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

export default function HomePage() {
  const [salons, setSalons] = useState([]);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    fetch("/api/salons")
      .then((res) => res.json())
      .then((data) => setSalons(data))
      .catch(() => setSalons([]));
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(
          `/api/nearby?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
        )
          .then((res) => res.json())
          .then((data) => setNearby(data))
          .catch(() => setNearby([]));
      },
      () => setNearby([])
    );
  }, []);

  return (
    <>
      <Hero />
      <CategoryList />
      <FeaturedSalons salons={salons} />
      <NearestSalons salons={nearby} />
      <BlogSection />
      <OwnerSection />
    </>
  );
}
