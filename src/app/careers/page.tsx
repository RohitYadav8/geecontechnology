"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import {
  Upload,
  Send,
  CheckCircle,
  ArrowRight,
  Users,
  Sparkles,
  BriefcaseBusiness,
} from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { StatCounter } from "../../../components/stat-counter";
import { RippleButton } from "../../../components/ripple-button";

/* =========================================================
   CAREER STATS
========================================================= */

const careerStats = [
  {
    label: "Team Members",
    value: 50,
    suffix: "+",
  },
  {
    label: "Years of Experience",
    value: 10,
    suffix: "+",
  },
  {
    label: "Client Satisfaction",
    value: 95,
    suffix: "%",
  },
];

/* =========================================================
   RESUME VALIDATION
========================================================= */

const MAX_FILE_SIZE =
  5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
];

function validateResume(
  file: File
) {
  const extension =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase() || "";

  if (
    !ALLOWED_EXTENSIONS.includes(
      extension
    )
  ) {
    return "Only PDF, DOC and DOCX files are allowed.";
  }

  if (
    file.size >
    MAX_FILE_SIZE
  ) {
    return "Resume must be smaller than 5 MB.";
  }

  return null;
}

/* =========================================================
   PAGE
========================================================= */

export default function CareersPage() {
  const [form, setForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

  const [
    resumeFile,
    setResumeFile,
  ] =
    useState<File | null>(null);

  const [
    fileName,
    setFileName,
  ] =
    useState("");

  const [
    isDragging,
    setIsDragging,
  ] =
    useState(false);

  const [
    showToast,
    setShowToast,
  ] =
    useState(false);

  const [
    submitError,
    setSubmitError,
  ] =
    useState("");

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const imageRef =
    useRef<HTMLDivElement | null>(
      null
    );

  /* =========================================================
     IMAGE PARALLAX
  ========================================================= */

  const { scrollYProgress } =
    useScroll({
      target: imageRef,
      offset: [
        "start end",
        "end start",
      ],
    });

  const parallaxY =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["-8%", "8%"]
    );

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange =
    (
      field:
        keyof typeof form
    ) =>
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setForm((prev) => ({
        ...prev,
        [field]:
          e.target.value,
      }));
    };

  /* =========================================================
     SELECT RESUME
  ========================================================= */

  const setSelectedResume = (
    file: File
  ) => {
    setSubmitError("");

    const validationError =
      validateResume(file);

    if (validationError) {
      setResumeFile(null);
      setFileName("");
      setSubmitError(
        validationError
      );

      if (
        fileInputRef.current
      ) {
        fileInputRef.current.value =
          "";
      }

      return;
    }

    setResumeFile(file);
    setFileName(file.name);
  };

  /* =========================================================
     FILE INPUT
  ========================================================= */

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setSelectedResume(file);
  };

  /* =========================================================
     DRAG DROP
  ========================================================= */

  const handleDrop = (
    e: React.DragEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();

    setIsDragging(false);

    const file =
      e.dataTransfer.files?.[0];

    if (!file) return;

    setSelectedResume(file);
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit =
    async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      setSubmitError("");

      if (!resumeFile) {
        setSubmitError(
          "Please upload your resume."
        );

        return;
      }

      const validationError =
        validateResume(
          resumeFile
        );

      if (validationError) {
        setSubmitError(
          validationError
        );

        return;
      }

      try {
        setSubmitting(true);

        const formData =
          new FormData();

        formData.append(
          "firstName",
          form.firstName.trim()
        );

        formData.append(
          "lastName",
          form.lastName.trim()
        );

        formData.append(
          "email",
          form.email.trim()
        );

        formData.append(
          "phone",
          form.phone.trim()
        );

        formData.append(
          "resume",
          resumeFile
        );

        const response =
          await fetch(
            "/api/careers/apply",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "Failed to submit application."
          );
        }

        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });

        setResumeFile(null);
        setFileName("");

        if (
          fileInputRef.current
        ) {
          fileInputRef.current.value =
            "";
        }

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
          "Career application error:",
          error
        );

        setSubmitError(
          error instanceof Error
            ? error.message
            : "Failed to submit application."
        );
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="relative flex-1 overflow-hidden">
        {/* =========================================================
            HERO
        ========================================================= */}

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

          <div className="relative mx-auto max-w-4xl">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                <Sparkles
                  size={14}
                  className="text-cyan-200"
                />

                Careers
              </div>
            </AnimateIn>

            <AnimatedHeading
              text="Career With Us"
              as="h1"
              delay={0.08}
              highlightFrom={2}
              highlightClassName="brand-text-light"
              className="mt-7 text-[44px] font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[76px]"
            />
          </div>
        </section>

        {/* =========================================================
            CAREER INTRO
        ========================================================= */}

        <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-20 sm:-mt-32 sm:px-6 lg:px-10 lg:pb-24">
          <div className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-10 lg:p-12 dark:border-white/[0.07] dark:bg-[#0b1220]">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
            {/* LEFT */}

            <AnimateIn delay={0.15}>
              <div className="max-w-3xl">
                <p className="text-xl font-bold leading-8 tracking-[-0.02em] text-slate-950 dark:text-white sm:text-[26px] sm:leading-10">
                  Come on, join US.
                  And we will help
                  You to explore your
                  values and valuate
                  your skills.
                </p>

                <div className="mt-7 space-y-5 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                  <p>
                    <span className="brand-text font-extrabold">
                      Geecon
                    </span>{" "}
                    Group has many
                    years experience
                    of providing
                    software solutions
                    and affordable
                    services for small,
                    mid and large
                    companies &amp;
                    corporations. We
                    also provide
                    services in
                    different
                    industries like
                    Resourcing,
                    Corporate Training
                    and Design. We have
                    the history of
                    working hard to
                    ensure the customer
                    confidence in us
                    and have mission to
                    continue the same
                    with the dedication
                    to serve our
                    customers.
                  </p>

                  <p>
                    The first appeal:
                    you are the star.
                    All we want to know
                    is: Are you capable
                    enough to
                    &lsquo;outcast&rsquo;
                    the dreams in you?
                  </p>

                  <p>
                    At Geecon
                    Technology, we
                    believe in
                    &lsquo;optimism&rsquo;.
                    After lots of
                    efforts we decided
                    to throw out the
                    &lsquo;creative
                    persona test&rsquo;
                    among you.
                  </p>

                  <p>
                    Once you realise
                    you have the
                    &lsquo;stardom&rsquo;
                    in you, unleash it.
                    The world is yours,
                    and your career is
                    ready to go
                    heights.
                  </p>

                  <p>
                    Explore yourselves
                    with us. Valuate
                    your skills. Take
                    the test, take the
                    challenge. This is
                    our work
                    &lsquo;pledge&rsquo;.
                  </p>

                  <p>
                    If you think you
                    have your own
                    rules, you are most
                    welcome to share
                    them with us.
                  </p>

                  <p>
                    We want fresh or
                    experienced
                    candidates for our
                    described
                    services.
                  </p>
                </div>

                {/* STATS */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin:
                      "-60px",
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="mt-10 grid grid-cols-3 gap-3"
                >
                  {careerStats.map(
                    (
                      stat
                    ) => (
                      <div
                        key={
                          stat.label
                        }
                        className="rounded-[20px] border border-slate-200 bg-white px-3 py-6 text-center sm:px-6 dark:border-white/[0.07] dark:bg-white/[0.03]"
                      >
                        <div className="brand-text text-2xl font-extrabold tracking-tight sm:text-4xl">
                          <StatCounter
                            value={
                              stat.value
                            }
                            suffix={
                              stat.suffix
                            }
                          />
                        </div>

                        <div className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-[11px] dark:text-slate-400">
                          {
                            stat.label
                          }
                        </div>
                      </div>
                    )
                  )}
                </motion.div>

                {/* ACTIONS */}

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/careers/openings"
                    className="brand-grad group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <BriefcaseBusiness
                      size={17}
                    />

                    View Openings

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </AnimateIn>

            {/* IMAGE */}

            <AnimateIn
              delay={0.25}
              direction="right"
            >
              <div
                ref={imageRef}
                className="brand-grad relative overflow-hidden rounded-[28px] p-2 shadow-[0_30px_70px_-30px_rgba(91,33,182,.5)]"
              >
                <div className="relative h-[440px] w-full overflow-hidden rounded-[22px] sm:h-[520px] lg:h-[610px]">
                  <motion.div
                    style={{
                      y: parallaxY,
                    }}
                    className="absolute -inset-y-8 inset-x-0"
                  >
                    <Image
                      src="/careers.png"
                      alt="Careers at Geecon Technology"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 440px"
                      className="object-cover object-center"
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/90 p-4 shadow-lg backdrop-blur-xl dark:bg-slate-950/80">
                    <div className="flex items-center gap-3">
                      <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-lg shadow-violet-500/25">
                        <Users
                          size={
                            18
                          }
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Build your
                          career with
                          us
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          Explore your
                          values and
                          skills.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
          </div>
        </section>

        {/* =========================================================
            APPLICATION FORM
        ========================================================= */}

        <section
          id="application-form"
          className="relative px-4 pb-24 sm:px-6 sm:pb-28 lg:px-10"
        >
          <div className="mx-auto grid max-w-[1200px] gap-6 overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-3 shadow-[0_40px_100px_-45px_rgba(15,23,42,.45)] lg:grid-cols-[minmax(0,0.8fr)_minmax(420px,1.2fr)] lg:items-stretch lg:gap-0 dark:border-white/[0.07] dark:bg-[#0b1220]">
            {/* FORM INTRO */}

            <AnimateIn>
              <div className="brand-grad relative h-full overflow-hidden rounded-[24px] p-8 text-white sm:p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />
                <div className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] backdrop-blur-xl">
                  <Send
                    size={12}
                  />

                  Application
                </div>

                <h2 className="relative mt-5 text-3xl font-extrabold tracking-[-0.03em] sm:text-[40px] sm:leading-tight">
                  Submit Your
                  Details
                </h2>
              </div>
            </AnimateIn>

            {/* FORM */}

            <AnimateIn delay={0.15}>
              <div>
                <div>
                  <div className="p-5 sm:p-8 lg:p-10">
                    <form
                      onSubmit={
                        handleSubmit
                      }
                      className="space-y-4"
                    >
                      {/* NAME */}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-300"
                          >
                            First
                            name
                          </label>

                          <input
                            id="firstName"
                            type="text"
                            value={
                              form.firstName
                            }
                            onChange={handleChange(
                              "firstName"
                            )}
                            required
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="lastName"
                            className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-300"
                          >
                            Last
                            name
                          </label>

                          <input
                            id="lastName"
                            type="text"
                            value={
                              form.lastName
                            }
                            onChange={handleChange(
                              "lastName"
                            )}
                            required
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                          />
                        </div>
                      </div>

                      {/* EMAIL + PHONE */}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-300"
                          >
                            Your
                            email
                          </label>

                          <input
                            id="email"
                            type="email"
                            value={
                              form.email
                            }
                            onChange={handleChange(
                              "email"
                            )}
                            required
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-300"
                          >
                            Phone
                          </label>

                          <input
                            id="phone"
                            type="tel"
                            value={
                              form.phone
                            }
                            onChange={handleChange(
                              "phone"
                            )}
                            required
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                          />
                        </div>
                      </div>

                      {/* RESUME */}

                      <div>
                        <label
                          htmlFor="resume"
                          className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-300"
                        >
                          Upload
                          Resume
                        </label>

                        <motion.label
                          htmlFor="resume"
                          onDragOver={(
                            e
                          ) => {
                            e.preventDefault();

                            setIsDragging(
                              true
                            );
                          }}
                          onDragLeave={() => {
                            setIsDragging(
                              false
                            );
                          }}
                          onDrop={
                            handleDrop
                          }
                          whileHover={{
                            scale:
                              1.002,
                          }}
                          animate={{
                            scale:
                              isDragging
                                ? 1.005
                                : 1,
                          }}
                          className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center transition-all ${
                            isDragging
                              ? "border-violet-500 bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"
                              : "border-slate-300 bg-slate-50/60 text-slate-600 hover:border-violet-400 hover:bg-violet-50/60 dark:border-white/[0.12] dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-violet-400 dark:hover:bg-violet-500/5"
                          }`}
                        >
                          <motion.div
                            animate={{
                              y: isDragging
                                ? -2
                                : 0,

                              scale:
                                isDragging
                                  ? 1.05
                                  : 1,
                            }}
                            className="brand-grad flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg shadow-violet-500/25"
                          >
                            <Upload
                              size={
                                18
                              }
                            />
                          </motion.div>

                          <span className="mt-2 text-[13px] font-semibold">
                            {fileName ||
                              "Drag & drop your resume, or click to browse"}
                          </span>

                          <span className="mt-1 text-[11px] font-normal text-slate-400">
                            PDF, DOC
                            or DOCX ·
                            Maximum
                            5 MB
                          </span>

                          <input
                            ref={
                              fileInputRef
                            }
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={
                              handleFile
                            }
                            className="hidden"
                          />
                        </motion.label>
                      </div>

                      {/* ERROR */}

                      {submitError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                          {
                            submitError
                          }
                        </div>
                      )}

                      {/* BUTTON */}

                      <div className="pt-1">
                        <RippleButton
                          type="submit"
                          disabled={
                            submitting
                          }
                          className="brand-grad rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Send
                            size={
                              14
                            }
                          />

                          {submitting
                            ? "Submitting..."
                            : "Submit"}
                        </RippleButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer />

      {/* =========================================================
          SUCCESS TOAST
      ========================================================= */}

      {showToast && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className="brand-grad fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-violet-500/30"
        >
          <CheckCircle
            size={16}
          />

          Application
          submitted
          successfully!
        </motion.div>
      )}
    </div>
  );
}