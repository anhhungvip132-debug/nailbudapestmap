"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PlanManager from "@/components/admin/PlanManager";
import { getDaysLeft, getPlanBadge } from "@/lib/planUiUtils";
import { adminFetch } from "@/lib/adminFetch";

export default function AdminSalonDetail() {
  const { id } = useParams();

  const [salon, setSalon] = useState(null);
  const [planHistory, setPlanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);
        setError("");

        /* ===== LOAD SALON ===== */
        const res = await adminFetch(`/api/admin/salons/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || "Failed to load salon");
        }

        const data = await res.json();
        setSalon(data);

        /* ===== LOAD PLAN HISTORY ===== */
        const hist = await adminFetch(
          `/api/admin/salons/${id}/plan-history`
        );

        if (hist.ok) {
          const h = await hist.json();
          setPlanHistory(h.items || []);
        }
      } catch (err) {
        console.error("ADMIN SALON LOAD ERROR:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!salon) return <div className="p-6">Not found</div>;

  const daysLeft = getDaysLeft(salon.planExpiresAt);

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">🏬 {salon.name}</h1>

      {/* ===== BASIC INFO ===== */}
      <div className="bg-white p-4 rounded-xl border space-y-2">
        <div>
          <b>Plan:</b>{" "}
          <span
            className={`px-2 py-1 rounded text-xs font-semibold uppercase ${getPlanBadge(
              salon.plan
            )}`}
          >
            {salon.plan}
          </span>
        </div>

        <div>
          <b>Expires:</b>{" "}
          {salon.planExpiresAt
            ? new Date(
                salon.planExpiresAt.seconds
                  ? salon.planExpiresAt.seconds * 1000
                  : salon.planExpiresAt
              ).toLocaleDateString()
            : "—"}
        </div>

        {daysLeft !== null && daysLeft <= 3 && daysLeft >= 0 && (
          <div className="text-sm text-red-600 font-semibold">
            ⚠️ Plan expires in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
          </div>
        )}

        {daysLeft !== null && daysLeft < 0 && (
          <div className="text-sm text-red-700 font-semibold">
            ❌ Plan expired
          </div>
        )}
      </div>

      {/* ===== PLAN MANAGER ===== */}
      <div className="bg-white p-4 rounded-xl border">
        <h3 className="font-semibold mb-3">💎 Plan management</h3>
        <PlanManager salon={salon} />
      </div>

      {/* ===== PLAN HISTORY ===== */}
      <div className="bg-white p-4 rounded-xl border">
        <h3 className="font-semibold mb-2">🕘 Plan history</h3>

        {planHistory.length === 0 && (
          <p className="text-sm text-gray-500">No changes yet.</p>
        )}

        <ul className="space-y-2 text-sm">
          {planHistory.map((h) => (
            <li key={h.id} className="border rounded p-2 bg-gray-50">
              <div>
                <b>{h.before.plan}</b> → <b>{h.after.plan}</b>
                {h.days ? ` (+${h.days} days)` : ""}
              </div>
              <div className="text-gray-500">
                {h.action} · {h.adminEmail}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
