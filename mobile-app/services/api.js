import axios from "axios";

const API_BASE = "https://nailbudapestmap.vercel.app";

export async function fetchSalons() {
  const res = await axios.get(`${API_BASE}/api/salons`);
  return res.data;
}

export async function fetchNearest(lat, lng) {
  const res = await axios.get(
    `${API_BASE}/api/nearest?lat=${lat}&lng=${lng}`
  );
  return res.data;
}
