"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../lib/home-data";
import { AnimatedHeading } from "../../components/animated-heading";
import { GlowButton } from "../../components/glow-button";
import { FloatingBlob } from "../../components/floating-blob";

const SLIDE_DURATION = 6000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  const parallaxBgX = useSpring(useTransform(mouseX, (v) => v * 0.02), { stiffness: 60, damping: 20 });
  const parallaxBgY = useSpring(useTransform(mouseY, (v) => v * 0.02), { stiffness: 60, damping: 20 });
  const parallaxImgX = useSpring(useTransform(mouseX, (v) => v * -0.015), { stiffness: 80, damping: 20 });
  const parallaxImgY = useSpring(useTransform(mouseY, (v) => v * -0.015), { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const goTo = useCallback((index: number) => {
    setCurrent((index + heroSlides.length) % heroSlides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-[460px] w-full overflow-hidden bg-[#070c1a] sm:h-[520px] lg:h-[600px]"
    >
      {/* Layer 1: mesh gradient background */}
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(at 20% 20%, rgba(59,130,246,0.25) 0px, transparent 50%), radial-gradient(at 80% 30%, rgba(56,189,248,0.2) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(30,64,175,0.3) 0px, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
        className="absolute inset-0"
      />

      {/* Layer 2: noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layer 3: floating glow blobs (parallax on mouse) */}
      <motion.div style={{ x: parallaxBgX, y: parallaxBgY }} className="absolute inset-0">
        <FloatingBlob className="-right-16 top-0 h-72 w-72" color="bg-blue-500/20" duration={12} />
        <FloatingBlob className="-bottom-24 left-1/4 h-80 w-80" color="bg-cyan-400/15" duration={16} />
        <FloatingBlob className="left-1/2 top-1/3 h-56 w-56" color="bg-indigo-400/10" duration={10} />
      </motion.div>

      {/* Layer 4: mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]: number[]) =>
              `radial-gradient(400px circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(59,130,246,0.25), transparent 70%)`
          ),
        }}
      />

      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/60"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 20}%` }}
        />
      ))}

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ x: parallaxImgX, y: parallaxImgY }}
            className="absolute inset-0 -m-6"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1.02, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={current === 0}
                className="object-cover opacity-70"
              />
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#070c1a] via-[#070c1a]/70 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
            >
              Geecon Technology
            </motion.span>

            <AnimatedHeading
              text={slide.title}
              delay={0.1}
              className="max-w-lg text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-4 max-w-md text-sm text-slate-300 sm:text-base"
            >
              {slide.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <GlowButton variant="primary">Get Started</GlowButton>
              <GlowButton variant="outline">Our Services</GlowButton>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        onClick={prev}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        <ChevronLeft size={22} />
      </motion.button>
      <motion.button
        onClick={next}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        <ChevronRight size={22} />
      </motion.button>

      {/* Linear auto progress bar (replaces dots) */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="h-1 w-10 overflow-hidden rounded-full bg-white/20"
          >
            {index === current && (
              <motion.div
                key={current}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                className="h-full bg-white"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}