"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { heroSlides } from "../../lib/home-data";
import { AnimatedHeading } from "../animated-heading";
import { FloatingBlob } from "../floating-blob";

const SLIDE_DURATION = 6000;

/** Highlight roughly the last 40% of the title words (min 1). */
function highlightStart(title: string) {
  const count = title.split(" ").length;

  return count - Math.max(1, Math.floor(count * 0.4));
}

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const goTo = useCallback((index: number) => {
    if (!heroSlides.length) return;

    setCurrent(
      (index + heroSlides.length) %
        heroSlides.length
    );
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) =>
      (prev + 1) % heroSlides.length
    );
  }, []);

  const previous = useCallback(() => {
    setCurrent((prev) =>
      (prev - 1 + heroSlides.length) %
        heroSlides.length
    );
  }, []);

  useEffect(() => {
    if (heroSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(next, SLIDE_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, [current, next]);

  if (!heroSlides.length) {
    return null;
  }

  const slide = heroSlides[current];

  return (
    <section className="brand-grad relative overflow-hidden pb-40 text-white sm:pb-48">
      {/* Slide image, blended into the gradient */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="pointer-events-none absolute inset-0"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={current === 0}
            sizes="100vw"
            className="object-cover opacity-25 mix-blend-overlay"
          />
        </motion.div>
      </AnimatePresence>

      {/* Soft glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <FloatingBlob
          className="-left-40 top-56 h-[500px] w-[500px]"
          color="bg-cyan-300/40"
          duration={16}
        />

        <FloatingBlob
          className="-right-28 -top-24 h-[420px] w-[420px]"
          color="bg-violet-300/40"
          duration={14}
        />
      </div>

      {/* Fine grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 text-center sm:px-8 sm:pt-20 lg:px-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 backdrop-blur-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
          </span>

          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
            Geecon Technology
          </span>
        </motion.div>

        {/* Heading + description (per slide) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.55,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <AnimatedHeading
              text={slide.title}
              delay={0.05}
              highlightFrom={highlightStart(slide.title)}
              highlightClassName="brand-text-light"
              className="mx-auto mt-7 max-w-5xl text-[42px] font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[80px]"
            />

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-[0_18px_40px_-18px_rgba(15,23,42,.6)] transition-all duration-300 hover:-translate-y-1"
          >
            Explore Our Services
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/35 bg-white/[0.14] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/25"
          >
            Get in Touch
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Slide tabs */}
        {heroSlides.length > 1 && (
          <div className="mx-auto mt-14 flex max-w-4xl items-stretch justify-center gap-3">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous slide"
              className="hidden w-11 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl transition hover:bg-white/20 sm:flex"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="grid flex-1 grid-cols-3 gap-3">
              {heroSlides.map((item, index) => {
                const active = index === current;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`relative overflow-hidden rounded-2xl border px-4 py-3.5 text-left text-[12px] font-bold leading-snug transition-all duration-300 sm:text-[13.5px] ${
                      active
                        ? "border-white bg-white text-slate-900 shadow-[0_18px_40px_-20px_rgba(15,23,42,.6)]"
                        : "border-white/25 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20"
                    }`}
                  >
                    <span className="line-clamp-2">{item.title}</span>

                    <span
                      className={`absolute inset-x-0 bottom-0 h-[3px] ${
                        active ? "bg-slate-100" : "bg-transparent"
                      }`}
                    >
                      {active && (
                        <motion.span
                          key={`progress-${current}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: SLIDE_DURATION / 1000,
                            ease: "linear",
                          }}
                          className="block h-full bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400"
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="hidden w-11 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl transition hover:bg-white/20 sm:flex"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
