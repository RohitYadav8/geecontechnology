"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
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

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 28,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 28,
  });

  const backgroundX = useTransform(
    smoothX,
    (value) => value * 0.018
  );

  const backgroundY = useTransform(
    smoothY,
    (value) => value * 0.018
  );

  const imageX = useTransform(
    smoothX,
    (value) => value * -0.012
  );

  const imageY = useTransform(
    smoothY,
    (value) => value * -0.012
  );

  const spotlight = useTransform(
    [smoothX, smoothY],
    ([x, y]: number[]) =>
      `radial-gradient(500px circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(59,130,246,.22), transparent 70%)`
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (!sectionRef.current) return;

    const rect =
      sectionRef.current.getBoundingClientRect();

    mouseX.set(
      event.clientX -
        rect.left -
        rect.width / 2
    );

    mouseY.set(
      event.clientY -
        rect.top -
        rect.height / 2
    );
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
    if (!mounted || heroSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrent(
        (prev) =>
          (prev + 1) % heroSlides.length
      );
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, [mounted]);

  if (!heroSlides.length) {
    return null;
  }

  const slide = heroSlides[current];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[650px] overflow-hidden bg-[#050914] sm:min-h-[700px] lg:min-h-[760px]"
    >
      {/* Background Gradient */}
      <motion.div
        initial={false}
        animate={{
          backgroundPosition: [
            "0% 0%",
            "100% 100%",
            "0% 0%",
          ],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(at 15% 20%, rgba(37,99,235,.22), transparent 45%), radial-gradient(at 85% 25%, rgba(6,182,212,.16), transparent 42%), radial-gradient(at 50% 85%, rgba(29,78,216,.20), transparent 50%)",
          backgroundSize: "180% 180%",
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Floating Background */}
      <motion.div
        style={{
          x: backgroundX,
          y: backgroundY,
        }}
        className="pointer-events-none absolute inset-0"
      >
        <FloatingBlob
          className="-right-20 top-10 h-80 w-80"
          color="bg-blue-500/20"
          duration={14}
        />

        <FloatingBlob
          className="-bottom-32 left-[24%] h-96 w-96"
          color="bg-cyan-400/15"
          duration={18}
        />

        <FloatingBlob
          className="left-[58%] top-[28%] h-64 w-64"
          color="bg-indigo-500/10"
          duration={12}
        />
      </motion.div>

      {/* Mouse Spotlight */}
      <motion.div
        style={{
          background: spotlight,
        }}
        className="pointer-events-none absolute inset-0 z-[3] opacity-60 mix-blend-screen"
      />

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{
            opacity: 0,
            scale: 1.025,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.015,
          }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <motion.div
            style={{
              x: imageX,
              y: imageY,
            }}
            className="absolute -inset-5"
          >
            <motion.div
              initial={false}
              animate={{
                scale: [1, 1.035, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-full w-full"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={current === 0}
                sizes="100vw"
                className="object-cover opacity-60"
              />
            </motion.div>
          </motion.div>

          {/* Image Overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050914] via-[#050914]/90 to-[#050914]/30" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-[#050914]/20" />

          {/* Content */}
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8 lg:px-10">
            <div className="max-w-[850px]">
              {/* Badge */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.55,
                }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-3.5 py-1.5 backdrop-blur-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>

                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200">
                  Geecon Technology
                </span>
              </motion.div>

              {/* Heading */}
              <AnimatedHeading
                text={slide.title}
                delay={0.2}
                className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-[68px]"
              />

              {/* Decorative Line */}
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.7,
                }}
                className="mt-7 h-[3px] w-20 origin-left rounded-full bg-gradient-to-r from-blue-500 to-cyan-300"
              />

              {/* Description */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.65,
                }}
                className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:text-[17px]"
              >
                {slide.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.75,
                  duration: 0.6,
                }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_40px_-15px_rgba(37,99,235,.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,.9)]"
                >
                  Explore Our Services

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
                >
                  Get in Touch

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Previous / Next */}
      {heroSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/10 text-white backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/10 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/10 text-white backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/10 sm:flex"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slider Progress */}
      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        {heroSlides.map((item, index) => {
          const active = index === current;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`relative h-1.5 overflow-hidden rounded-full bg-white/20 transition-all duration-300 ${
                active
                  ? "w-12"
                  : "w-5 hover:bg-white/40"
              }`}
            >
              {active && (
                <motion.span
                  key={`progress-${current}`}
                  initial={{
                    width: "0%",
                  }}
                  animate={{
                    width: "100%",
                  }}
                  transition={{
                    duration:
                      SLIDE_DURATION / 1000,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}