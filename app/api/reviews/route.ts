import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request) {
  try {
    const body = await request.json()

    const salonId = body?.salonId
    const rating = Number(body?.rating)
    const comment = body?.comment ?? null

    if (!salonId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      )
    }

    await prisma.review.create({
      data: {
        salonId,
        rating,
        comment,
      },
    })

    const stats = await prisma.review.aggregate({
      where: { salonId },
      _avg: { rating: true },
      _count: true,
    })

    await prisma.salon.update({
      where: { id: salonId },
      data: {
        rating: Number(stats._avg.rating?.toFixed(1) || 0),
        reviewCount: stats._count,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("POST /api/reviews error:", err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
