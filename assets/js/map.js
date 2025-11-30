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

async function initMap() {
  const loader = new Loader({
    apiKey: "AIzaSyAX0qJVDsB2FWUELDeCY3hw71NEBLqiCpU",
    version: "weekly"
  });

  const google = await loader.load();

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.4979, lng: 19.0402 },
    zoom: 13
  });

  navigator.geolocation.getCurrentPosition(
    pos => renderSalons(map, google, pos.coords.latitude, pos.coords.longitude),
    () => renderSalons(map, google, 47.4979, 19.0402)
  );
}

async function renderSalons(map, google, lat, lng) {
  const snap = await getDocs(collection(db, "salons"));
  const salons = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  new google.maps.Marker({
    position: { lat, lng },
    map,
    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    title: "Bạn đang ở đây"
  });

  document.getElementById("salonList").innerHTML = "";

  salons.forEach(s => {
    new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map,
      title: s.name
    });
  });
}

window.initMap = initMap;
initMap();
