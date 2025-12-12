import { sql } from "@vercel/postgres";

export async function POST(req) {
  const body = await req.json();

  const { salonId, name, email, date, service } = body;

  await sql`
    INSERT INTO bookings (salon_id, name, email, date, service)
    VALUES (${salonId}, ${name}, ${email}, ${date}, ${service})
  `;

  return Response.json({ success: true });
}
