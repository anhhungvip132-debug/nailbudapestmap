import Image from "next/image";

export default function OwnerSection() {
  return (
    <section className="section card p-8">
      <h2 className="heading">👩‍💼 Người sáng lập Nail Budapest Map</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <Image
          src="/images/owner.jpg"
          width={300}
          height={300}
          alt="Owner"
          className="rounded-full shadow-lg"
        />

        <p className="text-lg leading-relaxed">
          Xin chào! Tôi là <strong>người sáng lập dự án Nail Budapest Map</strong>. 
          Mục tiêu của tôi là mang đến trải nghiệm tìm kiếm salon nail tốt nhất 
          dành cho cộng đồng tại Budapest.
        </p>
      </div>
    </section>
  );
}
