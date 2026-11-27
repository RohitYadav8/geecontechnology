import Image from "next/image";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";

import { AnimateIn } from "../../../components/animate-in";
import { FloatingBlob } from "../../../components/floating-blob";

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
// Styles
// ---------------------------------------------------------

const FEATURE_CARD =
  "group relative h-full overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-500/30";

const FEATURE_TILE =
  "brand-grad mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-sm font-extrabold text-white shadow-lg shadow-violet-500/25";

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function MobileSolutionPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 dark:bg-[#060b16]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative flex-1 overflow-hidden">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-center text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10 lg:text-left">
          <FloatingBlob
            className="-left-40 top-24 h-[460px] w-[460px]"
            color="bg-cyan-300/35"
            duration={18}
          />

          <FloatingBlob
            className="-right-28 -top-24 h-[420px] w-[420px]"
            color="bg-violet-300/40"
            duration={16}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            {/* TITLE + INTRO */}

            <div>
              <AnimateIn delay={0.05}>
                <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-white/30 bg-white p-3 shadow-[0_20px_50px_-20px_rgba(15,23,42,.5)] lg:mx-0">
                  <div className="relative h-full w-full">
                    <Image
                      src={PHONE_ICON_SRC}
                      alt="Mobile applications"
                      fill
                      sizes="72px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <h1 className="mt-7 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
                  Mobile Solution
                </h1>
              </AnimateIn>

              <AnimateIn delay={0.15}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg lg:mx-0">
                  Mobile solutions have become central to the way enterprises
                  conduct their business, enabling customers and employees to be
                  always-on and even powering the next wave of connected services
                  — the Internet of Things.
                </p>
              </AnimateIn>
            </div>

            {/* BANNER */}

            <AnimateIn delay={0.2} direction="left">
              <div className="rounded-[28px] border border-white/30 bg-white/15 p-2 shadow-[0_40px_90px_-40px_rgba(15,23,42,.6)] backdrop-blur-xl">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[22px] bg-[#071a4a]">
                  <Image
                    src={BANNER_SRC}
                    alt="Mobile Solution"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="scale-[1.06] object-cover object-center"
                  />
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT (overlapping card)
        ===================================================== */}

        <section className="relative z-10 -mt-28 px-4 sm:-mt-32 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-100 bg-white p-6 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-10 lg:p-12 dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <AnimateIn delay={0.15}>
                <StaggerContainer className="space-y-6 text-[15px] leading-8 text-slate-600 dark:text-slate-400">
                  {/* BUSINESS ADVANTAGE HEADING */}

                  <StaggerItem>
                    <div className="flex items-center gap-3">
                      <span className="brand-grad flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] text-white shadow-lg shadow-violet-500/25">
                        <span className="h-2 w-2 rounded-full bg-current" />
                      </span>

                      <p className="text-xl font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
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
                    <div className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5 sm:p-6 dark:border-white/[0.07] dark:bg-white/[0.03]">
                      <p className="mb-4 text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                        Your Benefits
                      </p>

                      <ul className="space-y-3">
                        {benefits.map((item, index) => (
                          <li
                            key={item}
                            className="group flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_20px_50px_-30px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-500/30"
                          >
                            <span className="brand-grad mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-extrabold text-white shadow-md shadow-violet-500/25">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="flex-1 leading-7 text-slate-700 dark:text-slate-300">{item}</span>
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
              </AnimateIn>

              {/* =================================================
                  RIGHT MOBILE IMAGE CARD
              ================================================= */}

              <AnimateIn
                delay={0.2}
                direction="left"
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <div className="brand-grad relative overflow-hidden rounded-[28px] p-6 shadow-[0_30px_70px_-30px_rgba(91,33,182,.5)]">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-violet-300/40 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />

                  {/* Small icon */}

                  <div className="relative mb-5 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/30 bg-white/[0.14] backdrop-blur-xl">
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

                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-[22px] border border-white/30 bg-white shadow-inner">
                    <Image
                      src={PHONE_ICON_SRC}
                      alt="Mobile applications"
                      fill
                      sizes="360px"
                      className="object-contain p-5"
                    />
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* =================================================
            BOTTOM HIGHLIGHT CARDS
        ================================================= */}

        <section className="relative px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10">
          <AnimateIn delay={0.1}>
            <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* CARD 01 */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  01
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Faster Solutions
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Accelerate your mobile product development and
                  time-to-market.
                </p>
              </div>

              {/* CARD 02 */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  02
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Flexible Apps
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Build modular and flexible mobile applications for your
                  business.
                </p>
              </div>

              {/* CARD 03 */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  03
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Native Platforms
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Optimised applications for modern iOS and Android devices.
                </p>
              </div>

              {/* CARD 04 */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  04
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Better Experience
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Deliver seamless and intuitive experiences to your
                  customers.
                </p>
              </div>
            </div>
          </AnimateIn>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </div>
  );
}
