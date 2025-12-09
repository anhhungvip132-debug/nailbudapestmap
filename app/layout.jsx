// app/layout.jsx

import "./globals.css";              // ⭐ BẮT BUỘC: nạp Tailwind + toàn bộ CSS global
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nail Budapest Map",
  description: "Find the best nail salons in Budapest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
