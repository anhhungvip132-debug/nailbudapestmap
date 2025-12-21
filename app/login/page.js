export const dynamic = "force-dynamic";

"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const login = () => {
    localStorage.setItem("userEmail", email);
    alert("Đăng nhập thành công!");
    window.location.href = "/";
  };

  return (
    <div className="container py-20 max-w-md">
      <h1 className="text-3xl font-bold text-pink-600 mb-5">
        Đăng nhập
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded-xl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={login}
        className="w-full mt-4 bg-pink-600 text-white py-3 rounded-xl font-medium"
      >
        Đăng nhập
      </button>
    </div>
  );
}
