
"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

/* =====================================================
   Admin Audit – Read only (AUTHORIZED)
   ===================================================== */
export default function AdminAuditPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    type: "",
    action: "",
    adminUid: "",
    limit: 50,
  });

  async function loadAudit() {
    try {
      setLoading(true);
      setError("");

      const qs = new URLSearchParams();
      if (filters.type) qs.set("type", filters.type);
      if (filters.action) qs.set("action", filters.action);
      if (filters.adminUid) qs.set("adminUid", filters.adminUid);
      qs.set("limit", String(filters.limit || 50));

      // 🔐 BẮT BUỘC dùng adminFetch cho /api/admin/*
      const res = await adminFetch(
        `/api/admin/audit?${qs.toString()}`
      );

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Load failed");
      }

      setItems(json.data || []);
    } catch (err) {
      setError(err.message || "Failed to load audit");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAudit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    loadAudit();
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Audit Log</h1>

      {/* ================= FILTER ================= */}
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-4 rounded border"
      >
        <select
          className="border p-2 rounded"
          value={filters.type}
          onChange={(e) =>
            setFilters((f) => ({ ...f, type: e.target.value }))
          }
        >
          <option value="">All types</option>
          <option value="admin_action">Admin action</option>
          <option value="cron">Cron</option>
          <option value="auth">Auth</option>
        </select>

        <input
          className="border p-2 rounded"
          placeholder="Action (e.g. UPDATE_SALON_PLAN)"
          value={filters.action}
          onChange={(e) =>
            setFilters((f) => ({ ...f, action: e.target.value }))
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Admin UID"
          value={filters.adminUid}
          onChange={(e) =>
            setFilters((f) => ({ ...f, adminUid: e.target.value }))
          }
        />

        <input
          type="number"
          min={1}
          max={100}
          className="border p-2 rounded"
          value={filters.limit}
          onChange={(e) =>
            setFilters((f) => ({ ...f, limit: e.target.value }))
          }
        />

        <button
          type="submit"
          className="bg-black text-white rounded px-4 py-2"
        >
          Apply
        </button>
      </form>

      {/* ================= STATE ================= */}
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* ================= TABLE ================= */}
      {!loading && !error && (
        <div className="overflow-auto border rounded bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Action</th>
                <th className="p-2 border">Admin</th>
                <th className="p-2 border">Target</th>
                <th className="p-2 border">Meta</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No audit records
                  </td>
                </tr>
              )}

              {items.map((it) => (
                <tr key={it.id} className="border-t align-top">
                  <td className="p-2 border whitespace-nowrap">
                    {it.createdAt?.seconds
                      ? new Date(
                          it.createdAt.seconds * 1000
                        ).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-2 border">{it.type}</td>
                  <td className="p-2 border">{it.action}</td>
                  <td className="p-2 border">
                    <div>{it.adminEmail || "-"}</div>
                    <div className="text-xs text-gray-500">
                      {it.adminUid || ""}
                    </div>
                  </td>
                  <td className="p-2 border">
                    {it.target
                      ? `${it.target.collection}/${it.target.id}`
                      : "-"}
                  </td>
                  <td className="p-2 border">
                    <pre className="text-xs whitespace-pre-wrap max-w-md">
                      {JSON.stringify(it.meta || {}, null, 2)}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
