import Image from "next/image";

export default function OwnerSection() {
  return (
    <section className="my-16">
      <h2 className="text-center text-3xl font-bold mb-8">
        👩‍💼 Người sáng lập Nail Budapest Map
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
        <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-md">
          <Image
            src="/images/owner.jpg"
            alt="Owner"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-gray-700 leading-relaxed text-lg">
          Xin chào! Tôi là <b>người sáng lập dự án Nail Budapest Map</b>. Mục
          tiêu của tôi là mang đến trải nghiệm tìm kiếm salon nail tốt nhất cho
          cộng đồng tại Budapest.
        </p>
      </div>
    </section>
  );
}
