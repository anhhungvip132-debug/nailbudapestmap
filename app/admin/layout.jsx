"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import AdminSidebar from "@/components/ui/AdminSidebar";

const db = getFirestore();

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // ✅ TRANG LOGIN → KHÔNG CHECK AUTH
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }

    // ✅ CHECK AUTH + ROLE ADMIN
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (!snap.exists() || snap.data()?.role !== "admin") {
          router.replace("/");
          return;
        }

        setReady(true);
      } catch (err) {
        console.error("ADMIN AUTH CHECK ERROR:", err);
        router.replace("/");
      }
    });

    return () => unsub();
  }, [pathname, router]);

  // ⏳ LOADING STATE
  if (!ready) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          fontSize: 14,
        }}
      >
        Checking admin permission…
      </div>
    );
  }

  // 🔐 LOGIN PAGE → KHÔNG SIDEBAR
  if (pathname === "/admin/login") {
    return children;
  }

  // ✅ ADMIN PAGES
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: 24,
          background: "#f5f5f5",
        }}
      >
        {children}
      </main>
    </div>
  );
}
