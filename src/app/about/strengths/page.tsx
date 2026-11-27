"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { ScrollProgress } from "../../../../components/scroll-progress";
import { FloatingBlob } from "../../../../components/floating-blob";

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
      rgba(124, 58, 237, 0.08),
      transparent 65%
    )
  `;

  const darkSpotlight = useMotionTemplate`
    radial-gradient(
      500px circle at ${mouseX}% ${mouseY}%,
      rgba(139, 92, 246, 0.10),
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
        className="group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,.25)] transition-[border-color,box-shadow] duration-500 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]"
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

        {/* Left accent */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-[3px] origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-violet-500 to-cyan-400 transition-transform duration-700 group-hover:scale-y-100" />

        {/* Card content */}
        <div className="relative z-30 flex flex-col gap-6 p-7 sm:flex-row sm:gap-8 sm:p-10">
          <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-[15px] font-extrabold text-white shadow-lg shadow-violet-500/25 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0 flex-1">
            {/* Heading */}
            <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 transition-colors duration-300 group-hover:text-violet-700 sm:text-[30px] sm:leading-tight dark:text-white dark:group-hover:text-violet-300">
              {title}
            </h2>

            <div className="brand-grad mt-4 h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-24" />

            {/* Body */}
            <p className="mt-5 text-[15px] leading-8 text-slate-600 sm:text-base dark:text-slate-400">
              {body}
            </p>
          </div>
        </div>
      </motion.article>
    </AnimateIn>
  );
}

export default function StrengthsPage() {
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
                alt="Geecon Strengths"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1150px"
                className="object-cover object-center"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* =========================================================
            CARDS
        ========================================================= */}
        <section className="relative z-10 mx-auto -mt-28 max-w-5xl px-4 pb-24 sm:-mt-32 sm:px-6 lg:px-8 lg:pb-28">
          <div className="space-y-6 sm:space-y-8">
            {strengths.map((strength, index) => (
              <StrengthCard
                key={strength.title}
                title={strength.title}
                body={strength.body}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}