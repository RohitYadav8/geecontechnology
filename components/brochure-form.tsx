"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Building2,
  Download,
  Globe2,
  Mail,
  Phone,
  User,
} from "lucide-react";

type BrochureFormProps = {
  productId?: string;

  gradientFrom?: string | null;
  gradientVia?: string | null;
  gradientTo?: string | null;

  accentText?: string;
  accentSoft?: string;
  accentBorder?: string;
  accentGlow?: string;
};

export function BrochureForm({
  productId,

  gradientFrom,
  gradientVia,
  gradientTo,

  accentText = "text-blue-600 dark:text-blue-400",
  accentSoft = "bg-blue-50 dark:bg-blue-500/10",
  accentBorder = "border-blue-100 dark:border-blue-500/20",
  accentGlow = "bg-blue-500/10 dark:bg-blue-500/10",
}: BrochureFormProps) {
  const from = gradientFrom?.trim() || "#1a2b4a";
  const via = gradientVia?.trim() || "#254b7a";
  const to = gradientTo?.trim() || "#2563a8";

  const brochureGradient = `linear-gradient(135deg, ${from}, ${via}, ${to})`;
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
     HANDLE CHANGE
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
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const response = await fetch(
        "/api/brochure-requests",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...form,
            productId: productId || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to submit brochure request."
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
      console.error(
        "Brochure request error:",
        err
      );

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
     STYLES
  ========================================================= */

  const inputClassName =
    "w-full rounded-xl border border-white/20 bg-white/95 px-10 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-white/40 focus:border-white/60 focus:bg-white focus:ring-4 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClassName =
    "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.13em] text-white/80";

  const iconClassName =
    "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400";

  return (
    <motion.div
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
      className="relative w-full overflow-hidden rounded-[24px] border border-white/15 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.55)] backdrop-blur-xl"
      style={{
        backgroundImage: brochureGradient,
      }}
    >
      {/* =====================================================
          TOP GRADIENT
      ===================================================== */}

      <div
        className="absolute inset-x-0 top-0 h-[4px]"
        style={{
          backgroundImage: brochureGradient,
        }}
      />

      {/* =====================================================
          BANNER COLOR GLOWS
      ===================================================== */}

      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full ${accentGlow} blur-3xl`}
      />

      <div
        className={`pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full ${accentGlow} opacity-50 blur-3xl`}
      />

      {/* subtle pattern */}

      <div className="pointer-events-none absolute right-5 top-5 h-20 w-20 rounded-full border border-slate-200/60 opacity-40 dark:border-white/[0.08]" />

      <div className="pointer-events-none absolute right-10 top-10 h-10 w-10 rounded-full border border-slate-200/70 opacity-40 dark:border-white/[0.08]" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-[1] p-5 sm:p-6">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur-sm"
          >
            <Download size={18} />
          </div>

          <div className="min-w-0">
            <p
              className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/80"
            >
              Get More Details
            </p>

            <h3 className="mt-1 text-lg font-bold tracking-tight text-white sm:text-xl">
              Download Brochure
            </h3>

            <p className="mt-1.5 max-w-[260px] text-xs leading-5 text-white/75">
              Share your details and our team will
              provide the brochure and relevant
              information.
            </p>
          </div>
        </div>

        {/* ===================================================
            SUCCESS
        =================================================== */}

        {success && (
          <div
            role="status"
            className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium leading-5 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
          >
            {success}
          </div>
        )}

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium leading-5 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
          >
            {error}
          </div>
        )}

        {/* ===================================================
            FORM
        =================================================== */}

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-3.5"
        >
          {/* Name */}

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

          {/* Phone */}

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

          {/* Email */}

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

          {/* Company */}

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

          {/* Website */}

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

          {/* =================================================
              DOWNLOAD BUTTON
          ================================================= */}

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
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: "rgba(255,255,255,0.16)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
            }}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                <span>SUBMITTING...</span>
              </>
            ) : (
              <>
                <Download
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />

                <span>
                  DOWNLOAD BROCHURE
                </span>
              </>
            )}
          </motion.button>

          <p className="text-center text-[10px] leading-4 text-white/65">
            Your details are used only for brochure
            requests and business communication.
          </p>
        </form>
      </div>
    </motion.div>
  );
}
