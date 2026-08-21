"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

import { BackgroundEffects } from "../background-effects";
import { MouseGlow } from "../mouse-glow";

const AUTO_SLIDE_DURATION = 6000;

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  isActive: boolean;
  order: number;
};

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
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>([]);

  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] =
    useState(false);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch(
          "/api/testimonials"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch testimonials"
          );
        }

        const data: Testimonial[] =
          await response.json();

        setTestimonials(data);
      } catch (error) {
        console.error(
          "Testimonials fetch error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (!testimonials.length) return;

      setActive(
        (index + testimonials.length) %
          testimonials.length
      );
    },
    [testimonials.length]
  );

  const next = useCallback(() => {
    goTo(active + 1);
  }, [active, goTo]);

  const previous = useCallback(() => {
    goTo(active - 1);
  }, [active, goTo]);

  useEffect(() => {
    if (
      isPaused ||
      testimonials.length <= 1
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive(
        (current) =>
          (current + 1) %
          testimonials.length
      );
    }, AUTO_SLIDE_DURATION);

    return () =>
      window.clearInterval(timer);
  }, [isPaused, testimonials.length]);

  if (loading || !testimonials.length) {
    return null;
  }

  const testimonial =
    testimonials[active];

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        sm:py-24
        dark:bg-[#060b16]
      "
    >
      <BackgroundEffects />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
          onFocus={() =>
            setIsPaused(true)
          }
          onBlur={() =>
            setIsPaused(false)
          }
        >
          <MouseGlow>
            <AnimatePresence mode="wait">
              <motion.article
                key={testimonial.id}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.98,
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                  scale: 0.98,
                  filter: "blur(5px)",
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-slate-200
                  bg-white/85
                  px-7
                  py-10
                  shadow-[0_30px_100px_-45px_rgba(15,23,42,.4)]
                  backdrop-blur-xl
                  sm:px-12
                  sm:py-12
                  dark:border-white/[0.08]
                  dark:bg-white/[0.035]
                "
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                <Quote
                  size={120}
                  strokeWidth={0.8}
                  className="
                    pointer-events-none
                    absolute
                    -right-8
                    -top-9
                    rotate-6
                    text-blue-500/[0.04]
                    transition-transform
                    duration-500
                    group-hover:rotate-12
                    dark:text-blue-400/[0.08]
                  "
                />

                <div className="flex justify-center gap-1 text-amber-400">
                  {Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                <p
                  className="
                    relative
                    mx-auto
                    mt-7
                    max-w-3xl
                    text-center
                    text-base
                    leading-8
                    text-slate-600
                    sm:text-lg
                    sm:leading-9
                    dark:text-slate-300
                  "
                >
                  &ldquo;
                  {testimonial.quote}
                  &rdquo;
                </p>

                <div className="relative mt-9 flex items-center justify-center gap-4 border-t border-slate-200 pt-7 dark:border-white/[0.08]">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-[#1a2b4a]
                      to-blue-600
                      text-sm
                      font-bold
                      text-white
                      shadow-lg
                      shadow-blue-500/20
                    "
                  >
                    {getInitials(
                      testimonial.name
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">
                      {testimonial.name}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </MouseGlow>

          {testimonials.length > 1 && (
            <>
              <button
                type="button"
                onClick={previous}
                aria-label="Previous testimonial"
                className="
                  absolute
                  left-0
                  top-1/2
                  z-20
                  hidden
                  h-11
                  w-11
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  shadow-lg
                  transition-all
                  hover:-translate-x-[55%]
                  hover:border-blue-400
                  hover:text-blue-600
                  sm:flex
                  dark:border-white/[0.08]
                  dark:bg-[#0b1220]
                  dark:text-slate-300
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="
                  absolute
                  right-0
                  top-1/2
                  z-20
                  hidden
                  h-11
                  w-11
                  translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  shadow-lg
                  transition-all
                  hover:translate-x-[55%]
                  hover:border-blue-400
                  hover:text-blue-600
                  sm:flex
                  dark:border-white/[0.08]
                  dark:bg-[#0b1220]
                  dark:text-slate-300
                "
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map(
              (item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    goTo(index)
                  }
                  aria-label={`Go to testimonial ${
                    index + 1
                  }`}
                  className={`
                    relative
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-slate-200
                    transition-all
                    dark:bg-white/10
                    ${
                      index === active
                        ? "w-12"
                        : "w-4"
                    }
                  `}
                >
                  {index === active && (
                    <motion.span
                      key={`${active}-${isPaused}`}
                      initial={{
                        width: "0%",
                      }}
                      animate={{
                        width: isPaused
                          ? "0%"
                          : "100%",
                      }}
                      transition={{
                        duration: isPaused
                          ? 0
                          : AUTO_SLIDE_DURATION /
                            1000,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                    />
                  )}
                </button>
              )
            )}
          </div>
        )}

        {testimonials.length > 1 && (
          <p className="mt-4 text-center font-mono text-[11px] tracking-wider text-slate-400">
            {String(active + 1).padStart(
              2,
              "0"
            )}{" "}
            /{" "}
            {String(
              testimonials.length
            ).padStart(2, "0")}
          </p>
        )}
      </div>
    </section>
  );
}