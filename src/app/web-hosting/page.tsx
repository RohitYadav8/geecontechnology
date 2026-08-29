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

const BANNER_SRC = "/hosting.png";
const SIDEBAR_SRC = "/web-hosting-1.png";

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function WebHostingServicesPage() {
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

              {/* Main banner */}

              <Image
                src={BANNER_SRC}
                alt="Web Hosting Services"
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
                      src={SIDEBAR_SRC}
                      alt="Web hosting servers"
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
                  Web Hosting Services
                </h1>
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
                We provide dedicated servers and VPS hosting services that can
                be matched to fit your needs. Whether you are an individual
                looking for a basic shared hosting package or your small
                business needs a scalable dedicated web hosting solution, we are
                willing and able to meet your web hosting needs.
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
                      {/* VPS Heading */}

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

                          <p className="pt-1 text-[15px] font-semibold text-slate-900 dark:text-white">
                            VPS Hosting:
                          </p>
                        </div>
                      </StaggerItem>

                      {/* VPS Content */}

                      <StaggerItem>
                        <p>
                          Our VPS hosting as a cost-efficient solution comes
                          right in the middle of dedicated and webspace hosting
                          product ranges and provides you with the advantages of
                          both of these types. We use a virtualization solution
                          based on KVM and hardware that corresponds to the
                          latest state of the art. Furthermore you are provided
                          with guaranteed RAM and disk space.
                        </p>
                      </StaggerItem>

                      {/* VPS Customization */}

                      <StaggerItem>
                        <p>
                          Customize your virtual private server to suit your
                          needs and select the operating system (Linux or Windows
                          Server 2012 and Windows Server 2008) of your choice. To
                          manage and administer your virtual machine, you can
                          optionally choose between Parallels Plesk, cPanel/WHM
                          and Webmin. Decide now and rely on high-quality,
                          powerful VPS hosting solutions.
                        </p>
                      </StaggerItem>

                      {/* Dedicated Heading */}

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
                              bg-blue-100
                              text-blue-600
                              dark:bg-blue-500/10
                              dark:text-blue-400
                            "
                          >
                            <span className="h-2 w-2 rounded-full bg-current" />
                          </span>

                          <p className="pt-1 text-[15px] font-semibold text-slate-900 dark:text-white">
                            Dedicated Server:
                          </p>
                        </div>
                      </StaggerItem>

                      {/* Dedicated Content */}

                      <StaggerItem>
                        <p>
                          Our entire fleet of dedicated servers is 100% managed,
                          so you do not have to worry about running your servers
                          or fixing any problems. What we mean by Dedicated
                          Servers, is that we will take care of the setup of your
                          dedicated web hosting account, troubleshooting with
                          your dedicated server, and everything in between.
                        </p>
                      </StaggerItem>

                      {/* Cloud document hosting */}

                      <StaggerItem>
                        <p>
                          Data and document hosting services in the cloud from
                          microMEDIA include designing and implementing
                          cost-effective Web-based Document Management systems.
                          We use these systems to create an Archive at our web
                          hosting sites that leverage the latest web based
                          document management technologies.
                        </p>
                      </StaggerItem>

                      {/* Document management */}

                      <StaggerItem>
                        <p>
                          Each application is customized to meet a client&apos;s
                          specific needs for an online web document hosting
                          application. Web-based document management users can
                          institute a search and retrieval process using
                          previously established indices and document
                          identification classifications.
                        </p>
                      </StaggerItem>

                      {/* Support */}

                      <StaggerItem>
                        <p>
                          microMEDIA delivers all the requisite management,
                          infrastructure and support. We offer numerous document
                          repository alternatives.
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
                            src={SIDEBAR_SRC}
                            alt="Web hosting servers"
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Main image */}

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
                        src={SIDEBAR_SRC}
                        alt="Web hosting servers"
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
                BOTTOM INFORMATION CARDS
            ================================================= */}

            <AnimateIn delay={0.3}>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {/* VPS */}

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
                      VPS
                    </div>

                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      VPS Hosting
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Flexible and scalable virtual private server solutions for
                      growing businesses.
                    </p>
                  </div>
                </MouseGlow>

                {/* Dedicated */}

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
                      DS
                    </div>

                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Dedicated Server
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Fully managed dedicated hosting with reliable
                      infrastructure and support.
                    </p>
                  </div>
                </MouseGlow>

                {/* Document */}

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
                      DM
                    </div>

                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Document Management
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Secure web-based document hosting and management
                      solutions.
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