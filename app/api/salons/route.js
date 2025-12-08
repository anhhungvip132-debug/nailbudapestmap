import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL SALONS
export async function GET() {
  try {
    const salons = await prisma.salon.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(salons);
  } catch (error) {
    console.error("Salons API Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// CREATE NEW SALON (optional)
export async function POST(req) {
  try {
    const body = await req.json();

    // Validate field bắt buộc
    if (!body.name || !body.address || !body.lat || !body.lng) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const salon = await prisma.salon.create({
      data: {
        name: body.name,
        address: body.address,
        lat: Number(body.lat),
        lng: Number(body.lng),
        rating: body.rating ? Number(body.rating) : 0,
      },
    });

    return Response.json({ success: true, salon }, { status: 201 });
  } catch (error) {
    console.error("Salon Create Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
