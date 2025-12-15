// SERVER COMPONENT – KHÔNG "use client"
// Chỉ dùng để chặn prerender + wrap client UI
export const dynamic = "force-dynamic";

import HomeClient from "./HomeClient";

export default function Page() {
  return <HomeClient />;
}
