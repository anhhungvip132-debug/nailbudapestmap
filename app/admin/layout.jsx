"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserRole } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      const role = await getUserRole(user.uid);
      if (role?.role !== "admin") {
        router.replace("/");
        return;
      }

      setReady(true);
    });

    return () => unsub();
  }, [router]);

  if (!ready) {
    return (
      <div className="p-10 text-center text-gray-500">
        Đang kiểm tra quyền truy cập…
      </div>
    );
  }

  return <>{children}</>;
}
