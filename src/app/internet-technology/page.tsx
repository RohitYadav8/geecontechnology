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
              {/* Soft background fill */}

              <Image
                src={BANNER_SRC}
                alt=""
                fill
                priority
                sizes="100vw"
                aria-hidden="true"
                className="
                  scale-110
                  object-cover
                  object-center
                  opacity-25
                  blur-xl
                "
              />

              {/* Main banner image */}

              <Image
                src={BANNER_SRC}
                alt="Internet Technology"
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
                      src={GLOBE_ICON_SRC}
                      alt="Global connectivity"
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
                  Internet Technology
                </h1>
              </div>
            </AnimateIn>

            {/* =================================================
                FIRST PARAGRAPH
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
                    {/* Decorative glow */}

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
                  </div>
                </MouseGlow>
              </AnimateIn>

              {/* =================================================
                  RIGHT GLOBE IMAGE
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
                    {/* Top glow */}

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

                    {/* Bottom glow */}

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

                    {/* Small icon */}

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
                          p-2
                          backdrop-blur
                        "
                      >
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
                        shadow-inner
                      "
                    >
                      <Image
                        src={GLOBE_ICON_SRC}
                        alt="Global connectivity"
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
                BOTTOM FEATURE CARDS
            ================================================= */}

            <AnimateIn delay={0.3}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Web Strategy */}

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
                      Web Strategy
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Build a strong digital strategy aligned with your business
                      goals.
                    </p>
                  </div>
                </MouseGlow>

                {/* Web Development */}

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
                      Web Development
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Modern and scalable web solutions built around your
                      requirements.
                    </p>
                  </div>
                </MouseGlow>

                {/* Internet Marketing */}

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
                      Internet Marketing
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Improve your online visibility and reach the right
                      customers.
                    </p>
                  </div>
                </MouseGlow>

                {/* Business Growth */}

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
                      Business Growth
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      Turn technology into measurable business value and growth.
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