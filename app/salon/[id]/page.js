import salons from "@/data/salons.json";
import Image from "next/image";
import RatingStars from "@/components/ui/RatingStars";
import ButtonPink from "@/components/ui/ButtonPink";

export default function SalonDetail({ params }) {
  const salon = salons.find((s) => s.id == params.id);

  if (!salon)
    return <p className="p-10 text-center">Salon không tồn tại.</p>;

  return (
    <div className="container py-10">
      {/* IMAGE */}
      <div className="relative w-full h-56 rounded-3xl overflow-hidden shadow-lg">
        <Image
          src={salon.image || "/images/salon-default.jpg"}
          alt={salon.name}
          fill
          className="object-cover"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-pink-600 mt-6">{salon.name}</h1>
      <p className="text-gray-600 mt-2">{salon.address}</p>

      {/* RATING */}
      <RatingStars rating={salon.rating || 4.5} />

      {/* CTA */}
      <ButtonPink text="Đặt lịch ngay" className="mt-6" />

      {/* DESCRIPTION */}
      <div className="card p-6 mt-8">
        <h2 className="heading text-left">Mô tả</h2>
        <p>{salon.description || "Salon chưa có mô tả."}</p>
      </div>
    </div>
  );
}
