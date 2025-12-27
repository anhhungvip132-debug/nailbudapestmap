// app/layout.jsx

import "./globals.css";

import Header from "@/components/ui/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  metadataBase: new URL("https://nailbudapestmap.com"),

  title: {
    default: "Nail Budapest Map – Find nail salons in Budapest",
    template: "%s | Nail Budapest Map",
  },

  description:
    "Find the best nail salons in Budapest. Book appointments, read reviews, and discover top-rated nail studios.",

  verification: {
    google: "g95XjiWMDEjC67lCkn5wx1lbKgXPJucWNfXXoKx1MwM",
  },

  openGraph: {
    title: "Nail Budapest Map",
    description:
      "Discover top nail salons in Budapest. View reviews and book appointments easily.",
    url: "https://nailbudapestmap.com",
    siteName: "Nail Budapest Map",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Nail Budapest Map",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nail Budapest Map",
    description:
      "Find the best nail salons in Budapest and book instantly.",
    images: ["/images/og-cover.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fafafa] text-gray-800 antialiased">
        {/* HEADER */}
        <Header />

        {/* MAIN CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* FOOTER (SEO LINKS + INTERNAL LINKING) */}
        <Footer />
      </body>
    </html>
  );
}
