"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

export default function PlanManager({ salon }) {
  const [plan, setPlan] = useState(salon.plan || "free");
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  /* ===== SYNC WHEN SALON RELOAD ===== */
  useEffect(() => {
    setPlan(salon.plan || "free");
  }, [salon.plan]);

  async function updatePlan() {
    setMsg("");

    /* ===== GUARDS ===== */
    if (!["free", "premium", "sponsored"].includes(plan)) {
      setMsg("❌ Invalid plan");
      return;
    }

    if (plan !== "free" && (!days || days <= 0)) {
      setMsg("❌ Days must be greater than 0");
      return;
    }

    if (salon.plan === "free" && plan === "free") {
      setMsg("ℹ️ Salon is already FREE");
      return;
    }

    setLoading(true);

    try {
      const res = await adminFetch(`/api/admin/salons/${salon.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          days: plan === "free" ? 0 : days,
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Update failed");
      }

      setMsg("✅ Plan updated successfully");

      // refresh page data (simple & safe)
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (err) {
      console.error("PLAN UPDATE ERROR:", err);
      setMsg("❌ Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-xl p-4 space-y-4 bg-white">
      <h3 className="font-semibold text-lg">💼 Monetization Plan</h3>

      {/* ===== PLAN SELECT ===== */}
      <div className="flex gap-2 flex-wrap">
        {["free", "premium", "sponsored"].map((p) => (
          <button
            key={p}
            onClick={() => setPlan(p)}
            className={`px-3 py-1 rounded-lg border text-sm font-semibold ${
              plan === p
                ? "bg-pink-600 text-white border-pink-600"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ===== DAYS SELECT ===== */}
      {plan !== "free" && (
        <div className="flex gap-2 flex-wrap">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1 rounded-lg border text-sm ${
                days === d
                  ? "bg-pink-100 border-pink-400 font-semibold"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {d} days
            </button>
          ))}
        </div>
      )}

      {/* ===== ACTION ===== */}
      <button
        onClick={updatePlan}
        disabled={loading}
        className="bg-pink-600 text-white px-4 py-2 rounded-xl disabled:opacity-60"
      >
        {loading ? "Saving…" : "Save plan"}
      </button>

      {/* ===== MESSAGE ===== */}
      {msg && (
        <p
          className={`text-sm ${
            msg.startsWith("❌")
              ? "text-red-600"
              : msg.startsWith("ℹ️")
              ? "text-gray-600"
              : "text-green-600"
          }`}
        >
          {msg}
        </p>
      )}
    </div>
  );
}
