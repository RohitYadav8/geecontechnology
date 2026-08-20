"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
} from "motion/react";
import {
  ArrowUpRight,
  Loader2,
  Sparkles,
  Check,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ProductSolution = {
  id: string;
  name: string;
  slug: string;
  projectTag: string | null;
  cardBackTitle: string | null;
  excerpt: string | null;
  logoImage: string | null;
  bannerImage: string | null;
  order: number;
};

/* =========================================================
   COMPONENT
========================================================= */

export function ProductSolutions() {
  const [solutions, setSolutions] = useState<
    ProductSolution[]
  >([]);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =====================================================
     FETCH PRODUCT SOLUTIONS
  ===================================================== */

  useEffect(() => {
    async function fetchProductSolutions() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/product-solutions",
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "Failed to fetch product solutions"
          );
        }

        setSolutions(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Product solutions fetch error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load product solutions"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProductSolutions();
  }, []);

  /* =====================================================
     RESET ACTIVE INDEX
  ===================================================== */

  useEffect(() => {
    if (
      solutions.length > 0 &&
      activeIndex >= solutions.length
    ) {
      setActiveIndex(0);
    }
  }, [solutions, activeIndex]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-16">
          <div className="text-center">
            <Loader2 className="mx-auto h-7 w-7 animate-spin text-blue-500" />

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Loading product solutions...
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
            {error}
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     EMPTY
  ===================================================== */

  if (!solutions.length) {
    return null;
  }

  const activeSolution =
    solutions[activeIndex];

  /* =====================================================
     UI
  ===================================================== */

  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-white py-16 dark:border-slate-900 dark:bg-slate-950 sm:py-20">
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow left */}

        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/[0.08] blur-[130px]" />

        {/* Glow right */}

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.08] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 dark:border-blue-900/40 dark:bg-blue-950/30">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                Products & Solutions
              </span>
            </div>

            <h2 className="max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-[46px]">
              Technology built for{" "}
              <span className="text-blue-600 dark:text-blue-400">
                growing businesses
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="lg:flex lg:justify-end"
          >
            <p className="max-w-lg text-sm leading-7 text-slate-500 dark:text-slate-400">
              Practical digital solutions designed
              to simplify operations, improve
              performance and help your business
              scale with confidence.
            </p>
          </motion.div>
        </div>

        {/* =================================================
            MAIN PANEL
        ================================================= */}

        <div className="grid overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* =================================================
              LEFT PRODUCT NAVIGATION
          ================================================= */}

          <div className="border-b border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40 lg:border-b-0 lg:border-r">
            <div className="mb-3 px-3 pb-2 pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Explore Solutions
              </p>
            </div>

            <div className="space-y-1.5">
              {solutions.map(
                (solution, index) => {
                  const isActive =
                    index === activeIndex;

                  return (
                    <motion.button
                      key={solution.id}
                      type="button"
                      onClick={() =>
                        setActiveIndex(index)
                      }
                      whileHover={{
                        x: isActive
                          ? 0
                          : 3,
                      }}
                      whileTap={{
                        scale: 0.99,
                      }}
                      className={`
                        group
                        relative
                        flex
                        w-full
                        items-center
                        gap-3
                        overflow-hidden
                        rounded-2xl
                        px-4
                        py-3.5
                        text-left
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
                            : "hover:bg-white/70 dark:hover:bg-slate-900/60"
                        }
                      `}
                    >
                      {/* Active vertical line */}

                      <span
                        className={`
                          absolute
                          bottom-3
                          left-0
                          top-3
                          w-[3px]
                          rounded-full
                          bg-blue-500
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "scale-y-100 opacity-100"
                              : "scale-y-0 opacity-0"
                          }
                        `}
                      />

                      {/* Number */}

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          font-mono
                          text-[11px]
                          font-semibold
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                              : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                          }
                        `}
                      >
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      {/* Name */}

                      <span className="min-w-0 flex-1">
                        <span
                          className={`
                            block
                            truncate
                            text-sm
                            font-semibold
                            transition-colors
                            ${
                              isActive
                                ? "text-slate-950 dark:text-white"
                                : "text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white"
                            }
                          `}
                        >
                          {solution.name}
                        </span>

                        {solution.projectTag && (
                          <span className="mt-0.5 block truncate text-[11px] text-slate-400">
                            {
                              solution.projectTag
                            }
                          </span>
                        )}
                      </span>

                      {/* Active icon */}

                      <span
                        className={`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "scale-100 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                              : "scale-75 opacity-0"
                          }
                        `}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </motion.button>
                  );
                }
              )}
            </div>
          </div>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div className="min-w-0 p-4 sm:p-5 lg:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution.id}
                initial={{
                  opacity: 0,
                  y: 16,
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  filter: "blur(5px)",
                }}
                transition={{
                  duration: 0.42,
                  ease: [
                    0.21,
                    0.47,
                    0.32,
                    0.98,
                  ],
                }}
                className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
              >
                {/* =========================================
                    IMAGE
                ========================================= */}

                <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {activeSolution.bannerImage ? (
                      <Image
                        src={
                          activeSolution.bannerImage
                        }
                        alt={
                          activeSolution.name
                        }
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950">
                        <p className="text-sm text-slate-400">
                          No banner image
                        </p>
                      </div>
                    )}

                    {/* Overlay */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                    {/* Project tag */}

                    {activeSolution.projectTag && (
                      <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/35 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                        {
                          activeSolution.projectTag
                        }
                      </div>
                    )}
                  </div>
                </div>

                {/* =========================================
                    CONTENT
                ========================================= */}

                <div className="px-1 py-2 sm:px-2 lg:px-4">
                  {/* Logo */}

                  {activeSolution.logoImage && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay: 0.12,
                      }}
                      className="relative mb-5 h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
                    >
                      <Image
                        src={
                          activeSolution.logoImage
                        }
                        alt={`${activeSolution.name} icon`}
                        fill
                        sizes="48px"
                        className="object-contain p-2"
                      />
                    </motion.div>
                  )}

                  {/* Small label */}

                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    Product Solution
                  </p>

                  {/* Heading */}

                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                    {activeSolution.name}
                  </h3>

                  {/* Excerpt */}

                  {activeSolution.excerpt && (
                    <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                      {
                        activeSolution.excerpt
                      }
                    </p>
                  )}

                  {/* CTA */}

                  <Link
                    href={`/${activeSolution.slug}`}
                    className="group/link mt-6 inline-flex items-center gap-3 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
                  >
                    <span>
                      {activeSolution.cardBackTitle ||
                        `Explore ${activeSolution.name}`}
                    </span>

                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>

                  {/* Progress */}

                  <div className="mt-7 flex items-center gap-3">
                    <span className="font-mono text-[11px] text-slate-400">
                      {String(
                        activeIndex + 1
                      ).padStart(2, "0")}
                    </span>

                    <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <motion.div
                        key={
                          activeSolution.id
                        }
                        initial={{
                          width: "0%",
                        }}
                        animate={{
                          width: `${
                            ((activeIndex +
                              1) /
                              solutions.length) *
                            100
                          }%`,
                        }}
                        transition={{
                          duration: 0.45,
                        }}
                        className="absolute inset-y-0 left-0 rounded-full bg-blue-500"
                      />
                    </div>

                    <span className="font-mono text-[11px] text-slate-400">
                      {String(
                        solutions.length
                      ).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =================================================
            MOBILE HINT
        ================================================= */}

        <p className="mt-5 text-center text-xs text-slate-400 lg:hidden">
          Select a solution above to view more
          details.
        </p>
      </div>
    </section>
  );
}