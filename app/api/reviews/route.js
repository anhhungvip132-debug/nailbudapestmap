import { NextResponse } from "next/server";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// GET /api/reviews?salonId=1
// 👉 CHỈ TRẢ REVIEW ĐÃ DUYỆT
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");

    if (!salonId) {
      return NextResponse.json([], { status: 200 });
    }

    const q = query(
      collection(db, "reviews"),
      where("salonId", "==", String(salonId)),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);

    const reviews = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        createdAt:
          data?.createdAt?.seconds != null
            ? { seconds: data.createdAt.seconds }
            : data?.createdAt ?? null,
      };
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews
// 👉 REVIEW MỚI = pending
export async function POST(req) {
  try {
    const body = await req.json();

    const salonId = String(body?.salonId || "");
    const rating = Number(body?.rating ?? 5);
    const comment = String(body?.comment ?? "").trim();

    if (!salonId || !comment) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const payload = {
      salonId,
      rating,
      comment,
      status: "pending", // 🔒 CHỜ DUYỆT
      createdAt: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "reviews"), payload);

    // Trả về object để UI append (nhưng sẽ không hiện lại khi reload)
    const savedSnap = await getDoc(doc(db, "reviews", ref.id));
    const saved = savedSnap.data() || payload;

    return NextResponse.json({
      id: ref.id,
      ...saved,
      createdAt:
        saved?.createdAt?.seconds != null
          ? { seconds: saved.createdAt.seconds }
          : saved?.createdAt ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save review" },
      { status: 500 }
    );
  }
}
