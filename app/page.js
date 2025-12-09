"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

/* ====== IMPORT COMPONENTS (DYNAMIC) ====== */
const Header = dynamic(() => import("../components/ui/Header"), { ssr: false });
const HeroSlider = dynamic(() => import("../components/ui/HeroSlider"), {
  ssr: false,
});
const SearchBar = dynamic(() => import("../components/ui/SearchBar"), {
  ssr: false,
});
const CategoryList = dynamic(
  () => import("../components/ui/CategoryList"),
  { ssr: false }
);
const PromoBanner = dynamic(
  () => import("../components/ui/PromoBanner"),
  { ssr: false }
);

const PromoSlider = dynamic(() => import("../components/ui/PromoSlider"), {
  ssr: false,
  loading: () => <p className="text-center py-6">Đang tải khuyến mãi…</p>,
});

const FeaturedAds = dynamic(() => import("../components/ui/FeaturedAds"), {
  ssr: false,
  loading: () => (
    <p className="text-center py-6">Đang tải salon nổi bật…</p>
  ),
});

const ChatWidget = dynamic(() => import("../components/ui/ChatWidget"), {
  ssr: false,
});

const Map = dynamic(() => import("../components/ui/Map"), {
  ssr: false,
});

const NearestSalons = dynamic(
  () => import("../components/ui/NearestSalons"),
  { ssr: false }
);

/* ====== BLOG SECTION ====== */
function BlogSection() {
  return (
    <section id="blog" className="max-w-7xl mx-auto mt-20 px-4 mb-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        From the Blog
      </h2>

      {/* BLOG 1 */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white p-6 rounded-2xl shadow">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
          alt="Blog nail"
          width={1200}
          height={700}
          className="w-full md:w-1/2 h-64 object-cover rounded-xl"
          loading="lazy"
        />

        <div className="md:w-1/2">
          <h3 className="font-bold text-2xl mb-3">Nail Trends in Budapest</h3>
          <p className="text-gray-600">Các xu hướng nail hot nhất Budapest.</p>
        </div>
      </div>

      {/* BLOG 2 */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-2xl shadow">
        <div className="md:w-1/2 order-2 md:order-1">
          <h3 className="font-bold text-2xl mb-3">Holiday Nail Designs</h3>
          <p className="text-gray-600">
            Những mẫu nail tuyệt đẹp dành cho các mùa lễ hội &amp; sự kiện.
          </p>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
          alt="Holiday Nails"
          width={1200}
          height={700}
          className="w-full md:w-1/2 h-64 object-cover rounded-xl order-1 md:order-2"
          loading="lazy"
        />
      </div>
    </section>
  );
}

/* ====== CONTACT SECTION ====== */
function ContactSection() {
  return (
    <section className="bg-pink-50 py-16 px-4 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">
            🌸 Thông tin liên hệ
          </h2>
          <p className="text-gray-700">
            Hỗ trợ – hợp tác – quảng cáo salon.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-pink-600 mb-4 text-center">
            Đăng ký thành viên
          </h3>

          <div className="space-y-4">
            <input
              className="w-full border px-4 py-3 rounded-xl"
              placeholder="Họ và tên"
            />
            <input
              className="w-full border px-4 py-3 rounded-xl"
              placeholder="Email"
            />
            <input
              className="w-full border px-4 py-3 rounded-xl"
              placeholder="Số điện thoại"
            />

            <button className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== FEATURED ADS LIST ====== */
const featuredList = [
  {
    id: 1,
    name: "Edi Nails Premium",
    address: "Mozsár u. 6, Budapest",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1558211583-d26f610c97f6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Luxury Nail Spa",
    address: "Jókai tér 1, Budapest",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "VIP Nail Design Budapest",
    address: "József krt. 36, Budapest",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1604654894610-68efc5f95f31?auto=format&fit=crop&w=900&q=80",
  },
];

/* ====== HOME PAGE ====== */
export default function HomePage() {
  const [nearestSalons, setNearestSalons] = useState([]);
  const [loadingNearest, setLoadingNearest] = useState(true);
  const [searchFilters, setSearchFilters] = useState(null); // để dùng sau

  // LẤY TIỆM NAIL GẦN NHẤT
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
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
          setNearestSalons(data || []);
        } catch (e) {
          console.error("Lỗi tải nearest salons:", e);
          setNearestSalons([]);
        } finally {
          setLoadingNearest(false);
        }
      },
      () => {
        setLoadingNearest(false);
      }
    );
  }, []);

  const handleFilterChange = (filter) => {
    console.log("Filter từ SearchBar:", filter);
    setSearchFilters(filter);
    // TODO: Có thể gọi /api/salons để lọc thật
  };

  return (
    <div>
      <Header />
      <HeroSlider />

      {/* THANH TÌM KIẾM */}
      <SearchBar onFilter={handleFilterChange} />

      <CategoryList />
      <PromoBanner />

      {/* TIỆM NAIL GẦN VỊ TRÍ */}
      <section className="max-w-7xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Tiệm nail gần vị trí của bạn
        </h2>

        {loadingNearest ? (
          <p className="text-center text-gray-500">Đang xác định vị trí…</p>
        ) : nearestSalons.length === 0 ? (
          <p className="text-center text-gray-500">
            Không tìm thấy tiệm nail gần bạn.
          </p>
        ) : (
          <>
            <NearestSalons salons={nearestSalons} />
            <Map salons={nearestSalons} />
          </>
        )}
      </section>

      {/* QUẢNG CÁO SALONS NỔI BẬT */}
      <FeaturedAds salons={featuredList} />

      <PromoSlider />
      <BlogSection />
      <ContactSection />
      <ChatWidget />
    </div>
  );
}
