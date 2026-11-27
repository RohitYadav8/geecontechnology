"use client";

import { useState } from "react";

import {
  Building2,
  MapPin,
  Briefcase,
  Mail,
  Send,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { RippleButton } from "../../../components/ripple-button";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";

const offices = [
  {
    icon: Building2,
    title: "Head Office -> UK",
    lines: [
      "Trading as Visualytes Limited",
      "Cumberland House,",
      "Southampton,",
      "SO15 2BG.",
    ],
    email: "info@geecontechnology.com",
  },
  {
    icon: MapPin,
    title: "Asia Corporate Office",
    lines: [
      "Row House 20, Golden Nest,",
      "Phase III, Mira-Bhayandar Road,",
      "Bhayandar East, Thane-401105.",
    ],
    email: "info@geecontechnology.com",
  },
  {
    icon: Briefcase,
    title: "Career With Us",
    lines: [
      "Come on, join US. And we will help",
      "You to explore your values and",
      "valuate your skills.",
    ],
    email: null,
  },
];

const sourceOptions = [
  "Search Engine",
  "Social Media",
  "Referral",
  "Advertisement",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  source: "",
  requirements: "",
};

export default function ContactUsPage() {
  const [form, setForm] =
    useState(initialForm);

  const [
    showToast,
    setShowToast,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (errorMessage) {
        setErrorMessage("");
      }
    };

  const handleClear = () => {
    setForm(initialForm);
    setErrorMessage("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setShowToast(false);

    try {
      const response =
        await fetch(
          "/api/contact",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name: form.name,
              email: form.email,
              phone: form.phone,
              address:
                form.address,
              source:
                form.source,
              requirements:
                form.requirements,
            }),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Unable to submit the form."
        );
      }

      setForm(initialForm);
      setShowToast(true);

      window.setTimeout(
        () => {
          setShowToast(
            false
          );
        },
        4000
      );
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(
        false
      );
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]";

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="relative flex-1">
        {/* ================= HERO ================= */}

        <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-center text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
          <FloatingBlob
            className="-left-40 top-24 h-[460px] w-[460px]"
            color="bg-cyan-300/35"
            duration={18}
          />

          <FloatingBlob
            className="-right-28 -top-24 h-[420px] w-[420px]"
            color="bg-violet-300/40"
            duration={16}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative mx-auto max-w-3xl">
            <AnimatedHeading
              text="Contact Us"
              as="h1"
              highlightFrom={1}
              highlightClassName="brand-text-light"
              className="text-[44px] font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[76px]"
            />

            <AnimateIn delay={0.15}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                Have a project
                in mind, or
                just want to
                say hello?
                We&apos;d love
                to hear from
                you.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* ================= OFFICE CARDS ================= */}

        <section className="relative z-10 -mt-28 px-4 sm:-mt-32 sm:px-6 lg:px-10">
          <StaggerContainer className="mx-auto grid max-w-7xl items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:h-full">
            {offices.map((office) => (
              <StaggerItem key={office.title}>
                <div className="group flex h-full min-h-[240px] flex-col rounded-[26px] border border-slate-100 bg-white p-7 shadow-[0_40px_90px_-45px_rgba(15,23,42,.45)] transition-all duration-500 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-[0_40px_90px_-40px_rgba(91,33,182,.4)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
                  <div className="brand-grad flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
                    <office.icon size={21} strokeWidth={1.9} />
                  </div>

                  <h3 className="mt-5 text-[15px] font-extrabold uppercase tracking-wide text-slate-950 dark:text-white">
                    {office.title}
                  </h3>

                  <div className="mt-3 space-y-0.5 text-[14px] leading-6 text-slate-500 dark:text-slate-400">
                    {office.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>

                  {office.email && (
                    <a
                      href={`mailto:${office.email}`}
                      className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[14px] font-bold"
                    >
                      <Mail
                        size={15}
                        className="text-violet-500"
                      />

                      <span className="brand-text">
                        {office.email}
                      </span>
                    </a>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ================= FORM ================= */}

        <section className="relative px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-10">
          <AnimateIn className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-3 shadow-[0_40px_100px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] lg:grid-cols-[0.85fr_1.15fr]">
              {/* Left gradient panel */}

              <div className="brand-grad relative flex flex-col justify-between overflow-hidden rounded-[24px] p-8 text-white sm:p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />

                <h2 className="relative text-2xl font-extrabold leading-snug tracking-[-0.02em] sm:text-[30px]">
                  If you&apos;d
                  like us to
                  contact you,
                  please fill out
                  the form.
                </h2>

                <div className="relative mt-10 rounded-2xl border border-white/25 bg-white/[0.12] p-5 backdrop-blur-xl">
                  <h2 className="text-lg font-extrabold">
                    We usually
                    reply within
                    24 hours
                  </h2>

                  <p className="mt-1.5 text-[14px] leading-6 text-indigo-50/90">
                    Whether
                    it&apos;s a
                    quick question
                    or a full
                    project brief,
                    our team is
                    ready to help.
                  </p>
                </div>
              </div>

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="grid content-start gap-4 p-5 sm:grid-cols-2 sm:p-8 lg:p-10"
              >
                <input
                  type="text"
                  required
                  placeholder="*Name"
                  value={form.name}
                  onChange={handleChange("name")}
                  disabled={isSubmitting}
                  className={fieldClass}
                />

                <input
                  type="email"
                  required
                  placeholder="*Email"
                  value={form.email}
                  onChange={handleChange("email")}
                  disabled={isSubmitting}
                  className={fieldClass}
                />

                <input
                  type="tel"
                  required
                  placeholder="*Phone"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  disabled={isSubmitting}
                  className={fieldClass}
                />

                <select
                  value={form.source}
                  onChange={handleChange("source")}
                  disabled={isSubmitting}
                  className={`${fieldClass} text-slate-600 dark:text-slate-300`}
                >
                  <option value="">
                    How Did
                    You Come
                    To Know
                    About
                    Us?
                  </option>

                  {sourceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <textarea
                  required
                  placeholder="*Address"
                  value={form.address}
                  onChange={handleChange("address")}
                  disabled={isSubmitting}
                  rows={3}
                  className={`${fieldClass} resize-y sm:col-span-2`}
                />

                <textarea
                  placeholder="Requirements"
                  value={form.requirements}
                  onChange={handleChange("requirements")}
                  disabled={isSubmitting}
                  rows={4}
                  className={`${fieldClass} resize-y sm:col-span-2`}
                />

                {/* Error */}

                {errorMessage && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 sm:col-span-2">
                    <AlertCircle
                      size={16}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Buttons */}

                <div className="flex flex-wrap items-center gap-3 pt-2 sm:col-span-2">
                  <RippleButton
                    type="submit"
                    disabled={isSubmitting}
                    className="brand-grad rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          size={15}
                          className="animate-spin"
                        />

                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />

                        Submit
                      </>
                    )}
                  </RippleButton>

                  <RippleButton
                    type="button"
                    onClick={handleClear}
                    disabled={isSubmitting}
                    className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 hover:border-violet-300 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                  >
                    <RotateCcw size={15} />

                    Clear
                  </RippleButton>
                </div>
              </form>
            </div>
          </AnimateIn>
        </section>
      </main>

      <Footer />

      {/* ================= SUCCESS TOAST ================= */}

      {showToast && (
        <div
          className="brand-grad fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-[13px] font-semibold text-white shadow-xl shadow-violet-500/30"
          style={{
            animation:
              "geecon-toast-in 0.3s ease-out",
          }}
        >
          <style>{`
            @keyframes geecon-toast-in {
              from {
                transform: translateY(12px);
                opacity: 0;
              }

              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>

          <CheckCircle
            size={15}
          />

          Message sent successfully! We&apos;ll get back to you soon.
        </div>
      )}
    </div>
  );
}
