import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Lấy config Firebase của bạn
import firebaseConfig from "./firebase.js";

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Gắn sự kiện click cho nút đăng nhập
document.getElementById("googleLoginBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Email admin được phép vào hệ thống
    const adminEmail = "anhhungvip132@gmail.com";  // <-- THAY Ở ĐÂY NẾU CẦN

    if (user.email === adminEmail) {
      window.location.href = "./dashboard.html";
    } else {
      alert("Bạn không có quyền truy cập trang quản trị!");
    }

  } catch (error) {
    console.log(error);
    alert("Đăng nhập thất bại, vui lòng thử lại!");
  }
});
