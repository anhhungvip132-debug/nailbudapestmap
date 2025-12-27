// app/admin/page.js
"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminKey, setAdminKey] = useState("");

  useEffect(() => {
    fetch("/api/salons")
      .then((r) => r.json())
      .then(setSalons)
      .finally(() => setLoading(false));
  }, []);

  async function updatePlan(id, plan, days) {
    if (!adminKey) {
      alert("Missing admin key");
      return;
    }

    await fetch(`/api/admin/salons/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ plan, days }),
    });

    location.reload();
  }

  if (loading) return <p className="p-10">Loading…</p>;

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin – Monetization</h1>

      <input
        type="password"
        placeholder="Admin API Key"
        value={adminKey}
        onChange={(e) => setAdminKey(e.target.value)}
        className="border px-3 py-2 rounded w-full max-w-sm"
      />

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Salon</th>
            <th className="border px-2 py-1">Plan</th>
            <th className="border px-2 py-1">Expires</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salons.map((s) => (
            <tr key={s.id}>
              <td className="border px-2 py-1">{s.name}</td>
              <td className="border px-2 py-1">{s.plan}</td>
              <td className="border px-2 py-1">
                {s.planExpiresAt
                  ? new Date(s.planExpiresAt.seconds * 1000).toLocaleDateString()
                  : "-"}
              </td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => updatePlan(s.id, "premium", 30)}
                  className="px-2 py-1 bg-pink-500 text-white rounded"
                >
                  Premium 30d
                </button>
                <button
                  onClick={() => updatePlan(s.id, "sponsored", 7)}
                  className="px-2 py-1 bg-amber-500 text-white rounded"
                >
                  Sponsored 7d
                </button>
                <button
                  onClick={() => updatePlan(s.id, "free")}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  Free
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
