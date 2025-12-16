"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Nếu đã login → không cho vào lại trang login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/");
      }
    });
    return () => unsub();
  }, [router]);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (err) {
      console.error(err);
      setError("Email hoặc mật khẩu không đúng.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white border border-pink-100 rounded-2xl shadow-sm p-6"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Đăng nhập quản trị
        </h1>

        {error && (
          <p className="text-sm text-red-500 mb-3 text-center">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="admin@nailbudapestmap.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
