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
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#f8fafc]
        text-slate-900
        transition-colors
        duration-500
        dark:bg-[#050812]
        dark:text-white
      "
    >
      {/* ====================================================== */}
      {/* GLOBAL BACKGROUND                                      */}
      {/* ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)]
          bg-[size:42px_42px]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]
          dark:bg-[size:42px_42px]
        "
      />

      {/* top blue glow */}

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
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-[520px]
          w-[520px]
          rounded-full
          bg-blue-500/15
          blur-[130px]
          dark:bg-blue-500/10
        "
      />

      {/* cyan glow */}

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
        className="
          pointer-events-none
          absolute
          -bottom-48
          right-[5%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-400/15
          blur-[140px]
          dark:bg-cyan-400/[0.06]
        "
      />

      {/* ====================================================== */}
      {/* THEME BUTTON                                           */}
      {/* ====================================================== */}

      <div className="absolute right-5 top-5 z-50 sm:right-8 sm:top-8">
        <div
          className="
            rounded-full
            border
            border-slate-200/80
            bg-white/70
            p-1
            shadow-sm
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-white/[0.04]
          "
        >
          <ThemeToggle />
        </div>
      </div>

      {/* ====================================================== */}
      {/* PAGE GRID                                              */}
      {/* ====================================================== */}

      <div
        className="
          relative
          z-10
          grid
          min-h-screen
          lg:grid-cols-[1.12fr_0.88fr]
        "
      >
        {/* ==================================================== */}
        {/* LEFT HERO                                            */}
        {/* ==================================================== */}

        <section
          className="
            relative
            hidden
            overflow-hidden
            px-10
            py-10
            lg:flex
            lg:flex-col
            lg:justify-between
            xl:px-16
            xl:py-12
          "
        >
          {/* premium dark panel */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#14213d]
              via-[#0b1427]
              to-[#08101e]
            "
          />

          {/* dotted background */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-40
              bg-[radial-gradient(circle,rgba(96,165,250,0.22)_1px,transparent_1px)]
              bg-[size:32px_32px]
            "
          />

          {/* glow 1 */}

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
            className="
              pointer-events-none
              absolute
              left-[12%]
              top-[28%]
              h-72
              w-72
              rounded-full
              bg-blue-500/15
              blur-[110px]
            "
          />

          {/* glow 2 */}

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
            className="
              pointer-events-none
              absolute
              bottom-[8%]
              right-[8%]
              h-72
              w-72
              rounded-full
              bg-cyan-400/10
              blur-[120px]
            "
          />

          {/* ================================================== */}
          {/* LOGO                                               */}
          {/* ================================================== */}

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
                <h2 className="text-xl font-semibold text-white">
                  Geecon Technology
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.26em]
                    text-slate-400
                  "
                >
                  Digital Control Center
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================================================== */}
          {/* HERO CONTENT                                       */}
          {/* ================================================== */}

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
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-300/10
                bg-cyan-400/[0.07]
                px-3
                py-1.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-cyan-300
              "
            >
              <Sparkles size={13} />

              Admin workspace
            </motion.div>

            <div className="mt-7">
              <AnimatedHeading
                text="Manage. Monitor. Move your business forward."
                as="h1"
                className="
                  max-w-3xl
                  text-4xl
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-white
                  xl:text-5xl
                  2xl:text-[58px]
                "
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
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-slate-400
                xl:text-[15px]
              "
            >
              One secure workspace to manage everything behind Geecon
              Technology — services, products, content, careers and
              customer interactions.
            </motion.p>

            {/* ================================================ */}
            {/* CARDS                                            */}
            {/* ================================================ */}

            <StaggerContainer
              className="
                mt-10
                grid
                gap-3
                xl:grid-cols-3
              "
            >
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
                      className="
                        group
                        h-full
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-white/[0.045]
                        p-5
                        backdrop-blur-xl
                        transition-colors
                        duration-300
                        hover:border-cyan-300/20
                        hover:bg-white/[0.065]
                      "
                    >
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-white/10
                          bg-white/[0.06]
                          text-cyan-300
                          transition-all
                          duration-300
                          group-hover:scale-110
                          group-hover:bg-cyan-400/10
                        "
                      >
                        <Icon size={18} />
                      </div>

                      <h3
                        className="
                          mt-4
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        {card.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-xs
                          leading-5
                          text-slate-400
                        "
                      >
                        {card.text}
                      </p>                                                                                                                                      
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* mini dashboard stats */}

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
              className="
                mt-5
                flex
                items-center
                gap-5
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.035]
                px-5
                py-4
                backdrop-blur-xl
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/10
                  text-blue-300
                "
              >
                <BarChart3 size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Centralized administration
                </p>

                <p className="mt-0.5 text-sm font-medium text-slate-200">
                  Everything under one dashboard
                </p>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-emerald-400
                      opacity-50
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-emerald-400
                    "
                  />
                </span>

                <span className="text-[10px] font-medium text-emerald-300">
                  Secure
                </span>
              </div>
            </motion.div>
          </div>

          {/* ================================================== */}
          {/* LEFT FOOTER                                        */}
          {/* ================================================== */}

          <div
            className="
              relative
              z-10
              flex
              items-center
              justify-between
              text-[11px]
              text-slate-500
            "
          >
            <span>
              © {new Date().getFullYear()} Geecon Technology
            </span>

            <div className="flex items-center gap-2">
              <ShieldCheck size={13} />
              Secure administrator portal
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* LOGIN SECTION                                        */}
        {/* ==================================================== */}

        <section
          className="
            relative
            flex
            min-h-screen
            items-center
            justify-center
            px-5
            py-20
            sm:px-8
            lg:px-12
          "
        >
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
            className="
              absolute
              left-5
              top-6
              flex
              items-center
              gap-2
              lg:hidden
            "
          >
            <Image
              src="/logo-icon-1.png"
              alt="Geecon Technology"
              width={38}
              height={38}
              className="h-9 w-auto"
            />

            <span
              className="
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Geecon Technology
            </span>
          </motion.div>

          {/* ================================================ */}
          {/* FORM                                             */}
          {/* ================================================ */}

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
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-3
                py-1.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-blue-600
                dark:border-cyan-400/10
                dark:bg-cyan-400/[0.06]
                dark:text-cyan-300
              "
            >
              <ShieldCheck size={13} />
              Secure admin access
            </div>

            <h1
              className="
                mt-6
                text-3xl
                font-semibold
                tracking-[-0.04em]
                text-slate-950
                sm:text-[40px]
                dark:text-white
              "
            >
              Welcome back
            </h1>

            <p
              className="
                mt-3
                max-w-sm
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              Sign in to access your Geecon Technology administration
              workspace.
            </p>

            {/* FORM CARD */}

            <div
              className="
                relative
                mt-8
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200/80
                bg-white/80
                p-6
                shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)]
                backdrop-blur-2xl
                sm:p-8
                dark:border-white/[0.07]
                dark:bg-white/[0.035]
                dark:shadow-[0_30px_100px_-30px_rgba(0,0,0,0.7)]
              "
            >
              {/* card top gradient */}

              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-[2px]
                  w-full
                  bg-gradient-to-r
                  from-blue-500
                  via-cyan-400
                  to-indigo-500
                "
              />

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-xs
                      font-semibold
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    Email address
                  </label>

                  <div className="group relative">
                    <Mail
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        transition-colors
                        duration-300
                        group-focus-within:text-blue-500
                        dark:text-slate-500
                        dark:group-focus-within:text-cyan-300
                      "
                    />

                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@geecontechnology.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50/80
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-slate-400
                        hover:border-slate-300
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                        dark:border-white/[0.08]
                        dark:bg-white/[0.035]
                        dark:text-white
                        dark:placeholder:text-slate-600
                        dark:hover:border-white/[0.15]
                        dark:focus:border-cyan-400/60
                        dark:focus:bg-white/[0.05]
                        dark:focus:ring-cyan-400/10
                      "
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <label
                    htmlFor="password"
                    className="
                      mb-2
                      block
                      text-xs
                      font-semibold
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    Password
                  </label>

                  <div className="group relative">
                    <LockKeyhole
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        transition-colors
                        duration-300
                        group-focus-within:text-blue-500
                        dark:text-slate-500
                        dark:group-focus-within:text-cyan-300
                      "
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50/80
                        py-3.5
                        pl-11
                        pr-12
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-slate-400
                        hover:border-slate-300
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                        dark:border-white/[0.08]
                        dark:bg-white/[0.035]
                        dark:text-white
                        dark:placeholder:text-slate-600
                        dark:hover:border-white/[0.15]
                        dark:focus:border-cyan-400/60
                        dark:focus:bg-white/[0.05]
                        dark:focus:ring-cyan-400/10
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        transition-colors
                        hover:text-slate-700
                        dark:text-slate-500
                        dark:hover:text-slate-200
                      "
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
                    className="
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-xs
                      font-medium
                      text-red-600
                      dark:border-red-500/20
                      dark:bg-red-500/10
                      dark:text-red-300
                    "
                  >
                    {error}
                  </motion.p>
                )}

                {/* SIGN IN */}

                <RippleButton
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#1a2b4a]
                    px-5
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-950/15
                    transition-all
                    duration-300
                    hover:bg-[#22385f]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    dark:bg-gradient-to-r
                    dark:from-blue-600
                    dark:via-blue-500
                    dark:to-cyan-500
                    dark:shadow-cyan-500/10
                  "
                >
                  <span>
                    {loading ? "Signing in..." : "Sign in"}
                  </span>

                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  )}
                </RippleButton>
              </form>
            </div>

            {/* FORM FOOTER */}

            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                text-[11px]
                text-slate-400
                dark:text-slate-600
              "
            >
              <ShieldCheck size={13} />

              Protected administrator access
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}