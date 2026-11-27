"use client";

import {
  Award,
  Briefcase,
  Megaphone,
} from "lucide-react";

import { facts } from "../../lib/home-data";

import { AnimateIn } from "../animate-in";
import { AnimatedHeading } from "../animated-heading";

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
    <section className="relative z-20 -mt-32 px-4 sm:-mt-36 sm:px-6 lg:px-10">
      <AnimateIn className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-[30px] border border-slate-100 bg-white p-7 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-14 lg:p-14 dark:border-white/[0.07] dark:bg-[#0b1220] dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,.8)]">
          {/* Left */}
          <div>
            <span className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
              Who we are
            </span>

            <AnimatedHeading
              text="Some facts to know"
              as="h2"
              delay={0.08}
              className="mt-4 max-w-xs text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-[46px] dark:text-white"
            />
          </div>

          {/* Right */}
          <div>
            <p className="text-[15px] leading-8 text-slate-500 dark:text-slate-400">
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

            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-3">
              {facts.map((fact) => {
                const Icon =
                  icons[fact.icon as keyof typeof icons];

                return (
                  <StaggerItem
                    key={fact.title}
                    className="h-full"
                  >
                    <article className="group h-full rounded-[20px] border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_24px_50px_-30px_rgba(91,33,182,.45)] dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-violet-400/30">
                      <div className="brand-grad flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
                        <Icon size={21} strokeWidth={1.9} />
                      </div>

                      <h3 className="mt-5 text-[17px] font-bold text-slate-950 dark:text-white">
                        {fact.title}
                      </h3>

                      <p className="mt-2 text-[13.5px] leading-7 text-slate-500 dark:text-slate-400">
                        {fact.description}
                      </p>
                    </article>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
