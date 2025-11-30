import { Loader } from "https://www.gstatic.com/mapsjs/v3-beta-loader.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkq0DKue8884V3AAu_O-cpEmlcalJhDOs",
  authDomain: "nailfinder-6146a.firebaseapp.com",
  projectId: "nailfinder-6146a",
  storageBucket: "nailfinder-6146a.firebasestorage.app",
  messagingSenderId: "703195233020",
  appId: "1:703195233020:web:d0fd8877b2986f03a27579"
};

initializeApp(firebaseConfig);
const db = getFirestore();

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function initMap() {
  const loader = new Loader({
    apiKey: "AIzaSyAX0qJVDsB2FWUELDeCY3hw71NEBLqiCpU",
    version: "weekly"
  });

  const google = await loader.load();

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.4979, lng: 19.0402 },
    zoom: 13,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#fff0f8" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#c4007f" }] }
    ]
  });

  navigator.geolocation.getCurrentPosition(
    pos => loadSalons(map, google, pos.coords.latitude, pos.coords.longitude),
    () => loadSalons(map, google, 47.4979, 19.0402)
  );
}

async function loadSalons(map, google, lat, lng) {
  const snap = await getDocs(collection(db, "salons"));
  const salons = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  new google.maps.Marker({
    position: { lat, lng },
    map,
    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    title: "Bạn đang ở đây"
  });

  const list = document.getElementById("salonList");
  list.innerHTML = "";

  salons.forEach(s => {
    const dist = getDistance(lat, lng, s.lat, s.lng).toFixed(1);

    list.innerHTML += `
      <div class="salon-card" onclick="openOverlay('${s.id}')">
        <h3>${s.name}</h3>
        <p>📍 ${s.address}</p>
        <p>📞 ${s.phone ?? "Đang cập nhật"}</p>
        <p>🚶 ${dist} km</p>
      </div>
    `;

    const marker = new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map,
      title: s.name
    });

    marker.addListener("click", () => openOverlay(s.id));
  });
}

window.openOverlay = async function (id) {
  const snap = await getDoc(doc(db, "salons", id));
  const s = snap.data();
  const overlay = document.getElementById("overlay");

  overlay.innerHTML = `
    <div class="overlay-box">
      <h2>${s.name}</h2>
      <p>${s.address}</p>
      <p>${s.phone ?? "Đang cập nhật"}</p>
      <a href="salon.html?id=${id}" class="lux-btn">Xem dịch vụ 💅</a>
      <a href="booking.html?id=${id}" class="lux-btn">Đặt lịch 📆</a>
      <button onclick="closeOverlay()" class="close-btn">Đóng</button>
    </div>
  `;
  overlay.classList.add("active");
};

window.closeOverlay = () =>
  document.getElementById("overlay").classList.remove("active");

initMap();
