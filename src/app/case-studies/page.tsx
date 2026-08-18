import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
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
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-6 pb-4 pt-16 sm:pt-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Our Work
          </span>

          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            Case Studies
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
            Explore how we help businesses solve complex challenges with
            technology.
          </p>
        </section>

        {/* Case Studies */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          {caseStudies.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No case studies available.
              </p>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <article
                  key={study.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  {study.image && (
                    <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {study.industry && (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          {study.industry}
                        </span>
                      )}

                      {study.clientName && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {study.clientName}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                      {study.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                      {study.shortDescription}
                    </p>

                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400"
                    >
                      View Case Study

                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}