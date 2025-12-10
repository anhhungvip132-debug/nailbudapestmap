import "./globals.css";
import Header from "@/components/ui/Header";

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
