import PricingCard from "@/components/ui/PricingCard";
import { monetizationCopy } from "@/lib/monetizationCopy";

export const metadata = {
  title: "Advertise your nail salon – NailBudapestMap",
  description:
    "Promote your nail salon in Budapest with Premium or Sponsored plans.",
};

export default function AdvertisePage() {
  const t = monetizationCopy.hu; // đổi sang en nếu cần

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-pink-600 text-center">
        {t.heroTitle}
      </h1>
      <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
        {t.heroDesc}
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <PricingCard
          title={t.premium.title}
          price={t.premium.price}
          features={t.premium.features}
        />

        <PricingCard
          title={t.sponsored.title}
          price={t.sponsored.price}
          features={t.sponsored.features}
        />
      </div>

      <div className="text-center mt-12">
        <a
          href="mailto:contact@nailbudapestmap.com"
          className="inline-block bg-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-pink-700 transition"
        >
          {t.cta}
        </a>
      </div>
    </main>
  );
}
