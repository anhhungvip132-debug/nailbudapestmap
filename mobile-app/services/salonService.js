// services/salonService.js

const SALONS = [
  {
    id: "1",
    name: "Luxury Nails Budapest",
    address: "Andrássy út 10, Budapest",
    latitude: 47.5021,
    longitude: 19.0584,
    description: "Luxury nail salon in the heart of Budapest",
  },
  {
    id: "2",
    name: "Rose Gold Nail Studio",
    address: "Váci utca 32, Budapest",
    latitude: 47.4934,
    longitude: 19.0556,
    description: "Rose gold themed premium nail studio",
  },
];

export async function getAllSalons() {
  return SALONS.map(normalize);
}

export async function getSalonById(id) {
  if (!id) return null;
  const salon = SALONS.find((s) => s.id === String(id));
  return salon ? normalize(salon) : null;
}

function normalize(salon) {
  return {
    ...salon,
    latitude: Number(salon.latitude),
    longitude: Number(salon.longitude),
  };
}
