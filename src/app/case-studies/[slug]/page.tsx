import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  BriefcaseBusiness,
  CheckCircle2,
  Lightbulb,
  Target,
  Trophy,
} from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { FloatingBlob } from "../../../../components/floating-blob";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CaseStudyDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  /* =========================================================
     FETCH CASE STUDY
  ========================================================= */

  const caseStudy = await prisma.caseStudy.findUnique({
    where: {
      slug,
    },
  });

  /* =========================================================
     404
  ========================================================= */

  if (!caseStudy || !caseStudy.isActive) {
    notFound();
  }

  /* =========================================================
     TECHNOLOGIES
  ========================================================= */

  const technologies = Array.isArray(caseStudy.technologies)
    ? caseStudy.technologies.filter(
        (technology): technology is string =>
          typeof technology === "string"
      )
    : [];


  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="flex-1">
        {/* =====================================================
            HERO SECTION
        ====================================================== */}

        <section className="brand-grad relative overflow-hidden text-white">
          {/* Background */}
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

          <div className="relative mx-auto max-w-7xl px-6 pb-40 pt-16 sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
            {/* Back */}
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.22]"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />

              Back to Case Studies
            </Link>

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
              {/* LEFT */}
              <AnimateIn>
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                  Case Study
                </span>

                <h1 className="mt-6 max-w-3xl break-words text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[64px]">
                  {caseStudy.title}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                  {caseStudy.shortDescription}
                </p>

                {/* Client / Industry */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {caseStudy.clientName && (
                    <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/[0.14] px-4 py-3 backdrop-blur-xl">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white text-violet-600 shadow-lg shadow-violet-900/20">
                        <Building2 size={17} />
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-100/80">
                          Client
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-white">
                          {caseStudy.clientName}
                        </p>
                      </div>
                    </div>
                  )}

                  {caseStudy.industry && (
                    <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/[0.14] px-4 py-3 backdrop-blur-xl">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white text-violet-600 shadow-lg shadow-violet-900/20">
                        <BriefcaseBusiness size={17} />
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-100/80">
                          Industry
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-white">
                          {caseStudy.industry}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project URL */}
                {caseStudy.projectUrl && (
                  <a
                    href={caseStudy.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-violet-700 shadow-lg shadow-violet-900/25 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Visit Project
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </AnimateIn>

              {/* RIGHT IMAGE */}
              {caseStudy.image && (
                <AnimateIn delay={0.1}>
                  <div className="relative overflow-hidden rounded-[28px] border border-white/30 bg-white/15 p-2 shadow-[0_40px_100px_-40px_rgba(15,23,42,.5)] backdrop-blur-xl">
                    <div className="relative h-[260px] overflow-hidden rounded-[22px] sm:h-[360px] lg:h-[420px]">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </AnimateIn>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <section className="relative z-10 mx-auto -mt-28 w-full max-w-7xl px-4 pb-20 sm:-mt-32 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="space-y-12 rounded-[32px] border border-slate-100 bg-white p-6 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:p-10 lg:p-12">
              {/* Overview */}

              {caseStudy.description && (
                <section>
                  <div className="flex items-center gap-4">
                    <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                      <Lightbulb size={20} />
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-[30px]">
                      Project Overview
                    </h2>
                  </div>

                  <p className="mt-5 whitespace-pre-line text-[15px] leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                    {caseStudy.description}
                  </p>
                </section>
              )}

              {/* Challenge */}

              {caseStudy.challenge && (
                <section>
                  <div className="flex items-center gap-4">
                    <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                      <Target size={20} />
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-[30px]">
                      The Challenge
                    </h2>
                  </div>

                  <div className="mt-5 rounded-[22px] border border-slate-200/80 bg-slate-50/70 p-6 dark:border-white/[0.07] dark:bg-white/[0.03]">
                    <p className="whitespace-pre-line text-[15px] leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                      {caseStudy.challenge}
                    </p>
                  </div>
                </section>
              )}

              {/* Solution */}

              {caseStudy.solution && (
                <section>
                  <div className="flex items-center gap-4">
                    <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                      <CheckCircle2 size={20} />
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-[30px]">
                      Our Solution
                    </h2>
                  </div>

                  <p className="mt-5 whitespace-pre-line text-[15px] leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                    {caseStudy.solution}
                  </p>
                </section>
              )}

              {/* Results */}

              {caseStudy.results && (
                <section>
                  <div className="flex items-center gap-4">
                    <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                      <Trophy size={20} />
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-[30px]">
                      Results
                    </h2>
                  </div>

                  <div className="mt-5 rounded-[22px] border border-violet-100 bg-violet-50/60 p-6 dark:border-violet-400/15 dark:bg-violet-500/[0.06]">
                    <p className="whitespace-pre-line text-[15px] leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
                      {caseStudy.results}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================== */}

            <aside>
              <div className="sticky top-28 rounded-[26px] border border-slate-100 bg-white p-6 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                <span className="brand-grad block h-1 w-12 rounded-full" />

                <h3 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
                  Project Information
                </h3>

                <div className="mt-5 space-y-5">
                  {caseStudy.clientName && (
                    <div className="border-b border-slate-100 pb-4 dark:border-white/[0.07]">
                      <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
                        Client
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {caseStudy.clientName}
                      </p>
                    </div>
                  )}

                  {caseStudy.industry && (
                    <div className="border-b border-slate-100 pb-4 dark:border-white/[0.07]">
                      <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
                        Industry
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {caseStudy.industry}
                      </p>
                    </div>
                  )}

                  {/* Technologies */}

                  {technologies.length > 0 && (
                    <div>
                      <p className="brand-text text-[11px] font-extrabold uppercase tracking-[0.2em]">
                        Technologies
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-violet-100 bg-violet-50/70 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-200"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {caseStudy.projectUrl && (
                  <a
                    href={caseStudy.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-grad mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Visit Project
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <section className="px-4 pb-24 sm:px-6 lg:px-10">
          <div className="brand-grad relative mx-auto max-w-7xl overflow-hidden rounded-[36px] px-6 py-16 text-center text-white shadow-[0_40px_100px_-40px_rgba(91,33,182,.55)] sm:px-10 sm:py-20">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />

            <div className="relative">
              <p className="inline-flex rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                Have a Project?
              </p>

              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-[46px]">
                Let&apos;s build something great together.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-indigo-50/90">
                Talk to our team about your business requirements and discover
                how Geecon Technology can help.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-violet-700 shadow-lg shadow-violet-900/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
