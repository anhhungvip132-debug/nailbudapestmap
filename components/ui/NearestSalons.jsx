import Link from "next/link";
import Image from "next/image";

export default function NearestSalons({ salons }) {
  if (!salons || salons.length === 0)
    return <p className="text-gray-500">Không tìm thấy salon gần bạn.</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {salons.map((s) => (
        <Link
          key={s.id}
          href={`/salon/${s.id}`}
          className="bg-white rounded-xl shadow hover:shadow-xl transition"
        >
          <Image
            src={s.image}
            alt={s.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="p-4">
            <p className="font-bold text-lg">{s.name}</p>
            <p className="text-gray-600">{s.address}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
