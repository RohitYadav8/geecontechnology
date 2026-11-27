import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { FloatingBlob } from "../../../components/floating-blob";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";

// ---------------------------------------------------------
// Images
// ---------------------------------------------------------

const BANNER_SRC = "/Training.png";

// ---------------------------------------------------------
// Training
// ---------------------------------------------------------

const training = [
  "Customer Service Training",
  "Trainer Training",
  "Skills Development Programmes",
  "Tourism & Hospitality Training",
  "Customised Training Programme Design",
];

// ---------------------------------------------------------
// Consultancy
// ---------------------------------------------------------

const consultancy = [
  "Group Facilitation",
  "Creating a Customer Focused Culture",
  "Service System Development",
  "Mystery Shopping",
  "Training Needs Analysis",
  "Induction Programme Development",
  "HR Strategy & System Development",
  "Tourism Business Development",
  "Innovation Support",
];

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function CorporateTrainingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-slate-50 dark:bg-[#060b16]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative flex-1 overflow-hidden">
        {/* =====================================================
            HERO
        ===================================================== */}

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
            <AnimateIn delay={0.05}>
              <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-[24px] border border-white/30 bg-white/[0.14] text-white shadow-[0_20px_50px_-20px_rgba(15,23,42,.5)] backdrop-blur-xl sm:h-[88px] sm:w-[88px]">
                <GraduationCap
                  size={36}
                  strokeWidth={1.8}
                />
              </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <h1 className="mt-7 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
                Corporate Training
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                Our training &amp; consultancy services are designed to assist
                you in the development of a cutting edge workforce so that you
                or your team can excel in today&apos;s competitive environment.
                We offer a wide variety of solutions either on an in-house basis
                or through our open programmes. Courses can be specifically
                tailored to meet your needs or you can choose from our extensive
                range of programmes. If you require support in the following
                areas then you have come to the right place:
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-20 sm:-mt-32 sm:px-6 lg:px-10 lg:pb-24">
          <div className="rounded-[32px] border border-slate-100 bg-white p-4 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-6 lg:p-8 dark:border-white/[0.07] dark:bg-[#0b1220]">
            {/* BANNER */}

            <AnimateIn delay={0.05}>
              <div className="relative h-[150px] w-full overflow-hidden rounded-[24px] sm:h-[190px] md:h-[220px] lg:h-[260px]">
                <Image
                  src={BANNER_SRC}
                  alt="Corporate Training"
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover object-[center_45%]"
                />
              </div>
            </AnimateIn>

            {/* =================================================
                SECTION HEADING
            ================================================= */}

            <AnimateIn delay={0.1}>
              <div className="mb-8 mt-10 text-center sm:mt-12">
                <p className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
                  What We Offer
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[46px] dark:text-white">
                  Training &amp; Consultancy
                </h2>
              </div>
            </AnimateIn>

            {/* =================================================
                CARDS
            ================================================= */}

            <div className="grid items-start gap-6 lg:grid-cols-2">
              {/* =================================================
                  TRAINING
              ================================================= */}

              <AnimateIn delay={0.15} className="h-full">
                <div className="h-full rounded-[26px] border border-slate-200/80 bg-slate-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] sm:p-7 dark:border-white/[0.07] dark:bg-white/[0.02]">
                  {/* Header */}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="brand-grad flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                        <GraduationCap size={22} />
                      </div>

                      <div>
                        <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
                          Learning
                        </p>

                        <h3 className="mt-1 text-lg font-extrabold uppercase tracking-wide text-slate-950 dark:text-white">
                          Training
                        </h3>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-violet-400"
                    />
                  </div>

                  {/* Divider */}

                  <div className="my-6 h-px bg-slate-200/80 dark:bg-white/[0.07]" />

                  {/* Training list */}

                  <StaggerContainer className="space-y-3">
                    {training.map((item, index) => (
                      <StaggerItem key={item}>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_18px_40px_-28px_rgba(91,33,182,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-500/30">
                          <span className="brand-grad flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold text-white shadow-md shadow-violet-500/20">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="flex-1 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                            {item}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </AnimateIn>

              {/* =================================================
                  CONSULTANCY
              ================================================= */}

              <AnimateIn delay={0.2} className="h-full">
                <div className="h-full rounded-[26px] border border-slate-200/80 bg-slate-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] sm:p-7 dark:border-white/[0.07] dark:bg-white/[0.02]">
                  {/* Header */}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="brand-grad flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                        <Briefcase size={22} />
                      </div>

                      <div>
                        <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
                          Business
                        </p>

                        <h3 className="mt-1 text-lg font-extrabold uppercase tracking-wide text-slate-950 dark:text-white">
                          Consultancy
                        </h3>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-violet-400"
                    />
                  </div>

                  {/* Divider */}

                  <div className="my-6 h-px bg-slate-200/80 dark:bg-white/[0.07]" />

                  {/* Consultancy list */}

                  <StaggerContainer className="space-y-3">
                    {consultancy.map((item, index) => (
                      <StaggerItem key={item}>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_18px_40px_-28px_rgba(91,33,182,.45)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-500/30">
                          <span className="brand-grad flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold text-white shadow-md shadow-violet-500/20">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="flex-1 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                            {item}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </AnimateIn>
            </div>
          </div>

          {/* =================================================
              BOTTOM EXISTING MESSAGE
          ================================================= */}

          <AnimateIn delay={0.25}>
            <div className="brand-grad relative mt-10 overflow-hidden rounded-[36px] px-6 py-10 text-center text-white shadow-[0_40px_90px_-40px_rgba(91,33,182,.6)] sm:px-10 sm:py-14">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />

              <div className="relative mx-auto max-w-3xl">
                <p className="inline-flex rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                  Build Better Teams
                </p>

                <h3 className="mt-6 text-2xl font-extrabold leading-tight tracking-[-0.035em] sm:text-3xl lg:text-[40px]">
                  Empower your workforce with the right skills and
                  strategies.
                </h3>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-indigo-50/90">
                  Our customised training and consultancy programmes are
                  designed around your organisation&apos;s goals, people and
                  challenges.
                </p>
              </div>
            </div>
          </AnimateIn>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </div>
  );
}
