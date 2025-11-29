console.log("Booking page loaded");

// Xử lý nút đặt lịch
window.send = function () {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!name || !phone) {
    alert("Vui lòng nhập tên và số điện thoại!");
    return;
  }

  alert("Đặt lịch thành công!\n" + name + "\n" + phone + "\n" + date + " / " + time);
  location.href = "/";
};
