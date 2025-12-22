import { NextResponse } from "next/server";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { status } = await req.json();

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    await updateDoc(doc(db, "reviews", id), {
      status,
      reviewedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ADMIN PATCH review error:", err);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}
