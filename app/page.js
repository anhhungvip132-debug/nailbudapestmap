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

  // Load salons
  useEffect(() => {
    fetch("/api/salons")
      .then((res) => res.json())
      .then((data) => {
        setSalons(data);
        setFiltered(data); // default load
      })
      .catch(() => {
        setSalons([]);
        setFiltered([]);
      });
  }, []);

  // Get nearest salons
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

  // Handle search bar filter
  function handleSearch(filters) {
    let data = [...salons];

    const { name, district, service } = filters;

    // Filter by name
    if (name) {
      const q = name.toLowerCase();
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
      );
    }

    // Filter by district
    if (district) {
      data = data.filter((s) => s.district == district);
    }

    // Filter by service
    if (service) {
      data = data.filter(
        (s) =>
          Array.isArray(s.services) &&
          s.services.some((sv) =>
            sv.toLowerCase().includes(service.toLowerCase())
          )
      );
    }

    setFiltered(data);
  }

  // Category filter
  function handleCategorySelect(service) {
    if (!service) {
      setFiltered(salons);
      return;
    }

    const result = salons.filter(
      (s) =>
        Array.isArray(s.services) &&
        s.services.some((sv) =>
          sv.toLowerCase().includes(service.toLowerCase())
        )
    );

    setFiltered(result);
  }

  return (
    <div className="pb-16">
      {/* HERO */}
      <Hero />

      {/* SEARCH BAR FULL WIDTH */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* MAP */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 mb-12">
        <Map salons={filtered} heightClass="h-[420px]" />
      </div>

      {/* CATEGORIES */}
      <CategoryList onSelect={handleCategorySelect} />

      {/* FEATURED SALONS */}
      <FeaturedSalons salons={salons} />

      {/* NEARBY SALONS */}
      <NearestSalons salons={nearby} />

      {/* BLOG */}
      <BlogSection />

      {/* ABOUT YOU */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 mt-12 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          👩‍💼 Giới thiệu về tôi
        </h2>

        <div className="bg-white border border-pink-100 rounded-2xl shadow-sm p-6 leading-relaxed text-gray-700">
          Xin chào! Tôi là người xây dựng nền tảng Nail Budapest Map nhằm giúp
          cộng đồng người Việt tại Budapest tìm kiếm những tiệm nail chất lượng,
          uy tín và phù hợp nhu cầu.
          <br />
          <br />
          Sứ mệnh của tôi là mang đến trải nghiệm tìm salon nhanh nhất, rõ ràng
          nhất, trực quan nhất — kết hợp bản đồ, đánh giá, dịch vụ và thông tin
          minh bạch cho người dùng.
        </div>
      </section>

      {/* CUSTOMER SIGNUP */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          📝 Đăng ký khách hàng
        </h2>
        <p className="text-gray-600 mb-4">
          Nhận thông tin ưu đãi, giảm giá salon và bài viết làm đẹp mới nhất.
        </p>

        <div className="bg-white border border-pink-100 rounded-2xl shadow-sm p-5 max-w-md">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200 mb-3"
          />
          <button className="w-full rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition">
            Đăng ký
          </button>
        </div>
      </section>
    </div>
  );
}
