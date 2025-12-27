export default function SalonServices({ salon }) {
  return (
    <div className="border rounded-2xl p-6 space-y-4">
      <h3 className="font-semibold text-lg">
        Dịch vụ (đồng bộ từ Fresha)
      </h3>

      {salon.services.map((s) => (
        <div
          key={s.id}
          className="flex justify-between border p-4 rounded-xl"
        >
          <div>
            <p className="font-medium">{s.name}</p>
            <p className="text-sm text-gray-500">
              {s.duration} phút
            </p>
          </div>
          <p className="text-green-600 font-semibold">
            {s.price.toLocaleString()} Ft
          </p>
        </div>
      ))}

      <a
        href={salon.freshaUrl}
        target="_blank"
        className="block text-center bg-green-600 text-white py-4 rounded-full font-semibold"
      >
        Đặt lịch trực tiếp trên Fresha
      </a>
    </div>
  );
}
