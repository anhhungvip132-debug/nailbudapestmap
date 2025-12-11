import Image from "next/image";

export default function OwnerSection() {
  return (
    <section className="rounded-3xl bg-pink-50 p-6 shadow">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
        👩‍💼 Người sáng lập Nail Budapest Map
      </h2>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
        <div className="relative h-40 w-40 overflow-hidden rounded-full">
          <Image
            src="/images/owner.jpg"
            alt="Owner"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-sm leading-relaxed text-gray-700">
          Xin chào! Tôi là người sáng lập dự án <b>Nail Budapest Map</b>. Mục
          tiêu của tôi là giúp cộng đồng tại Budapest dễ dàng tìm được những
          salon nail uy tín, đẹp và phù hợp với phong cách của mình.
        </p>
      </div>
    </section>
  );
}
