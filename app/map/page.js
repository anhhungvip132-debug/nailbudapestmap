export const metadata = {
  title: "Nail salons near me in Budapest",
  description:
    "Find nail salons near you in Budapest. Compare ratings, services and locations on map.",
};

export default function MapLanding() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Nail salons near me in Budapest
      </h1>
      <p className="text-gray-600 mb-6">
        Explore top-rated nail salons on the map, sorted by distance.
      </p>

      {/* reuse Map component */}
    </main>
  );
}
