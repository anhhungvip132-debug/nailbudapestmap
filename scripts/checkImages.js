const fs = require("fs");
const path = require("path");

const requiredImages = [
  "nail1.jpg",
  "nail2.jpg",
  "nail3.jpg",
  "salon1.jpg",
  "salon2.jpg",
  "salon3.jpg",
  "salon4.jpg",
  "salon5.jpg",
  "salon6.jpg",
  "blog1.jpg",
  "blog2.jpg",
  "blog3.jpg",
  "logo.png",
  "owner.jpg",
  "placeholder.jpg"
];

const imagesDir = path.join(__dirname, "../public/images");

console.log("🔎 Scanning missing images...\n");

requiredImages.forEach((file) => {
  const fullPath = path.join(imagesDir, file);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ Missing: ${file}`);
  } else {
    console.log(`✔ Found: ${file}`);
  }
});
