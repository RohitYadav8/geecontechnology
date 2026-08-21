"use client";

import {
  Award,
  Briefcase,
  Megaphone,
} from "lucide-react";

import { facts } from "../../lib/home-data";

import { AnimateIn } from "../animate-in";
import { AnimatedHeading } from "../animated-heading";
import { BackgroundEffects } from "../background-effects";
import { MouseGlow } from "../mouse-glow";

import {
  StaggerContainer,
  StaggerItem,
} from "../stagger-container";

const icons = {
  award: Award,
  briefcase: Briefcase,
  megaphone: Megaphone,
};

export function FactsSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50/80 py-20 sm:py-24 dark:border-white/[0.05] dark:bg-[#080e1a]">
      {/* Existing project background animation */}
      <BackgroundEffects />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Top Content */}
        <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-20">
          {/* Left */}
          <div>
            <AnimateIn direction="left">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/[0.08] dark:text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Who we are
              </span>
            </AnimateIn>

            <AnimatedHeading
              text="Some facts to know"
              as="h2"
              delay={0.08}
              className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl dark:text-white"
            />

            <AnimateIn delay={0.18}>
              <div className="mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
            </AnimateIn>
          </div>

          {/* Right */}
          <AnimateIn
            direction="right"                                                                                          
            delay={0.12}
            className="lg:pt-7"
          >
            <p className="max-w-3xl text-sm leading-7 text-slate-500 sm:text-[15px] sm:leading-8 dark:text-slate-400">
              We are a diverse team of competent, dynamic and experienced
              individuals passionate about our work and company. Our ascendancy
              lies in business and management consultancy, development of
              online/offline software solutions and IT consulting and brand
              management. Geecon is a firm driven by creativity, inventiveness,
              innovation and team work. We endeavor to ensure customer
              satisfaction and achieve customer confidence. We care for and
              value our esteemed customers and believe in creating fulfilling
              business relationships.
            </p>
          </AnimateIn>
        </div>

        {/* Facts Cards */}
        <StaggerContainer className="mt-14 grid gap-5 md:grid-cols-3">
          {facts.map((fact) => {
            const Icon =
              icons[fact.icon as keyof typeof icons];

            return (
              <StaggerItem
                key={fact.title}
                className="h-full"
              >
                <MouseGlow className="h-full">
                  <article className="group relative h-full overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/80 p-7 shadow-[0_20px_60px_-35px_rgba(15,23,42,.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-300/70 hover:shadow-[0_25px_70px_-30px_rgba(37,99,235,.25)] dark:border-white/[0.07] dark:bg-white/[0.035] dark:hover:border-blue-400/20">
                    {/* Animated top border */}
                    <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#1a2b4a] shadow-sm transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:bg-[#1a2b4a] group-hover:text-white dark:border-blue-500/10 dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-500">
                      <Icon
                        size={23}
                        strokeWidth={1.7}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 text-[17px] font-semibold text-slate-950 dark:text-white">
                      {fact.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                      {fact.description}
                    </p>
                  </article>
                </MouseGlow>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}