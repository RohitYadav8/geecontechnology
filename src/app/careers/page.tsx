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
import { MouseGlow } from "../../../components/mouse-glow";
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
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      <main className="relative flex-1 overflow-hidden">
        {/* ================================================= */}
        {/* BACKGROUND */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.16] dark:opacity-[0.06]" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,.12),transparent_34%),radial-gradient(circle_at_90%_30%,rgba(6,182,212,.09),transparent_28%)]" />

        <FloatingBlob
          className="-right-20 top-10 h-72 w-72"
          color="bg-blue-400/10"
          duration={16}
        />

        <FloatingBlob
          className="-left-16 top-[520px] h-64 w-64"
          color="bg-cyan-300/10"
          duration={20}
        />

        {/* =========================================================
            CAREER INTRO
        ========================================================= */}

        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20 lg:pb-24">
          <AnimateIn>
            <div className="mb-10 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                <Sparkles
                  size={14}
                />

                Careers
              </div>

              <AnimatedHeading
                text="Career With Us"
                as="h1"
                className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl"
              />
            </div>
          </AnimateIn>

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
            {/* LEFT */}

            <AnimateIn delay={0.15}>
              <div className="max-w-3xl">
                <p className="text-xl font-medium leading-8 text-slate-900 dark:text-white sm:text-2xl sm:leading-9">
                  Come on, join US.
                  And we will help
                  You to explore your
                  values and valuate
                  your skills.
                </p>

                <div className="mt-7 space-y-5 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                  <p>
                    <span className="font-semibold text-slate-900 dark:text-white">
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
                  className="mt-10 grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  {careerStats.map(
                    (
                      stat,
                      index
                    ) => (
                      <div
                        key={
                          stat.label
                        }
                        className={`px-3 py-6 sm:px-6 ${
                          index !==
                          careerStats.length -
                            1
                            ? "border-r border-slate-200 dark:border-slate-800"
                            : ""
                        }`}
                      >
                        <div className="text-2xl font-bold tracking-tight text-[#1a2b4a] dark:text-blue-400 sm:text-3xl">
                          <StatCounter
                            value={
                              stat.value
                            }
                            suffix={
                              stat.suffix
                            }
                          />
                        </div>

                        <div className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">
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
                    className="group inline-flex items-center gap-2 rounded-xl bg-[#1a2b4a] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#111f38] hover:shadow-lg dark:bg-blue-600 dark:hover:bg-blue-500"
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

                  <Link
                    href="/careers/openings"
                    className="group inline-flex items-center gap-2 rounded-xl bg-[#1a2b4a] px-6 py-3.5 text-sm font-semibold text-white"
                  >
                    View Openings

                    <ArrowRight
                      size={16}
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
                className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 p-2 shadow-[0_20px_60px_-25px_rgba(15,23,42,.25)] dark:border-slate-800 dark:bg-slate-900"
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

                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/85 p-4 shadow-lg backdrop-blur-xl dark:bg-slate-950/75">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a2b4a] text-white dark:bg-blue-600">
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
        </section>

        {/* =========================================================
            APPLICATION FORM
        ========================================================= */}

        <section
          id="application-form"
          className="relative border-t border-slate-100 bg-slate-50/70 py-14 dark:border-slate-800 dark:bg-slate-900/20"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(420px,0.95fr)] lg:items-start">
            {/* FORM INTRO */}

            <AnimateIn>
              <div className="max-w-md lg:sticky lg:top-28">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                  <Send
                    size={12}
                  />

                  Application
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                  Submit Your
                  Details
                </h2>
              </div>
            </AnimateIn>

            {/* FORM */}

            <AnimateIn delay={0.15}>
              <div className="rounded-2xl bg-gradient-to-br from-blue-500/25 via-cyan-300/15 to-blue-700/25 p-[1px] shadow-[0_16px_45px_-28px_rgba(37,99,235,.35)]">
                <MouseGlow className="rounded-2xl">
                  <div className="rounded-[15px] border border-white/70 bg-white/90 p-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 sm:p-6">
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
                            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
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
                              ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                              : "border-slate-300 bg-slate-50/60 text-slate-600 hover:border-blue-400 hover:bg-blue-50/60 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-500/5"
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
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1a2b4a] shadow-sm dark:bg-slate-900 dark:text-blue-400"
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
                          className="rounded-lg bg-[#1a2b4a] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#111f38] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
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
                </MouseGlow>
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
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#1a2b4a] px-5 py-3 text-sm font-medium text-white shadow-2xl dark:bg-blue-600"
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