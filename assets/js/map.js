import { Loader } from "https://www.gstatic.com/mapsjs/v3-beta-loader.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

initializeApp({
  apiKey: "AIzaSyDkq0DKue8884V3AAu_O-cpEmlcalJhDOs",
  authDomain: "nailfinder-6146a.firebaseapp.com",
  projectId: "nailfinder-6146a"
});

const db = getFirestore();

function getDistance(a, b, c, d) {
  const R = 6371, rad = x => x * Math.PI / 180;
  const dLat = rad(c-a), dLng = rad(d-b);
  const h = Math.sin(dLat/2)**2 + Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dLng/2)**2;
  return (R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1-h))).toFixed(1);
}

async function initApp() {
  const loader = new Loader({
    apiKey: "AIzaSyAX0qJVDsB2FWUELDeCY3hw71NEBLqiCpU",
    version: "weekly"
  });

  const google = await loader.load();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 47.4979, lng: 19.0402 }
  });

  navigator.geolocation.getCurrentPosition(
    pos => loadSalons(map, google, pos.coords.latitude, pos.coords.longitude),
    () => loadSalons(map, google, 47.4979, 19.0402)
  );
}

async function loadSalons(map, google, lat, lng) {
  const snap = await getDocs(collection(db, "salons"));
  const salons = snap.docs.map(x => ({ id: x.id, ...x.data() }));

  new google.maps.Marker({
    position: { lat, lng },
    map,
    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  });

  document.getElementById("salonList").innerHTML = "";

  salons.forEach(s => {
    const dist = getDistance(lat, lng, s.lat, s.lng);

    document.getElementById("salonList").innerHTML += `
      <div class="salon-card" onclick="openOverlay('${s.id}')">
        <h3>${s.name}</h3>
        <p>📍 ${s.address}</p>
        <p>📞 ${s.phone ?? "Đang cập nhật"}</p>
        <p>🚶 ${dist} km</p>
      </div>
    `;

    const marker = new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map
    });

    marker.addListener("click", () => openOverlay(s.id));
  });
}

window.openOverlay = async function(id) {
  const snap = await getDoc(doc(db, "salons", id));
  const s = snap.data();

  const o = document.getElementById("overlay");
  o.classList.add("active");
  o.innerHTML = `
    <div class="overlay-box">
      <h2>${s.name}</h2>
      <p>${s.address}</p>
      <button onclick="closeOverlay()">Đóng</button>
    </div>
  `;
};

window.closeOverlay = () =>
  document.getElementById("overlay").classList.remove("active");

initApp();
