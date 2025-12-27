export type Salon = {
  id: string;
  name: string;
  address: string;
  description?: string;
  lat: number;
  lng: number;
};

export const SALONS: Salon[] = [
  {
    id: "luxury-nails",
    name: "Luxury Nails Budapest",
    address: "Andrássy út 10, Budapest",
    description: "Luxury nail salon in the heart of Budapest",
    lat: 47.5022,
    lng: 19.0587,
  },
  {
    id: "rose-gold-studio",
    name: "Rose Gold Nail Studio",
    address: "Váci utca 32, Budapest",
    description: "Premium nail studio near city center",
    lat: 47.4926,
    lng: 19.0533,
  },
];
