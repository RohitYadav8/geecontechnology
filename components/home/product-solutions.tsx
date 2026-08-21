"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ArrowUpRight,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";

import { BackgroundEffects } from "../background-effects";
import { MouseGlow } from "../mouse-glow";

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

export function ProductSolutions() {
  const [solutions, setSolutions] = useState<
    ProductSolution[]
  >([]);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

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

  useEffect(() => {
    if (
      solutions.length &&
      activeIndex >= solutions.length
    ) {
      setActiveIndex(0);
    }
  }, [solutions, activeIndex]);

  if (loading) {
    return (
      <section className="bg-slate-50 py-20 dark:bg-[#080e1a]">
        <div className="mx-auto flex max-w-7xl justify-center px-6 py-16">
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

  if (error) {
    return (
      <section className="bg-slate-50 py-20 dark:bg-[#080e1a]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (!solutions.length) {
    return null;
  }

  const activeSolution =
    solutions[activeIndex];

  return (
    <section
      className="
        relative
        overflow-hidden
        border-y
        border-slate-100
        bg-slate-50/70
        py-20
        sm:py-24
        dark:border-white/[0.05]
        dark:bg-[#080e1a]
      "
    >
      <BackgroundEffects />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mb-12 grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-3
                py-1.5
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-blue-600
                dark:border-blue-500/20
                dark:bg-blue-500/[0.08]
                dark:text-blue-400
              "
            >
              <Sparkles size={13} />
              Products & Solutions
            </div>

            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[44px] dark:text-white">
              Technology built for{" "}
              <span className="text-blue-600 dark:text-blue-400">
                growing businesses
              </span>
            </h2>
          </div>

          <div className="lg:flex lg:justify-end">
            <p className="max-w-lg text-sm leading-7 text-slate-500 dark:text-slate-400">
              Practical digital solutions designed
              to simplify operations, improve
              performance and help your business
              scale with confidence.
            </p>
          </div>
        </div>

        <MouseGlow>
          <div
            className="
              grid
              overflow-hidden
              rounded-[30px]
              border
              border-slate-200
              bg-white/90
              shadow-[0_30px_100px_-45px_rgba(15,23,42,.45)]
              backdrop-blur-xl
              dark:border-white/[0.07]
              dark:bg-white/[0.035]
              lg:grid-cols-[340px_minmax(0,1fr)]
            "
          >
            {/* Navigation */}
            <div
              className="
                border-b
                border-slate-200
                bg-slate-50/80
                p-3
                dark:border-white/[0.07]
                dark:bg-black/10
                lg:border-b-0
                lg:border-r
              "
            >
              <div className="px-3 pb-3 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
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
                          x: isActive ? 0 : 3,
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
                              ? "bg-white shadow-md shadow-slate-900/5 ring-1 ring-slate-200 dark:bg-white/[0.06] dark:ring-white/[0.08]"
                              : "hover:bg-white/70 dark:hover:bg-white/[0.04]"
                          }
                        `}
                      >
                        <span
                          className={`
                            absolute
                            bottom-3
                            left-0
                            top-3
                            w-[3px]
                            rounded-full
                            bg-gradient-to-b
                            from-blue-600
                            to-cyan-400
                            transition-all
                            ${
                              isActive
                                ? "scale-y-100 opacity-100"
                                : "scale-y-0 opacity-0"
                            }
                          `}
                        />

                        <span
                          className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            font-mono
                            text-[11px]
                            font-semibold
                            transition-all
                            ${
                              isActive
                                ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                                : "bg-slate-100 text-slate-400 dark:bg-white/[0.05]"
                            }
                          `}
                        >
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={`
                              block
                              truncate
                              text-sm
                              font-semibold
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
                            <span className="mt-1 block truncate text-[11px] text-slate-400">
                              {
                                solution.projectTag
                              }
                            </span>
                          )}
                        </span>

                        <span
                          className={`
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            transition-all
                            ${
                              isActive
                                ? "scale-100 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                                : "scale-75 opacity-0"
                            }
                          `}
                        >
                          <Check size={14} />
                        </span>
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Content */}
            <div className="min-w-0 p-5 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSolution.id}
                  initial={{
                    opacity: 0,
                    y: 15,
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
                    duration: 0.4,
                  }}
                  className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center"
                >
                  <div className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 dark:border-white/[0.07] dark:bg-slate-950">
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
                          sizes="(max-width: 1024px) 100vw, 48vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                          <p className="text-sm text-slate-400">
                            No banner image
                          </p>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06101f]/55 via-transparent to-transparent" />

                      {activeSolution.projectTag && (
                        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-xl">
                          {
                            activeSolution.projectTag
                          }
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-1 py-2 lg:px-3">
                    {activeSolution.logoImage && (
                      <div className="relative mb-5 h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.05]">
                        <Image
                          src={
                            activeSolution.logoImage
                          }
                          alt={`${activeSolution.name} icon`}
                          fill
                          sizes="48px"
                          className="object-contain p-2"
                        />
                      </div>
                    )}

                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                      Product Solution
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl dark:text-white">
                      {activeSolution.name}
                    </h3>

                    {activeSolution.excerpt && (
                      <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                        {
                          activeSolution.excerpt
                        }
                      </p>
                    )}

                    <Link
                      href={`/${activeSolution.slug}`}
                      className="
                        group
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#1a2b4a]
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        hover:-translate-y-0.5
                        hover:bg-blue-600
                        hover:shadow-lg
                        hover:shadow-blue-500/20
                        dark:bg-white
                        dark:text-slate-950
                        dark:hover:bg-blue-500
                        dark:hover:text-white
                      "
                    >
                      {activeSolution.cardBackTitle ||
                        `Explore ${activeSolution.name}`}

                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>

                    <div className="mt-8 flex items-center gap-3">
                      <span className="font-mono text-[11px] text-slate-400">
                        {String(
                          activeIndex + 1
                        ).padStart(2, "0")}
                      </span>

                      <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <motion.div
                          key={
                            activeSolution.id
                          }
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${
                              ((activeIndex +
                                1) /
                                solutions.length) *
                              100
                            }%`,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
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
        </MouseGlow>
      </div>
    </section>
  );
}