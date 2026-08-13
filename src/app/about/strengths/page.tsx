"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { ScrollProgress } from "../../../../components/scroll-progress";

const HERO_SRC = "/core.png";

const strengths = [
  {
    title: "Simplicity and User Friendliness:",
    body: "Our products are known for their ultimate simplicity and user friendliness. Geecon products are designed taking in consideration the comfort level of its user. This is why we meet and exceed user's satisfaction in user interface of a product.",
  },
  {
    title: "Team with a common Dream:",
    body: "We come together to define and create unrivaled unique user experiences. Our team consists of qualified and experienced Business Strategy expert, a business developer head, a Visual Communication guru, Professional Web developers, Mainframe Application developers, Creative Content writer(s), and a dynamic team of Software developers.",
  },
  {
    title: "Latest Technology with Unique Idea:",
    body: "Geecon emphasizes on developing a world class, sturdy, efficient, lucid product that provides user desired results. At Geecon, we stress on using and developing potent neo-technology that helps to create a product with quick, more competent and optimum result.",
  },
  {
    title: "Organized Approach:",
    body: "We at Geecon have an organized and well defined approach for the set Target. Clear definitions of work areas and dedicated team efforts on laid out plans leave no possibility for compromise on internal growth of the organization.",
  },
];

function StrengthCard({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const spotlight = useMotionTemplate`
    radial-gradient(
      500px circle at ${mouseX}% ${mouseY}%,
      rgba(37, 99, 235, 0.12),
      transparent 65%
    )
  `;

  const darkSpotlight = useMotionTemplate`
    radial-gradient(
      500px circle at ${mouseX}% ${mouseY}%,
      rgba(34, 211, 238, 0.10),
      transparent 65%
    )
  `;

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <AnimateIn delay={Math.min(index * 0.08, 0.3)}>
      <motion.article
        onMouseMove={handleMouseMove}
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
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -8,
          transition: {
            duration: 0.35,
            ease: "easeOut",
          },
        }}
        className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_15px_50px_-25px_rgba(15,23,42,0.25)] transition-all duration-500 hover:border-blue-300 hover:shadow-[0_30px_90px_-30px_rgba(37,99,235,0.28)] dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-cyan-400/50 dark:hover:shadow-[0_30px_90px_-30px_rgba(34,211,238,0.18)]"
      >
        {/* Mouse spotlight */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:hidden sm:block"
          style={{
            background: spotlight,
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:block"
          style={{
            background: darkSpotlight,
          }}
        />

        {/* Gradient border */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="pointer-events-none absolute inset-[1px] rounded-[31px] bg-white dark:bg-slate-900/95" />

        {/* Top right glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:bg-blue-500/15 dark:group-hover:bg-cyan-400/10" />

        {/* Bottom left glow */}
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-700 group-hover:bg-cyan-400/10" />

        {/* Left accent */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-1 origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-cyan-400 to-blue-600 transition-transform duration-700 group-hover:scale-y-100" />

        {/* Card content */}
        <div className="relative z-30 p-7 sm:p-10 lg:p-12">
          {/* Decorative top mark */}
          <div className="mb-7 flex items-center">
            <motion.div
              className="h-[3px] w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
              whileHover={{
                width: 70,
              }}
              transition={{
                duration: 0.4,
              }}
            />

            <div className="ml-2 h-[3px] w-2 rounded-full bg-cyan-400/30 transition-all duration-500 group-hover:w-5 group-hover:bg-cyan-400" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-700 sm:text-3xl dark:text-white dark:group-hover:text-cyan-300">
            {title}
          </h2>

          {/* Animated underline */}
          <div className="mt-5 flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-28" />

            <div className="h-px w-3 bg-cyan-400/40 transition-all duration-500 group-hover:w-6 group-hover:bg-cyan-400" />
          </div>

          {/* Body */}
          <p className="mt-7 max-w-5xl text-[15px] leading-8 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 sm:text-base dark:text-slate-400 dark:group-hover:text-slate-300">
            {body}
          </p>

          {/* Bottom accent */}
          <div className="mt-9 h-px w-16 bg-gradient-to-r from-blue-500 to-transparent transition-all duration-700 group-hover:w-40" />
        </div>

        {/* Corner detail */}
        <div className="pointer-events-none absolute bottom-5 right-6 z-30 flex items-center gap-1 opacity-40 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
          <span className="h-1 w-1 rounded-full bg-blue-500" />
          <span className="h-1 w-1 rounded-full bg-cyan-400" />
          <span className="h-1 w-1 rounded-full bg-blue-500/40" />
        </div>
      </motion.article>
    </AnimateIn>
  );
}

export default function StrengthsPage() {
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
            initial={{
              scale: 1.08,
              opacity: 0.7,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-[300px] w-full sm:h-[380px] lg:h-[440px]"
          >
            <Image
              src={HERO_SRC}
              alt="Geecon Strengths"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Cinematic overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-950/15 via-transparent to-cyan-950/15" />

            {/* Soft glow */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[75%] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

            {/* Bottom accent */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
          </motion.div>
        </section>

        {/* =========================================================
            STRENGTHS
        ========================================================= */}
        <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28 dark:bg-slate-950">
          {/* Main background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-3xl dark:bg-cyan-500/[0.035]" />

          {/* Secondary glow */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-400/[0.025] blur-3xl" />

          <div className="relative mx-auto max-w-5xl">
            <div className="space-y-8 sm:space-y-10">
              {strengths.map((strength, index) => (
                <StrengthCard
                  key={strength.title}
                  title={strength.title}
                  body={strength.body}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}