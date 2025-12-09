import { promises as fs } from "fs";
import path from "path";

const bookingsPath = path.join(process.cwd(), "data/bookings.json");

export async function POST(req) {
  try {
    const body = await req.json();
    const existing = JSON.parse(await fs.readFile(bookingsPath, "utf8"));

    const newBooking = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    existing.push(newBooking);
    await fs.writeFile(bookingsPath, JSON.stringify(existing, null, 2));

    return Response.json({
      success: true,
      message: "Booking saved",
      data: newBooking,
    });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
