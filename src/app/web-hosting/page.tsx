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

const BANNER_SRC = "/hosting.png";
const SIDEBAR_SRC = "/web-hosting-1.png";

// ---------------------------------------------------------
// Styles
// ---------------------------------------------------------

const FEATURE_CARD =
  "group relative h-full overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-500/30";

const FEATURE_TILE =
  "brand-grad mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-xs font-extrabold tracking-wide text-white shadow-lg shadow-violet-500/25";

const HEADING_DOT =
  "brand-grad flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] text-white shadow-lg shadow-violet-500/25";

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function WebHostingServicesPage() {
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
                      src={SIDEBAR_SRC}
                      alt="Web hosting servers"
                      fill
                      sizes="72px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <h1 className="mt-7 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
                  Web Hosting Services
                </h1>
              </AnimateIn>

              <AnimateIn delay={0.15}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg lg:mx-0">
                  We provide dedicated servers and VPS hosting services that can
                  be matched to fit your needs. Whether you are an individual
                  looking for a basic shared hosting package or your small
                  business needs a scalable dedicated web hosting solution, we are
                  willing and able to meet your web hosting needs.
                </p>
              </AnimateIn>
            </div>

            {/* BANNER */}

            <AnimateIn delay={0.2} direction="left">
              <div className="rounded-[28px] border border-white/30 bg-white/15 p-2 shadow-[0_40px_90px_-40px_rgba(15,23,42,.6)] backdrop-blur-xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[22px] bg-slate-900">
                  <Image
                    src={BANNER_SRC}
                    alt="Web Hosting Services"
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
                  {/* VPS Heading */}

                  <StaggerItem>
                    <div className="flex items-center gap-3">
                      <span className={HEADING_DOT}>
                        <span className="h-2 w-2 rounded-full bg-current" />
                      </span>

                      <p className="text-xl font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
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
                    <div className="flex items-center gap-3 border-t border-slate-100 pt-6 dark:border-white/[0.07]">
                      <span className={HEADING_DOT}>
                        <span className="h-2 w-2 rounded-full bg-current" />
                      </span>

                      <p className="text-xl font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
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
              </AnimateIn>

              {/* =================================================
                  RIGHT IMAGE
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

                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-[22px] border border-white/30 bg-white shadow-inner">
                    <Image
                      src={SIDEBAR_SRC}
                      alt="Web hosting servers"
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
            BOTTOM INFORMATION CARDS
        ================================================= */}

        <section className="relative px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10">
          <AnimateIn delay={0.1}>
            <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-3">
              {/* VPS */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  VPS
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  VPS Hosting
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Flexible and scalable virtual private server solutions for
                  growing businesses.
                </p>
              </div>

              {/* Dedicated */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  DS
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Dedicated Server
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Fully managed dedicated hosting with reliable
                  infrastructure and support.
                </p>
              </div>

              {/* Document */}

              <div className={FEATURE_CARD}>
                <div className={FEATURE_TILE}>
                  DM
                </div>

                <h3 className="text-base font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                  Document Management
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Secure web-based document hosting and management
                  solutions.
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
