export const metadata = {
  title: "Đặt lịch thành công | Nail Budapest Map",
  description: "Xác nhận đặt lịch tại Nail Budapest Map.",
};

export default function BookingSuccessPage({ searchParams }) {
  const name = searchParams.name || "Khách hàng";
  const service = searchParams.service || null;

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      {/* ICON */}
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-pink-100 flex items-center justify-center shadow-md animate-bounce">
          <span className="text-4xl">🎉</span>
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Đặt lịch thành công!
      </h1>

      {/* MESSAGE */}
      <p className="text-gray-700 text-lg mb-2">
        Cảm ơn <strong>{name}</strong>, yêu cầu đặt lịch của bạn đã được gửi.
      </p>

      {service && (
        <p className="text-gray-500 mb-4">
          Dịch vụ bạn đã chọn: <strong>{service}</strong>.
        </p>
      )}

      <p className="text-gray-500 mb-10">
        Salon sẽ sớm liên hệ để xác nhận thời gian và thông tin chi tiết.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col gap-3 items-center">
        <a
          href="/"
          className="w-full max-w-xs bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
        >
          Quay lại trang chủ
        </a>

        <a
          href="/salon"
          className="w-full max-w-xs border border-pink-300 text-pink-600 px-6 py-3 rounded-xl font-semibold hover:bg-pink-50 transition"
        >
          Xem các salon khác
        </a>
      </div>
    </div>
  );
}
