import Image from "next/image";

export default function OwnerSection() {
  return (
    <section className="bg-pink-50 p-6 rounded-xl shadow">
      <div className="flex gap-4 items-center">
        <Image
          src="/images/owner.jpg"
          width={90}
          height={90}
          className="rounded-full"
          alt="Founder"
        />

        <div>
          <h3 className="text-xl font-bold">About the Founder</h3>
          <p className="text-gray-700 text-sm">
            Hi! I'm the creator of Nail Budapest Map — helping people find the best nail salons.
          </p>
        </div>
      </div>
    </section>
  );
}
