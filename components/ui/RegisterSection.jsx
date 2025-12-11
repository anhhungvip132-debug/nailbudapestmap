"use client";
import { useState } from "react";

export default function RegisterSection() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const register = async () => {
    if (!email) return setMsg("Vui lòng nhập email!");

    const res = await fetch("/api/sendMail", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMsg("Đăng ký thành công!");
      setEmail("");
    } else {
      setMsg("Đăng ký thất bại!");
    }
  };

  return (
    <section className="my-16 max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-center text-3xl font-bold mb-4">
        ✨ Đăng ký thành viên
      </h2>

      <p className="text-center text-gray-600 mb-6">
        Nhận thông báo về các salon nổi bật & bài viết mới nhất!
      </p>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn…"
        className="w-full p-4 border rounded-xl shadow-sm mb-4 text-lg"
      />

      <button
        onClick={register}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-xl text-lg transition"
      >
        Đăng ký ngay
      </button>

      {msg && <p className="text-center mt-4 text-pink-600">{msg}</p>}
    </section>
  );
}
