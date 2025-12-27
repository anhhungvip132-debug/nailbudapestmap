"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

export default function AdminSalonsPage() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState({});

  /* ================= LOAD ================= */
  useEffect(() => {
    async function load() {
      try {
        const res = await adminFetch("/api/admin/salons", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load salons");
        const data = await res.json();
        setSalons(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ================= LOCAL CHANGE ================= */
  function changeLocal(id, field, value) {
    setSalons((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
    setDirty((d) => ({ ...d, [id]: true }));
  }

  /* ================= SAVE ================= */
  async function save(id) {
    const salon = salons.find((s) => s.id === id);

    const res = await adminFetch(`/api/admin/salons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        featured: !!salon.featured,
        premium: !!salon.premium,
      }),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    setDirty((d) => {
      const copy = { ...d };
      delete copy[id];
      return copy;
    });
  }

  /* ================= UI ================= */
  if (loading) return <div className="p-6">Loading salons…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🏬 Manage Salons</h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-center">Featured</th>
              <th className="border px-3 py-2 text-center">Premium</th>
              <th className="border px-3 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {salons.map((s) => (
              <tr key={s.id}>
                <td className="border px-3 py-2 text-center">{s.id}</td>

                <td className="border px-3 py-2">
                  <a
                    href={`/admin/salons/${s.id}`}
                    className="text-pink-600 hover:underline"
                  >
                    {s.name}
                  </a>
                </td>

                <td className="border px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={!!s.featured}
                    onChange={(e) =>
                      changeLocal(s.id, "featured", e.target.checked)
                    }
                  />
                </td>

                <td className="border px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={!!s.premium}
                    onChange={(e) =>
                      changeLocal(s.id, "premium", e.target.checked)
                    }
                  />
                </td>

                <td className="border px-3 py-2 text-center">
                  {dirty[s.id] ? (
                    <button
                      onClick={() => save(s.id)}
                      className="px-3 py-1 text-xs rounded bg-pink-600 text-white hover:bg-pink-700"
                    >
                      Save
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">Saved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
