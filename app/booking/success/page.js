"use client";

import ButtonPink from "@/components/ui/ButtonPink";

export default function BookingSuccess() {
  return (
    <div className="max-w-xl mx-auto text-center py-20 px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Đặt lịch thành công!
      </h1>

      <p className="text-gray-600 mb-8 text-lg">
        Cảm ơn bạn! Yêu cầu đặt lịch đã được gửi đi.
        Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
      </p>

      <ButtonPink
        text="Quay lại trang chủ"
        href="/"
        className="mt-4"
      />
    </div>
  );
}
