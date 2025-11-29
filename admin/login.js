import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import firebaseConfig from "./firebase.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "./dashboard.html";
  } catch (err) {
    message.innerText = "Sai thông tin đăng nhập!";
  }
}
