import Image from "next/image";

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
      h-[140px]
      w-full
      overflow-hidden
      sm:h-[170px]
      md:h-[200px]
      lg:h-[220px]
    "
  >
    <Image
      src={BANNER_SRC}
      alt="Mobile Solution"
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />

    {/* Soft fade at bottom */}
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
                    p-3
                    shadow-[0_16px_40px_-18px_rgba(124,58,237,0.45)]
                    backdrop-blur-xl
                    dark:border-purple-500/20
                    dark:bg-slate-900/95
                    sm:h-[88px]
                    sm:w-[88px]
                  "
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={PHONE_ICON_SRC}
                      alt="Mobile applications"
                      fill
                      sizes="88px"
                      className="object-contain"
                    />
                  </div>
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
                  Mobile Solution
                </h1>
              </div>
            </AnimateIn>

            {/* INTRO */}

            <AnimateIn delay={0.15}>
              <p
                className="
                  mt-8
                  max-w-3xl
                  text-sm
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                  sm:text-[15px]
                "
              >
                Mobile solutions have become central to the way enterprises
                conduct their business, enabling customers and employees to be
                always-on and even powering the next wave of connected services
                — the Internet of Things.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <section className="relative px-5 pb-14 pt-10 sm:px-7 sm:pb-16 sm:pt-12 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div
              className="
                grid
                items-start
                gap-6
                lg:grid-cols-[minmax(0,1fr)_320px]
                xl:grid-cols-[minmax(0,1fr)_340px]
                xl:gap-8
              "
            >
              {/* =================================================
                  LEFT CONTENT CARD
              ================================================= */}

              <AnimateIn delay={0.15}>
                <MouseGlow className="rounded-[30px]">
                  <div
                    className="
                      relative
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
                      lg:px-9
                    "
                  >
                    {/* Decorative background */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-64
                        w-64
                        rounded-full
                        bg-purple-500/[0.045]
                        blur-3xl
                        dark:bg-purple-500/[0.07]
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -bottom-28
                        left-1/4
                        h-72
                        w-72
                        rounded-full
                        bg-blue-500/[0.045]
                        blur-3xl
                        dark:bg-blue-500/[0.06]
                      "
                    />

                    <StaggerContainer
                      className="
                        relative
                        space-y-6
                        text-[13px]
                        leading-7
                        text-slate-600
                        dark:text-slate-400
                        sm:text-sm
                      "
                    >
                      {/* BUSINESS ADVANTAGE HEADING */}

                      <StaggerItem>
                        <div className="flex items-center gap-3">
                          <span
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-xl
                              bg-purple-100
                              text-purple-600
                              dark:bg-purple-500/10
                              dark:text-purple-400
                            "
                          >
                            <span className="h-2 w-2 rounded-full bg-current" />
                          </span>

                          <p className="text-[15px] font-semibold text-slate-900 dark:text-white">
                            From Mobile Opportunity to Business Advantage
                          </p>
                        </div>
                      </StaggerItem>

                      {/* BUSINESS ADVANTAGE */}

                      <StaggerItem>
                        <p>
                          We help enterprises harness mobile opportunities with
                          customers, from marketing campaigns to sales
                          transactions and customer service. A coherent
                          &ldquo;B2C&rdquo; mobile strategy and execution creates
                          opportunities to build brand awareness, enhance
                          services, develop a fuller understanding of customer
                          needs and reach new customers.
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
                          help clients with their &ldquo;B2E&rdquo; strategies to
                          unleash and manage their employees&apos; potential.
                        </p>
                      </StaggerItem>

                      {/* BENEFITS */}

                      <StaggerItem>
                        <div className="pt-1">
                          <p className="mb-4 text-[15px] font-semibold text-slate-900 dark:text-white">
                            Your Benefits
                          </p>

                          <ul className="space-y-3">
                            {benefits.map((item, index) => (
                              <li
                                key={item}
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

                                <span className="flex-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </StaggerItem>

                      {/* MOBILE DEVELOPMENT */}

                      <StaggerItem>
                        <p>
                          Geecon offers design and development services for
                          mobile apps. Based on your requirements we produce apps
                          which can be standalone or integrate with other data
                          sources using secure management systems. Our mobile
                          application development allows for apps to be output
                          for native iOS and Android platforms.
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

                      {/* FINAL */}

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
                  RIGHT MOBILE IMAGE CARD
              ================================================= */}

              <AnimateIn
                delay={0.2}
                direction="left"
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <MouseGlow className="rounded-[30px]">
                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-[30px]
                      bg-gradient-to-br
                      from-[#7c3aed]
                      via-[#6d28d9]
                      to-[#4c1d95]
                      p-6
                      shadow-[0_28px_70px_-35px_rgba(109,40,217,0.7)]
                    "
                  >
                    {/* Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-52
                        w-52
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

                    {/* Small icon circle */}

                    <div className="relative mb-5 flex justify-center">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-white/15
                          backdrop-blur
                        "
                      >
                        <div className="relative h-7 w-7">
                          <Image
                            src={PHONE_ICON_SRC}
                            alt="Mobile applications"
                            fill
                            sizes="28px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Main phone image */}

                    <div
                      className="
                        relative
                        mx-auto
                        aspect-square
                        w-full
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-white/15
                        bg-white
                        p-5
                        shadow-inner
                      "
                    >
                      <Image
                        src={PHONE_ICON_SRC}
                        alt="Mobile applications"
                        fill
                        sizes="340px"
                        className="object-contain p-5"
                      />
                    </div>
                  </div>
                </MouseGlow>
              </AnimateIn>
            </div>

            {/* =================================================
                BOTTOM HIGHLIGHT CARDS
            ================================================= */}

            <AnimateIn delay={0.3}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* CARD 01 */}

                <MouseGlow className="rounded-[22px]">
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-slate-200/80
                      bg-white
                      p-5
                      shadow-[0_15px_40px_-30px_rgba(15,23,42,0.4)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-purple-200
                      hover:shadow-lg
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      dark:hover:border-purple-500/20
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-purple-50
                        text-xs
                        font-semibold
                        text-purple-600
                        dark:bg-purple-500/10
                        dark:text-purple-400
                      "
                    >
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

                {/* CARD 02 */}

                <MouseGlow className="rounded-[22px]">
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-slate-200/80
                      bg-white
                      p-5
                      shadow-[0_15px_40px_-30px_rgba(15,23,42,0.4)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-blue-200
                      hover:shadow-lg
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      dark:hover:border-blue-500/20
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-xs
                        font-semibold
                        text-blue-600
                        dark:bg-blue-500/10
                        dark:text-blue-400
                      "
                    >
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

                {/* CARD 03 */}

                <MouseGlow className="rounded-[22px]">
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-slate-200/80
                      bg-white
                      p-5
                      shadow-[0_15px_40px_-30px_rgba(15,23,42,0.4)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-cyan-200
                      hover:shadow-lg
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      dark:hover:border-cyan-500/20
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-cyan-50
                        text-xs
                        font-semibold
                        text-cyan-600
                        dark:bg-cyan-500/10
                        dark:text-cyan-400
                      "
                    >
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

                {/* CARD 04 */}

                <MouseGlow className="rounded-[22px]">
                  <div
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-slate-200/80
                      bg-white
                      p-5
                      shadow-[0_15px_40px_-30px_rgba(15,23,42,0.4)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-indigo-200
                      hover:shadow-lg
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      dark:hover:border-indigo-500/20
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-50
                        text-xs
                        font-semibold
                        text-indigo-600
                        dark:bg-indigo-500/10
                        dark:text-indigo-400
                      "
                    >
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