import Image from "next/image";
import Link from "next/link";
import salonsData from "@/data/salons.json";

export default function FeaturedSalons({ salons }) {
  // nếu filter không trả về salon featured nào thì fallback dùng từ toàn bộ data
  const featured =
    salons.filter((s) => s.featured) ??
    salonsData.filter((s) => s.featured);

  if (!featured.length) {
    return <p className="text-sm text-gray-500">Chưa có salon nổi bật.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {featured.map((salon) => (
        <article
          key={salon.id}
          className="flex flex-col overflow-hidden rounded-2xl bg-white shadow hover:-translate-y-1 hover:shadow-lg transition"
        >
          <div className="relative h-40 w-full">
            <Image
              src={salon.image}
              alt={salon.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-base font-semibold text-gray-900">
              {salon.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{salon.address}</p>
            <p className="mt-2 line-clamp-2 text-xs text-gray-600">
              Dịch vụ: {salon.services.join(", ")}
            </p>
            <div className="mt-3 flex gap-2 text-[11px] text-pink-600">
              <span className="rounded-full bg-pink-50 px-2 py-1">
                {salon.district}
              </span>
              {salon.featured && (
                <span className="rounded-full bg-yellow-50 px-2 py-1">
                  ⭐ Đề xuất
                </span>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <Link
                href={`/salon/${salon.id}`}
                className="text-xs font-semibold text-pink-600 hover:text-pink-700"
              >
                Xem chi tiết →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
