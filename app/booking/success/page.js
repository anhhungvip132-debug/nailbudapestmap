export default function BookingSuccess() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-bold text-pink-600">🎉 Đặt lịch thành công!</h1>

      <p className="text-gray-700 mt-4">
        Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu đặt lịch và salon sẽ liên hệ sớm nhất.
      </p>

      <a
        href="/"
        className="inline-block mt-8 bg-pink-600 text-white px-6 py-3 rounded-xl font-medium"
      >
        Quay lại trang chủ
      </a>
    </div>
  );
}
