import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "VITE_FIREBASE_API_KEY",
  authDomain: "VITE_FIREBASE_AUTH_DOMAIN",
  projectId: "VITE_FIREBASE_PROJECT_ID",
  appId: "VITE_FIREBASE_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const pw = document.getElementById("password").value.trim();

  if (!email || !pw) return alert("Nhập email và mật khẩu");

  try {
    await signInWithEmailAndPassword(auth, email, pw);

    if (email !== "anhhungvip132@gmail.com")
      return alert("Bạn không có quyền truy cập admin!");

    localStorage.setItem("admin", email);
    window.location.href = "/admin/dashboard.html";
  } catch (e) {
    alert("Sai email hoặc mật khẩu");
  }
};
