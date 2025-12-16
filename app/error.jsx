"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={{ padding: 24, fontFamily: "sans-serif" }}>
        <h1 style={{ color: "red" }}>Runtime Error</h1>

        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 8,
            marginTop: 12,
          }}
        >
          {error?.message}
        </pre>

        <button
          onClick={() => reset()}
          style={{
            marginTop: 16,
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Thử lại
        </button>
      </body>
    </html>
  );
}
