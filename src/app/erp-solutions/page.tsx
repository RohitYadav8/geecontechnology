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
                bg-slate-100
                sm:h-[180px]
                md:h-[210px]
                lg:h-[240px]
                dark:bg-slate-900
              "
            >
              {/* Blurred background fill */}

              <Image
                src={ERP_WORDMARK_SRC}
                alt=""
                fill
                priority
                sizes="100vw"
                aria-hidden="true"
                className="
                  scale-110
                  object-cover
                  object-center
                  opacity-35
                  blur-xl
                "
              />

              {/* Main ERP banner */}

              <Image
                src={ERP_WORDMARK_SRC}
                alt="ERP"
                fill
                priority
                sizes="100vw"
                className="
                  relative
                  z-[1]
                  object-contain
                  object-center
                "
              />

              {/* Bottom fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-[2]
                  h-16
                  bg-gradient-to-t
                  from-white
                  via-white/30
                  to-transparent
                  dark:from-[#080e1a]
                  dark:via-[#080e1a]/25
                "
              />
            </div>
          </AnimateIn>

          {/* =================================================
              TITLE
          ================================================= */}

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
            <AnimateIn delay={0.1}>
              <div className="-mt-7 flex items-center gap-4 sm:-mt-10 sm:gap-5">
                {/* ERP ICON */}

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
                      src={ERP_HUB_DIAGRAM_SRC}
                      alt="ERP"
                      fill
                      sizes="88px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* HEADING */}

                <div>
                  <p
                    className="
                      mb-1
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-purple-600
                      dark:text-purple-400
                      sm:text-[11px]
                    "
                  >
                    ERP Solutions
                  </p>

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
                    ERP Solutions
                  </h1>
                </div>
              </div>
            </AnimateIn>

            {/* =================================================
                INTRO
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

        <section
          className="
            relative
            px-5
            pb-14
            pt-10
            sm:px-7
            sm:pb-16
            sm:pt-12
            lg:px-10
          "
        >
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
                  LEFT CONTENT
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
                    {/* Decoration */}

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
                      {/* =================================================
                          BENEFITS HEADING
                      ================================================= */}

                      <StaggerItem>
                        <div className="flex items-start gap-3">
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
                              bg-purple-100
                              text-purple-600
                              dark:bg-purple-500/10
                              dark:text-purple-400
                            "
                          >
                            <span className="h-2 w-2 rounded-full bg-current" />
                          </span>

                          <p
                            className="
                              pt-1
                              text-[15px]
                              font-semibold
                              leading-6
                              text-slate-900
                              dark:text-white
                            "
                          >
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
                  </div>
                </MouseGlow>
              </AnimateIn>

              {/* =================================================
                  RIGHT ERP IMAGE
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

                    {/* Small ERP icon */}

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
                        src={ERP_HUB_DIAGRAM_SRC}
                        alt="ERP hub connecting Manufacturing, Supply Chain, Project Management, CRM, Finance, and HR"
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
                ERP FEATURE CARDS
            ================================================= */}

            <AnimateIn delay={0.3}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* =================================================
                    FINANCE
                ================================================= */}

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
                      Finance
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Manage financial data and make informed business
                      decisions.
                    </p>
                  </div>
                </MouseGlow>

                {/* =================================================
                    SUPPLY CHAIN
                ================================================= */}

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
                      Supply Chain
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Connect supply chain operations and improve overall
                      efficiency.
                    </p>
                  </div>
                </MouseGlow>

                {/* =================================================
                    CRM
                ================================================= */}

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
                      CRM
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Build stronger customer relationships with connected data.
                    </p>
                  </div>
                </MouseGlow>

                {/* =================================================
                    HUMAN RESOURCES
                ================================================= */}

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
                      Human Resources
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Manage people, processes and resources through one
                      connected platform.
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