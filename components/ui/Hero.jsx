export default function Hero() {
  return (
    <section
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "420px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", fontWeight: "bold", textShadow: "0px 0px 10px rgba(0,0,0,0.6)" }}>
        Tìm Salon Nail Tốt Nhất Tại Budapest
      </h1>
    </section>
  );
}
