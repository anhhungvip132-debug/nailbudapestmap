✅ 4. Gọi Map trong app/page.js
import GoogleMapComponent from "@/components/GoogleMap";
import salons from "@/lib/salons.json";

export default function Home() {
  return (
    <main>
      <h1>Nail Booking Map</h1>

      <GoogleMapComponent salons={salons} />

      <div style={{ marginTop: "20px" }}>
        {salons.map((s, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <h3>{s.name}</h3>
            <p>{s.address}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

✅ 5. File dữ liệu salon mẫu /lib/salons.json
[
  {
    "name": "Edi Nails",
    "address": "Mozsár u. 6, 1066 Budapest",
    "lat": 47.5033,
    "lng": 19.0580
  },
  {
    "name": "Nail Salon 2",
    "address": "Budapest",
    "lat": 47.4980,
    "lng": 19.0400
  }
]