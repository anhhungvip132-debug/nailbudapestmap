export default function Head() {
  return (
    <>
      <title>NailBooking – Tìm tiệm nail tại Budapest</title>
      <meta
        name="description"
        content="Tìm tiệm nail gần nhất bằng GPS – Đặt lịch – Khuyến mãi cập nhật mỗi ngày tại NailBooking Budapest."
      />

      <meta property="og:title" content="NailBooking" />
      <meta
        property="og:description"
        content="Tìm tiệm nail gần nhất & đặt lịch nhanh tại Budapest."
      />
      <meta
        property="og:image"
        content="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "NailBooking",
            url: "https://nailbooking.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://nailbooking.com/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />
    </>
  );
}
