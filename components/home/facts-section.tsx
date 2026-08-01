"use client";

import { motion } from "motion/react";
import { Award, Briefcase, Megaphone } from "lucide-react";

import { facts } from "../../lib/home-data";
import { AnimateIn } from "../../components/animate-in";
import {
  StaggerContainer,
  StaggerItem,
} from "../../components/stagger-container";
import { AnimatedHeading } from "../../components/animated-heading";

const icons = {
  award: Award,
  briefcase: Briefcase,
  megaphone: Megaphone,
};

export function FactsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/40">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/5" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/5" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
          {/* Heading */}
          <div>
            <AnimateIn direction="left">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1a2b4a] dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400">
                Who we are
              </span>
            </AnimateIn>

            <AnimatedHeading
              text="Some facts to know"
              delay={0.1}
              className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
            />

            {/* Decorative line */}
            <AnimateIn delay={0.2}>
              <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#1a2b4a] to-blue-400 dark:from-blue-500 dark:to-cyan-400" />
            </AnimateIn>
          </div>

          {/* Description */}
          <AnimateIn delay={0.15} direction="right">
            <p className="max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">
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
        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => {
            const Icon = icons[fact.icon as keyof typeof icons];

            return (
              <StaggerItem key={fact.title}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/40 dark:hover:shadow-black/40">
                  {/* Top animated line */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#1a2b4a] via-blue-500 to-cyan-400 transition-transform duration-500 group-hover:scale-x-100" />

                  {/* Card glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: [0, -8, 8, -4, 0],
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1a2b4a]/10 text-[#1a2b4a] transition-all duration-300 group-hover:bg-[#1a2b4a] group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white"
                  >
                    <Icon size={24} strokeWidth={1.75} />
                  </motion.div>

                
                  <h3 className="relative z-10 mt-5 text-base font-semibold text-slate-900 dark:text-white">
                    {fact.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 mt-2.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {fact.description}
                  </p>

                  {/* Bottom arrow */}
                  <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-semibold text-[#1a2b4a] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-blue-400">
                    <span>Learn more</span>
                    <span className="text-base">→</span>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}