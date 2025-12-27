"use client";

import { useState } from "react";

export default function SyncGoogleButton({ salonId }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function sync() {
    setLoading(true);
    setDone(false);

    try {
      const res = await fetch(`/api/google/place/${salonId}`);
      const json = await res.json();

      if (json.success) {
        setDone(true);
      } else {
        alert(json.error || "Sync failed");
      }
    } catch (e) {
      alert("Sync error");
    }

    setLoading(false);
  }

  return (
    <button
      onClick={sync}
      disabled={loading}
      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
    >
      {loading
        ? "Syncing Google…"
        : done
        ? "✔ Google Synced"
        : "🔄 Sync Google Rating"}
    </button>
  );
}
