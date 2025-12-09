import fs from "fs";
import path from "path";

const salonsFile = path.join(process.cwd(), "data/salons.json");

export function getAllSalons() {
  const file = fs.readFileSync(salonsFile, "utf8");
  return JSON.parse(file);
}

export function searchSalons(q) {
  const salons = getAllSalons();
  return salons.filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase())
  );
}
