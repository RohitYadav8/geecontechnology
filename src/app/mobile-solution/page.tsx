import Image from "next/image";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";

import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { MouseGlow } from "../../../components/mouse-glow";
import { TiltCard } from "../../../components/tilt-card";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";

// ---------------------------------------------------------
// Images
// ---------------------------------------------------------

const BANNER_SRC = "/mobile-solution-3.png";
const PHONE_ICON_SRC = "/mobile-solution-service.png";

// ---------------------------------------------------------
// Benefits
// ---------------------------------------------------------

const benefits = [
  "Accelerated Solutions: decrease time-to-market through facilitated collaboration",
  "Flexibility and Versatility: through incremental and modular delivery",
  "Cost Effectiveness: a per-device-payment model for better cash flow",
  "Scale and Reach: end-to-end service and delivery",
];

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function MobileSolutionPage() {
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
            BACKGROUND GRID
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
            bg-[size:52px_52px]
            opacity-[0.12]
            dark:opacity-[0.035]
          "
        />

        {/* =================================================
            BACKGROUND GLOW
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_12%_10%,rgba(59,130,246,.12),transparent_32%),radial-gradient(circle_at_88%_38%,rgba(14,165,233,.08),transparent_32%)]
          "
        />

        {/* =================================================
            FLOATING BLOBS
        ================================================= */}

        <FloatingBlob
          className="-right-24 top-16 h-80 w-80"
          color="bg-blue-400/10"
          duration={16}
        />

        <FloatingBlob
          className="-left-24 top-[720px] h-72 w-72"
          color="bg-cyan-300/10"
          duration={20}
        />

        <FloatingBlob
          className="right-1/4 top-[1050px] h-52 w-52"
          color="bg-purple-400/5"
          duration={18}
        />

        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <section className="relative px-5 pb-10 pt-12 sm:px-7 sm:pt-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* =================================================
                HEADING
            ================================================= */}

            <AnimateIn delay={0.05}>
              <div className="mb-7">
                <AnimatedHeading
                  text="Mobile Solution"
                  as="h1"
                  className="
                    text-3xl
                    font-semibold
                    tracking-[-0.04em]
                    text-slate-950
                    dark:text-white
                    sm:text-4xl
                    lg:text-5xl
                  "
                />

                <span
                  className="
                    mt-4
                    block
                    h-[3px]
                    w-12
                    rounded-full
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-400
                  "
                />
              </div>
            </AnimateIn>

            {/* =================================================
                MOBILE BANNER
            ================================================= */}

            <AnimateIn delay={0.1}>
              <MouseGlow className="rounded-[24px]">
                <div
                  className="
                    relative
                    w-full
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-slate-200/80
                    bg-white
                    shadow-[0_24px_70px_-35px_rgba(15,23,42,.38)]
                    dark:border-white/[0.08]
                    dark:bg-slate-900
                  "
                >
                  <Image
                    src={BANNER_SRC}
                    alt="Mobile Solution"
                    width={1024}
                    height={768}
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
                    className="
                      block
                      h-auto
                      w-full
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-[24px]
                      ring-1
                      ring-inset
                      ring-white/10
                    "
                  />
                </div>
              </MouseGlow>
            </AnimateIn>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <section className="relative px-5 py-12 sm:px-7 sm:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div
              className="
                grid
                items-start
                gap-8
                lg:grid-cols-[minmax(0,1fr)_320px]
                xl:gap-12
              "
            >
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <AnimateIn delay={0.15}>
                <MouseGlow className="h-full rounded-[26px]">
                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-[26px]
                      border
                      border-slate-200/80
                      bg-white/85
                      p-6
                      shadow-sm
                      backdrop-blur-xl
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      sm:p-8
                      lg:p-9
                    "
                  >
                    {/* Left accent */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        top-0
                        w-[3px]
                        bg-gradient-to-b
                        from-blue-600
                        via-cyan-400
                        to-indigo-500
                      "
                    />

                    {/* Soft decoration */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -left-24
                        -top-24
                        h-64
                        w-64
                        rounded-full
                        bg-blue-500/[0.05]
                        blur-3xl
                      "
                    />

                    <StaggerContainer
                      className="
                        relative
                        space-y-7
                        text-sm
                        leading-8
                        text-slate-600
                        dark:text-slate-400
                        sm:text-[15px]
                      "
                    >
                      {/* INTRODUCTION */}

                      <StaggerItem>
                        <p>
                          Mobile solutions have become central to the way
                          enterprises conduct their business, enabling customers
                          and employees to be always-on and even powering the
                          next wave of connected services — the Internet of
                          Things.
                        </p>
                      </StaggerItem>

                      {/* BUSINESS ADVANTAGE HEADING */}

                      <StaggerItem>
                        <p className="text-base font-semibold text-slate-900 dark:text-white">
                          From Mobile Opportunity to Business Advantage
                        </p>
                      </StaggerItem>

                      {/* BUSINESS ADVANTAGE */}

                      <StaggerItem>
                        <p>
                          We help enterprises harness mobile opportunities with
                          customers, from marketing campaigns to sales
                          transactions and customer service. A coherent
                          &ldquo;B2C&rdquo; mobile strategy and execution
                          creates opportunities to build brand awareness,
                          enhance services, develop a fuller understanding of
                          customer needs and reach new customers.
                        </p>
                      </StaggerItem>

                      {/* EMPLOYEE MOBILITY */}

                      <StaggerItem>
                        <p>
                          Employees today want mobile solutions that enable them
                          to be always connected to any device in any location.
                          Enterprise mobility results in accelerated processes,
                          more flexible working practices, greater employee
                          productivity and a workforce proud of its tools. We
                          help clients with their &ldquo;B2E&rdquo; strategies
                          to unleash and manage their employees&apos; potential.
                        </p>
                      </StaggerItem>

                      {/* BENEFITS HEADING */}

                      <StaggerItem>
                        <p className="text-base font-semibold text-slate-900 dark:text-white">
                          Your Benefits
                        </p>
                      </StaggerItem>

                      {/* BENEFITS LIST */}

                      <StaggerItem>
                        <ul className="space-y-3">
                          {benefits.map((item, index) => (
                            <li
                              key={item}
                              className="
                                group
                                flex
                                gap-4
                                rounded-2xl
                                border
                                border-slate-200/70
                                bg-slate-50/70
                                p-4
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:border-blue-200
                                hover:bg-white
                                hover:shadow-md
                                dark:border-white/[0.06]
                                dark:bg-white/[0.025]
                                dark:hover:border-blue-500/20
                                dark:hover:bg-white/[0.045]
                              "
                            >
                              <span
                                className="
                                  mt-0.5
                                  flex
                                  h-8
                                  w-8
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-blue-500/10
                                  font-mono
                                  text-[10px]
                                  font-semibold
                                  text-blue-600
                                  transition-all
                                  duration-300
                                  group-hover:bg-blue-600
                                  group-hover:text-white
                                  dark:text-blue-400
                                  dark:group-hover:text-white
                                "
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <span className="flex-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </StaggerItem>

                      {/* MOBILE DEVELOPMENT */}

                      <StaggerItem>
                        <p>
                          Geecon offers design and development services for
                          mobile apps. Based on your requirements we produce
                          apps which can be standalone or integrate with other
                          data sources using secure management systems. Our
                          mobile application development allows for apps to be
                          output for native iOS and Android platforms.
                        </p>
                      </StaggerItem>

                      {/* APP EXPERIENCE */}

                      <StaggerItem>
                        <p>
                          At Geecon all mobile apps are developed to deliver
                          content and functionality to users through an intuitive
                          and optimised interface. Our team of experts will work
                          with you to ensure the latest smartphone features are
                          integrated with your mobile app.
                        </p>
                      </StaggerItem>

                      {/* TEAM */}

                      <StaggerItem>
                        <p>
                          Partner with a group of thinkers, makers, code ninjas
                          and problem solvers that believe in building software
                          products that have real purpose.
                        </p>
                      </StaggerItem>

                      {/* FINAL CONTENT */}

                      <StaggerItem>
                        <p>
                          We build custom software products that drive revenue
                          and provide seamless customer experiences for your
                          business.
                        </p>
                      </StaggerItem>
                    </StaggerContainer>
                  </div>
                </MouseGlow>
              </AnimateIn>

              {/* =================================================
                  RIGHT IMAGE
              ================================================= */}

              <AnimateIn
                delay={0.2}
                direction="left"
                className="
                  lg:sticky
                  lg:top-24
                  lg:self-start
                "
              >
                <TiltCard>
                  <MouseGlow className="rounded-[26px]">
                    <div
                      className="
                        relative
                        overflow-hidden
                        rounded-[26px]
                        border
                        border-slate-200/80
                        bg-white
                        p-5
                        shadow-[0_20px_60px_-35px_rgba(15,23,42,.5)]
                        dark:border-white/[0.07]
                        dark:bg-slate-900
                      "
                    >
                      {/* Decorative glow */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-1/2
                          top-1/2
                          h-56
                          w-56
                          -translate-x-1/2
                          -translate-y-1/2
                          rounded-full
                          bg-blue-500/10
                          blur-3xl
                        "
                      />

                      <div className="relative aspect-square w-full">
                        <Image
                          src={PHONE_ICON_SRC}
                          alt="Mobile applications"
                          fill
                          sizes="320px"
                          className="
                            relative
                            z-[1]
                            object-contain
                          "
                        />
                      </div>
                    </div>
                  </MouseGlow>
                </TiltCard>
              </AnimateIn>
            </div>

            {/* =================================================
                BOTTOM HIGHLIGHT CARDS
            ================================================= */}

            <AnimateIn delay={0.3}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 01 */}

                <MouseGlow className="rounded-2xl">
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200/80
                      bg-white/85
                      p-5
                      shadow-sm
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-blue-200
                      hover:shadow-xl
                      hover:shadow-blue-500/5
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      dark:hover:border-blue-500/20
                    "
                  >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      01
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Faster Solutions
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Accelerate your mobile product development and
                      time-to-market.
                    </p>
                  </div>
                </MouseGlow>

                {/* Card 02 */}

                <MouseGlow className="rounded-2xl">
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200/80
                      bg-white/85
                      p-5
                      shadow-sm
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-purple-200
                      hover:shadow-xl
                      hover:shadow-purple-500/5
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      dark:hover:border-purple-500/20
                    "
                  >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
                      02
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Flexible Apps
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Build modular and flexible mobile applications for your
                      business.
                    </p>
                  </div>
                </MouseGlow>

                {/* Card 03 */}

                <MouseGlow className="rounded-2xl">
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200/80
                      bg-white/85
                      p-5
                      shadow-sm
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-cyan-200
                      hover:shadow-xl
                      hover:shadow-cyan-500/5
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      dark:hover:border-cyan-500/20
                    "
                  >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      03
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Native Platforms
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Optimised applications for modern iOS and Android devices.
                    </p>
                  </div>
                </MouseGlow>

                

                <MouseGlow className="rounded-2xl">
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200/80
                      bg-white/85
                      p-5
                      shadow-sm
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-indigo-200
                      hover:shadow-xl
                      hover:shadow-indigo-500/5
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      dark:hover:border-indigo-500/20
                    "
                  >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      04
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Better Experience
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Deliver seamless and intuitive experiences to your
                      customers.
                    </p>
                  </div>
                </MouseGlow>
              </div>
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