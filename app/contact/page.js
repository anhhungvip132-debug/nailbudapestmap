// app/contact/page.js

export const metadata = {
  title: "Contact | Nail Budapest Map",
  description:
    "Contact Nail Budapest Map for listing updates or general inquiries.",
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Contact
      </h1>

      <div className="text-gray-600 text-sm space-y-4">
        <p>
          For general inquiries, listing updates, or business partnerships,
          please contact us via email:
        </p>

        <p className="font-medium">
          📧 contact@nailbudapestmap.com
        </p>
      </div>
    </main>
  );
}
