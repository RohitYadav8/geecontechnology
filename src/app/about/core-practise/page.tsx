"use client";

import Image from "next/image";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { ScrollProgress } from "../../../../components/scroll-progress";

const HERO_SRC = "/core.png";

const intro =
  "Core practise are the things we do within our organization to help maintain a high level of integrity and establish an environment where what needs to be said can be said – with confidence that both speaker(s) and listener(s) will be treated with respect, and that their ideas and contributions will be valued, whether those ideas are implemented or not.";

const principles = [
  {
    title: "Listening Generously:",
    points: [
      "We listen for the contribution in each other's speaking – suspending assessments, opinions and judgments. This means giving the person your undivided attention.",
      "If you can't give your undivided attention right now, request to speak with the person when you can listen to them generously.",
    ],
  },
  {
    title: "Speaking Straight:",
    points: [
      "We move past saying “what is supposed to be said” to speak responsibly and honestly in a way that forwards appropriate action.",
      "This includes learning to make clear and direct requests.",
      "Nobody “gets” subtle or veiled requests.",
    ],
  },
  {
    title: "Being “For” each other:",
    points: [
      "Key to a successful team is being “for” each other; much like one would be for a football team.",
      "This means 100% support for everyone in the company and the roles they play.",
    ],
  },
  {
    title: "Honouring Agreements And Commitments:",
    points: [
      "Do what you say you will do – others are depending on you.",
      "If you can't keep your agreement, renegotiate it ahead of time.",
      "If you break an agreement, acknowledge and negotiate a way to clean up the mess.",
    ],
  },
  {
    title: "Acknowledging And Appreciating Each Other:",
    points: [
      "Each of us is a source of acknowledgement and appreciation for every other person.",
      "This includes giving, receiving and requesting acknowledgement.",
    ],
  },
  {
    title: "Taking 100% ownership:",
    points: [
      "Everyone is 100% accountable for their role in the company",
      "Follow through your commitments internally and externally",
      "This does not mean taking on too much (110%) nor does it mean taking too little (90%)",
      "Everything that happens in the company is the result of its people.",
    ],
  },
];

export default function CorePractisePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[300px] w-full sm:h-[380px] lg:h-[440px]">
            <Image
              src={HERO_SRC}
              alt="Geecon Core Practise"
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Image overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-950/10 via-transparent to-cyan-950/10" />

            {/* Bottom glow */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-[70%] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ===================================================== */}
        <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28 dark:bg-slate-950">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-3xl dark:bg-cyan-500/[0.035]" />

          <div className="relative mx-auto max-w-5xl">
            {/* =====================================================
                INTRO CARD
            ===================================================== */}
            <AnimateIn>
              <div className="group relative mb-16 overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_15px_60px_-25px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_25px_80px_-25px_rgba(37,99,235,0.18)] sm:p-10 lg:p-12 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_15px_60px_-25px_rgba(0,0,0,0.3)] dark:hover:border-cyan-400/40 dark:hover:shadow-[0_25px_80px_-25px_rgba(34,211,238,0.12)]">
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:bg-blue-500/10 dark:group-hover:bg-cyan-400/10" />

                <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-400/10" />

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 top-0 w-1 origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-cyan-400 to-blue-600 transition-transform duration-500 group-hover:scale-y-100" />

                <div className="relative z-10">
                  <p className="max-w-6xl text-[15px] leading-8 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 sm:text-base dark:text-slate-400 dark:group-hover:text-slate-300">
                    {intro}
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* =====================================================
                PRINCIPLES
            ===================================================== */}
            <div className="space-y-8 sm:space-y-10">
              {principles.map((principle, index) => (
                <AnimateIn
                  key={principle.title}
                  delay={Math.min(index * 0.05, 0.3)}
                >
                  <article className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_12px_45px_-25px_rgba(15,23,42,0.18)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-blue-300 hover:shadow-[0_25px_75px_-25px_rgba(37,99,235,0.18)] sm:p-10 lg:p-12 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_12px_45px_-25px_rgba(0,0,0,0.3)] dark:hover:border-cyan-400/50 dark:hover:shadow-[0_25px_75px_-25px_rgba(34,211,238,0.12)]">
                    {/* Top glow */}
                    <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:bg-blue-500/10 dark:group-hover:bg-cyan-400/10" />

                    {/* Bottom glow */}
                    <div className="pointer-events-none absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-400/10" />

                    {/* Left hover accent */}
                    <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-cyan-400 to-blue-600 transition-transform duration-500 group-hover:scale-y-100" />

                    <div className="relative z-10">
                      {/* Heading */}
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-700 sm:text-3xl dark:text-white dark:group-hover:text-cyan-300">
                        {principle.title}
                      </h2>

                      {/* Animated underline */}
                      <div className="mt-5 h-px w-12 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-28" />

                      {/* Points */}
                      <div className="mt-7 space-y-4">
                        {principle.points.map((point) => (
                          <div
                            key={point}
                            className="group/point flex gap-4"
                          >
                            {/* Bullet */}
                            <span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.08)] transition-all duration-300 group-hover:bg-cyan-400 group-hover/point:scale-125 dark:bg-cyan-400 dark:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]" />

                            <p className="text-[15px] leading-8 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 sm:text-base dark:text-slate-400 dark:group-hover:text-slate-300">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Bottom accent */}
                      <div className="mt-8 h-px w-16 bg-gradient-to-r from-blue-500 to-transparent transition-all duration-500 group-hover:w-32" />
                    </div>
                  </article>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}