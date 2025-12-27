// app/about/page.js

export const metadata = {
  title: "About Nail Budapest Map",
  description:
    "Learn about Nail Budapest Map, a trusted directory helping users discover nail salons in Budapest.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        About Nail Budapest Map
      </h1>

      <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
        <p>
          Nail Budapest Map is an independent online directory created to help
          users discover nail salons in Budapest easily and transparently.
        </p>

        <p>
          Our platform focuses on providing accurate salon information, service
          listings, and user reviews to support informed booking decisions.
        </p>

        <p>
          We aim to connect customers with professional nail salons while
          maintaining fair and clear editorial standards.
        </p>
      </div>
    </main>
  );
}
