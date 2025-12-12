import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.salon.createMany({
    data: [
      {
        name: "Arena Mall Nail Corner",
        address: "Kerepesi út 9, Budapest",
        image: "/images/salon-1.jpg",
        rating: 4.6,
        description: "Salon nail cao cấp tại Arena Mall"
      },
      {
        name: "Luxury Pink Nails",
        address: "Andrássy út 12, Budapest",
        image: "/images/salon-2.jpg",
        rating: 4.8,
        description: "Phong cách luxury – rose gold"
      }
    ],
    skipDuplicates: true
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
