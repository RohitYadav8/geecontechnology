import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { FloatingBlob } from "../../../components/floating-blob";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
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

          <AnimateIn className="relative mx-auto max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
              Our Work
            </span>

            <h1 className="mt-6 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
              <span className="brand-text-light">
              Case Studies
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
              Explore how we help businesses solve complex challenges with
              technology.
            </p>
          </AnimateIn>
        </section>

        {/* Case Studies */}
        <section className="relative z-10 -mt-28 px-4 pb-24 sm:-mt-32 sm:px-6 sm:pb-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
          {caseStudies.length === 0 ? (
            <div className="rounded-[30px] border border-slate-100 bg-white px-6 py-20 text-center shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No case studies available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study, index) => (
                <AnimateIn
                  key={study.id}
                  delay={Math.min(index * 0.05, 0.25)}
                  className="h-full"
                >
                <article
                  className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-3 shadow-[0_30px_80px_-45px_rgba(15,23,42,.45)] transition-all duration-500 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25"
                >
                  {study.image && (
                    <div className="relative h-56 overflow-hidden rounded-[18px] bg-slate-100 dark:bg-slate-900">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />

                      <span className="brand-grad absolute bottom-4 left-4 rounded-[10px] px-3 py-1.5 font-mono text-[12px] font-bold text-white shadow-lg">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col px-3 pb-3 pt-6 sm:px-4">
                    <div className="flex flex-wrap gap-2">
                      {study.industry && (
                        <span className="rounded-full border border-violet-100 bg-violet-50/70 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-200">
                          {study.industry}
                        </span>
                      )}

                      {study.clientName && (
                        <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs text-slate-500 dark:border-white/[0.07] dark:bg-white/[0.04] dark:text-slate-400">
                          {study.clientName}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-xl font-extrabold leading-snug tracking-[-0.03em] text-slate-950 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300">
                      {study.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                      {study.shortDescription}
                    </p>

                    <div className="mt-auto pt-6">
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="brand-grad group/link inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      View Case Study

                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                    </div>
                  </div>
                </article>
                </AnimateIn>
              ))}
            </div>
          )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
