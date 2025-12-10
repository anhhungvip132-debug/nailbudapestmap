const fs = require("fs");

const files = [
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

const svgTemplate = (name) => `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <rect width="800" height="600" fill="#ffd6e8"/>
  <text x="50%" y="50%" font-size="40" text-anchor="middle" fill="#ff4f95">
    ${name}
  </text>
</svg>
`;

if (!fs.existsSync("./public/images")) {
  fs.mkdirSync("./public/images", { recursive: true });
}

files.forEach((file) => {
  const content = svgTemplate(file.replace(".jpg", "").toUpperCase());
  fs.writeFileSync(`./public/images/${file}`, content);
});

console.log("🎉 Generated placeholder images successfully!");
