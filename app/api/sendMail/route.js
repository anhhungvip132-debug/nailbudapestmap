import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // ✅ Không làm crash build nữa
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing RESEND_API_KEY",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await req.json();

    const {
      to,
      subject,
      html,
      text,
      from,
    } = body || {};

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: to, subject, html/text",
        },
        { status: 400 }
      );
    }

    // ✅ from mặc định (bạn có thể đổi sang domain verified)
    const fromEmail =
      from || "NailBudapestMap <onboarding@resend.dev>";

    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html: html || undefined,
      text: text || undefined,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("sendMail error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message || "Failed to send email",
      },
      { status: 500 }
    );
  }
}
