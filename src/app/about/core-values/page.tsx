"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Check,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { ScrollProgress } from "../../../../components/scroll-progress";

const HERO_SRC = "/core.png";

const values = [
  {
    heading: "Inclusion:",
    paragraphs: [
      "We agree to include and inform everyone affected by a project or a decision.",
    ],
  },
  {
    heading: "Acknowledgement & Appreciation:",
    paragraphs: [
      "We regularly acknowledge and appreciate our fellow employees, our customers, vendors, partners and ourselves for contribution made in support of Geecon's vision and pursuits of excellence.",
    ],
  },
  {
    heading: "Sound Decision Making:",
    paragraphs: [
      "We make decisions, we L.I.K.E. Our decisions are based on Logic, Intuition, Knowledge and Experience",
    ],
  },
  {
    heading: "Discipline:",
    paragraphs: [
      "In support of collaborations with goals and objectives, the discipline of Geecon lies in Elucidating, refining, accomplishing, delineating and completing all activities.",
    ],
  },
  {
    heading: "Constant Improvement:",
    bullets: [
      "Persistent and ceaseless improvement – to ensure quality and productivity across all areas in the company.",
      "Seeking knowledge and understanding, then applying it to ourselves, our customers, processes and products.",
    ],
  },
  {
    heading: "Full Self Expression",
    bullets: [
      "Respectful communication of creativity, ideas and concerns.",
      "Freedom to express ideas, concerns and possibilities.",
    ],
  },
  {
    heading: "Integrity",
    bullets: [
      "Honest & committed internal/external relationship",
      "Honoring and respecting others point of views and feelings",
      "Doing what's right for us and for our customers",
    ],
  },
];

const icons = [
  Users,
  HeartHandshake,
  Lightbulb,
  Target,
  Sparkles,
  Users,
  ShieldCheck,
];

