"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { TiltCard } from "../../../../components/tilt-card";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../../components/stagger-container";
import { ScrollProgress } from "../../../../components/scroll-progress";

const HERO_SRC = "/core.png";

const timeline = [
  {
    heading: "THE BIGINNING:",
    paragraphs: [
      "1999 a thought was born and further it was named GEECON. From the beginning, the company was founded on the principal of providing Business and Management Consultancy and Software Solution and IT Consultancy. For over a decade, Geecon have been company focused on bringing to life great ideas and IT solutions that drive progress for our clients. Continuous innovation and rapid transformation have been themes throughout Geecon's history.",
      "India witnessed emergence of Geecon in 2007. It was then; Geecon started delivering excellent services to its clients in India. Geecon built reputation primarily as a technology consultant. It began offering a new breed of business integration solutions to clients solutions that aligned organizational technologies and people with their strategies.",
    ],
  },
  {
    heading: "THE MIDDLE:",
    paragraphs: [
      "Later in 2009 a decision was made to shift the headquarters to London, United Kingdom to accord its services globally. Throughout its history, Geecon has provided capturing and cost effective solution for IT services, resourcing and designing. The tag of Private Limited Company was acquired in India by Geecon in 2011.",
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main>
        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="relative w-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-[320px] w-full sm:h-[380px] lg:h-[460px]"
          >
            <Image
              src={HERO_SRC}
              alt="Geecon History"
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Premium overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/40" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/15 via-transparent to-slate-950/10" />

            {/* Soft light effect */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl"
            />
          </motion.div>
        </section>

        {/* =========================================================
            TIMELINE
        ========================================================= */}
        <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-950 sm:py-28 lg:py-32">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-3xl dark:bg-cyan-400/[0.035]" />

          <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-400/[0.025] blur-3xl" />

          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <StaggerContainer className="relative">
              {/* Central timeline */}
              <div className="absolute bottom-0 left-[27px] top-0 hidden md:block">
                <div className="h-full w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-500/10 dark:from-cyan-400 dark:via-blue-500 dark:to-transparent" />

                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 origin-top bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent"
                />
              </div>

              <div className="space-y-16 sm:space-y-24">
                {timeline.map((item, index) => (
                  <StaggerItem key={item.heading}>
                    <div className="relative grid gap-8 md:grid-cols-[120px_1fr] md:gap-12">
                      {/* =================================================
                          TIMELINE ICON
                      ================================================= */}
                      <div className="relative">
                        <div className="sticky top-32">
                          <motion.div
                            initial={{
                              scale: 0.6,
                              opacity: 0,
                              rotate: -15,
                            }}
                            whileInView={{
                              scale: 1,
                              opacity: 1,
                              rotate: 0,
                            }}
                            viewport={{
                              once: true,
                              amount: 0.4,
                            }}
                            transition={{
                              duration: 0.7,
                              delay: index * 0.08,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{
                              scale: 1.12,
                              rotate: 4,
                            }}
                            className="group relative z-20 flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/20 bg-white text-blue-600 shadow-[0_10px_40px_rgba(37,99,235,0.12)] transition-all duration-500 hover:border-cyan-400/50 hover:text-cyan-500 dark:border-cyan-400/20 dark:bg-slate-900 dark:text-cyan-300 dark:shadow-[0_10px_40px_rgba(34,211,238,0.08)]"
                          >
                            {/* Icon glow */}
                            <span className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100 dark:bg-cyan-400/10" />

                            <Calendar className="relative z-10 h-5 w-5" />
                          </motion.div>
                        </div>
                      </div>

                      {/* =================================================
                          CONTENT CARD
                      ================================================= */}
                      <TiltCard>
                        <motion.article
                          initial={{
                            opacity: 0,
                            y: 50,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.15,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          whileHover={{
                            y: -8,
                          }}
                          className="group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-7 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.20)] transition-all duration-500 hover:border-blue-300/70 hover:shadow-[0_30px_90px_-25px_rgba(37,99,235,0.22)] sm:p-10 lg:p-12 dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-[0_20px_70px_-30px_rgba(0,0,0,0.45)] dark:hover:border-cyan-400/30 dark:hover:shadow-[0_30px_90px_-25px_rgba(34,211,238,0.14)]"
                        >
                          {/* =================================================
                              TOP ACCENT
                          ================================================= */}
                          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                          {/* =================================================
                              HOVER GLOW
                          ================================================= */}
                          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:bg-blue-500/[0.09] dark:group-hover:bg-cyan-400/[0.07]" />

                          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-400/[0.08]" />

                          {/* =================================================
                              SIDE ACCENT
                          ================================================= */}
                          <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-cyan-400 to-blue-600 transition-transform duration-700 group-hover:scale-y-100" />

                          <div className="relative z-10">
                            {/* Heading */}
                            <motion.h2
                              initial={{ opacity: 0, x: -15 }}
                              whileInView={{
                                opacity: 1,
                                x: 0,
                              }}
                              viewport={{
                                once: true,
                                amount: 0.3,
                              }}
                              transition={{
                                duration: 0.6,
                                delay: 0.15,
                              }}
                              className="text-3xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-700 sm:text-4xl dark:text-white dark:group-hover:text-cyan-300"
                            >
                              {item.heading}
                            </motion.h2>

                            {/* Heading line */}
                            <motion.div
                              initial={{ width: 20, opacity: 0 }}
                              whileInView={{
                                width: 56,
                                opacity: 1,
                              }}
                              viewport={{
                                once: true,
                                amount: 0.3,
                              }}
                              transition={{
                                duration: 0.6,
                                delay: 0.25,
                              }}
                              className="mt-6 h-px bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-28"
                            />

                            {/* Paragraphs */}
                            <div className="mt-7 space-y-5">
                              {item.paragraphs.map((paragraph, paragraphIndex) => (
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
                                    delay:
                                      0.3 + paragraphIndex * 0.08,
                                  }}
                                  className="text-sm leading-8 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 sm:text-base dark:text-slate-400 dark:group-hover:text-slate-300"
                                >
                                  {paragraph}
                                </motion.p>
                              ))}
                            </div>
                          </div>

                          {/* =================================================
                              BOTTOM DECORATIVE LINE
                          ================================================= */}
                          <div className="relative mt-8 h-px w-20 overflow-hidden bg-slate-200 dark:bg-slate-800">
                            <div className="absolute inset-y-0 left-0 w-20 -translate-x-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-700 group-hover:translate-x-0" />
                          </div>
                        </motion.article>
                      </TiltCard>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}