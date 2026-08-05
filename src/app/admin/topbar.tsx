"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { ThemeToggle } from "../../../components/theme-toggle";

export function AdminTopbar({ adminName }: { adminName?: string }) {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-end gap-3 border-b border-white/5 bg-[#0a0e1a] px-6">
            <ThemeToggle />

            <div className="relative">
                <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-semibold text-white"
                >
                    <User size={16} />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-white/10 bg-[#0f1524] py-1 shadow-xl">
                        <div className="border-b border-white/5 px-4 py-2 text-xs text-slate-500">
                            {adminName || "Admin"}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                        >
                            <LogOut size={14} />
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
