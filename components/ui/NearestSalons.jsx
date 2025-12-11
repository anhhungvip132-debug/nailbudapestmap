import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function NearestSalons({ salons }) {
  return (
    <section className="mb-14">
      <h2 className="text-center text-3xl font-bold mb-6">📍 Salon Gần Bạn Nhất</h2>

      <Map salons={salons} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {salons.map((s, i) => (
          <div key={i} className="shadow rounded-xl bg-white p-4">
            <h3 className="font-semibold text-lg">{s.name}</h3>
            <p className="text-gray-600">{s.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
