export default function PriceList({ prices }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      {prices.map((p, i) => (
        <div
          key={i}
          className="flex justify-between py-4 border-b last:border-none"
        >
          <span className="text-gray-700">{p.name}</span>
          <span className="font-bold text-pink-600">{p.price} Ft</span>
        </div>
      ))}
    </div>
  );
}
