export default function Hero() {
  return (
    <section className="relative h-[350px] w-full rounded-2xl overflow-hidden mb-10">
      <img
        src="/images/hero.jpg"
        alt="Nail Budapest"
        className="object-cover w-full h-full opacity-70"
      />
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     text-white text-4xl font-bold text-center drop-shadow-lg">
        Tìm Salon Nail Tốt Nhất Tại Budapest
      </h1>
    </section>
  );
}
