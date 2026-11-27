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

const ERP_WORDMARK_SRC = "/ERP.png";
const ERP_HUB_DIAGRAM_SRC = "/accounting-erp.png";

// ---------------------------------------------------------
// ERP Benefits
// ---------------------------------------------------------

const benefits = [
  "Assisting you in defining your business processes and ensuring they are complied with throughout the supply chain",

  "Protecting your critical business data through well-defined roles and security access",

  "Enabling you to plan your work load based on existing orders and forecasts",

  "Providing you with the tools to give a high level of service to your customers",

  "Translating your data into decision making information",
];

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function ErpSolutionsPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-slate-50 dark:bg-[#060b16]">
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

        <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-center text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
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

          <div className="relative mx-auto max-w-4xl">
            <AnimateIn delay={0.05}>
              <div className="flex flex-col items-center gap-5">
                {/* ERP ICON */}

                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[24px] border border-white/30 bg-white/[0.14] p-2 shadow-[0_20px_50px_-20px_rgba(15,23,42,.5)] backdrop-blur-xl sm:h-[88px] sm:w-[88px]">
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-white p-2">
                    <div className="relative h-full w-full">
                      <Image
                        src={ERP_HUB_DIAGRAM_SRC}
                        alt="ERP"
                        fill
                        sizes="88px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <p className="inline-flex rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                  ERP Solutions
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <h1 className="mt-6 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
                ERP Solutions
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                Our enterprise resource planning (ERP) software gives your
                people the tools they need to connect and manage your entire
                business, from financial and supply chain management and from
                manufacturing to operations, with the insight you need to make
                smart decisions. Start with what you need now and easily adapt
                as your needs change, in the cloud or on your servers — the
                choice is yours.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-20 sm:-mt-32 sm:px-6 lg:px-10 lg:pb-24">
          <div className="rounded-[32px] border border-slate-100 bg-white p-4 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-6 lg:p-8 dark:border-white/[0.07] dark:bg-[#0b1220]">
            {/* BANNER */}

            <AnimateIn delay={0.05}>
              <div className="relative h-[150px] w-full overflow-hidden rounded-[24px] bg-slate-100 sm:h-[190px] md:h-[220px] lg:h-[260px] dark:bg-slate-900">
                {/* Blurred background fill */}

                <Image
                  src={ERP_WORDMARK_SRC}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  aria-hidden="true"
                  className="scale-110 object-cover object-center opacity-35 blur-xl"
                />

                {/* Main ERP banner */}

                <Image
                  src={ERP_WORDMARK_SRC}
                  alt="ERP"
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="relative z-[1] object-contain object-center"
                />
              </div>
            </AnimateIn>

            <div className="mt-8 grid items-start gap-8 px-2 pb-2 sm:px-4 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <AnimateIn delay={0.15}>
                <StaggerContainer className="space-y-6 text-[15px] leading-8 text-slate-600 dark:text-slate-400">
                  {/* =================================================
                      BENEFITS HEADING
                  ================================================= */}

                  <StaggerItem>
                    <div className="flex items-center gap-4">
                      <span className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                        <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      </span>

                      <p className="text-lg font-extrabold leading-7 tracking-[-0.02em] text-slate-950 sm:text-xl dark:text-white">
                        Our ERP systems can drive huge improvements in the
                        effectiveness of any organisation by:
                      </p>
                    </div>
                  </StaggerItem>

                  {/* =================================================
                      BENEFITS
                  ================================================= */}

                  <StaggerItem>
                    <ul className="space-y-3">
                      {benefits.map((item, index) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 px-4 py-3.5 leading-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(91,33,182,.45)] dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-violet-500/30"
                        >
                          <span className="brand-grad mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold text-white shadow-md shadow-violet-500/20">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="flex-1 font-medium text-slate-700 dark:text-slate-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </StaggerItem>

                  {/* =================================================
                      PARAGRAPH
                  ================================================= */}

                  <StaggerItem>
                    <p>
                      At Geecon, we strive to deliver a consistently
                      excellent standard of service and we take pride in
                      everything we do. This has enabled us to retain and
                      grow our client base year on year and a significant
                      proportion of our growth can be attributed to happy
                      clients recommending us to their colleagues.
                    </p>
                  </StaggerItem>

                  {/* =================================================
                      PARAGRAPH
                  ================================================= */}

                  <StaggerItem>
                    <p>
                      We believe that consistency and continuity is a key
                      aspect of the service we provide to our clients. We
                      have an exceptionally low staff turnover rate — we
                      enjoy what we do.
                    </p>
                  </StaggerItem>

                  {/* =================================================
                      PARAGRAPH
                  ================================================= */}

                  <StaggerItem>
                    <p>
                      We&apos;re a close-knit team that offers a friendly,
                      collaborative and ultimately helpful approach. We
                      like innovative ideas and getting things done.
                    </p>
                  </StaggerItem>
                </StaggerContainer>
              </AnimateIn>

              {/* =================================================
                  RIGHT ERP IMAGE
              ================================================= */}

              <AnimateIn
                delay={0.2}
                direction="left"
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <div className="brand-grad relative overflow-hidden rounded-[28px] p-5 shadow-[0_30px_70px_-30px_rgba(91,33,182,.5)]">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-violet-300/40 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />

                  {/* Small ERP icon */}

                  <div className="relative mb-5 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/30 bg-white/[0.14] backdrop-blur-xl">
                      <div className="relative h-8 w-8">
                        <Image
                          src={ERP_HUB_DIAGRAM_SRC}
                          alt="ERP"
                          fill
                          sizes="32px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main ERP image */}

                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-[20px] border border-white/30 bg-white p-5">
                    <Image
                      src={ERP_HUB_DIAGRAM_SRC}
                      alt="ERP hub connecting Manufacturing, Supply Chain, Project Management, CRM, Finance, and HR"
                      fill
                      sizes="360px"
                      className="object-contain p-5"
                    />
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>

          {/* =================================================
              ERP FEATURE CARDS
          ================================================= */}

          <AnimateIn delay={0.3}>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* FINANCE */}

              <div className="h-full rounded-[26px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                <div className="brand-grad mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-sm font-bold text-white shadow-lg shadow-violet-500/25">
                  01
                </div>

                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Finance
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  Manage financial data and make informed business
                  decisions.
                </p>
              </div>

              {/* SUPPLY CHAIN */}

              <div className="h-full rounded-[26px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                <div className="brand-grad mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-sm font-bold text-white shadow-lg shadow-violet-500/25">
                  02
                </div>

                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Supply Chain
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  Connect supply chain operations and improve overall
                  efficiency.
                </p>
              </div>

              {/* CRM */}

              <div className="h-full rounded-[26px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                <div className="brand-grad mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-sm font-bold text-white shadow-lg shadow-violet-500/25">
                  03
                </div>

                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  CRM
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  Build stronger customer relationships with connected data.
                </p>
              </div>

              {/* HUMAN RESOURCES */}

              <div className="h-full rounded-[26px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                <div className="brand-grad mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-sm font-bold text-white shadow-lg shadow-violet-500/25">
                  04
                </div>

                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Human Resources
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  Manage people, processes and resources through one
                  connected platform.
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
