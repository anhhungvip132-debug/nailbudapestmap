// app/layout.jsx
import "leaflet/dist/leaflet.css";
import "./globals.css";

import Header from "@/components/ui/Header";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: {
    default: "Nail Budapest Map",
    template: "%s | Nail Budapest Map",
  },
  description: "Tìm tiệm nail đẹp nhất ở Budapest – bản đồ, đặt lịch, đánh giá.",
  metadataBase: new URL("https://nailbudapestmap.vercel.app"),
  openGraph: {
    title: "Nail Budapest Map",
    description:
      "Khám phá & đặt lịch các tiệm nail uy tín tại Budapest.",
    url: "https://nailbudapestmap.vercel.app",
    siteName: "Nail Budapest Map",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-900 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
