import "./globals.css";

export const metadata = {
  title: "Nail Budapest Map",
  description: "Find and book nail salons easily in Budapest."
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-700">
        {children}
      </body>
    </html>
  );
}
