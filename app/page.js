"use client";

import Hero from "@/components/ui/Hero";
import FeaturedSalons from "@/components/ui/FeaturedSalons";
import NearestSalons from "@/components/ui/NearestSalons";
import CategoryList from "@/components/ui/CategoryList";
import BlogSection from "@/components/ui/BlogSection";
import OwnerSection from "@/components/ui/OwnerSection";

import { useEffect, useState } from "react";

export default default function HomePage() {
  const [salons, setSalons] = useState([]);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    fetch("/api/salons")
      .then((res) => res.json())
      .then((data) => setSalons(data));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(
          `/api/nearby?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
        )
          .then((res) => res.json())
          .then((data) => setNearby(data));
      },
      () => setNearby([])
    );
  }, []);

  return (
    <>
      <Hero />
      <CategoryList />
      <FeaturedSalons salons={salons.filter((x) => x.featured)} />
      <NearestSalons salons={nearby} />
      <BlogSection />
      <OwnerSection />
    </>
  );
}
