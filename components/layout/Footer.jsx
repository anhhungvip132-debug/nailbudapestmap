// components/layout/Footer.jsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-pink-100 bg-white">
      {/* ===== MAIN FOOTER ===== */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        {/* BRAND */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Nail Budapest Map
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Discover and book the best nail salons in Budapest.
            Compare services, reviews and locations easily.
          </p>
        </div>

        {/* POPULAR PAGES */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Popular Pages
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <Link href="/" className="hover:text-pink-600">
                Nail salons in Budapest
              </Link>
            </li>
            <li>
              <Link href="/district/5" className="hover:text-pink-600">
                Nail salons in District 5
              </Link>
            </li>
            <li>
              <Link href="/district/6" className="hover:text-pink-600">
                Nail salons in District 6
              </Link>
            </li>
            <li>
              <Link href="/district/7" className="hover:text-pink-600">
                Nail salons in District 7
              </Link>
            </li>
          </ul>
        </div>

        {/* TRUST & POLICY */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            About & Policy
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <Link href="/about" className="hover:text-pink-600">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/editorial-policy" className="hover:text-pink-600">
                Editorial Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-pink-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* FOR SALONS */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            For Salons
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Own a nail salon in Budapest?
            Get listed on Nail Budapest Map and reach new customers.
          </p>
        </div>
      </div>

      {/* ===== SEO DISTRICT LINKS (BOT-FOCUSED) ===== */}
      <div className="bg-pink-50 border-t border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-xs text-gray-500 mb-3">
            Browse nail salons by district:
          </p>

          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-pink-700">
            {Array.from({ length: 23 }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <Link
                  href={`/district/${n}`}
                  className="hover:underline"
                >
                  District {n}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== COPYRIGHT ===== */}
      <div className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} NailBudapestMap.com
      </div>
    </footer>
  );
}
