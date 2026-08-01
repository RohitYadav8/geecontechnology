"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { testimonials } from "../../lib/home-data";
import { AnimateIn } from "../../components/animate-in";

const AUTO_SLIDE_DURATION = 6000;

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    if (testimonials.length === 0) return;

    setActive((index + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => {
    goTo(active + 1);
  }, [active, goTo]);

  const previous = useCallback(() => {
    goTo(active - 1);
  }, [active, goTo]);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, AUTO_SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  if (!testimonials.length) {
    return null;
  }

  const testimonial = testimonials[active];

  return (
    <section
      className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/40 sm:py-20"
      aria-label="Client testimonials"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-500/10" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full border border-blue-500/10" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full border border-cyan-500/10" />

      <div className="relative mx-auto max-w-7xl px-6">
       
        {/* Testimonial Area */}
        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Previous Button */}
          {testimonials.length > 1 && (
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-all duration-300 hover:-translate-x-6 hover:border-blue-400 hover:text-blue-600 sm:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <span className="text-lg">‹</span>
            </button>
          )}

          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.article
              key={testimonial.id}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.97,
                filter: "blur(6px)",
              }}
              transition={{
                duration: 0.55,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-7 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-10 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30"
            >
              {/* Top Gradient Line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600" />

              {/* Quote Icon */}
              <Quote
                size={90}
                strokeWidth={1}
                className="pointer-events-none absolute -right-5 -top-5 rotate-6 text-blue-500/5 transition-transform duration-500 group-hover:rotate-12 dark:text-blue-400/10"
              />

              {/* Rating */}
              <div
                className="relative flex justify-center gap-1 text-amber-400"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="relative mx-auto mt-7 max-w-2xl text-center text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-9">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Client */}
              <div className="relative mt-8 flex items-center justify-center gap-4 border-t border-slate-200/70 pt-7 dark:border-white/10">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1a2b4a] to-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                  {getInitials(testimonial.name)}
                </div>

                {/* Client Info */}
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Next Button */}
          {testimonials.length > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 translate-x-5 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-all duration-300 hover:translate-x-6 hover:border-blue-400 hover:text-blue-600 sm:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <span className="text-lg">›</span>
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {testimonials.length > 1 && (
          <div className="mt-8 flex justify-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              ›
            </button>
          </div>
        )}

        {/* Progress Indicators */}
        {testimonials.length > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
                  index === active
                    ? "w-10 bg-slate-300 dark:bg-slate-700"
                    : "w-2 bg-slate-300 hover:bg-blue-400 dark:bg-slate-700 dark:hover:bg-blue-500"
                }`}
              >
                {index === active && (
                  <motion.span
                    key={`${active}-${isPaused}`}
                    initial={{ width: "0%" }}
                    animate={{
                      width: isPaused ? "0%" : "100%",
                    }}
                    transition={{
                      duration: isPaused
                        ? 0
                        : AUTO_SLIDE_DURATION / 1000,
                      ease: "linear",
                    }}
                    className="absolute inset-y-0 left-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        
        {testimonials.length > 1 && (
          <p className="mt-4 text-center text-xs font-medium tracking-wider text-slate-400 dark:text-slate-500">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </p>
        )}
      </div>
    </section>
  );
}