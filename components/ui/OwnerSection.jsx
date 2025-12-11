"use client";

export default function OwnerSection() {
  return (
    <section className="mt-16 p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center">👩‍💼 Người sáng lập Nail Budapest Map</h2>

      <div className="flex items-center gap-6 justify-center mt-6">
        <img
          src="/images/owner.jpg"
          className="w-40 h-40 rounded-full object-cover"
        />
        <p className="max-w-xl text-lg">
          Xin chào! Tôi là <strong>người sáng lập dự án Nail Budapest Map</strong>.
          Mục tiêu của tôi là giúp cộng đồng tìm được salon nail tốt nhất tại Budapest.
        </p>
      </div>
    </section>
  );
}
