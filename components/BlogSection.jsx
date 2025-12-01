export default function BlogSection() {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-6 mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">From the Blog</h2>

      <div className="grid md:grid-cols-2 gap-10">
        <a href="/blog/1" className="bg-white p-6 rounded-2xl shadow hover:shadow-xl">
          <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900"
               className="w-full h-64 object-cover rounded-xl mb-4"/>
          <h3 className="font-bold text-2xl">Nail Trends in Budapest</h3>
          <p className="text-gray-600 mt-2">Explore trending nail designs…</p>
        </a>

        <a href="/blog/2" className="bg-white p-6 rounded-2xl shadow hover:shadow-xl">
          <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900"
               className="w-full h-64 object-cover rounded-xl mb-4"/>
          <h3 className="font-bold text-2xl">Holiday Nail Designs</h3>
          <p className="text-gray-600 mt-2">Mẫu nail theo mùa tuyệt đẹp…</p>
        </a>
      </div>
    </section>
  );
}
