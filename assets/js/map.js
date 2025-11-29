// Khởi tạo bản đồ Budapest
function initMap() {
  const budapest = { lat: 47.4979, lng: 19.0402 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: budapest,
  });

  // Salon mẫu
  const salons = [
    {
      name: "Luxury Nail Budapest",
      lat: 47.4985,
      lng: 19.0450,
      link: "https://google.com"
    }
  ];

  // Hiển thị markers
  salons.forEach(salon => {
    const marker = new google.maps.Marker({
      position: { lat: salon.lat, lng: salon.lng },
      map: map,
      title: salon.name
    });

    // Đẩy vào danh sách salon
    const card = document.createElement("div");
    card.className = "salon-card";
    card.innerHTML = `<h3>${salon.name}</h3>
                      <a href="${salon.link}" target="_blank">Xem Chi Tiết</a>`;
    document.getElementById("salonList").appendChild(card);
  });
}

window.initMap = initMap;
