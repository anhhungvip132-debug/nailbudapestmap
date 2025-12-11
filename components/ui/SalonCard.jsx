import Image from "next/image";

export default function SalonCard({ salon }) {
  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <Image
        src={`/images/${salon.image}`}
        alt={salon.name}
        width={400}
        height={260}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-bold">{salon.name}</h3>
        <p className="text-gray-600 text-sm">{salon.address}</p>
        <p className="text-pink-600 text-sm font-semibold">
          {salon.services?.slice(0, 3).join(" • ")}
        </p>
      </div>
    </div>
  );
}
