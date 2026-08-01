"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { heroSlides } from "../../lib/home-data";
import { AnimatedHeading } from "../../components/animated-heading";
import { GlowButton } from "../../components/glow-button";
import { FloatingBlob } from "../../components/floating-blob";

const SLIDE_DURATION = 6000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);

  /* -------------------------------------------------------
     Mouse position
  ------------------------------------------------------- */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* -------------------------------------------------------
     Smooth mouse values
  ------------------------------------------------------- */

  const spotlightX = useSpring(mouseX, {
    stiffness: 150,
    damping: 30,
  });

  const spotlightY = useSpring(mouseY, {
    stiffness: 150,
    damping: 30,
  });

  /* -------------------------------------------------------
     Background parallax
  ------------------------------------------------------- */

  const backgroundX = useTransform(
    mouseX,
    (value) => value * 0.02
  );

  const backgroundY = useTransform(
    mouseY,
    (value) => value * 0.02
  );

  const parallaxBgX = useSpring(backgroundX, {
    stiffness: 60,
    damping: 20,
  });

  const parallaxBgY = useSpring(backgroundY, {
    stiffness: 60,
    damping: 20,
  });

  /* -------------------------------------------------------
     Image parallax
  ------------------------------------------------------- */

  const imageX = useTransform(
    mouseX,
    (value) => value * -0.015
  );

  const imageY = useTransform(
    mouseY,
    (value) => value * -0.015
  );

  const parallaxImgX = useSpring(imageX, {
    stiffness: 80,
    damping: 20,
  });

  const parallaxImgY = useSpring(imageY, {
    stiffness: 80,
    damping: 20,
  });

  /* -------------------------------------------------------
     Mouse move
  ------------------------------------------------------- */

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (!sectionRef.current) return;

    const rect =
      sectionRef.current.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  /* -------------------------------------------------------
     Reset mouse position
  ------------------------------------------------------- */

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /* -------------------------------------------------------
     Slide navigation
  ------------------------------------------------------- */

  const goTo = useCallback(
    (index: number) => {
      if (!heroSlides.length) return;

      setCurrent(
        (index + heroSlides.length) %
          heroSlides.length
      );
    },
    []
  );

  const next = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  /* -------------------------------------------------------
     Auto slide
  ------------------------------------------------------- */

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((previous) =>
        (previous + 1) % heroSlides.length
      );
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  /* -------------------------------------------------------
     Empty state
  ------------------------------------------------------- */

  if (!heroSlides.length) {
    return null;
  }

  const slide = heroSlides[current];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        h-[460px]
        w-full
        overflow-hidden
        bg-[#070c1a]
        sm:h-[520px]
        lg:h-[600px]
      "
    >
      {/* ===================================================
          BACKGROUND
      ==================================================== */}

      <motion.div
        animate={{
          backgroundPosition: [
            "0% 0%",
            "100% 100%",
            "0% 0%",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(at 20% 20%, rgba(59,130,246,0.25) 0px, transparent 50%), radial-gradient(at 80% 30%, rgba(56,189,248,0.20) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(30,64,175,0.30) 0px, transparent 50%)",

          backgroundSize: "200% 200%",
        }}
        className="
          pointer-events-none
          absolute
          inset-0
        "
      />

      {/* ===================================================
          GRID
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.08]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ===================================================
          NOISE TEXTURE
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ===================================================
          FLOATING BLOBS
      ==================================================== */}

      <motion.div
        style={{
          x: parallaxBgX,
          y: parallaxBgY,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        <FloatingBlob
          className="
            -right-16
            top-0
            h-72
            w-72
          "
          color="bg-blue-500/20"
          duration={12}
        />

        <FloatingBlob
          className="
            -bottom-24
            left-1/4
            h-80
            w-80
          "
          color="bg-cyan-400/15"
          duration={16}
        />

        <FloatingBlob
          className="
            left-1/2
            top-1/3
            h-56
            w-56
          "
          color="bg-indigo-400/10"
          duration={10}
        />
      </motion.div>

      {/* ===================================================
          MOUSE SPOTLIGHT
      ==================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          opacity-50
          mix-blend-screen
        "
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]: number[]) =>
              `radial-gradient(
                420px circle at
                calc(50% + ${x}px)
                calc(50% + ${y}px),
                rgba(59,130,246,0.25),
                transparent 70%
              )`
          ),
        }}
      />

      {/* ===================================================
          PARTICLES
      ==================================================== */}

      {[...Array(10)].map((_, index) => {
        const positions = [
          { left: "10%", top: "20%" },
          { left: "20%", top: "65%" },
          { left: "32%", top: "30%" },
          { left: "45%", top: "75%" },
          { left: "55%", top: "18%" },
          { left: "66%", top: "50%" },
          { left: "75%", top: "25%" },
          { left: "82%", top: "70%" },
          { left: "90%", top: "40%" },
          { left: "38%", top: "55%" },
        ];

        return (
          <motion.span
            key={index}
            animate={{
              y: [0, -18, 0],
              opacity: [0.15, 0.8, 0.15],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
            className="
              pointer-events-none
              absolute
              z-[3]
              h-1
              w-1
              rounded-full
              bg-white
            "
            style={positions[index]}
          />
        );
      })}

      {/* ===================================================
          SLIDE
      ==================================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{
            opacity: 0,
            scale: 1.03,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="
            absolute
            inset-0
          "
        >
          {/* =================================================
              IMAGE PARALLAX
          ================================================== */}

          <motion.div
            style={{
              x: parallaxImgX,
              y: parallaxImgY,
            }}
            className="
              absolute
              -inset-6
            "
          >
            <motion.div
              animate={{
                scale: [
                  1,
                  1.04,
                  1.02,
                  1,
                ],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                h-full
                w-full
              "
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={current === 0}
                sizes="
                  100vw
                "
                className="
                  object-cover
                  opacity-65
                "
              />
            </motion.div>
          </motion.div>

          {/* =================================================
              IMAGE OVERLAY
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-[#070c1a]
              via-[#070c1a]/80
              to-[#070c1a]/20
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-[#070c1a]
              via-transparent
              to-transparent
            "
          />

          {/* =================================================
              CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              h-full
              max-w-7xl
              flex-col
              justify-center
              px-6
            "
          >
            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="
                mb-4
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-blue-400/30
                bg-blue-500/10
                px-4
                py-1.5
                text-xs
                font-medium
                text-blue-300
                backdrop-blur-md
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-blue-400
                "
              />

              Geecon Technology
            </motion.div>

          

            <AnimatedHeading
              text={slide.title}
              delay={0.2}
              className="
                max-w-2xl
                text-3xl
                font-semibold
                leading-[1.08]
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-6xl
              "
            />

          

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.7,
                delay: 0.55,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-slate-300
                sm:text-base
              "
            >
              {slide.description}
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.8,
              }}
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <GlowButton variant="primary">
                Get Started
              </GlowButton>

              <GlowButton variant="outline">
                Our Services
              </GlowButton>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ===================================================
          PREVIOUS BUTTON
      ==================================================== */}

      <motion.button
        type="button"
        onClick={prev}
        whileHover={{
          scale: 1.12,
          x: -2,
        }}
        whileTap={{
          scale: 0.9,
        }}
        aria-label="Previous slide"
        className="
          absolute
          left-3
          top-1/2
          z-30
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-white/10
          text-white
          backdrop-blur-md
          transition-all
          duration-300
          hover:border-white/20
          hover:bg-white/20
          sm:left-5
          sm:h-11
          sm:w-11
        "
      >
        <ChevronLeft size={21} />
      </motion.button>

      {/* ===================================================
          NEXT BUTTON
      ==================================================== */}

      <motion.button
        type="button"
        onClick={next}
        whileHover={{
          scale: 1.12,
          x: 2,
        }}
        whileTap={{
          scale: 0.9,
        }}
        aria-label="Next slide"
        className="
          absolute
          right-3
          top-1/2
          z-30
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-white/10
          text-white
          backdrop-blur-md
          transition-all
          duration-300
          hover:border-white/20
          hover:bg-white/20
          sm:right-5
          sm:h-11
          sm:w-11
        "
      >
        <ChevronRight size={21} />
      </motion.button>

      {/* ===================================================
          SLIDE PROGRESS
      ==================================================== */}

      <div
        className="
          absolute
          bottom-6
          left-1/2
          z-30
          flex
          -translate-x-1/2
          items-center
          gap-2
        "
      >
        {heroSlides.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="
              relative
              h-1
              w-8
              overflow-hidden
              rounded-full
              bg-white/20
              transition-all
              duration-300
              hover:bg-white/40
              sm:w-10
            "
          >
            {index === current && (
              <motion.div
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
                className="
                  absolute
                  inset-y-0
                  left-0
                  rounded-full
                  bg-white
                "
              />
            )}
          </button>
        ))}
      </div>

      {/* ===================================================
          BOTTOM DECORATION
      ==================================================== */}

      <motion.div
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        animate={{
          scaleX: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.5,
        }}
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-px
          origin-left
          bg-gradient-to-r
          from-transparent
          via-blue-400/50
          to-transparent
        "
      />
    </section>
  );
}