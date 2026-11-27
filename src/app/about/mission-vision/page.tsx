"use client";

import Image from "next/image";
import { Check, Eye, Flag, ArrowRight } from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../../components/stagger-container";
import { TiltCard } from "../../../../components/tilt-card";
import { ScrollProgress } from "../../../../components/scroll-progress";
import { FloatingBlob } from "../../../../components/floating-blob";

const VISION_SRC = "/vision.png";
const MISSION_SRC = "/mission.png";

const visionPoints = [
  "World Class Corporation",
  "Globally Respected Corporation",
  "Premium Consultancy & Solutions",
  "Excellent In-Class-People",
];

const missionPoints = [
  "Help Achieving Full Potential",
  "Simplified Quality Solutions",
  "Cost Effective Approach",
  "Timed Delivery",
];

export default function MissionVisionPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#060b16] dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main className="relative">
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
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                Mission & Vision
              </div>
            </AnimateIn>

            <AnimateIn delay={0.08}>
              <AnimatedHeading
                text="Mission & Vision"
                as="h1"
                highlightFrom={2}
                highlightClassName="brand-text-light"
                className="mt-7 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]"
              />
            </AnimateIn>

            <AnimateIn delay={0.16}>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                <span className="font-bold text-white">
                  Geecon
                </span>{" "}
                is a Technology Driven company with a mission of
                &quot;Developing and implementing new technology to
                contribute towards rapid growth of various industries&quot;.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* =========================================================
            VISION
        ========================================================= */}
        <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-8 sm:-mt-32 sm:px-6 lg:px-10">
          <div>
            <div className="group relative overflow-hidden rounded-[32px] border border-slate-100 bg-white p-3 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] transition-all duration-700 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220]">
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-violet-400/0 blur-3xl transition-all duration-700 group-hover:bg-violet-400/15" />

              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* Image */}
                <AnimateIn>
                  <TiltCard className="h-full">
                    <div className="brand-grad relative flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-[24px] p-6 sm:min-h-[420px] sm:p-10 lg:min-h-[500px]">
                      {/* Image glow */}
                      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />

                      <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />

                      <div className="pointer-events-none absolute inset-6 rounded-[20px] bg-white/90 shadow-[0_20px_50px_-25px_rgba(15,23,42,.5)] sm:inset-10 dark:bg-white/[0.92]" />

                      <div className="relative h-full w-full">
                        <Image
                          src={VISION_SRC}
                          alt="Vision"
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain p-6 transition-transform duration-1000 ease-out group-hover:scale-[1.04] sm:p-8"
                        />
                      </div>

                      {/* Image overlay */}
                                          </div>
                  </TiltCard>
                </AnimateIn>

                {/* Content */}
                <AnimateIn delay={0.12}>
                  <div className="relative flex h-full flex-col justify-center p-5 sm:p-10 lg:p-14">
                    <div className="mb-7 flex items-center gap-4">
                      <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                        <Eye size={22} strokeWidth={1.8} />
                      </div>

                      <div>
                        <p className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
                          Vision
                        </p>

                        <h2 className="mt-1 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-[40px] sm:leading-tight dark:text-white">
                          Our Vision...
                        </h2>
                      </div>
                    </div>

                    <div className="brand-grad mb-7 h-[3px] w-14 rounded-full transition-all duration-500 group-hover:w-24" />

                    <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 dark:text-slate-400">
                      To be globally respected premium world-class corporation
                      providing premium Consultancy & IT solutions delivered by
                      excellent-in-class people.
                    </p>

                    <StaggerContainer className="mt-8 space-y-3">
                      {visionPoints.map((point) => (
                        <StaggerItem key={point}>
                          <div className="group/item flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-3 transition-all duration-300 hover:border-violet-200 hover:bg-violet-50/70 dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:border-violet-400/30 dark:hover:bg-violet-500/[0.06]">
                            <span className="brand-grad flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-md shadow-violet-500/20 transition-transform duration-300 group-hover/item:scale-110">
                              <Check size={14} strokeWidth={2.5} />
                            </span>

                            <span className="text-sm font-semibold leading-6 text-slate-800 sm:text-base dark:text-slate-200">
                              {point}
                            </span>

                            <ArrowRight
                              size={15}
                              className="ml-auto -translate-x-2 shrink-0 text-violet-500 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100 dark:text-violet-300"
                            />
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            MISSION
        ========================================================= */}
        <section className="relative px-4 py-8 sm:px-6 lg:px-10">
          <div className="relative mx-auto max-w-7xl">
            <div className="group relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-3 shadow-[0_30px_80px_-45px_rgba(15,23,42,.35)] transition-all duration-700 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
              {/* Hover glow */}
              <div className="pointer-events-none absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-violet-400/0 blur-3xl transition-all duration-700 group-hover:bg-violet-400/15" />

              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                {/* Content */}
                <AnimateIn>
                  <div className="relative flex h-full flex-col justify-center p-5 sm:p-10 lg:p-14">
                    <div className="mb-7 flex items-center gap-4">
                      <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                        <Flag size={22} strokeWidth={1.8} />
                      </div>

                      <div>
                        <p className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
                          Mission
                        </p>

                        <h2 className="mt-1 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-[40px] sm:leading-tight dark:text-white">
                          Our Mission....
                        </h2>
                      </div>
                    </div>

                    <div className="brand-grad mb-7 h-[3px] w-14 rounded-full transition-all duration-500 group-hover:w-24" />

                    <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 dark:text-slate-400">
                      Helping customers by providing the world&apos;s most
                      simplified best quality solutions & delivering value that
                      enable businesses to achieve their full potential in a
                      cost effective and timely fashion.
                    </p>

                    <StaggerContainer className="mt-8 space-y-3">
                      {missionPoints.map((point) => (
                        <StaggerItem key={point}>
                          <div className="group/item flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-3 transition-all duration-300 hover:border-violet-200 hover:bg-violet-50/70 dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:border-violet-400/30 dark:hover:bg-violet-500/[0.06]">
                            <span className="brand-grad flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-md shadow-violet-500/20 transition-transform duration-300 group-hover/item:scale-110">
                              <Check size={14} strokeWidth={2.5} />
                            </span>

                            <span className="text-sm font-semibold leading-6 text-slate-800 sm:text-base dark:text-slate-200">
                              {point}
                            </span>

                            <ArrowRight
                              size={15}
                              className="ml-auto -translate-x-2 shrink-0 text-violet-500 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100 dark:text-violet-300"
                            />
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </AnimateIn>

                {/* Image */}
                <AnimateIn delay={0.12}>
                  <TiltCard className="h-full">
                    <div className="brand-grad relative flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-[24px] p-6 sm:min-h-[420px] sm:p-10 lg:min-h-[500px]">
                      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />

                      <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />

                      <div className="pointer-events-none absolute inset-6 rounded-[20px] bg-white/90 shadow-[0_20px_50px_-25px_rgba(15,23,42,.5)] sm:inset-10 dark:bg-white/[0.92]" />

                      <div className="relative h-full w-full">
                        <Image
                          src={MISSION_SRC}
                          alt="Mission"
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain p-6 transition-transform duration-1000 ease-out group-hover:scale-[1.04] sm:p-8"
                        />
                      </div>

                                          </div>
                  </TiltCard>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-16 sm:h-20" />
      </main>

      <Footer />
    </div>
  );
}