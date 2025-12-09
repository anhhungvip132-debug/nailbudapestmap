import fs from "fs";
import path from "path";

// Tạo đường dẫn tuyệt đối, không phụ thuộc vị trí file
const salonsPath = path.join(process.cwd(), "data", "salons.json");

export function getAllSalons() {
  const jsonData = fs.readFileSync(salonsPath, "utf8");
  return JSON.parse(jsonData);
}

export function searchSalons(query) {
  const jsonData = fs.readFileSync(salonsPath, "utf8");
  const salons = JSON.parse(jsonData);

  return salons.filter((salon) =>
    salon.name.toLowerCase().includes(query.toLowerCase())
  );
}
