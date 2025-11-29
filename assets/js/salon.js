// Load salon details from URL
const params = new URLSearchParams(location.search);
const salonId = params.get("id");

// Show salon name from query (fallback)
if (salonId) {
  document.getElementById("salonName").innerText = salonId;
} else {
  document.getElementById("salonName").innerText = "Nail Salon Budapest";
}

// Later: you can fetch real data from Firebase here
console.log("Salon page loaded:", salonId);
