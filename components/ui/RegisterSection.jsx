"use client";
import ButtonPink from "./ButtonPink";

export default function RegisterSection() {
  return (
    <div className="section card p-6 text-center">
      <h2 className="heading">Đăng ký thành viên</h2>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Xin chào! Tôi là <span className="text-pink-600 font-semibold">Chủ trang Nail Budapest Map</span> —
        nơi tôi tổng hợp các salon chất lượng, dịch vụ tốt và chăm sóc tận tâm
        dành cho cộng đồng người Việt tại Budapest.  
        <br /><br />
        Hãy đăng ký để nhận ưu đãi đặc biệt và cập nhật những mẫu nail đẹp nhất mỗi tuần!
      </p>

      <input
        type="email"
        placeholder="Nhập email của bạn"
        className="w-full p-3 rounded-xl border border-gray-300"
      />

      <ButtonPink text="Đăng ký ngay" className="w-full mt-3" />
    </div>
  );
}
