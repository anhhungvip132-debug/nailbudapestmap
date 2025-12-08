import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        service: body.service,
        note: body.note || null,
      },
    });

    return Response.json({ success: true, booking });
  } catch (error) {
    console.error("Booking API Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
