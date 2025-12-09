import { getAllSalons, searchSalons } from "./data";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const data = q ? searchSalons(q) : getAllSalons();

  return Response.json({
    success: true,
    data,
  });
}
