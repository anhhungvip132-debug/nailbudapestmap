import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      salonId,
      salonName,
      service,
      date,
      time,
      name,
      phone,
    } = body;

    if (!salonId || !service || !date || !time) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    await addDoc(collection(db, "bookings"), {
      salonId,
      salonName,
      service,
      date,
      time,
      name,
      phone,
      status: "new",
      createdAt: serverTimestamp(),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
