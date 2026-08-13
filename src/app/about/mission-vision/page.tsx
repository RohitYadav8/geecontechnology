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
    <div className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main>
        {/* =========================================================
            HEADER
        ========================================================= */}
        <section className="relative overflow-hidden">
          {/* Background glow */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-500/[0.07] blur-3xl dark:bg-cyan-500/[0.06]" />

          <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.06] blur-3xl dark:bg-blue-500/[0.06]" />

          <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28 lg:px-12 lg:pb-24">
            <AnimateIn>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-gradient-to-r from-blue-600 to-cyan-400" />

                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-cyan-400">
                  Mission & Vision
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.08}>
              <AnimatedHeading
                text="Mission & Vision"
                as="h1"
                className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white"
              />
            </AnimateIn>

            <AnimateIn delay={0.16}>
              <div className="mt-8 max-w-4xl">
                <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 dark:text-slate-400">
                  <span className="font-semibold text-slate-950 dark:text-white">
                    Geecon
                  </span>{" "}
                  is a Technology Driven company with a mission of
                  &quot;Developing and implementing new technology to
                  contribute towards rapid growth of various industries&quot;.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.24}>
              <div className="mt-12 h-px w-full bg-gradient-to-r from-slate-200 via-slate-300 to-transparent dark:from-slate-800 dark:via-slate-700 dark:to-transparent" />
            </AnimateIn>
          </div>
        </section>

        {/* =========================================================
            VISION
        ========================================================= */}
        <section className="relative overflow-hidden px-6 pb-10 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-700 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_30px_90px_rgba(37,99,235,0.14)] dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_20px_70px_rgba(0,0,0,0.25)] dark:hover:border-cyan-500/30 dark:hover:shadow-[0_30px_90px_rgba(34,211,238,0.08)]">
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:bg-blue-500/10 dark:group-hover:bg-cyan-400/10" />

              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* Image */}
                <AnimateIn>
                  <TiltCard className="h-full">
                    <div className="relative flex min-h-[360px] h-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 p-8 sm:min-h-[440px] sm:p-12 lg:min-h-[520px] dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
                      {/* Image glow */}
                      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue-400/10 blur-3xl transition-all duration-700 group-hover:h-80 group-hover:w-80 group-hover:bg-cyan-400/15" />

                      <div className="relative h-full w-full">
                        <Image
                          src={VISION_SRC}
                          alt="Vision"
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain p-4 transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                        />
                      </div>

                      {/* Image overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-600/[0.04] via-transparent to-cyan-400/[0.06]" />
                    </div>
                  </TiltCard>
                </AnimateIn>

                {/* Content */}
                <AnimateIn delay={0.12}>
                  <div className="relative flex h-full flex-col justify-center p-8 sm:p-12 lg:p-16">
                    <div className="mb-7 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:bg-blue-600 group-hover:text-white dark:border-cyan-400/10 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-hover:bg-cyan-400 dark:group-hover:text-slate-950">
                        <Eye size={22} strokeWidth={1.8} />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-cyan-400">
                          Vision
                        </p>

                        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                          Our Vision...
                        </h2>
                      </div>
                    </div>

                    <div className="mb-7 h-px w-14 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-24" />

                    <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 dark:text-slate-400">
                      To be globally respected premium world-class corporation
                      providing premium Consultancy & IT solutions delivered by
                      excellent-in-class people.
                    </p>

                    <StaggerContainer className="mt-9 space-y-4">
                      {visionPoints.map((point) => (
                        <StaggerItem key={point}>
                          <div className="group/item flex items-center gap-4 rounded-2xl border border-transparent px-3 py-3 transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/70 dark:hover:border-cyan-400/10 dark:hover:bg-cyan-400/[0.04]">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-blue-600 group-hover/item:text-white dark:bg-blue-950/50 dark:text-cyan-400 dark:group-hover/item:bg-cyan-400 dark:group-hover/item:text-slate-950">
                              <Check size={14} strokeWidth={2.5} />
                            </span>

                            <span className="text-sm font-medium leading-6 text-slate-700 sm:text-base dark:text-slate-300">
                              {point}
                            </span>

                            <ArrowRight
                              size={15}
                              className="ml-auto -translate-x-2 text-blue-400 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100 dark:text-cyan-400"
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
        <section className="relative overflow-hidden px-6 py-10 sm:px-10 lg:px-12">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.035] blur-3xl dark:bg-blue-500/[0.04]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-700 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_30px_90px_rgba(6,182,212,0.13)] dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_20px_70px_rgba(0,0,0,0.25)] dark:hover:border-cyan-500/30 dark:hover:shadow-[0_30px_90px_rgba(34,211,238,0.08)]">
              {/* Hover glow */}
              <div className="pointer-events-none absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-400/10" />

              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                {/* Content */}
                <AnimateIn>
                  <div className="relative flex h-full flex-col justify-center p-8 sm:p-12 lg:p-16">
                    <div className="mb-7 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3 group-hover:bg-blue-600 group-hover:text-white dark:border-cyan-400/10 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-hover:bg-cyan-400 dark:group-hover:text-slate-950">
                        <Flag size={22} strokeWidth={1.8} />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-cyan-400">
                          Mission
                        </p>

                        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                          Our Mission....
                        </h2>
                      </div>
                    </div>

                    <div className="mb-7 h-px w-14 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-24" />

                    <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 dark:text-slate-400">
                      Helping customers by providing the world&apos;s most
                      simplified best quality solutions & delivering value that
                      enable businesses to achieve their full potential in a
                      cost effective and timely fashion.
                    </p>

                    <StaggerContainer className="mt-9 space-y-4">
                      {missionPoints.map((point) => (
                        <StaggerItem key={point}>
                          <div className="group/item flex items-center gap-4 rounded-2xl border border-transparent px-3 py-3 transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/70 dark:hover:border-cyan-400/10 dark:hover:bg-cyan-400/[0.04]">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-blue-600 group-hover/item:text-white dark:bg-blue-950/50 dark:text-cyan-400 dark:group-hover/item:bg-cyan-400 dark:group-hover/item:text-slate-950">
                              <Check size={14} strokeWidth={2.5} />
                            </span>

                            <span className="text-sm font-medium leading-6 text-slate-700 sm:text-base dark:text-slate-300">
                              {point}
                            </span>

                            <ArrowRight
                              size={15}
                              className="ml-auto -translate-x-2 text-blue-400 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100 dark:text-cyan-400"
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
                    <div className="relative flex min-h-[360px] h-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 p-8 sm:min-h-[440px] sm:p-12 lg:min-h-[520px] dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
                      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-700 group-hover:h-80 group-hover:w-80 group-hover:bg-blue-500/15" />

                      <div className="relative h-full w-full">
                        <Image
                          src={MISSION_SRC}
                          alt="Mission"
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain p-4 transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                        />
                      </div>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-cyan-400/[0.06] via-transparent to-blue-600/[0.04]" />
                    </div>
                  </TiltCard>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-14 sm:h-20" />
      </main>

      <Footer />
    </div>
  );
}