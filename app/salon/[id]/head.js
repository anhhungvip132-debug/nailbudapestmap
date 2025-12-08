export default async function Head({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/salons`, {
    cache: "no-store",
  });
  const salons = await res.json();
  const salon = salons.find((s) => s.id == params.id);

  if (!salon) return <title>Không tìm thấy salon</title>;

  const schema = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: salon.name,
    image: salon.gallery,
    address: salon.address,
    telephone: salon.phone || "",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/salon/${salon.id}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: salon.lat,
      longitude: salon.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: salon.rating,
      reviewCount: salon.reviews?.length || 10,
    },
  };

  return (
    <>
      <title>{salon.name} – NailBooking</title>
      <meta
        name="description"
        content={`Đặt lịch ${salon.name} – ${salon.address}`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
