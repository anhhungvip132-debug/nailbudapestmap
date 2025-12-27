export default function PricingPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Pricing for Nail Salons
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-xl">
          <h2 className="font-semibold text-xl">Featured Listing</h2>
          <p className="text-sm mt-2">
            Highlight your salon at the top of district pages.
          </p>
          <p className="mt-4 font-bold">€29 / month</p>
        </div>

        <div className="border p-6 rounded-xl bg-pink-50">
          <h2 className="font-semibold text-xl">Premium Profile</h2>
          <p className="text-sm mt-2">
            Enhanced profile with more content and visibility.
          </p>
          <p className="mt-4 font-bold">€49 / month</p>
        </div>
      </div>
    </main>
  );
}
