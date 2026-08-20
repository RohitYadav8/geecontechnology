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

  // Login page without sidebar/topbar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64">
        <AdminSidebar />
      </aside>

      {/* Right side */}
      <div className="ml-64 min-h-screen">
        {/* Sticky topbar */}
        <div className="sticky top-0 z-30">
          <AdminTopbar />
        </div>

        {/* Normal browser scroll */}
        <main className="w-full overflow-x-hidden">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}