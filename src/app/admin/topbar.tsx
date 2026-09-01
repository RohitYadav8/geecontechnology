"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  LogOut,
  User,
  Menu,
} from "lucide-react";

import { ThemeToggle } from "../../../components/theme-toggle";

type AdminTopbarProps = {
  adminName?: string;
  onMenuClick?: () => void;
};

export function AdminTopbar({
  adminName,
  onMenuClick,
}: AdminTopbarProps) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header
      className="
        flex
        h-16
        w-full
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/95
        px-3
        backdrop-blur
        sm:px-4
        md:px-5
        lg:px-6
        dark:border-white/5
        dark:bg-[#0a0e1a]/95
      "
    >
      {/* ================= MOBILE MENU ================= */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open admin navigation"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-700
            shadow-sm
            transition
            hover:bg-slate-100
            lg:hidden
            dark:border-white/10
            dark:bg-white/5
            dark:text-slate-200
            dark:hover:bg-white/10
          "
        >
          <Menu size={20} />
        </button>

        {/* Mobile title */}
        <div className="lg:hidden">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Admin Panel
          </p>

          <p className="hidden text-[11px] text-slate-500 sm:block dark:text-slate-400">
            Geecon Technology
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* ================= ADMIN PROFILE ================= */}

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label="Open admin profile menu"
            aria-expanded={menuOpen}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-blue-500
              to-cyan-400
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:scale-105
              sm:h-10
              sm:w-10
            "
          >
            <User size={17} />
          </button>

          {/* ================= DROPDOWN ================= */}

          {menuOpen && (
            <>
              {/* Click outside overlay */}
              <button
                type="button"
                aria-label="Close profile menu"
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 cursor-default"
              />

              <div
                className="
                  absolute
                  right-0
                  top-full
                  z-50
                  mt-2
                  w-48
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  py-1
                  shadow-xl
                  sm:w-52
                  dark:border-white/10
                  dark:bg-[#0f1524]
                "
              >
                {/* User info */}
                <div className="border-b border-slate-100 px-4 py-3 dark:border-white/5">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Signed in as
                  </p>

                  <p className="mt-0.5 truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                    {adminName || "Admin"}
                  </p>
                </div>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="
                    flex
                    w-full
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    text-left
                    text-sm
                    text-slate-600
                    transition-colors
                    hover:bg-slate-100
                    hover:text-slate-900
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    dark:text-slate-300
                    dark:hover:bg-white/5
                    dark:hover:text-white
                  "
                >
                  <LogOut size={15} />

                  {loggingOut
                    ? "Logging out..."
                    : "Log out"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}