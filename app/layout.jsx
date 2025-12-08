import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://nailbudapestmap.vercel.app"),
  title: "Nail Budapest Map",
  description: "Tìm tiệm nail tốt nhất Budapest",
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
