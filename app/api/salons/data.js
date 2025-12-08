// /app/api/salons/data.js

const salons = [
  {
    "id": 1,
    "name": "Edi Nails",
    "address": "Mozsár u. 6, 1066 Budapest",
    "district": "District 6",
    "lat": 47.50252,
    "lng": 19.05501,
    "rating": 5,
    "image": "https://images.unsplash.com/photo-1582095133179-2988c318be0c?auto=format&w=900&q=80",
    "phone": "+36 30 111 2222",
    "gallery": [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&w=800&q=80",
      "https://images.unsplash.com/photo-1604654894610-68efc5f95f31?auto=format&w=800&q=80",
      "https://images.unsplash.com/photo-1558211583-d26f610c97f6?auto=format&w=800&q=80"
    ],
    "services": [
      { "name": "Sơn gel", "price": 6000 },
      { "name": "Đắp bột", "price": 9000 },
      { "name": "Nail Art", "price": 12000 }
    ]
  },

  {
    "id": 2,
    "name": "Nail Budapest",
    "address": "Jókai tér 1, 1065 Budapest",
    "district": "District 6",
    "lat": 47.50602,
    "lng": 19.0621,
    "rating": 5,
    "image": "https://images.unsplash.com/photo-1562259949-e8e7689d7827?auto=format&w=900&q=80",
    "phone": "+36 20 333 4444",
    "gallery": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&w=800&q=80"
    ],
    "services": [
      { "name": "Sơn thường", "price": 4000 },
      { "name": "Sơn gel", "price": 6000 }
    ]
  }
];

export default salons;
