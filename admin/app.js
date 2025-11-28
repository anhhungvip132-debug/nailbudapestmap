// =======================================
// FIREBASE CONFIG
// =======================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// =======================================
// LOGIN ADMIN
// =======================================
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("error");

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "/admin/index.html";
    })
    .catch(err => {
      errorBox.innerText = "Sai tài khoản hoặc mật khẩu!";
      console.error(err);
    });
}

// =======================================
// KIỂM TRA TRẠNG THÁI USER
// =======================================
auth.onAuthStateChanged(user => {
  if (!user && window.location.pathname.includes("index.html")) {
    window.location.href = "/admin/login.html";
  }
});

// =======================================
// CRUD SALON (STEP LATER)
// =======================================
// Chức năng này sẽ được thêm vào sau khi giao diện panel hiển thị
