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

const BANNER_SRC = "/Internet-Technology.png";
const GLOBE_ICON_SRC = "/internet-technology-1.png";

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function InternetTechnologyPage() {
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
          color="bg-indigo-400/5"
          duration={18}
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
                <AnimatedHeading
                  text="Internet Technology"
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
                FULL INTERNET TECHNOLOGY BANNER
            ================================================= */}

            <AnimateIn delay={0.1}>
              <MouseGlow className="rounded-[28px]">
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-slate-200/80
                    bg-white
                    shadow-[0_30px_90px_-45px_rgba(15,23,42,.45)]
                    dark:border-white/[0.08]
                    dark:bg-slate-900
                  "
                >
                  <Image
                    src={BANNER_SRC}
                    alt="Internet Technology"
                    width={1536}
                    height={1024}
                    priority
                    sizes="100vw"
                    className="
                      block
                      h-auto
                      w-full
                      object-contain
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-[28px]
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
                    {/* Accent line */}

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

                    {/* Soft glow */}

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
                      <StaggerItem>
                        <p>
                          Geecon is your expert in Internet
                          Technology. We work closely with you
                          and your staff to uncover frustrations
                          with current operations and processes.
                          Our technological expertise allows us
                          to create custom web solutions that
                          will ease these points of pain to make
                          your business more efficient. Our
                          focus is to create an online
                          environment that stimulates your
                          business&apos;s success and growth.
                        </p>
                      </StaggerItem>

                      <StaggerItem>
                        <p>
                          A great web solution is just the first
                          step in the process to online success.
                          We can develop a great website that is
                          easy to use, meets your
                          organization&apos;s needs and is
                          visually impressive. We also need to
                          make sure that your customers are
                          finding your website online. This is
                          where Internet marketing comes into
                          play.
                        </p>
                      </StaggerItem>

                      <StaggerItem>
                        <p>
                          With over 10 years experience in IT
                          and web technologies, we are held in
                          high regard with our customers due to
                          our flexible and innovative approach
                          in providing business driven
                          solutions matching your needs.
                        </p>
                      </StaggerItem>

                      <StaggerItem>
                        <p>
                          Offering a range of services from web
                          strategy, through delivery of website
                          design, development and configuration
                          to the management of an online
                          presence, we can take your business
                          objectives and requirements and design
                          practical and cost effective solutions
                          to deliver to your needs and provide
                          measurable value.
                        </p>
                      </StaggerItem>

                      <StaggerItem>
                        <p>
                          We offer personal touch to all of our
                          customers. For this, we allocate a
                          dedicated manager to every project
                          that keep communications going
                          uninterruptedly from the outset. This
                          approach helps us rapidly respond to
                          changes initiated by our customers,
                          adjust project team size when
                          necessary, provide all the support,
                          and ensure further project development.
                        </p>
                      </StaggerItem>

                      <StaggerItem>
                        <p>
                          We build custom software products that
                          drive revenue and provide seamless
                          customer experiences for your
                          business.
                        </p>
                      </StaggerItem>

                      <StaggerItem>
                        <p>
                          Driving revenue means staying tied to
                          business priorities. We do this by
                          identifying opportunities to improve
                          your customer experience and monetize
                          your existing data and content.
                        </p>
                      </StaggerItem>
                    </StaggerContainer>
                  </div>
                </MouseGlow>
              </AnimateIn>

              {/* =================================================
                  RIGHT SIDEBAR / GLOBE
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
                      {/* Glow */}

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
                          src={GLOBE_ICON_SRC}
                          alt="Global connectivity"
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
                BOTTOM FEATURE CARDS
            ================================================= */}

            <AnimateIn delay={0.3}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Web Strategy */}

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
                      Web Strategy
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Build a strong digital strategy aligned
                      with your business goals.
                    </p>
                  </div>
                </MouseGlow>

                {/* Web Development */}

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
                      02
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Web Development
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Modern and scalable web solutions built
                      around your requirements.
                    </p>
                  </div>
                </MouseGlow>

                {/* Internet Marketing */}

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
                      03
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Internet Marketing
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Improve your online visibility and reach
                      the right customers.
                    </p>
                  </div>
                </MouseGlow>

                {/* Business Growth */}

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
                      04
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Business Growth
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Turn technology into measurable business
                      value and growth.
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