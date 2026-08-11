
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
import { MouseGlow } from "../../../components/mouse-glow";
import { TiltCard } from "../../../components/tilt-card";
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
  const [form, setForm] = useState(initialForm);

  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Remove previous error when user starts typing
      if (errorMessage) {
        setErrorMessage("");
      }
    };

  const handleClear = () => {
    setForm(initialForm);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setShowToast(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          source: form.source,
          requirements: form.requirements,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit the form."
        );
      }

      // Successfully submitted
      setForm(initialForm);
      setShowToast(true);

      window.setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } catch (error) {
      console.error("Contact form error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white dark:bg-slate-950">
      <Navbar />

      <main className="relative flex-1">
        {/* ================= BACKGROUND ================= */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
              bg-[size:48px_48px]
              opacity-20
              dark:opacity-[0.06]
            "
          />

          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.16),transparent_55%)]
              dark:bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_55%)]
            "
          />

          <div
            className="
              absolute bottom-0 left-1/2
              h-[500px] w-[700px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/5
              blur-[120px]
            "
          />

          <FloatingBlob
            className="-right-20 top-10 h-72 w-72"
            color="bg-blue-400/10"
            duration={16}
          />

          <FloatingBlob
            className="-left-20 top-[500px] h-72 w-72"
            color="bg-cyan-400/10"
            duration={20}
          />
        </div>

        {/* ================= CONTENT ================= */}
        <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-20">
          {/* ================= HEADING ================= */}
          <AnimateIn>
            <div className="text-center">
              <AnimatedHeading
                text="Contact Us"
                as="h1"
                className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
              />

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                Have a project in mind, or just want to say hello? We&apos;d
                love to hear from you.
              </p>

              <div className="mx-auto mt-5 h-px w-20 bg-blue-600 dark:bg-blue-400" />
            </div>
          </AnimateIn>

          {/* ================= OFFICE CARDS ================= */}
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office) => (
              <StaggerItem key={office.title}>
                <MouseGlow className="h-full rounded-3xl">
                  <TiltCard className="h-full">
                    <div
                      className="
                        group relative h-full overflow-hidden rounded-3xl
                        border border-slate-200/70 bg-white/70 p-7
                        shadow-lg shadow-slate-900/5 backdrop-blur-xl
                        transition-all duration-500
                        hover:shadow-2xl hover:shadow-blue-900/10
                        dark:border-slate-800/70 dark:bg-slate-900/70
                      "
                    >
                      {/* Shine */}
                      <div
                        className="
                          pointer-events-none absolute -left-[100%] top-0
                          h-full w-1/2 skew-x-[-20deg]
                          bg-gradient-to-r from-transparent via-white/20 to-transparent
                          transition-all duration-1000
                          group-hover:left-[150%]
                        "
                      />

                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex h-11 w-11 items-center justify-center rounded-2xl
                            bg-blue-500/10 text-blue-600
                            transition-all duration-500
                            group-hover:scale-110 group-hover:rotate-3
                            dark:bg-blue-400/10 dark:text-blue-400
                          "
                        >
                          <office.icon size={20} />
                        </div>

                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                          {office.title}
                        </h3>
                      </div>

                      <div className="mt-5 space-y-0.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {office.lines.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>

                      {office.email && (
                        <a
                          href={`mailto:${office.email}`}
                          className="mt-3 flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                        >
                          <Mail size={13} />
                          {office.email}
                        </a>
                      )}
                    </div>
                  </TiltCard>
                </MouseGlow>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* ================= FORM ================= */}
          <AnimateIn delay={0.2}>
            <div className="mx-auto mt-16 max-w-3xl text-center">
              <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                If you&apos;d like us to contact you, please fill out the form.
              </h2>
            </div>

            <div className="mx-auto mt-8 max-w-3xl">
              <MouseGlow className="rounded-3xl">
                <TiltCard>
                  <div
                    className="
                      relative overflow-hidden rounded-3xl
                      border border-slate-200/60 bg-white/70 p-6
                      shadow-xl shadow-blue-900/5 backdrop-blur-xl
                      dark:border-slate-800/60 dark:bg-slate-900/70
                      sm:p-8
                    "
                  >
                    {/* Animated gradient border glow */}
                    <div
                      className="
                        pointer-events-none absolute inset-0 rounded-3xl
                        bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-purple-500/10
                        opacity-0 transition-opacity duration-500
                        hover:opacity-100
                      "
                    />

                    <form
                      onSubmit={handleSubmit}
                      className="relative grid gap-4 sm:grid-cols-2"
                    >
                      {/* Name */}
                      <input
                        type="text"
                        required
                        placeholder="*Name"
                        value={form.name}
                        onChange={handleChange("name")}
                        disabled={isSubmitting}
                        className="
                          w-full rounded-md border border-slate-200
                          bg-white/80 px-3 py-2.5 text-sm text-slate-900
                          placeholder:text-slate-400
                          focus:border-[#1a2b4a] focus:outline-none
                          disabled:cursor-not-allowed disabled:opacity-60
                          dark:border-slate-700 dark:bg-slate-900/80
                          dark:text-white
                        "
                      />

                      {/* Source */}
                      <select
                        value={form.source}
                        onChange={handleChange("source")}
                        disabled={isSubmitting}
                        className="
                          w-full rounded-md border border-slate-200
                          bg-white/80 px-3 py-2.5 text-sm text-slate-600
                          focus:border-[#1a2b4a] focus:outline-none
                          disabled:cursor-not-allowed disabled:opacity-60
                          dark:border-slate-700 dark:bg-slate-900/80
                          dark:text-slate-300
                        "
                      >
                        <option value="">
                          How Did You Come To Know About Us?
                        </option>

                        {sourceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>

                      {/* Email */}
                      <input
                        type="email"
                        required
                        placeholder="*Email"
                        value={form.email}
                        onChange={handleChange("email")}
                        disabled={isSubmitting}
                        className="
                          w-full rounded-md border border-slate-200
                          bg-white/80 px-3 py-2.5 text-sm text-slate-900
                          placeholder:text-slate-400
                          focus:border-[#1a2b4a] focus:outline-none
                          disabled:cursor-not-allowed disabled:opacity-60
                          dark:border-slate-700 dark:bg-slate-900/80
                          dark:text-white
                        "
                      />

                      {/* Requirements */}
                      <textarea
                        placeholder="Requirements"
                        value={form.requirements}
                        onChange={handleChange("requirements")}
                        disabled={isSubmitting}
                        rows={1}
                        className="
                          w-full resize-none rounded-md border border-slate-200
                          bg-white/80 px-3 py-2.5 text-sm text-slate-900
                          placeholder:text-slate-400
                          focus:border-[#1a2b4a] focus:outline-none
                          disabled:cursor-not-allowed disabled:opacity-60
                          dark:border-slate-700 dark:bg-slate-900/80
                          dark:text-white
                          sm:row-span-2 sm:h-full sm:resize-y
                        "
                      />

                      {/* Phone */}
                      <input
                        type="tel"
                        required
                        placeholder="*Phone"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        disabled={isSubmitting}
                        className="
                          w-full rounded-md border border-slate-200
                          bg-white/80 px-3 py-2.5 text-sm text-slate-900
                          placeholder:text-slate-400
                          focus:border-[#1a2b4a] focus:outline-none
                          disabled:cursor-not-allowed disabled:opacity-60
                          dark:border-slate-700 dark:bg-slate-900/80
                          dark:text-white
                        "
                      />

                      {/* Address */}
                      <textarea
                        required
                        placeholder="*Address"
                        value={form.address}
                        onChange={handleChange("address")}
                        disabled={isSubmitting}
                        rows={3}
                        className="
                          w-full resize-y rounded-md border border-slate-200
                          bg-white/80 px-3 py-2.5 text-sm text-slate-900
                          placeholder:text-slate-400
                          focus:border-[#1a2b4a] focus:outline-none
                          disabled:cursor-not-allowed disabled:opacity-60
                          dark:border-slate-700 dark:bg-slate-900/80
                          dark:text-white
                          sm:col-start-1
                        "
                      />

                      {/* Error message */}
                      {errorMessage && (
                        <div
                          className="
                            flex items-start gap-2 rounded-lg border
                            border-red-200 bg-red-50 px-4 py-3
                            text-sm text-red-600
                            dark:border-red-900/50 dark:bg-red-950/30
                            dark:text-red-400
                            sm:col-span-2
                          "
                        >
                          <AlertCircle
                            size={17}
                            className="mt-0.5 shrink-0"
                          />

                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Buttons */}
                      <div className="flex items-start gap-3 pt-2 sm:col-span-2">
                        <RippleButton
                          type="submit"
                          disabled={isSubmitting}
                          className="
                            rounded-full bg-[#1a2b4a] px-8 py-3
                            text-sm font-semibold text-white
                            disabled:cursor-not-allowed disabled:opacity-60
                            dark:bg-blue-600
                          "
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
                          className="
                            rounded-full bg-[#1a2b4a] px-8 py-3
                            text-sm font-semibold text-white
                            disabled:cursor-not-allowed disabled:opacity-60
                            dark:bg-blue-600
                          "
                        >
                          <RotateCcw size={15} />
                          Clear
                        </RippleButton>
                      </div>
                    </form>
                  </div>
                </TiltCard>
              </MouseGlow>
            </div>
          </AnimateIn>

          {/* ================= BOTTOM CTA ================= */}
          <AnimateIn delay={0.3}>
            <div
              className="
                relative mt-14 overflow-hidden rounded-3xl
                border border-blue-200/50 bg-gradient-to-r
                from-blue-600/10 via-cyan-500/10 to-purple-500/10
                p-8 text-center backdrop-blur-xl
                dark:border-blue-900/40
              "
            >
              <div
                className="
                  pointer-events-none absolute left-1/2 top-0
                  h-32 w-64 -translate-x-1/2 rounded-full
                  bg-blue-500/10 blur-3xl
                "
              />

              <h2 className="relative text-xl font-bold text-slate-900 dark:text-white">
                We usually reply within 24 hours
              </h2>

              <p className="relative mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Whether it&apos;s a quick question or a full project brief,
                our team is ready to help.
              </p>
            </div>
          </AnimateIn>
        </section>
      </main>

      <Footer />

      {/* ================= SUCCESS TOAST ================= */}
      {showToast && (
        <div
          className="
            fixed bottom-6 right-6 z-50
            flex items-center gap-2
            rounded-lg bg-[#1a2b4a]
            px-5 py-3 text-sm font-medium text-white
            shadow-2xl dark:bg-blue-600
          "
          style={{
            animation: "geecon-toast-in 0.3s ease-out",
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

          <CheckCircle size={16} />

          Message sent successfully! We&apos;ll get back to you soon.
        </div>
      )}
    </div>
  );
}

