"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { RippleButton } from "../../../../components/ripple-button";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // TODO: replace with the real auth API call once the admin backend exists.
        // Example shape for later:
        // const res = await fetch("/api/admin/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ email, password, remember }),
        // });
        // if (!res.ok) { setError("Invalid email or password."); setLoading(false); return; }
        // router.push("/admin/dashboard");

        console.log("Admin login submission (placeholder):", { email, remember });
        window.setTimeout(() => {
            setLoading(false);
            setError("Backend not connected yet — this is a placeholder.");
        }, 800);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1122] via-[#0d1830] to-[#1a2b4a] px-6">
            {/* Background grid + radial glow */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.25),transparent_60%)]" />

            <div className="relative w-full max-w-md">
                <div className="rounded-2xl bg-gradient-to-br from-blue-400/40 via-cyan-300/30 to-blue-600/40 p-[1px]">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl sm:p-10">
                        <div className="flex flex-col items-center text-center">
                            <Image
                                src="/logo-icon-1.png"
                                alt="Geecon Technology"
                                width={48}
                                height={44}
                                className="h-11 w-auto"
                            />
                            <h1 className="mt-4 text-xl font-semibold text-white">Admin Login</h1>
                            <p className="mt-1 text-sm text-slate-400">Sign in to manage Geecon Technology</p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-slate-300">Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@geecontechnology.com"
                                        className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-slate-300">Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 text-slate-400">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="h-3.5 w-3.5 rounded border-white/20 bg-white/5"
                                    />
                                    Remember me
                                </label>
                                <a href="#" className="text-blue-400 hover:text-blue-300">
                                    Forgot password?
                                </a>
                            </div>

                            {error && (
                                <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                                    {error}
                                </p>
                            )}

                            <RippleButton
                                type="submit"
                                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                            >
                                <LogIn size={15} />
                                {loading ? "Signing in..." : "Sign In"}
                            </RippleButton>
                        </form>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} Geecon Technology. All Rights Reserved.
                </p>
            </div>
        </div>
    );
}
