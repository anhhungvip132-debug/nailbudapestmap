import firebaseConfig from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Hàm xử lý đăng nhập
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html"; // chuyển sang trang quản trị
  } catch (error) {
    message.innerText = "Sai email hoặc mật khẩu!";
    console.error(error);
  }
};
