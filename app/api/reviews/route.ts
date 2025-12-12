import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

/**
 * ÉP API CHẠY NODEJS
 * NGĂN NEXT.JS COLLECT PAGE DATA KHI BUILD
 */
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const salonId = body?.salonId
    const rating = Number(body?.rating)
    const comment = body?.comment ?? null

    if (!salonId || Number.isNaN(rating) || rating < 1 || rating > 5) {
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
  } catch (error) {
    console.error("POST /api/reviews error:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
