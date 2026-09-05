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
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      <main className="relative min-h-[70vh] flex-1 overflow-hidden">
        {/* ================================================= */}
        {/* BACKGROUND */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.12] dark:opacity-[0.05]" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,.12),transparent_38%),radial-gradient(circle_at_90%_45%,rgba(6,182,212,.06),transparent_30%)]" />

        <FloatingBlob
          className="-right-24 top-10 h-72 w-72"
          color="bg-blue-400/10"
          duration={17}
        />

        <FloatingBlob
          className="-left-20 top-[460px] h-64 w-64"
          color="bg-cyan-300/10"
          duration={21}
        />

        {/* =========================================================
            HEADER
        ========================================================= */}

        <section className="relative border-b border-slate-100 dark:border-slate-800">
          <div className="mx-auto max-w-6xl px-6 pb-10 pt-12 sm:pb-12 sm:pt-14">
            <AnimateIn>
              <Link
                href="/careers"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
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

            <div className="mt-7 max-w-3xl">
              <AnimateIn delay={0.05}>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                  <BriefcaseBusiness
                    size={
                      13
                    }
                  />

                  Opportunities
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <AnimatedHeading
                  text="Current Openings"
                  as="h1"
                  className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
                />
              </AnimateIn>

              <AnimateIn delay={0.15}>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Explore our current career opportunities and find a role that matches your skills and experience.
                </p>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* =========================================================
            OPENINGS
        ========================================================= */}

        <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-14">
          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loadingOpenings && (
            <div className="grid gap-4 md:grid-cols-2">
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
                    className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="h-4 w-2/5 rounded bg-slate-200 dark:bg-slate-800" />

                    <div className="mt-3 flex gap-2">
                      <div className="h-5 w-20 rounded-full bg-slate-100 dark:bg-slate-800" />

                      <div className="h-5 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
                    </div>

                    <div className="mt-5 h-2.5 w-full rounded bg-slate-100 dark:bg-slate-800" />

                    <div className="mt-2 h-2.5 w-11/12 rounded bg-slate-100 dark:bg-slate-800" />

                    <div className="mt-2 h-2.5 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
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
                <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Search
                      size={
                        20
                      }
                    />
                  </div>

                  <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                    No current
                    openings
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-slate-500 dark:text-slate-400">
                    No current openings listed right now. Please check back soon, or submit your details and we&apos;ll reach out when a suitable role opens up.
                  </p>

                  <Link
                    href="/careers#application-form"
                    className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1a2b4a] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#111f38] hover:shadow-md dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    Submit Your
                    Details

                    <ArrowRight
                      size={
                        14
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
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
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

                <div className="grid gap-4 md:grid-cols-2">
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
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_38px_-24px_rgba(37,99,235,.28)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30"
                      >
                        {/* TOP ACCENT */}

                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                              <BriefcaseBusiness
                                size={
                                  16
                                }
                              />
                            </div>

                            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                              {
                                opening.title
                              }
                            </h2>
                          </div>
                        </div>

                        {/* META */}

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {opening.department && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
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
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
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
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400">
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

                        <p className="mt-4 line-clamp-4 whitespace-pre-line text-[13px] leading-6 text-slate-600 dark:text-slate-400">
                          {
                            opening.description
                          }
                        </p>

                        {/* APPLY */}

                        <div className="mt-auto pt-5">
                          <Link
                            href="/careers#application-form"
                            className="group/button inline-flex items-center gap-2 rounded-lg bg-[#1a2b4a] px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#111f38] hover:shadow-md dark:bg-blue-600 dark:hover:bg-blue-500"
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
        </section>
      </main>

      <Footer />
    </div>
  );
}