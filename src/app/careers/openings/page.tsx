"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { motion } from "motion/react";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  Search,
} from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";

type JobOpening = {
  id: string;
  title: string;
  department?: string | null;
  location?: string | null;
  type?: string | null;
  description: string;
  isActive?: boolean;
  order?: number;
};

export default function CareerOpeningsPage() {
  const [
    openings,
    setOpenings,
  ] =
    useState<JobOpening[]>(
      []
    );

  const [
    loadingOpenings,
    setLoadingOpenings,
  ] =
    useState(true);

  useEffect(() => {
    const fetchOpenings =
      async () => {
        try {
          setLoadingOpenings(
            true
          );

          const response =
            await fetch(
              "/api/careers/openings",
              {
                method:
                  "GET",
                cache:
                  "no-store",
              }
            );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch job openings"
            );
          }

          const data =
            await response.json();

          if (
            Array.isArray(
              data
            )
          ) {
            setOpenings(
              data
            );
          } else if (
            Array.isArray(
              data.openings
            )
          ) {
            setOpenings(
              data.openings
            );
          } else {
            setOpenings(
              []
            );
          }
        } catch (
          error
        ) {
          console.error(
            "Failed to fetch openings:",
            error
          );

          setOpenings(
            []
          );
        } finally {
          setLoadingOpenings(
            false
          );
        }
      };

    fetchOpenings();
  }, []);


  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="relative min-h-[70vh] flex-1 overflow-hidden">
        {/* =========================================================
            HEADER
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
              <Link
                href="/careers"
                className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft
                  size={
                    15
                  }
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                Back to Careers
              </Link>
            </AnimateIn>

            <div className="mt-7">
              <AnimateIn delay={0.05}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                  <BriefcaseBusiness
                    size={
                      14
                    }
                    className="text-cyan-200"
                  />

                  Opportunities
                </div>
              </AnimateIn>

              <AnimatedHeading
                text="Current Openings"
                as="h1"
                delay={0.08}
                highlightFrom={1}
                highlightClassName="brand-text-light"
                className="mt-7 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]"
              />

              <AnimateIn delay={0.15}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                  Explore our current career opportunities and find a role that matches your skills and experience.
                </p>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* =========================================================
            OPENINGS
        ========================================================= */}

        <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-20 sm:-mt-32 sm:px-6 lg:px-10 lg:pb-24">
          <div className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-8 lg:p-10 dark:border-white/[0.07] dark:bg-[#0b1220]">
          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loadingOpenings && (
            <div className="grid gap-5 md:grid-cols-2">
              {[
                1,
                2,
                3,
                4,
              ].map(
                (
                  item
                ) => (
                  <div
                    key={
                      item
                    }
                    className="animate-pulse rounded-[26px] border border-slate-200/80 bg-white p-6 dark:border-white/[0.07] dark:bg-white/[0.03]"
                  >
                    <div className="h-12 w-12 rounded-[14px] bg-slate-200 dark:bg-white/[0.08]" />

                    <div className="mt-4 h-4 w-2/5 rounded bg-slate-200 dark:bg-white/[0.08]" />

                    <div className="mt-3 flex gap-2">
                      <div className="h-5 w-20 rounded-full bg-slate-100 dark:bg-white/[0.06]" />

                      <div className="h-5 w-16 rounded-full bg-slate-100 dark:bg-white/[0.06]" />
                    </div>

                    <div className="mt-5 h-2.5 w-full rounded bg-slate-100 dark:bg-white/[0.06]" />

                    <div className="mt-2 h-2.5 w-11/12 rounded bg-slate-100 dark:bg-white/[0.06]" />

                    <div className="mt-2 h-2.5 w-3/4 rounded bg-slate-100 dark:bg-white/[0.06]" />
                  </div>
                )
              )}
            </div>
          )}

          {/* ================================================= */}
          {/* EMPTY */}
          {/* ================================================= */}

          {!loadingOpenings &&
            openings.length ===
              0 && (
              <AnimateIn>
                <div className="mx-auto max-w-xl px-2 py-8 text-center sm:px-8 sm:py-10">
                  <div className="brand-grad mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
                    <Search
                      size={
                        22
                      }
                    />
                  </div>

                  <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-3xl dark:text-white">
                    No current
                    openings
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                    No current openings listed right now. Please check back soon, or submit your details and we&apos;ll reach out when a suitable role opens up.
                  </p>

                  <Link
                    href="/careers#application-form"
                    className="brand-grad group mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Submit Your
                    Details

                    <ArrowRight
                      size={
                        16
                      }
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </AnimateIn>
            )}

          {/* ================================================= */}
          {/* JOBS */}
          {/* ================================================= */}

          {!loadingOpenings &&
            openings.length >
              0 && (
              <>
                <AnimateIn>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <p className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
                      {
                        openings.length
                      }{" "}
                      {openings.length ===
                      1
                        ? "opening available"
                        : "openings available"}
                    </p>
                  </div>
                </AnimateIn>

                <div className="grid gap-5 md:grid-cols-2">
                  {openings.map(
                    (
                      opening,
                      index
                    ) => (
                      <motion.article
                        key={
                          opening.id
                        }
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
                          margin:
                            "-40px",
                        }}
                        transition={{
                          duration:
                            0.4,
                          delay:
                            Math.min(
                              index *
                                0.05,
                              0.25
                            ),
                        }}
                        className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] sm:p-7 dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-violet-400/30"
                      >
                        {/* TOP ACCENT */}

                        <div className="brand-grad absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="brand-grad mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                              <BriefcaseBusiness
                                size={
                                  18
                                }
                              />
                            </div>

                            <h2 className="text-xl font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
                              {
                                opening.title
                              }
                            </h2>
                          </div>
                        </div>

                        {/* META */}

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {opening.department && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                              <Building2
                                size={
                                  11
                                }
                              />

                              {
                                opening.department
                              }
                            </span>
                          )}

                          {opening.location && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300">
                              <MapPin
                                size={
                                  11
                                }
                              />

                              {
                                opening.location
                              }
                            </span>
                          )}

                          {opening.type && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
                              <Clock3
                                size={
                                  11
                                }
                              />

                              {
                                opening.type
                              }
                            </span>
                          )}
                        </div>

                        {/* DESCRIPTION */}

                        <p className="mt-4 line-clamp-4 whitespace-pre-line text-[14px] leading-7 text-slate-600 dark:text-slate-400">
                          {
                            opening.description
                          }
                        </p>

                        {/* APPLY */}

                        <div className="mt-auto pt-6">
                          <Link
                            href="/careers#application-form"
                            className="brand-grad group/button inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5"
                          >
                            Apply Now

                            <ArrowRight
                              size={
                                14
                              }
                              className="transition-transform duration-300 group-hover/button:translate-x-1"
                            />
                          </Link>
                        </div>
                      </motion.article>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
