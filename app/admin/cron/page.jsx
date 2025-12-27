"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";

const FILTERS = [
  { key: "today", label: "Today" },
  { key: "7d", label: "7 days" },
  { key: "all", label: "All" },
];

export default function AdminCronPage() {
  const [range, setRange] = useState("7d");
  const [logs, setLogs] = useState([]);
  const [busy, setBusy] = useState(false);

  /* ================= LOAD LOGS ================= */
  async function loadLogs(r = range) {
    try {
      const res = await adminFetch(`/api/admin/cron-logs?range=${r}`);
      if (!res.ok) return;

      const data = await res.json();
      if (data?.ok) setLogs(data.logs || []);
    } catch (e) {
      console.error("Failed to load cron logs", e);
    }
  }

  /* ================= TRIGGER CRON ================= */
  async function triggerCron(dryRun) {
    const secret = prompt("CRON_SECRET:");
    if (!secret) return;

    setBusy(true);
    try {
      await fetch(`/api/cron/downgrade-plans${dryRun ? "?dryRun=1" : ""}`, {
        headers: { "x-cron-secret": secret },
      });
      await loadLogs();
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, [range]);

  const rows = useMemo(() => logs || [], [logs]);

  return (
    <div style={{ padding: 24, maxWidth: 1100 }}>
      {/* ===== HEADER ===== */}
      <h1 style={{ fontSize: 22, fontWeight: 800 }}>
        🕒 Cron – Downgrade Plans
      </h1>

      {/* ===== FILTERS ===== */}
      <div style={{ marginTop: 12 }}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setRange(f.key)}
            style={{
              marginRight: 8,
              padding: "6px 14px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 13,
              border: "none",
              cursor: "pointer",
              background: range === f.key ? "#ffe4ef" : "#f1f1f1",
              color: range === f.key ? "#e91e63" : "#333",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ===== TABLE ===== */}
      <div
        style={{
          marginTop: 20,
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid #eee",
          background: "#fff",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead style={{ background: "#fafafa" }}>
            <tr>
              <th style={thLeft}>Time</th>
              <th style={thCenter}>Dry</th>
              <th style={thCenter}>Premium</th>
              <th style={thCenter}>Sponsored</th>
              <th style={thCenter}>Updated</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((l) => {
              const d = new Date(l.at);

              return (
                <tr key={l.id} style={{ borderTop: "1px solid #f1f1f1" }}>
                  <td style={tdLeft}>
                    <div style={{ fontWeight: 700 }}>
                      {d.toLocaleDateString()}
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.6 }}>
                      {d.toLocaleTimeString()}
                    </div>
                  </td>

                  <td style={tdCenter}>{l.dryRun ? "dry" : "real"}</td>
                  <td style={tdCenter}>{l.found?.premiumExpired ?? 0}</td>
                  <td style={tdCenter}>{l.found?.sponsoredExpired ?? 0}</td>
                  <td style={tdCenter}>{l.updatedDocs ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p style={{ padding: 16, opacity: 0.6 }}>No logs</p>
        )}
      </div>

      {/* ===== ACTIONS ===== */}
      <div style={{ marginTop: 16 }}>
        <button
          disabled={busy}
          onClick={() => triggerCron(true)}
          style={btn}
        >
          Dry-run
        </button>

        <button
          disabled={busy}
          onClick={() => triggerCron(false)}
          style={{ ...btn, marginLeft: 8, background: "#e11d48" }}
        >
          Run real
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const thBase = {
  padding: "12px 14px",
  fontSize: 13,
  fontWeight: 800,
  color: "#333",
  whiteSpace: "nowrap",
};

const thLeft = {
  ...thBase,
  textAlign: "left",
  width: "32%",
};

const thCenter = {
  ...thBase,
  textAlign: "center",
};

const tdBase = {
  padding: "14px",
  fontSize: 14,
  verticalAlign: "middle",
};

const tdLeft = {
  ...tdBase,
  textAlign: "left",
};

const tdCenter = {
  ...tdBase,
  textAlign: "center",
  fontWeight: 700,
};

const btn = {
  padding: "8px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  background: "#6b7280",
  color: "#fff",
};
