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
import { FloatingBlob } from "../../../../components/floating-blob";

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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#060b16] dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main className="relative">
        {/* =========================================================
            HERO IMAGE
        ========================================================= */}
        <section className="brand-grad relative overflow-hidden px-4 pb-40 pt-12 text-white sm:px-8 sm:pb-44 sm:pt-16 lg:px-10">
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

          <motion.div
            initial={{
              scale: 0.97,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto max-w-6xl rounded-[28px] border border-white/30 bg-white/15 p-2 shadow-[0_30px_80px_-30px_rgba(15,23,42,.55)] backdrop-blur-xl"
          >
            <div className="relative h-[220px] w-full overflow-hidden rounded-[22px] sm:h-[320px] lg:h-[400px]">
              <Image
                src={HERO_SRC}
                alt="Geecon Core Values"
                fill
                priority
                quality={100}
                sizes="(max-width: 1200px) 100vw, 1150px"
                className="object-cover object-center"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* =========================================================
            CORE VALUES
        ========================================================= */}
        <section className="relative z-10 mx-auto -mt-28 max-w-5xl px-4 pb-24 sm:-mt-32 sm:px-6 lg:px-8 lg:pb-28">
          <div>
            <div className="space-y-6 sm:space-y-8">
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
                        y: -6,
                      }}
                      className={`group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-7 transition-[border-color,box-shadow] duration-500 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] sm:p-10 dark:border-white/[0.07] dark:bg-[#0b1220] ${index === 0 ? "shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)]" : "shadow-[0_20px_60px_-40px_rgba(15,23,42,.25)]"}`}
                    >
                      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-400/0 blur-3xl transition-all duration-700 group-hover:bg-violet-400/15" />

                      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-violet-500 to-cyan-400 transition-transform duration-700 group-hover:scale-y-100" />

                      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:gap-8">
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
                          className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25"
                        >
                          <Icon
                            size={21}
                            strokeWidth={1.8}
                          />
                        </motion.div>

                        <div className="min-w-0 flex-1">
                        {/* =================================================
                            HEADING
                        ================================================= */}
                        <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 transition-colors duration-300 group-hover:text-violet-700 sm:text-[30px] sm:leading-tight dark:text-white dark:group-hover:text-violet-300">
                          {value.heading}
                        </h2>

                        {/* =================================================
                            DECORATIVE LINE
                        ================================================= */}
                        <div className="brand-grad mt-4 h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-24" />

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
                            className="mt-5 text-[15px] leading-8 text-slate-600 sm:text-base dark:text-slate-400"
                          >
                            {paragraph}
                          </motion.p>
                        ))}

                        {/* =================================================
                            BULLETS
                        ================================================= */}
                        {value.bullets && (
                          <ul className="mt-5 space-y-3">
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
                                className="flex items-start gap-4 text-[15px] leading-8 text-slate-600 sm:text-base dark:text-slate-400"
                              >
                                <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
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