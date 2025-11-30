// ===========================================
// MAP.JS — Google Maps + Firebase NO-MODULE
// ===========================================

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDkq0DKue8884V3AAu_O-cpEmlcalJhDOs",
  authDomain: "nailfinder-6146a.firebaseapp.com",
  projectId: "nailfinder-6146a",
  storageBucket: "nailfinder-6146a.firebasestorage.app",
  messagingSenderId: "703195233020",
  appId: "1:703195233020:web:d0fd8877b2986f03a27579"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Hàm Haversine tính khoảng cách
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180) *
            Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

let salonCache = [];
let map;


// GOOGLE MAP CALLBACK
window.initMap = async function () {  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 47.4979, lng: 19.0402 },
    styles: []
  });

  navigator.geolocation.getCurrentPosition(
    pos => loadSalons(pos.coords.latitude, pos.coords.longitude),
    () => loadSalons(47.4979, 19.0402)
  );
};


// LOAD SALONS + MARKER
async function loadSalons(lat, lng) {
  const snap = await db.collection("salons").get();
  salonCache = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  new google.maps.Marker({
    position: { lat, lng },
    map,
    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    title: "Vị trí của bạn"
  });

  renderList(lat, lng);
  renderMarkers();
}


// HIỂN THỊ DANH SÁCH
function renderList(lat, lng) {
  const list = document.getElementById("salonList");
  list.innerHTML = "";

  salonCache.forEach(s => {
    const dist = getDistance(lat, lng, s.lat, s.lng).toFixed(1);
    list.innerHTML += `
      <div class="salon-card" onclick="openOverlay('${s.id}')">
        <h3>${s.name}</h3>
        <p>📍 ${s.address}</p>
        <p>📞 ${s.phone ?? "Đang cập nhật"}</p>
        <p>🚶 ${dist} km từ bạn</p>
      </div>
    `;
  });
}


// MARKER SALONS
function renderMarkers() {
  salonCache.forEach(s => {
    const marker = new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map,
      title: s.name
    });

    marker.addListener("click", () => openOverlay(s.id));
  });
}


// OVERLAY
window.openOverlay = async function(id) {
  const snap = await db.collection("salons").doc(id).get();
  const s = snap.data();
  const el = document.getElementById("overlay");

  el.innerHTML = `
    <h2>${s.name}</h2>
    <p>${s.address}</p>
    <p>${s.phone ?? "Đang cập nhật"}</p>
    <a href="salon.html?id=${id}" class="lux-btn">💅 Xem dịch vụ</a>
    <a href="booking.html?id=${id}" class="lux-btn">📆 Đặt lịch</a>
    <button onclick="closeOverlay()">Đóng</button>
  `;

  el.classList.add("active");
};

window.closeOverlay = () =>
  document.getElementById("overlay").classList.remove("active");
