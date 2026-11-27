"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { ScrollProgress } from "../../../../components/scroll-progress";
import { FloatingBlob } from "../../../../components/floating-blob";

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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#060b16] dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main className="relative">
        {/* =====================================================
            HERO
        ===================================================== */}
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

          <AnimateIn>
            <div className="relative mx-auto max-w-6xl rounded-[28px] border border-white/30 bg-white/15 p-2 shadow-[0_30px_80px_-30px_rgba(15,23,42,.55)] backdrop-blur-xl">
              <div className="relative h-[220px] w-full overflow-hidden rounded-[22px] sm:h-[320px] lg:h-[400px]">
                <Image
                  src={HERO_SRC}
                  alt="Geecon Core Practise"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 1200px) 100vw, 1150px"
                  className="object-cover object-center"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent" />
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* =====================================================
            CONTENT
        ===================================================== */}
        <section className="relative z-10 mx-auto -mt-28 max-w-5xl px-4 pb-24 sm:-mt-32 sm:px-6 lg:px-8 lg:pb-28">
          {/* =====================================================
              INTRO CARD
          ===================================================== */}
          <AnimateIn>
            <div className="relative mb-8 overflow-hidden rounded-[32px] border border-slate-100 bg-white p-7 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:mb-10 sm:p-10 lg:p-12 dark:border-white/[0.07] dark:bg-[#0b1220]">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

              <div className="brand-grad absolute bottom-0 left-0 top-0 w-1" />

              <p className="relative z-10 text-base leading-8 text-slate-700 sm:text-lg sm:leading-9 dark:text-slate-300">
                {intro}
              </p>
            </div>
          </AnimateIn>

          {/* =====================================================
              PRINCIPLES
          ===================================================== */}
          <div className="space-y-6 sm:space-y-8">
            {principles.map((principle, index) => (
              <AnimateIn
                key={principle.title}
                delay={Math.min(index * 0.05, 0.3)}
              >
                <article className="group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_-40px_rgba(15,23,42,.25)] transition-all duration-500 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] sm:p-10 dark:border-white/[0.07] dark:bg-[#0b1220]">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-400/0 blur-3xl transition-all duration-700 group-hover:bg-violet-400/15" />

                  <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-violet-500 to-cyan-400 transition-transform duration-700 ease-out group-hover:scale-y-100" />

                  <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-[15px] font-extrabold text-white shadow-lg shadow-violet-500/25 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 transition-colors duration-300 group-hover:text-violet-700 sm:text-[30px] sm:leading-tight dark:text-white dark:group-hover:text-violet-300">
                        {principle.title}
                      </h2>

                      <div className="brand-grad mt-4 h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-24" />

                      <div className="mt-6 space-y-3">
                        {principle.points.map((point) => (
                          <div
                            key={point}
                            className="flex gap-4"
                          >
                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                              <Check size={11} strokeWidth={2.75} />
                            </span>

                            <p className="text-[15px] leading-8 text-slate-600 sm:text-base dark:text-slate-400">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
