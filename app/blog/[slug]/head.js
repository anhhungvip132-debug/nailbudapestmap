import { blogPosts } from "@/lib/blogPosts";

export default function Head({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  return (
    <>
      <title>{post?.title}</title>
      <meta name="description" content={post?.excerpt} />

      <meta property="og:title" content={post?.title} />
      <meta property="og:description" content={post?.excerpt} />
      <meta property="og:image" content={post?.image} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post?.title,
            description: post?.excerpt,
            image: post?.image,
            datePublished: post?.date,
            author: {
              "@type": "Person",
              name: "NailBooking Editorial Team"
            }
          }),
        }}
      />
    </>
  );
}
