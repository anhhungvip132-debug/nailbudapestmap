import Image from "next/image";

export default function SalonDetail({ salon }) {
  return (
    <div className="w-full">
      <Image
        src={salon.image}
        alt={salon.name}
        width={1600}
        height={900}
        className="rounded-xl object-cover w-full h-[380px]"
        priority
      />

      <h1 className="text-3xl font-bold mt-6">{salon.name}</h1>
      <p className="text-gray-600">{salon.address}</p>

      {/* Gallery */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        {salon.gallery?.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`gallery-${i}`}
            width={500}
            height={500}
            className="rounded-xl object-cover w-full h-[160px]"
          />
        ))}
      </div>
    </div>
  );
}
