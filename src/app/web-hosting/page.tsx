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
            HERO SECTION
        ===================================================== */}

        <section className="relative px-5 pb-10 pt-12 sm:px-7 sm:pt-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* =================================================
                PAGE HEADING
            ================================================= */}

            <AnimateIn delay={0.05}>
              <div className="mb-7">
                <AnimatedHeading
                  text="Web Hosting Services"
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
                FULL HOSTING BANNER
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
                    alt="Web Hosting Services"
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
                      {/* Intro */}

                      <StaggerItem>
                        <p>
                          We provide dedicated servers and VPS
                          hosting services that can be matched
                          to fit your needs. Whether you are an
                          individual looking for a basic shared
                          hosting package or your small business
                          needs a scalable dedicated web hosting
                          solution, we are willing and able to
                          meet your web hosting needs.
                        </p>
                      </StaggerItem>

                      {/* VPS Heading */}

                      <StaggerItem>
                        <p className="text-base font-semibold text-slate-900 dark:text-white">
                          VPS Hosting:
                        </p>
                      </StaggerItem>

                      {/* VPS Content */}

                      <StaggerItem>
                        <p>
                          Our VPS hosting as a cost-efficient
                          solution comes right in the middle of
                          dedicated and webspace hosting product
                          ranges and provides you with the
                          advantages of both of these types. We
                          use a virtualization solution based on
                          KVM and hardware that corresponds to
                          the latest state of the art.
                          Furthermore you are provided with
                          guaranteed RAM and disk space.
                        </p>
                      </StaggerItem>

                      {/* VPS Customization */}

                      <StaggerItem>
                        <p>
                          Customize your virtual private server
                          to suit your needs and select the
                          operating system (Linux or Windows
                          Server 2012 and Windows Server 2008)
                          of your choice. To manage and
                          administer your virtual machine, you
                          can optionally choose between
                          Parallels Plesk, cPanel/WHM and
                          Webmin. Decide now and rely on
                          high-quality, powerful VPS hosting
                          solutions.
                        </p>
                      </StaggerItem>

                      {/* Dedicated Server Heading */}

                      <StaggerItem>
                        <p className="text-base font-semibold text-slate-900 dark:text-white">
                          Dedicated Server:
                        </p>
                      </StaggerItem>

                      {/* Dedicated Server Content */}

                      <StaggerItem>
                        <p>
                          Our entire fleet of dedicated servers
                          is 100% managed, so you do not have to
                          worry about running your servers or
                          fixing any problems. What we mean by
                          Dedicated Servers, is that we will
                          take care of the setup of your
                          dedicated web hosting account,
                          troubleshooting with your dedicated
                          server, and everything in between.
                        </p>
                      </StaggerItem>

                      {/* Cloud Document Hosting */}

                      <StaggerItem>
                        <p>
                          Data and document hosting services in
                          the cloud from microMEDIA include
                          designing and implementing
                          cost-effective Web-based Document
                          Management systems. We use these
                          systems to create an Archive at our
                          web hosting sites that leverage the
                          latest web based document management
                          technologies.
                        </p>
                      </StaggerItem>

                      {/* Document Management */}

                      <StaggerItem>
                        <p>
                          Each application is customized to meet
                          a client&apos;s specific needs for an
                          online web document hosting
                          application. Web-based document
                          management users can institute a
                          search and retrieval process using
                          previously established indices and
                          document identification
                          classifications.
                        </p>
                      </StaggerItem>

                      {/* Support */}

                      <StaggerItem>
                        <p>
                          microMEDIA delivers all the requisite
                          management, infrastructure and
                          support. We offer numerous document
                          repository alternatives.
                        </p>
                      </StaggerItem>
                    </StaggerContainer>
                  </div>
                </MouseGlow>
              </AnimateIn>

              {/* =================================================
                  RIGHT SIDEBAR IMAGE
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
                          src={SIDEBAR_SRC}
                          alt="Web hosting servers"
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
                BOTTOM INFORMATION CARDS
            ================================================= */}

            <AnimateIn delay={0.3}>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {/* VPS */}

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
                      p-6
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

                    <div
                      className="
                        mb-5
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-500/10
                        text-xs
                        font-semibold
                        text-blue-600
                        dark:text-blue-400
                      "
                    >
                      VPS
                    </div>

                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      VPS Hosting
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Flexible and scalable virtual private
                      server solutions for growing businesses.
                    </p>
                  </div>
                </MouseGlow>

                {/* Dedicated */}

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
                      p-6
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

                    <div
                      className="
                        mb-5
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-cyan-500/10
                        text-xs
                        font-semibold
                        text-cyan-600
                        dark:text-cyan-400
                      "
                    >
                      DS
                    </div>

                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Dedicated Server
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Fully managed dedicated hosting with
                      reliable infrastructure and support.
                    </p>
                  </div>
                </MouseGlow>

                {/* Document */}

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
                      p-6
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

                    <div
                      className="
                        mb-5
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-500/10
                        text-xs
                        font-semibold
                        text-indigo-600
                        dark:text-indigo-400
                      "
                    >
                      DM
                    </div>

                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Document Management
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Secure web-based document hosting and
                      management solutions.
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