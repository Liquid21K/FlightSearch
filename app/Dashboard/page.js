"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTabs from "../components/(admin)/AdminTabs"

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAdminStatus() {
      const res = await fetch('/api/auth/check-admin');
      const data = await res.json();

      if (!data.isAdmin) {
        router.push('/'); // redirect non-admin users
      } else {
        setIsAdmin(true);
      }
    }

    checkAdminStatus();
  }, [router]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container flex justify-center w-full min-h-screen">
        <div className="mt-20">
        <AdminTabs/>
        </div>
    </div>
  );
}
