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

const BANNER_SRC = "/Internet-Technology.png";
const GLOBE_ICON_SRC = "/internet-technology-1.png";

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

export default function InternetTechnologyPage() {
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
                      src={GLOBE_ICON_SRC}
                      alt="Global connectivity"
                      fill
                      sizes="72px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <h1 className="mt-7 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
                  Internet Technology
                </h1>
              </AnimateIn>

              <AnimateIn delay={0.15}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg lg:mx-0">
                  Geecon is your expert in Internet Technology. We work closely
                  with you and your staff to uncover frustrations with current
                  operations and processes. Our technological expertise allows us
                  to create custom web solutions that will ease these points of
                  pain to make your business more efficient. Our focus is to create
                  an online environment that stimulates your business&apos;s
                  success and growth.
                </p>
              </AnimateIn>
            </div>

            {/* BANNER */}

            <AnimateIn delay={0.2} direction="left">
              <div className="rounded-[28px] border border-white/30 bg-white/15 p-2 shadow-[0_40px_90px_-40px_rgba(15,23,42,.6)] backdrop-blur-xl">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[22px] bg-slate-900">
                  <Image
                    src={BANNER_SRC}
                    alt="Internet Technology"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover object-center"
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
                  <StaggerItem>
                    <p>
                      A great web solution is just the first step in the
                      process to online success. We can develop a great
                      website that is easy to use, meets your
                      organization&apos;s needs and is visually impressive.
                      We also need to make sure that your customers are
                      finding your website online. This is where Internet
                      marketing comes into play.
                    </p>
                  </StaggerItem>

                  <StaggerItem>
                    <p>
                      With over 10 years experience in IT and web
                      technologies, we are held in high regard with our
                      customers due to our flexible and innovative approach
                      in providing business driven solutions matching your
                      needs.
                    </p>
                  </StaggerItem>

                  <StaggerItem>
                    <p>
                      Offering a range of services from web strategy,
                      through delivery of website design, development and
                      configuration to the management of an online presence,
                      we can take your business objectives and requirements
                      and design practical and cost effective solutions to
                      deliver to your needs and provide measurable value.
                    </p>
                  </StaggerItem>

                  <StaggerItem>
                    <p>
                      We offer personal touch to all of our customers. For
                      this, we allocate a dedicated manager to every project
                      that keep communications going uninterruptedly from the
                      outset. This approach helps us rapidly respond to
                      changes initiated by our customers, adjust project team
                      size when necessary, provide all the support, and
                      ensure further project development.
                    </p>
                  </StaggerItem>

                  <StaggerItem>
                    <p>
                      We build custom software products that drive revenue
                      and provide seamless customer experiences for your
                      business.
                    </p>
                  </StaggerItem>

                  <StaggerItem>
                    <p>
                      Driving revenue means staying tied to business
                      priorities. We do this by identifying opportunities to
                      improve your customer experience and monetize your
                      existing data and content.
                    </p>
                  </StaggerItem>
                </StaggerContainer>
              </AnimateIn>

              {/* =================================================
                  RIGHT GLOBE IMAGE
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/30 bg-white/[0.14] p-2 backdrop-blur-xl">
                      <div className="relative h-full w-full">
                        <Image
                          src={GLOBE_ICON_SRC}
                          alt="Global connectivity"
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main globe image */}

                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-[22px] border border-white/30 bg-white shadow-inner">
                    <Image
                      src={GLOBE_ICON_SRC}
                      alt="Global connectivity"
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
            BOTTOM FEATURE CARDS
        ================================================= */}

        <section className="relative px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10">
          <AnimateIn delay={0.1}>
            <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Web Strategy */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  01
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Web Strategy
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Build a strong digital strategy aligned with your business
                  goals.
                </p>
              </div>

              {/* Web Development */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  02
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Web Development
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Modern and scalable web solutions built around your
                  requirements.
                </p>
              </div>

              {/* Internet Marketing */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  03
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Internet Marketing
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Improve your online visibility and reach the right
                  customers.
                </p>
              </div>

              {/* Business Growth */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  04
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Business Growth
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Turn technology into measurable business value and growth.
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
