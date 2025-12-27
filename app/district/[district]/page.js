// app/district/[district]/page.js

import Image from "next/image";
import Link from "next/link";

import salonsBase from "@/data/salons.json";
import { getAdminDb } from "@/lib/firebaseAdmin";
import RatingStars from "@/components/ui/RatingStars";
import PlanBadge from "@/components/ui/PlanBadge";
import { sortSalonsByGoogle } from "@/lib/sortSalonsByGoogle";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function DistrictPage({ params }) {
  const district = String(params.district);
  const db = getAdminDb();

  const snap = await db.collection("salons").get();

  const baseMap = new Map(
    salonsBase.map((s) => [String(s.id), s])
  );

  snap.forEach((doc) => {
    if (baseMap.has(doc.id)) {
      baseMap.set(doc.id, {
        ...baseMap.get(doc.id),
        ...doc.data(),
      });
    }
  });

  const list = Array.from(baseMap.values())
    .filter((s) => {
      const d = String(s.district || "")
        .replace("District", "")
        .trim();
      return d === district;
    })
    .sort(sortSalonsByGoogle);

  if (!list.length) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">
          No nail salons found in District {district}
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Nail Salons in District {district}, Budapest
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map((salon) => {
          const google = salon.google || {};

          return (
            <Link
              key={salon.id}
              href={`/salon/${salon.id}`}
              className="group bg-white border rounded-2xl overflow-hidden"
            >
              <div className="relative h-40">
                <Image
                  src={salon.image || "/images/salon-default.jpg"}
                  alt={salon.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex justify-between">
                  <h2 className="font-semibold">{salon.name}</h2>
                  <PlanBadge plan={salon.plan} />
                </div>

                {google.rating && (
                  <RatingStars rating={google.rating} />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
