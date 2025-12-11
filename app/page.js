import SearchBar from "@/components/ui/SearchBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <FeaturedSalons />
      <NearestSalons />
      <BlogSection />
      <RegisterSection />
      <OwnerSection />
    </main>
  );
}
