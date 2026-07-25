"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { testimonials } from "../../lib/home-data";
import { AnimateIn } from "../../components/animate-in";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

const AUTO_SLIDE_DURATION = 6000;

export function Testimonials() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive((index + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goTo(active + 1), AUTO_SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [active, goTo]);

  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/40">
      {/* Ambient glow behind card */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <AnimateIn className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#1a2b4a] dark:text-blue-400">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
            Clients testimonial
          </h2>
        </AnimateIn>

        <div className="relative mx-auto mt-14 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50 dark:shadow-black/30 sm:p-10"
            >
              <Quote
                size={72}
                strokeWidth={1}
                className="absolute -right-3 -top-3 text-[#1a2b4a]/5 dark:text-blue-400/10"
              />

              <div className="relative flex justify-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="relative mt-6 text-center text-base leading-8 text-slate-600 dark:text-slate-300">
                {t.quote}
              </p>

              <div className="relative mt-7 flex items-center justify-center gap-3 border-t border-slate-200/60 pt-6 dark:border-white/10">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a2b4a]/10 text-sm font-semibold text-[#1a2b4a] dark:bg-blue-500/10 dark:text-blue-400">
                  {getInitials(t.name)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Verified client</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Testimonial ${index + 1}`}
              className="h-2 overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700"
              style={{ width: index === active ? 24 : 8 }}
            >
              {index === active && (
                <motion.div
                  key={active}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTO_SLIDE_DURATION / 1000, ease: "linear" }}
                  className="h-full bg-[#1a2b4a] dark:bg-white"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}