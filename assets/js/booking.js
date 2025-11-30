import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkq0DKue8884V3AAu_O-cpEmlcalJhDOs",
  authDomain: "nailfinder-6146a.firebaseapp.com",
  projectId: "nailfinder-6146a",
  storageBucket: "nailfinder-6146a.firebasestorage.app",
  messagingSenderId: "703195233020",
  appId: "1:703195233020:web:d0fd8877b2986f03a27579"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("bookingForm").addEventListener("submit", async e => {
  e.preventDefault();

  await addDoc(collection(db, "booking"), {
    name: bookingName.value,
    phone: bookingPhone.value,
    time: bookingTime.value,
    created: new Date()
  });

  alert("Đặt lịch thành công!");
  bookingForm.reset();
});
