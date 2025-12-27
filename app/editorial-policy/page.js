// app/editorial-policy/page.js

export const metadata = {
  title: "Editorial Policy | Nail Budapest Map",
  description:
    "Editorial and review guidelines for listings on Nail Budapest Map.",
};

export default function EditorialPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Editorial Policy
      </h1>

      <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
        <p>
          Nail Budapest Map operates as an independent directory. Salon listings
          are curated based on publicly available information and user
          submissions.
        </p>

        <p>
          Reviews submitted by users are moderated to prevent spam, offensive
          content, or misleading information.
        </p>

        <p>
          We do not guarantee service quality and encourage users to verify
          details directly with salons before booking.
        </p>
      </div>
    </main>
  );
}
