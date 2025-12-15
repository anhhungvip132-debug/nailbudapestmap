import "./globals.css";
import Header from "@/components/ui/Header";

// ⛔ TẮT PRERENDER / SSG TOÀN APP (ổn định Vercel cho SPA)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Nail Budapest Map",
  description: "Bản đồ các tiệm nail tại Budapest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-[#fafafa]">
        <Header />
        {children}
      </body>
    </html>
  );
}
