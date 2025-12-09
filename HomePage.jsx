"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Header = dynamic(() => import("../components/ui/Header"), { ssr: false });
const HeroSlider = dynamic(() => import("../components/ui/HeroSlider"), { ssr: false });
const SearchBar = dynamic(() => import("../components/ui/SearchBar"), { ssr: false });
const CategoryList = dynamic(() => import("../components/ui/CategoryList"), { ssr: false });
const PromoBanner = dynamic(() => import("../components/ui/PromoBanner"), { ssr: false });
const PromoSlider = dynamic(() => import("../components/ui/PromoSlider"), { ssr: false });
const FeaturedAds = dynamic(() => import("../components/ui/FeaturedAds"), { ssr: false });
const ChatWidget = dynamic(() => import("../components/ui/ChatWidget"), { ssr: false });
const Map = dynamic(() => import("../components/ui/Map"), { ssr: false });
const NearestSalons = dynamic(() => import("../components/ui/NearestSalons"), { ssr: false });

export default function HomePage() {
  const [nearestSalons, setNearestSalons] = useState([]);
  const [loadingNearest, setLoadingNearest] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoadingNearest(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `/api/nearest?lat=${coords.latitude}&lng=${coords.longitude}&limit=3`
          );
          const data = await res.json();

          // FIX QUAN TRỌNG
          setNearestSalons(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
          console.error("Lỗi nearest salons:", error);
          setNearestSalons([]);
        } finally {
          setLoadingNearest(false);
        }
      },
      () => {
        setLoadingNearest(false);
        setNearestSalons([]);
      }
    );
  }, []);

  return (
    <div>
      <Header />
      <HeroSlider />
      <SearchBar />

      <CategoryList />
      <PromoBanner />

      {/* SALON GẦN VỊ TRÍ */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-bold text-center mb-6">Tiệm nail gần bạn</h2>

        {loadingNearest ? (
          <p className="text-center">Đang xác định vị trí…</p>
        ) : nearestSalons.length === 0 ? (
          <p className="text-center text-gray-500">Không tìm thấy salon gần bạn.</p>
        ) : (
          <>
            <NearestSalons salons={nearestSalons} />
            <Map salons={nearestSalons} />
          </>
        )}
      </section>

      <FeaturedAds />
      <PromoSlider />
      <ChatWidget />
    </div>
  );
}
