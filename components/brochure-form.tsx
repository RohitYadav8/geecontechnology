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
  // ============================================================
  // DYNAMIC COLORS
  // ============================================================

  const from =
    gradientFrom?.trim() || "#2563eb";

  const via =
    gradientVia?.trim() || "#7c5cf6";

  const to =
    gradientTo?.trim() || "#06b6d4";

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

  // ============================================================
  // FORM STATE
  // ============================================================

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    website: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  // ============================================================
  // INPUT CHANGE
  // ============================================================

  const handleChange =
    (field: keyof typeof form) =>
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
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

  // ============================================================
  // SUBMIT
  // ============================================================

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
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...form,
            productId:
              productId || null,
          }),
        }
      );

      const data =
        await response.json();

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

  // ============================================================
  // COMMON STYLES
  // ============================================================

  const labelClassName =
    "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400";

  const inputClassName =
    "h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-white/[0.15] dark:focus:border-violet-400/50 dark:focus:bg-white/[0.06]";

  const iconClassName =
    "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500";

  return (
    <motion.aside
      initial={{
        opacity: 0,
        y: 18,
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
        duration: 0.45,
        ease: [
          0.21,
          0.47,
          0.32,
          0.98,
        ],
      }}
      className="relative w-full"
    >
      {/* ======================================================
          OUTER GLOW
      ======================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[32px] opacity-[0.12] blur-2xl dark:opacity-[0.18]"
        style={{
          backgroundImage:
            mainGradient,
        }}
      />

      {/* ======================================================
          CARD
      ======================================================= */}

      <div className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-2 shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)]">
        {/* ====================================================
            COMPACT HEADER
        ===================================================== */}

        <div
          className="relative overflow-hidden rounded-[20px] px-5 pb-6 pt-5 text-white"
          style={{
            backgroundImage:
              mainGradient,
          }}
        >
          {/* Shine */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.14] via-transparent to-black/[0.07]"
          />

          {/* Right glow */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-violet-300/40 blur-3xl"
          />

          {/* Decorative circles */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-cyan-300/30 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-2 h-24 w-24 rounded-full border border-white/[0.14]"
          />

          {/* Header content */}

          <div className="relative z-10 flex items-start gap-3">
            <motion.div
              whileHover={{
                y: -1,
                rotate: -3,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/30 bg-white/[0.16] shadow-lg backdrop-blur-xl"
            >
              <Download
                size={18}
                strokeWidth={2}
              />
            </motion.div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/[0.14] px-2.5 py-1 backdrop-blur-xl">
                <Sparkles
                  size={10}
                  className="text-cyan-200"
                />

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                  Product Brochure
                </span>
              </div>

              <h3 className="text-xl font-extrabold leading-tight tracking-[-0.03em] text-white">
                Download Brochure
              </h3>

              <p className="mt-2 max-w-[260px] text-xs leading-5 text-indigo-50/90">
                Share your details and our
                team will provide the
                brochure and relevant
                information.
              </p>
            </div>
          </div>

          {/* Connector */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>

        {/* ====================================================
            FORM AREA
        ===================================================== */}

        <div className="relative px-3 pb-3 pt-5 sm:px-4">
          {/* Subtle accents */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-0 h-32 w-32 rounded-full opacity-[0.04] blur-[55px] dark:opacity-[0.07]"
            style={{
              backgroundColor: to,
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 bottom-0 h-32 w-32 rounded-full opacity-[0.035] blur-[55px] dark:opacity-[0.06]"
            style={{
              backgroundColor: from,
            }}
          />

          <div className="relative z-10">
            {/* SUCCESS */}

            {success && (
              <div
                role="status"
                className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-medium leading-5 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
              >
                {success}
              </div>
            )}

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium leading-5 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
              >
                {error}
              </div>
            )}

            {/* ==================================================
                FORM
            =================================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >
              {/* NAME */}

              <div>
                <label
                  htmlFor="brochure-name"
                  className={
                    labelClassName
                  }
                >
                  Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <User
                    size={13}
                    className={
                      iconClassName
                    }
                  />

                  <input
                    id="brochure-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange(
                      "name"
                    )}
                    placeholder="Enter your name"
                    disabled={loading}
                    autoComplete="name"
                    className={
                      inputClassName
                    }
                  />
                </div>
              </div>

              {/* PHONE */}

              <div>
                <label
                  htmlFor="brochure-phone"
                  className={
                    labelClassName
                  }
                >
                  Phone
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <Phone
                    size={13}
                    className={
                      iconClassName
                    }
                  />

                  <input
                    id="brochure-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange(
                      "phone"
                    )}
                    placeholder="Enter phone number"
                    disabled={loading}
                    autoComplete="tel"
                    className={
                      inputClassName
                    }
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="brochure-email"
                  className={
                    labelClassName
                  }
                >
                  Email
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <Mail
                    size={13}
                    className={
                      iconClassName
                    }
                  />

                  <input
                    id="brochure-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange(
                      "email"
                    )}
                    placeholder="Enter your email"
                    disabled={loading}
                    autoComplete="email"
                    className={
                      inputClassName
                    }
                  />
                </div>
              </div>

              {/* COMPANY */}

              <div>
                <label
                  htmlFor="brochure-company"
                  className={
                    labelClassName
                  }
                >
                  Company Name
                </label>

                <div className="relative">
                  <Building2
                    size={13}
                    className={
                      iconClassName
                    }
                  />

                  <input
                    id="brochure-company"
                    type="text"
                    value={form.company}
                    onChange={handleChange(
                      "company"
                    )}
                    placeholder="Enter company name"
                    disabled={loading}
                    autoComplete="organization"
                    className={
                      inputClassName
                    }
                  />
                </div>
              </div>

              {/* WEBSITE */}

              <div>
                <label
                  htmlFor="brochure-website"
                  className={
                    labelClassName
                  }
                >
                  Company Website
                </label>

                <div className="relative">
                  <Globe2
                    size={13}
                    className={
                      iconClassName
                    }
                  />

                  <input
                    id="brochure-website"
                    type="text"
                    value={form.website}
                    onChange={handleChange(
                      "website"
                    )}
                    placeholder="https://example.com"
                    disabled={loading}
                    autoComplete="url"
                    className={
                      inputClassName
                    }
                  />
                </div>
              </div>

              {/* =================================================
                  DOWNLOAD BUTTON
              ================================================== */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={
                  loading
                    ? undefined
                    : {
                        y: -1,
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
                className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 text-xs font-bold tracking-[0.06em] text-white shadow-lg shadow-violet-500/25 outline-none transition-[filter,opacity] duration-300 hover:brightness-110 focus-visible:ring-4 focus-visible:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundImage:
                    buttonGradient,

                  boxShadow: `0 14px 30px -14px ${via}`,
                }}
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.14] to-transparent" />

                <span className="pointer-events-none absolute inset-y-0 -left-[45%] w-[32%] skew-x-[-22deg] bg-white/20 blur-sm transition-all duration-700 group-hover:left-[125%]" />

                {loading ? (
                  <>
                    <span className="relative z-10 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/35 border-t-white" />

                    <span className="relative z-10">
                      SUBMITTING...
                    </span>
                  </>
                ) : (
                  <>
                    <Download
                      size={14}
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

              <p className="px-2 pt-1 text-center text-[10px] leading-4 text-slate-400 dark:text-slate-500">
                Your details are used only
                for brochure requests and
                business communication.
              </p>
            </form>
          </div>
        </div>

        {/* ====================================================
            BOTTOM DYNAMIC BRAND LINE
        ===================================================== */}

        <div
          aria-hidden="true"
          className="mx-auto mt-1 h-[3px] w-16 rounded-full"
          style={{
            backgroundImage:
              mainGradient,
          }}
        />
      </div>
    </motion.aside>
  );
}