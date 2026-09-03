"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Building2,
  Download,
  Globe2,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";

type BrochureFormProps = {
  productId?: string;

  gradientFrom?: string | null;
  gradientVia?: string | null;
  gradientTo?: string | null;
};

export function BrochureForm({
  productId,
  gradientFrom,
  gradientVia,
  gradientTo,
}: BrochureFormProps) {
  /* =========================================================
     DYNAMIC PRODUCT COLORS
     Comes from Admin / Database
  ========================================================= */

  const from = gradientFrom?.trim() || "#172554";
  const via = gradientVia?.trim() || "#2563eb";
  const to = gradientTo?.trim() || "#06b6d4";

  const mainGradient = `linear-gradient(
    135deg,
    ${from} 0%,
    ${via} 52%,
    ${to} 100%
  )`;

  const buttonGradient = `linear-gradient(
    110deg,
    ${from} 0%,
    ${via} 48%,
    ${to} 100%
  )`;

  /* =========================================================
     FORM STATE
  ========================================================= */

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      if (error) {
        setError("");
      }

      if (success) {
        setSuccess("");
      }
    };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const response = await fetch("/api/brochure-requests", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,
          productId: productId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to submit brochure request."
        );
      }

      setSuccess(
        "Request submitted successfully. We will contact you shortly."
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        company: "",
        website: "",
      });
    } catch (err) {
      console.error("Brochure request error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     COMMON STYLES
  ========================================================= */

  const labelClassName =
    "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400";

  const inputClassName =
    "h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:hover:bg-slate-950 dark:focus:border-slate-600 dark:focus:bg-slate-950 dark:focus:ring-slate-800";

  const iconClassName =
    "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500";

  return (
    <motion.aside
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="relative w-full"
    >
      {/* =====================================================
          OUTER BRAND GLOW

          This helps the form visually connect with the
          product banner without making the whole form dark.
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[32px] opacity-[0.12] blur-2xl dark:opacity-[0.18]"
        style={{
          backgroundImage: mainGradient,
        }}
      />

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="relative overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_30px_80px_-35px_rgba(0,0,0,0.85)]">
        {/* ===================================================
            BANNER-CONNECTED HEADER
        =================================================== */}

        <div
          className="relative overflow-hidden px-5 pb-7 pt-6 text-white sm:px-6"
          style={{
            backgroundImage: mainGradient,
          }}
        >
          {/* Background shine */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.16] via-transparent to-black/[0.08]"
          />

          {/* Large right glow */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/20 blur-[65px]"
          />

          {/* Bottom left glow */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-white/10 blur-[60px]"
          />

          {/* Decorative circles */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-5 top-3 h-28 w-28 rounded-full border border-white/[0.12]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-12 h-16 w-16 rounded-full border border-white/[0.12]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[53px] top-[76px] h-3 w-3 rounded-full bg-white/20"
          />

          {/* Content */}

          <div className="relative z-10">
            <div className="flex items-start gap-3.5">
              <motion.div
                whileHover={{
                  y: -2,
                  rotate: -3,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.14] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md"
              >
                <Download
                  size={19}
                  strokeWidth={2}
                />
              </motion.div>

              <div className="min-w-0">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Sparkles
                    size={11}
                    className="text-white/70"
                  />

                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/70">
                    Product Brochure
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white">
                  Download Brochure
                </h3>

                <p className="mt-2 max-w-[260px] text-xs leading-5 text-white/75">
                  Share your details and our team will
                  provide the brochure and relevant
                  information.
                </p>
              </div>
            </div>

            {/* Header bottom line */}

            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-white/40 to-white/5" />

              <div className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span className="h-1 w-1 rounded-full bg-white/15" />
              </div>
            </div>
          </div>

          {/* =================================================
              CONNECTOR

              This section makes header + form body feel like
              one banner extension instead of two separate boxes.
          ================================================= */}

          <div
            aria-hidden="true"
            className="absolute -bottom-px left-0 right-0 h-5 bg-white dark:bg-slate-900"
            style={{
              clipPath:
                "polygon(0 72%, 18% 45%, 42% 70%, 67% 38%, 100% 64%, 100% 100%, 0 100%)",
            }}
          />
        </div>

        {/* ===================================================
            FORM AREA
        =================================================== */}

        <div className="relative px-5 pb-6 pt-3 sm:px-6">
          {/* Brand-colored subtle background accents */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-0 h-44 w-44 rounded-full opacity-[0.055] blur-[65px] dark:opacity-[0.09]"
            style={{
              backgroundColor: to,
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full opacity-[0.045] blur-[65px] dark:opacity-[0.07]"
            style={{
              backgroundColor: from,
            }}
          />

          <div className="relative z-10">
            {/* ===============================================
                SUCCESS MESSAGE
            =============================================== */}

            {success && (
              <div
                role="status"
                className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium leading-5 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
              >
                {success}
              </div>
            )}

            {/* ===============================================
                ERROR MESSAGE
            =============================================== */}

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium leading-5 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
              >
                {error}
              </div>
            )}

            {/* ===============================================
                FORM
            =============================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >
              {/* NAME */}

              <div>
                <label
                  htmlFor="brochure-name"
                  className={labelClassName}
                >
                  Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <User
                    size={15}
                    className={iconClassName}
                  />

                  <input
                    id="brochure-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Enter your name"
                    disabled={loading}
                    autoComplete="name"
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* PHONE */}

              <div>
                <label
                  htmlFor="brochure-phone"
                  className={labelClassName}
                >
                  Phone
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <Phone
                    size={15}
                    className={iconClassName}
                  />

                  <input
                    id="brochure-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="Enter phone number"
                    disabled={loading}
                    autoComplete="tel"
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="brochure-email"
                  className={labelClassName}
                >
                  Email
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <Mail
                    size={15}
                    className={iconClassName}
                  />

                  <input
                    id="brochure-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="Enter your email"
                    disabled={loading}
                    autoComplete="email"
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* COMPANY */}

              <div>
                <label
                  htmlFor="brochure-company"
                  className={labelClassName}
                >
                  Company Name
                </label>

                <div className="relative">
                  <Building2
                    size={15}
                    className={iconClassName}
                  />

                  <input
                    id="brochure-company"
                    type="text"
                    value={form.company}
                    onChange={handleChange("company")}
                    placeholder="Enter company name"
                    disabled={loading}
                    autoComplete="organization"
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* WEBSITE */}

              <div>
                <label
                  htmlFor="brochure-website"
                  className={labelClassName}
                >
                  Company Website
                </label>

                <div className="relative">
                  <Globe2
                    size={15}
                    className={iconClassName}
                  />

                  <input
                    id="brochure-website"
                    type="text"
                    value={form.website}
                    onChange={handleChange("website")}
                    placeholder="https://example.com"
                    disabled={loading}
                    autoComplete="url"
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* =============================================
                  DOWNLOAD BUTTON
              ============================================= */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={
                  loading
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  loading
                    ? undefined
                    : {
                        scale: 0.985,
                      }
                }
                transition={{
                  duration: 0.2,
                }}
                className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 text-sm font-bold text-white outline-none transition-[filter,opacity] duration-300 hover:brightness-110 focus-visible:ring-4 focus-visible:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-slate-700"
                style={{
                  backgroundImage: buttonGradient,
                  boxShadow: `0 14px 32px -16px ${via}`,
                }}
              >
                {/* Button highlight */}

                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.14] to-transparent" />

                {/* Moving shine */}

                <span className="pointer-events-none absolute inset-y-0 -left-[45%] w-[32%] skew-x-[-22deg] bg-white/20 blur-sm transition-all duration-700 group-hover:left-[125%]" />

                {loading ? (
                  <>
                    <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />

                    <span className="relative z-10">
                      SUBMITTING...
                    </span>
                  </>
                ) : (
                  <>
                    <Download
                      size={16}
                      strokeWidth={2.2}
                      className="relative z-10 transition-transform duration-200 group-hover:translate-y-0.5"
                    />

                    <span className="relative z-10">
                      DOWNLOAD BROCHURE
                    </span>
                  </>
                )}
              </motion.button>

              {/* PRIVACY */}

              <p className="px-2 pt-0.5 text-center text-[10px] leading-4 text-slate-400 dark:text-slate-500">
                Your details are used only for brochure
                requests and business communication.
              </p>
            </form>
          </div>
        </div>

        {/* ===================================================
            BOTTOM DYNAMIC BRAND LINE
        =================================================== */}

        <div
          aria-hidden="true"
          className="h-[3px] w-full"
          style={{
            backgroundImage: mainGradient,
          }}
        />
      </div>
    </motion.aside>
  );
}