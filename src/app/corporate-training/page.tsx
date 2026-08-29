import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { FloatingBlob } from "../../../components/floating-blob";
import { MouseGlow } from "../../../components/mouse-glow";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";

// ---------------------------------------------------------
// Images
// ---------------------------------------------------------

const BANNER_SRC = "/Training.png";

// ---------------------------------------------------------
// Training
// ---------------------------------------------------------

const training = [
  "Customer Service Training",
  "Trainer Training",
  "Skills Development Programmes",
  "Tourism & Hospitality Training",
  "Customised Training Programme Design",
];

// ---------------------------------------------------------
// Consultancy
// ---------------------------------------------------------

const consultancy = [
  "Group Facilitation",
  "Creating a Customer Focused Culture",
  "Service System Development",
  "Mystery Shopping",
  "Training Needs Analysis",
  "Induction Programme Development",
  "HR Strategy & System Development",
  "Tourism Business Development",
  "Innovation Support",
];

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function CorporateTrainingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white dark:bg-[#080e1a]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative flex-1 overflow-hidden">
        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_15%_28%,rgba(124,58,237,0.06),transparent_28%),radial-gradient(circle_at_85%_55%,rgba(59,130,246,0.07),transparent_30%)]
            dark:bg-[radial-gradient(circle_at_15%_28%,rgba(124,58,237,0.08),transparent_28%),radial-gradient(circle_at_85%_55%,rgba(59,130,246,0.08),transparent_30%)]
          "
        />

        {/* =================================================
            FLOATING BLOBS
        ================================================= */}

        <FloatingBlob
          className="-right-28 top-[500px] h-80 w-80"
          color="bg-purple-400/10"
          duration={18}
        />

        <FloatingBlob
          className="-left-28 top-[900px] h-72 w-72"
          color="bg-blue-400/10"
          duration={20}
        />

        {/* =====================================================
            HERO BANNER
        ===================================================== */}

        <section className="relative">
          <AnimateIn delay={0.05}>
            <div
              className="
                relative
                h-[150px]
                w-full
                overflow-hidden
                sm:h-[180px]
                md:h-[210px]
                lg:h-[240px]
              "
            >
              <Image
                src={BANNER_SRC}
                alt="Corporate Training"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_45%]"
              />

              {/* Bottom fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-16
                  bg-gradient-to-t
                  from-white
                  via-white/40
                  to-transparent
                  dark:from-[#080e1a]
                  dark:via-[#080e1a]/35
                "
              />
            </div>
          </AnimateIn>

          {/* =================================================
              TITLE AREA
          ================================================= */}

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
            <AnimateIn delay={0.1}>
              <div className="-mt-7 flex items-center gap-4 sm:-mt-10 sm:gap-5">
                {/* ICON */}

                <div
                  className="
                    flex
                    h-[76px]
                    w-[76px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[24px]
                    border
                    border-purple-200/70
                    bg-white/95
                    text-purple-600
                    shadow-[0_16px_40px_-18px_rgba(124,58,237,0.45)]
                    backdrop-blur-xl
                    dark:border-purple-500/20
                    dark:bg-slate-900/95
                    dark:text-purple-400
                    sm:h-[88px]
                    sm:w-[88px]
                  "
                >
                  <GraduationCap
                    size={34}
                    strokeWidth={1.8}
                  />
                </div>

                {/* HEADING */}

                <h1
                  className="
                    text-2xl
                    font-bold
                    tracking-[-0.04em]
                    text-slate-950
                    dark:text-white
                    sm:text-3xl
                    lg:text-[38px]
                  "
                >
                  Corporate Training
                </h1>
              </div>
            </AnimateIn>

            {/* =================================================
                INTRODUCTION
            ================================================= */}

            <AnimateIn delay={0.15}>
              <p
                className="
                  mt-8
                  max-w-4xl
                  text-sm
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                  sm:text-[15px]
                "
              >
                Our training &amp; consultancy services are designed to assist
                you in the development of a cutting edge workforce so that you
                or your team can excel in today&apos;s competitive environment.
                We offer a wide variety of solutions either on an in-house basis
                or through our open programmes. Courses can be specifically
                tailored to meet your needs or you can choose from our extensive
                range of programmes. If you require support in the following
                areas then you have come to the right place:
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section className="relative px-5 pb-16 pt-10 sm:px-7 sm:pb-20 sm:pt-12 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* =================================================
                SECTION HEADING
            ================================================= */}

            <AnimateIn delay={0.2}>
              <div className="mb-7">
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-purple-600
                    dark:text-purple-400
                    sm:text-[11px]
                  "
                >
                  What We Offer
                </p>

                <h2
                  className="
                    mt-2
                    text-xl
                    font-semibold
                    tracking-[-0.02em]
                    text-slate-950
                    dark:text-white
                    sm:text-2xl
                  "
                >
                  Training &amp; Consultancy
                </h2>
              </div>
            </AnimateIn>

            {/* =================================================
                CARDS
            ================================================= */}

            <div className="grid items-start gap-6 lg:grid-cols-2">
              {/* =================================================
                  TRAINING
              ================================================= */}

              <AnimateIn delay={0.2}>
                <MouseGlow className="h-full rounded-[30px]">
                  <div
                    className="
                      relative
                      h-full
                      overflow-hidden
                      rounded-[30px]
                      border
                      border-blue-100
                      bg-[#f8fbff]/95
                      px-6
                      py-7
                      shadow-[0_20px_70px_-45px_rgba(37,99,235,0.35)]
                      backdrop-blur-xl
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      sm:px-8
                      sm:py-8
                    "
                  >
                    {/* Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-64
                        w-64
                        rounded-full
                        bg-purple-500/[0.05]
                        blur-3xl
                        dark:bg-purple-500/[0.07]
                      "
                    />

                    {/* Header */}

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-purple-100
                            text-purple-600
                            dark:bg-purple-500/10
                            dark:text-purple-400
                          "
                        >
                          <GraduationCap size={21} />
                        </div>

                        <div>
                          <p
                            className="
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.2em]
                              text-slate-400
                            "
                          >
                            Learning
                          </p>

                          <h3
                            className="
                              mt-1
                              text-base
                              font-bold
                              uppercase
                              tracking-wide
                              text-slate-900
                              dark:text-white
                            "
                          >
                            Training
                          </h3>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="text-purple-400"
                      />
                    </div>

                    {/* Divider */}

                    <div className="relative my-5 h-px bg-slate-200/70 dark:bg-white/[0.07]" />

                    {/* Training list */}

                    <StaggerContainer className="relative space-y-3">
                      {training.map((item, index) => (
                        <StaggerItem key={item}>
                          <div
                            className="
                              group
                              flex
                              items-start
                              gap-3
                              rounded-2xl
                              border
                              border-slate-200/70
                              bg-white/80
                              px-4
                              py-3.5
                              transition-all
                              duration-300
                              hover:-translate-y-0.5
                              hover:border-purple-200
                              hover:shadow-md
                              dark:border-white/[0.06]
                              dark:bg-white/[0.025]
                              dark:hover:border-purple-500/20
                            "
                          >
                            <span
                              className="
                                mt-0.5
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-gradient-to-br
                                from-purple-500/10
                                to-blue-500/10
                                text-[10px]
                                font-semibold
                                text-purple-600
                                dark:text-purple-400
                              "
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                              {item}
                            </span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </MouseGlow>
              </AnimateIn>

              {/* =================================================
                  CONSULTANCY
              ================================================= */}

              <AnimateIn delay={0.25}>
                <MouseGlow className="h-full rounded-[30px]">
                  <div
                    className="
                      relative
                      h-full
                      overflow-hidden
                      rounded-[30px]
                      border
                      border-blue-100
                      bg-[#f8fbff]/95
                      px-6
                      py-7
                      shadow-[0_20px_70px_-45px_rgba(37,99,235,0.35)]
                      backdrop-blur-xl
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      sm:px-8
                      sm:py-8
                    "
                  >
                    {/* Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-64
                        w-64
                        rounded-full
                        bg-blue-500/[0.05]
                        blur-3xl
                        dark:bg-blue-500/[0.07]
                      "
                    />

                    {/* Header */}

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-100
                            text-blue-600
                            dark:bg-blue-500/10
                            dark:text-blue-400
                          "
                        >
                          <Briefcase size={21} />
                        </div>

                        <div>
                          <p
                            className="
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.2em]
                              text-slate-400
                            "
                          >
                            Business
                          </p>

                          <h3
                            className="
                              mt-1
                              text-base
                              font-bold
                              uppercase
                              tracking-wide
                              text-slate-900
                              dark:text-white
                            "
                          >
                            Consultancy
                          </h3>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="text-blue-400"
                      />
                    </div>

                    {/* Divider */}

                    <div className="relative my-5 h-px bg-slate-200/70 dark:bg-white/[0.07]" />

                    {/* Consultancy list */}

                    <StaggerContainer className="relative space-y-3">
                      {consultancy.map((item, index) => (
                        <StaggerItem key={item}>
                          <div
                            className="
                              group
                              flex
                              items-start
                              gap-3
                              rounded-2xl
                              border
                              border-slate-200/70
                              bg-white/80
                              px-4
                              py-3.5
                              transition-all
                              duration-300
                              hover:-translate-y-0.5
                              hover:border-blue-200
                              hover:shadow-md
                              dark:border-white/[0.06]
                              dark:bg-white/[0.025]
                              dark:hover:border-blue-500/20
                            "
                          >
                            <span
                              className="
                                mt-0.5
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-gradient-to-br
                                from-blue-500/10
                                to-cyan-500/10
                                text-[10px]
                                font-semibold
                                text-blue-600
                                dark:text-blue-400
                              "
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                              {item}
                            </span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </MouseGlow>
              </AnimateIn>
            </div>

            {/* =================================================
                BOTTOM EXISTING MESSAGE
            ================================================= */}

            <AnimateIn delay={0.3}>
              <MouseGlow className="mt-8 rounded-[30px]">
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    bg-gradient-to-br
                    from-[#7c3aed]
                    via-[#6d28d9]
                    to-[#4c1d95]
                    px-6
                    py-7
                    shadow-[0_28px_70px_-35px_rgba(109,40,217,0.7)]
                    sm:px-8
                    sm:py-8
                  "
                >
                  {/* Decoration */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-56
                      w-56
                      rounded-full
                      bg-white/15
                      blur-3xl
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-24
                      -left-20
                      h-56
                      w-56
                      rounded-full
                      bg-blue-400/15
                      blur-3xl
                    "
                  />

                  <div className="relative">
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-purple-100
                      "
                    >
                      Build Better Teams
                    </p>

                    <h3
                      className="
                        mt-2
                        text-lg
                        font-semibold
                        text-white
                      "
                    >
                      Empower your workforce with the right skills and
                      strategies.
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-2xl
                        text-sm
                        leading-6
                        text-purple-100/80
                      "
                    >
                      Our customised training and consultancy programmes are
                      designed around your organisation&apos;s goals, people and
                      challenges.
                    </p>
                  </div>
                </div>
              </MouseGlow>
            </AnimateIn>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </div>
  );
}