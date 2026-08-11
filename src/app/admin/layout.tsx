"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./sidebar";
import { AdminTopbar } from "./topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Only login page should be without sidebar and topbar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Every other admin page gets sidebar + topbar
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="fixed inset-y-0 left-0 z-40">
        <AdminSidebar />
      </div>

      <div className="ml-64 min-h-screen">
        <AdminTopbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}