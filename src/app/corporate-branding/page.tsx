import Image from "next/image";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { FloatingBlob } from "../../../components/floating-blob";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";

/* =========================================================
   IMAGES
========================================================= */

const BRANDING_IMAGE = "/branding.png";
const BRANDING_SIDE_IMAGE = "/corporate-branding-1.png";

/* =========================================================
   PAGE
========================================================= */

export default function CorporateBrandingPage() {
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
              <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-[24px] border border-white/30 bg-white/[0.14] p-2 shadow-[0_20px_50px_-20px_rgba(15,23,42,.5)] backdrop-blur-xl sm:h-[88px] sm:w-[88px]">
                <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-white p-1.5">
                  <div className="relative h-full w-full">
                    <Image
                      src={BRANDING_SIDE_IMAGE}
                      alt="Corporate Branding"
                      fill
                      sizes="88px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <h1 className="mt-7 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
                Corporate Branding
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                At Geecon, honesty, energy &amp; passion are values we take
                seriously and they run through every project we undertake.
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
              <div className="relative h-[150px] w-full overflow-hidden rounded-[24px] sm:h-[190px] md:h-[220px] lg:h-[260px]">
                <Image
                  src={BRANDING_IMAGE}
                  alt="Corporate Branding"
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </AnimateIn>

            <div className="mt-8 grid items-start gap-8 px-2 pb-2 sm:px-4 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <AnimateIn delay={0.15}>
                <StaggerContainer className="space-y-6 text-[15px] leading-8 text-slate-600 dark:text-slate-400">
                  {/* PARAGRAPH 02 */}

                  <StaggerItem>
                    <p>
                      Geecon is a full service creative agency focused on
                      Brand Identity Creation, Brand Experience Design
                      (Retail &amp; Corporate Office Space), &amp;
                      Specialized Web Solutions. We create seamless quality
                      Visual Communication across different mediums that
                      helps inspire &amp; transform business &amp; brands.
                    </p>
                  </StaggerItem>

                  {/* PARAGRAPH 03 */}

                  <StaggerItem>
                    <p>
                      We offer a broad range of strategic and creative
                      services articulated through a successful
                      collaborative model. We provide a comfortable and
                      meaningful service by studying truly necessary
                      creative and marketing functions. We bring about a new
                      experience by acquiring a design motive through
                      investigating into and analyzing the user&apos;s
                      behavior pattern. Through user-centered design
                      thinking, if it&apos;s about communicating visually —
                      we do it.
                    </p>
                  </StaggerItem>

                  {/* PARAGRAPH 04 */}

                  <StaggerItem>
                    <div className="flex items-center gap-4 rounded-[22px] border border-violet-100 bg-violet-50/60 p-4 sm:p-5 dark:border-violet-500/15 dark:bg-violet-500/[0.06]">
                      <span className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                        <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      </span>

                      <p className="text-base font-bold leading-7 tracking-[-0.01em] text-slate-950 dark:text-white">
                        At Geecon our goals are all about helping you meet
                        and beat your goals.
                      </p>
                    </div>
                  </StaggerItem>

                  {/* PARAGRAPH 05 */}

                  <StaggerItem>
                    <p>
                      Always keep in mind to focus on your target
                      audience&apos;s needs and not to focus on the feature
                      of your product. It&apos;s not that your product or
                      service is not awesome, just that your audience needs
                      to feel that you understand them and are aware of
                      their needs, so focusing on how your product can help
                      them is a more engaging and convincing way to convey
                      your message to them.
                    </p>
                  </StaggerItem>

                  {/* PARAGRAPH 06 */}

                  <StaggerItem>
                    <p>
                      It is always better for you to not write your script
                      by yourself as you know too much about your company and
                      this much of information can distract the attention of
                      the viewer and your main vision can be missed out.
                      Keep your script clear and concise with some sizzle in
                      it a good script should include.
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
                <div className="brand-grad relative overflow-hidden rounded-[28px] p-5 shadow-[0_30px_70px_-30px_rgba(91,33,182,.5)]">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-violet-300/40 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />

                  {/* Small Branding Icon */}

                  <div className="relative mb-5 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/30 bg-white/[0.14] p-2 backdrop-blur-xl">
                      <div className="relative h-full w-full">
                        <Image
                          src={BRANDING_SIDE_IMAGE}
                          alt="Corporate Branding"
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main Image */}

                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-[20px] border border-white/30 bg-white">
                    <Image
                      src={BRANDING_SIDE_IMAGE}
                      alt="Corporate branding strategy"
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
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </div>
  );
}
