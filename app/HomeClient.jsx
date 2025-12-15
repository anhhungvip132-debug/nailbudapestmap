"use client";

import Hero from "@/components/ui/Hero";

export default function HomeClient() {
  return (
    <div className="pb-24">
      <Hero />

      <div style={{ padding: 40, fontSize: 18 }}>
        ✅ Hero rendered successfully
      </div>
    </div>
  );
}
