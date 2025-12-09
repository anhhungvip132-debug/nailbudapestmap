"use client";

export default function RegisterSection() {
  return (
    <div className="section card p-6">
      <h2 className="heading">Đăng ký thành viên</h2>
      <p className="text-gray-600">Nhận ưu đãi, thông tin mới nhất từ các salon.</p>

      <form className="mt-4">
        <input type="email" placeholder="Email của bạn..." />
        <button className="btn-primary mt-3 w-full">Đăng ký</button>
      </form>
    </div>
  );
}
