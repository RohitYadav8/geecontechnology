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
    <div className="flex min-h-screen flex-col overflow-hidden bg-white dark:bg-slate-950">
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
            bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,.12),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(16,185,129,.07),transparent_30%)]
          "
        />

        {/* =================================================
            FLOATING EFFECTS
        ================================================= */}

        <FloatingBlob
          className="-right-24 top-20 h-80 w-80"
          color="bg-blue-400/10"
          duration={16}
        />

        <FloatingBlob
          className="-left-24 top-[700px] h-72 w-72"
          color="bg-cyan-300/10"
          duration={20}
        />

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative px-5 pb-10 pt-12 sm:px-7 sm:pt-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* =================================================
                HEADING
            ================================================= */}

            <AnimateIn delay={0.05}>
              <div className="mb-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
                  ERP Solutions
                </p>

                <div className="mt-3 h-[3px] w-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />

                <AnimatedHeading
                  text="ERP Solutions"
                  as="h1"
                  className="
                    mt-5
                    text-3xl
                    font-semibold
                    tracking-[-0.04em]
                    text-slate-950
                    dark:text-white
                    sm:text-4xl
                    lg:text-5xl
                  "
                />
              </div>
            </AnimateIn>

            {/* =================================================
                ERP BANNER
            ================================================= */}

            <AnimateIn delay={0.1}>
              <MouseGlow className="rounded-[24px]">
                <div
                  className="
                    relative
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
                  <div
                    className="
                      relative
                      h-[180px]
                      w-full
                      sm:h-[220px]
                      md:h-[250px]
                      lg:h-[285px]
                      xl:h-[300px]
                    "
                  >
                    <Image
                      src={ERP_WORDMARK_SRC}
                      alt="ERP"
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10" />
                </div>
              </MouseGlow>
            </AnimateIn>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <section className="relative px-5 py-14 sm:px-7 sm:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-12">
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <AnimateIn>
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
                    "
                  >
                    {/* Accent Line */}

                    <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-blue-600 via-cyan-400 to-emerald-400" />

                    <StaggerContainer className="space-y-7 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-[15px]">
                      {/* =================================================
                          INTRO
                      ================================================= */}

                      <StaggerItem>
                        <p>
                          Our enterprise resource planning
                          (ERP) software gives your people the
                          tools they need to connect and
                          manage your entire business, from
                          financial and supply chain
                          management and from manufacturing
                          to operations, with the insight you
                          need to make smart decisions. Start
                          with what you need now and easily
                          adapt as your needs change, in the
                          cloud or on your servers — the
                          choice is yours.
                        </p>
                      </StaggerItem>

                      {/* =================================================
                          BENEFITS HEADING
                      ================================================= */}

                      <StaggerItem>
                        <p className="text-base font-semibold leading-7 text-emerald-600 dark:text-emerald-400">
                          Our ERP systems can drive huge
                          improvements in the effectiveness
                          of any organisation by:
                        </p>
                      </StaggerItem>

                      {/* =================================================
                          BENEFITS
                      ================================================= */}

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

                              <span className="flex-1">
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
                          At Geecon, we strive to deliver a
                          consistently excellent standard of
                          service and we take pride in
                          everything we do. This has enabled
                          us to retain and grow our client
                          base year on year and a significant
                          proportion of our growth can be
                          attributed to happy clients
                          recommending us to their colleagues.
                        </p>
                      </StaggerItem>

                      {/* =================================================
                          PARAGRAPH
                      ================================================= */}

                      <StaggerItem>
                        <p>
                          We believe that consistency and
                          continuity is a key aspect of the
                          service we provide to our clients.
                          We have an exceptionally low staff
                          turnover rate — we enjoy what we do.
                        </p>
                      </StaggerItem>

                      {/* =================================================
                          PARAGRAPH
                      ================================================= */}

                      <StaggerItem>
                        <p>
                          We&apos;re a close-knit team that
                          offers a friendly, collaborative and
                          ultimately helpful approach. We like
                          innovative ideas and getting things
                          done.
                        </p>
                      </StaggerItem>
                    </StaggerContainer>
                  </div>
                </MouseGlow>
              </AnimateIn>

              {/* =================================================
                  RIGHT SIDE ERP HUB DIAGRAM
              ================================================= */}

              <AnimateIn
                delay={0.2}
                direction="left"
                className="lg:sticky lg:top-24 lg:self-start"
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
                      {/* Glow */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-1/2
                          top-1/2
                          h-52
                          w-52
                          -translate-x-1/2
                          -translate-y-1/2
                          rounded-full
                          bg-blue-500/10
                          blur-3xl
                        "
                      />

                      <div className="relative aspect-square w-full">
                        <Image
                          src={ERP_HUB_DIAGRAM_SRC}
                          alt="ERP hub connecting Manufacturing, Supply Chain, Project Management, CRM, Finance, and HR"
                          fill
                          sizes="320px"
                          className="relative z-[1] object-contain"
                        />
                      </div>
                    </div>
                  </MouseGlow>
                </TiltCard>
              </AnimateIn>
            </div>

            {/* =================================================
                ERP FEATURE CARDS
            ================================================= */}

            <AnimateIn delay={0.3}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* =================================================
                    FINANCE
                ================================================= */}

                <TiltCard>
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
                      Finance
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Manage financial data and make
                      informed business decisions.
                    </p>
                  </div>
                </TiltCard>

                {/* =================================================
                    SUPPLY CHAIN
                ================================================= */}

                <TiltCard>
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
                      02
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Supply Chain
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Connect supply chain operations and
                      improve overall efficiency.
                    </p>
                  </div>
                </TiltCard>

                {/* =================================================
                    CRM
                ================================================= */}

                <TiltCard>
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
                      03
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      CRM
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Build stronger customer relationships
                      with connected data.
                    </p>
                  </div>
                </TiltCard>

                {/* =================================================
                    HUMAN RESOURCES
                ================================================= */}

                <TiltCard>
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
                      hover:border-emerald-200
                      hover:shadow-xl
                      hover:shadow-emerald-500/5
                      dark:border-white/[0.07]
                      dark:bg-white/[0.035]
                      dark:hover:border-emerald-500/20
                    "
                  >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      04
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Human Resources
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Manage people, processes and resources
                      through one connected platform.
                    </p>
                  </div>
                </TiltCard>
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