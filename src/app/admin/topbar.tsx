"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { ThemeToggle } from "../../../components/theme-toggle";

export function AdminTopbar({ adminName }: { adminName?: string }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-end border-b border-slate-200 bg-white px-6 dark:border-white/5 dark:bg-[#0a0e1a]">
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-semibold text-white"
          >
            <User size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-xl dark:border-white/10 dark:bg-[#0f1524]">
              <div className="border-b border-slate-100 px-4 py-3 text-xs text-slate-500 dark:border-white/5 dark:text-slate-400">
                {adminName || "Admin"}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}