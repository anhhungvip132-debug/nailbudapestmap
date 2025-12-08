import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE BOOKING
export async function POST(req) {
  try {
    const body = await req.json();

    // Validate dữ liệu
    if (!body.name || !body.phone || !body.service || !body.date) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        phone: body.phone,
        service: body.service,
        date: new Date(body.date),
      },
    });

    return Response.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking API Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// GET ALL BOOKINGS (optional)
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(bookings);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
