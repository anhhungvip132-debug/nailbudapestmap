export const metadata = {
  title: "Đặt lịch thành công | Nail Budapest Map",
  description: "Xác nhận đặt lịch tại Nail Budapest Map.",
};

export default function BookingSuccessPage() {
  return (
    <div className="max-w-md mx-auto text-center py-20 px-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        🎉 Đặt lịch thành công!
      </h1>

      <p className="text-gray-700 mb-4">
        Cảm ơn bạn, chúng tôi đã nhận được yêu cầu đặt lịch của bạn.
      </p>

      <p className="text-gray-500 mb-8">
        Salon sẽ liên hệ lại để xác nhận chi tiết thời gian và dịch vụ.
      </p>

      <a
        href="/"
        className="inline-flex items-center justify-center rounded-xl bg-pink-500 px-6 py-3 text-sm font-semibold text-white hover:bg-pink-600 transition"
      >
        Quay lại trang chủ
      </a>
    </div>
  );
}