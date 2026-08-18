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
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* =====================================================
            HERO SECTION
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_40%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
            {/* Back */}
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />

              Back to Case Studies
            </Link>

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
              {/* LEFT */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  Case Study
                </span>

                <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                  {caseStudy.title}
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  {caseStudy.shortDescription}
                </p>

                {/* Client / Industry */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {caseStudy.clientName && (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <Building2 size={17} />
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-slate-400">
                          Client
                        </p>

                        <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
                          {caseStudy.clientName}
                        </p>
                      </div>
                    </div>
                  )}

                  {caseStudy.industry && (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                        <BriefcaseBusiness size={17} />
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-slate-400">
                          Industry
                        </p>

                        <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
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
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
                  >
                    Visit Project
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>

              {/* RIGHT IMAGE */}
              {caseStudy.image && (
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                  <div className="relative h-[280px] overflow-hidden rounded-2xl sm:h-[360px] lg:h-[420px]">
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
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="space-y-14">
              {/* Overview */}

              {caseStudy.description && (
                <section>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Lightbulb size={19} />
                    </div>

                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      Project Overview
                    </h2>
                  </div>

                  <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                    {caseStudy.description}
                  </p>
                </section>
              )}

              {/* Challenge */}

              {caseStudy.challenge && (
                <section>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                      <Target size={19} />
                    </div>

                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      The Challenge
                    </h2>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                    <p className="whitespace-pre-line text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                      {caseStudy.challenge}
                    </p>
                  </div>
                </section>
              )}

              {/* Solution */}

              {caseStudy.solution && (
                <section>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <CheckCircle2 size={19} />
                    </div>

                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      Our Solution
                    </h2>
                  </div>

                  <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
                    {caseStudy.solution}
                  </p>
                </section>
              )}

              {/* Results */}

              {caseStudy.results && (
                <section>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <Trophy size={19} />
                    </div>

                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      Results
                    </h2>
                  </div>

                  <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 dark:border-emerald-500/10 dark:bg-emerald-500/5">
                    <p className="whitespace-pre-line text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
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
              <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Project Information
                </h3>

                <div className="mt-5 space-y-5">
                  {caseStudy.clientName && (
                    <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Client
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                        {caseStudy.clientName}
                      </p>
                    </div>
                  )}

                  {caseStudy.industry && (
                    <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Industry
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                        {caseStudy.industry}
                      </p>
                    </div>
                  )}

                  {/* Technologies */}

                  {technologies.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Technologies
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
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
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
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

        <section className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-6 py-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Have a Project?
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
              Let&apos;s build something great together.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              Talk to our team about your business requirements and discover
              how Geecon Technology can help.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}