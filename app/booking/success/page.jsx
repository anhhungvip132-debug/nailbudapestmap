export default function BookingSuccess() {
  return (
    <div className="max-w-md mx-auto text-center py-20 px-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        🎉 Đặt lịch thành công!
      </h1>
      <p className="text-gray-600 mb-6">
        Chúng tôi đã gửi yêu cầu đặt lịch của bạn đến salon.  
        Họ sẽ liên hệ lại trong thời gian sớm nhất.
      </p>
      <a
        href="/"
        className="inline-block bg-pink-500 px-6 py-3 text-white rounded-xl font-semibold hover:bg-pink-600"
      >
        Quay lại trang chủ
      </a>
    </div>
  );
}
