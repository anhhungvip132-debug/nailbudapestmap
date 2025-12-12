// app/layout.jsx
import "./globals.css"

export const metadata = {
  title: "Nail Budapest Map",
  description: "Tìm tiệm nail đẹp ở Budapest",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
