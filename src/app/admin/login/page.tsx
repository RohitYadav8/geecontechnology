"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { AnimatedHeading } from "../../../../components/animated-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../../components/stagger-container";
import { RippleButton } from "../../../../components/ripple-button";
import { ThemeToggle } from "../../../../components/theme-toggle";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
      setLoading(false);
    }
  };

  const cards = [
    {
      icon: BriefcaseBusiness,
      title: "Products & Services",
      text: "Manage your services, products and digital solutions.",
    },
    {
      icon: FileText,
      title: "Website Content",
      text: "Control blogs, testimonials, case studies and content.",
    },
    {
      icon: Users,
      title: "Careers & Applicants",
      text: "Manage job openings, screening and applications.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#060b16] dark:text-white">
      {/* ======================================================
          GLOBAL BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.04)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] dark:bg-[size:44px_44px]" />

      {/* Top blue glow */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-400/20 blur-[130px] dark:bg-violet-500/10"
      />

      {/* Cyan glow */}

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-48 right-[5%] h-[500px] w-[500px] rounded-full bg-cyan-300/25 blur-[140px] dark:bg-cyan-400/[0.06]"
      />

      {/* ======================================================
          THEME BUTTON
      ====================================================== */}

      <div className="absolute right-5 top-5 z-50 sm:right-8 sm:top-8">
        <div className="rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-lg shadow-violet-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
          <ThemeToggle />
        </div>
      </div>

      {/* ======================================================
          PAGE GRID
      ====================================================== */}

      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.12fr_0.88fr]">
        {/* ====================================================
            LEFT HERO
        ==================================================== */}

        <section className="relative m-4 hidden overflow-hidden rounded-[32px] px-10 py-10 shadow-[0_40px_100px_-40px_rgba(91,33,182,.55)] lg:flex lg:flex-col lg:justify-between xl:px-16 xl:py-12">
          {/* Premium dark panel */}

          <div className="brand-grad absolute inset-0" />

          {/* Dotted background */}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.07]" />

          {/* Glow 1 */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute left-[12%] top-[28%] h-72 w-72 rounded-full bg-cyan-300/35 blur-[110px]"
          />

          {/* Glow 2 */}

          <motion.div
            animate={{
              scale: [1.1, 0.95, 1.1],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute bottom-[8%] right-[8%] h-72 w-72 rounded-full bg-violet-300/40 blur-[120px]"
          />

          {/* ==================================================
              LOGO
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo-icon-1.png"
                alt="Geecon Technology"
                width={52}
                height={52}
                priority
                className="h-12 w-auto object-contain"
              />

              <div>
                <h2 className="text-xl font-extrabold tracking-[-0.02em] text-white">
                  Geecon Technology
                </h2>

                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.26em] text-indigo-100/80">
                  Digital Control Center
                </p>
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              HERO CONTENT
          ================================================== */}

          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
            >
              <Sparkles size={13} />
              Admin workspace
            </motion.div>

            <div className="mt-7">
              <AnimatedHeading
                text="Manage. Monitor. Move your business forward."
                as="h1"
                className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] text-white xl:text-5xl 2xl:text-[58px]"
                highlightFrom={2}
                highlightClassName="brand-text-light"
              />
            </div>

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="mt-6 max-w-2xl text-sm leading-7 text-indigo-50/90 xl:text-base xl:leading-8"
            >
              One secure workspace to manage everything behind Geecon
              Technology — services, products, content, careers and customer
              interactions.
            </motion.p>

            {/* =================================================
                CARDS
            ================================================= */}

            <StaggerContainer className="mt-10 grid gap-3 xl:grid-cols-3">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <StaggerItem key={card.title}>
                    <motion.div
                      whileHover={{
                        y: -7,
                        scale: 1.015,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="group h-full rounded-[22px] border border-white/25 bg-white/[0.12] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.18]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white text-violet-600 shadow-lg shadow-violet-900/20 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110">
                        <Icon size={18} />
                      </div>

                      <h3 className="mt-4 text-sm font-bold text-white">
                        {card.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-indigo-50/85">
                        {card.text}
                      </p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Mini dashboard stats */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.55,
              }}
              className="mt-5 flex items-center gap-5 rounded-[22px] border border-white/25 bg-white/[0.12] px-5 py-4 backdrop-blur-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white text-violet-600 shadow-lg shadow-violet-900/20">
                <BarChart3 size={18} />
              </div>

              <div>
                <p className="text-xs text-indigo-100/80">
                  Centralized administration
                </p>

                <p className="mt-0.5 text-sm font-bold text-white">
                  Everything under one dashboard
                </p>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-100">
                  Secure
                </span>
              </div>
            </motion.div>
          </div>

          {/* ==================================================
              LEFT FOOTER
          ================================================== */}

          <div className="relative z-10 flex items-center justify-between text-[11px] text-indigo-100/80">
            <span>© 2026 Geecon Technology</span>

            <div className="flex items-center gap-2">
              <ShieldCheck size={13} />
              Secure administrator portal
            </div>
          </div>
        </section>

        {/* ====================================================
            LOGIN SECTION
        ==================================================== */}

        <section className="relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 lg:px-12">
          {/* Mobile branding */}

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="absolute left-5 top-6 flex items-center gap-2 lg:hidden"
          >
            <Image
              src="/logo-icon-1.png"
              alt="Geecon Technology"
              width={38}
              height={38}
              className="h-9 w-auto"
            />

            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              Geecon Technology
            </span>
          </motion.div>

          {/* =================================================
              FORM
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-[470px]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300">
              <ShieldCheck size={13} />
              Secure admin access
            </div>

            <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-[40px] dark:text-white">
              Welcome back
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              Sign in to access your Geecon Technology administration
              workspace.
            </p>

            {/* FORM CARD */}

            <div className="relative mt-8 overflow-hidden rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-8 dark:border-white/[0.07] dark:bg-[#0b1220] dark:shadow-[0_30px_100px_-30px_rgba(0,0,0,0.7)]">
              {/* Card top gradient */}

              <div className="brand-grad absolute left-0 top-0 h-1 w-full" />

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Email address
                  </label>

                  <div className="group relative">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-violet-500 dark:text-slate-500 dark:group-focus-within:text-violet-300"
                    />

                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@geecontechnology.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600 dark:hover:border-white/[0.15] dark:focus:border-violet-400/60 dark:focus:bg-white/[0.06] dark:focus:ring-violet-400/10"
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>

                  <div className="group relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-violet-500 dark:text-slate-500 dark:group-focus-within:text-violet-300"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600 dark:hover:border-white/[0.15] dark:focus:border-violet-400/60 dark:focus:bg-white/[0.06] dark:focus:ring-violet-400/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* ERROR */}

                {error && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
                  >
                    {error}
                  </motion.p>
                )}

                {/* SIGN IN */}

                <RippleButton
                  type="submit"
                  disabled={loading}
                  className="brand-grad group flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <span>{loading ? "Signing in..." : "Sign in"}</span>

                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </RippleButton>
              </form>
            </div>

            {/* FORM FOOTER */}

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-600">
              <ShieldCheck size={13} />
              Protected administrator access
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}