export default function CoreValuesPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main>
        {/* =========================================================
            HERO IMAGE
        ========================================================= */}
        <section className="relative w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-[320px] w-full sm:h-[380px] lg:h-[450px]"
          >
            <Image
              src={HERO_SRC}
              alt="Geecon Core Values"
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Image overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/5 via-transparent to-slate-950/40" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/15 via-transparent to-slate-950/10" />

            {/* Soft animated glow */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute -right-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl"
            />
          </motion.div>
        </section>

        {/* =========================================================
            CORE VALUES
        ========================================================= */}
        <section className="relative overflow-hidden bg-slate-50 px-6 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-32 dark:bg-slate-950">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-3xl dark:bg-cyan-400/[0.035]" />

          <div className="pointer-events-none absolute -left-48 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-400/[0.025] blur-3xl" />

          <div className="pointer-events-none absolute -right-48 top-1/3 h-[450px] w-[450px] rounded-full bg-blue-500/[0.025] blur-3xl" />

          <div className="relative mx-auto max-w-5xl">
            <div className="space-y-8 sm:space-y-10">
              {values.map((value, index) => {
                const Icon = icons[index];

                return (
                  <AnimateIn
                    key={value.heading}
                    delay={index * 0.06}
                  >
                    <motion.article
                      initial={{
                        opacity: 0,
                        y: 45,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.12,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -7,
                      }}
                      className="group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-7 shadow-[0_15px_60px_-25px_rgba(15,23,42,0.18)] transition-all duration-500 hover:border-blue-300/70 hover:shadow-[0_30px_90px_-25px_rgba(37,99,235,0.20)] sm:p-9 lg:p-11 dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-[0_15px_60px_-25px_rgba(0,0,0,0.45)] dark:hover:border-cyan-400/30 dark:hover:shadow-[0_30px_90px_-25px_rgba(34,211,238,0.13)]"
                    >
                      {/* =================================================
                          TOP GRADIENT LINE
                      ================================================= */}
                      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-50 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* =================================================
                          HOVER GLOW - TOP RIGHT
                      ================================================= */}
                      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:bg-blue-500/[0.09] dark:group-hover:bg-cyan-400/[0.07]" />

                      {/* =================================================
                          HOVER GLOW - BOTTOM LEFT
                      ================================================= */}
                      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-400/[0.08]" />

                      {/* =================================================
                          LEFT ACCENT
                      ================================================= */}
                      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-cyan-400 to-blue-600 transition-transform duration-700 group-hover:scale-y-100" />

                      <div className="relative z-10">
                        {/* =================================================
                            ICON
                        ================================================= */}
                        <motion.div
                          initial={{
                            scale: 0.7,
                            opacity: 0,
                          }}
                          whileInView={{
                            scale: 1,
                            opacity: 1,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.3,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 0.15,
                          }}
                          whileHover={{
                            scale: 1.08,
                            rotate: 4,
                          }}
                          className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm transition-all duration-500 group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/20 dark:border-cyan-400/10 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-hover:border-cyan-400/30 dark:group-hover:bg-cyan-400 dark:group-hover:text-slate-950"
                        >
                          <Icon
                            size={21}
                            strokeWidth={1.8}
                          />
                        </motion.div>

                        {/* =================================================
                            HEADING
                        ================================================= */}
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-700 sm:text-3xl dark:text-white dark:group-hover:text-cyan-300">
                          {value.heading}
                        </h2>

                        {/* =================================================
                            DECORATIVE LINE
                        ================================================= */}
                        <div className="mt-5 h-px w-12 overflow-hidden bg-slate-200 dark:bg-slate-800">
                          <div className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-blue-600 to-cyan-400 transition-transform duration-700 group-hover:scale-x-100" />
                        </div>

                        {/* =================================================
                            PARAGRAPHS
                        ================================================= */}
                        {value.paragraphs?.map((paragraph, paragraphIndex) => (
                          <motion.p
                            key={paragraph}
                            initial={{
                              opacity: 0,
                              y: 15,
                            }}
                            whileInView={{
                              opacity: 1,
                              y: 0,
                            }}
                            viewport={{
                              once: true,
                              amount: 0.2,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: 0.2 + paragraphIndex * 0.08,
                            }}
                            className="mt-6 max-w-5xl text-[15px] leading-8 text-slate-500 transition-colors duration-300 group-hover:text-slate-700 sm:text-base dark:text-slate-400 dark:group-hover:text-slate-300"
                          >
                            {paragraph}
                          </motion.p>
                        ))}

                        {/* =================================================
                            BULLETS
                        ================================================= */}
                        {value.bullets && (
                          <ul className="mt-6 max-w-5xl space-y-4">
                            {value.bullets.map((bullet, bulletIndex) => (
                              <motion.li
                                key={bullet}
                                initial={{
                                  opacity: 0,
                                  x: -15,
                                }}
                                whileInView={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                viewport={{
                                  once: true,
                                  amount: 0.2,
                                }}
                                transition={{
                                  duration: 0.5,
                                  delay:
                                    0.25 + bulletIndex * 0.08,
                                }}
                                className="flex items-start gap-4 text-[15px] leading-8 text-slate-500 transition-colors duration-300 group-hover:text-slate-700 sm:text-base dark:text-slate-400 dark:group-hover:text-slate-300"
                              >
                                <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition-all duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-hover:border-cyan-400 dark:group-hover:bg-cyan-400 dark:group-hover:text-slate-950">
                                  <Check
                                    size={11}
                                    strokeWidth={2.5}
                                  />
                                </span>

                                <span>{bullet}</span>
                              </motion.li>
                            ))}
                          </ul>
                        )}

                        {/* =================================================
                            BOTTOM ACCENT
                        ================================================= */}
                        <div className="mt-8 h-px w-20 overflow-hidden bg-slate-200 dark:bg-slate-800">
                          <div className="h-full w-20 -translate-x-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-700 group-hover:translate-x-0" />
                        </div>
                      </div>
                    </motion.article>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}