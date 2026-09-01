"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { AdminSidebar } from "./sidebar";
import { AdminTopbar } from "./topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login page without sidebar/topbar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen w-full transition-all duration-300 lg:ml-64 lg:w-[calc(100%-16rem)]">
        <div className="sticky top-0 z-30 w-full">
          <AdminTopbar
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>

        <main className="w-full min-w-0 overflow-x-hidden">
          <div className="mx-auto w-full min-w-0 max-w-[1600px] px-4 py-4 sm:px-5 sm:py-5 md:px-6 lg:px-6 lg:py-6 xl:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}