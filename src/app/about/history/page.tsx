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
import { FloatingBlob } from "../../../../components/floating-blob";

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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#060b16] dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main className="relative">
        {/* =========================================================
            HERO
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
                alt="Geecon History"
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
            TIMELINE
        ========================================================= */}
        <section className="relative z-10 mx-auto -mt-28 max-w-5xl px-4 pb-24 sm:-mt-32 sm:px-6 lg:px-8 lg:pb-28">
          <StaggerContainer className="relative">
            {/* Timeline line */}
            <div className="absolute bottom-0 left-[23px] top-16 hidden md:block">
              <div className="h-full w-px bg-gradient-to-b from-violet-300 via-violet-200 to-transparent dark:from-violet-500/40 dark:via-violet-500/15" />

              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 origin-top bg-gradient-to-b from-blue-600 via-violet-500 to-transparent"
              />
            </div>

            <div className="space-y-6 sm:space-y-8">
              {timeline.map((item, index) => (
                <StaggerItem key={item.heading}>
                  <div className="relative grid gap-4 md:grid-cols-[48px_1fr] md:gap-8">
                    {/* Timeline icon */}
                    <div className="relative hidden md:block">
                      <div className="sticky top-32 pt-16">
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
                          className="brand-grad relative z-20 flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 ring-4 ring-slate-50 dark:ring-[#060b16]"
                        >
                          <Calendar className="h-5 w-5" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content card */}
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
                        className={`group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-7 transition-[border-color,box-shadow] duration-500 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] sm:p-10 lg:p-12 dark:border-white/[0.07] dark:bg-[#0b1220] ${index === 0 ? "shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)]" : "shadow-[0_20px_60px_-40px_rgba(15,23,42,.25)]"}`}
                      >
                        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-400/0 blur-3xl transition-all duration-700 group-hover:bg-violet-400/15" />

                        <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-violet-500 to-cyan-400 transition-transform duration-700 group-hover:scale-y-100" />

                        <div className="relative z-10">
                          <div className="brand-grad mb-6 flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 md:hidden">
                            <Calendar className="h-5 w-5" />
                          </div>

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
                            className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950 transition-colors duration-300 group-hover:text-violet-700 sm:text-[40px] sm:leading-tight dark:text-white dark:group-hover:text-violet-300"
                          >
                            {item.heading}
                          </motion.h2>

                          <div className="brand-grad mt-5 h-[3px] w-14 rounded-full transition-all duration-500 group-hover:w-28" />

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
                                className="text-[15px] leading-8 text-slate-600 sm:text-base dark:text-slate-400"
                              >
                                {paragraph}
                              </motion.p>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    </TiltCard>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>
      </main>

      <Footer />
    </div>
  );
}