"use client";

export default function RegisterSection() {
  return (
    <div className="section card p-6">
      <h2 className="heading">Đăng ký thành viên</h2>
      <p>Nhận ưu đãi đặc biệt và cập nhật mới nhất về các salon.</p>

      <form className="mt-4">
        <input type="email" placeholder="Nhập email của bạn…" />
        <button className="btn-primary mt-3 w-full">Đăng ký ngay</button>
      </form>
    </div>
  );
}
