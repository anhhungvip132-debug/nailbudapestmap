import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  await resend.emails.send({
    from: "NailBooking <noreply@nailbooking.com>",
    to: body.email,
    subject: "Xác nhận lịch hẹn NailBooking",
    html: `
      <h2>Xin chào ${body.name}</h2>
      <p>Bạn đã đặt lịch tại <b>${body.salon}</b></p>
      <p>Thời gian: ${body.date} – ${body.time}</p>
      <p>Cảm ơn bạn!</p>
    `,
  });

  return NextResponse.json({ success: true });
}
