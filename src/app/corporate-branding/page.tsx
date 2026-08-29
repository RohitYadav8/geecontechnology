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
            HERO / BANNER
        ===================================================== */}

        <section className="relative">
          <AnimateIn delay={0.05}>
            <div
              className="
                relative
                h-[150px]
                w-full
                overflow-hidden
                sm:h-[180px]
                md:h-[210px]
                lg:h-[240px]
              "
            >
              <Image
                src={BRANDING_IMAGE}
                alt="Corporate Branding"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Bottom Fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-16
                  bg-gradient-to-t
                  from-white
                  via-white/40
                  to-transparent
                  dark:from-[#080e1a]
                  dark:via-[#080e1a]/35
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
                {/* SIDE IMAGE ICON */}

                <div
                  className="
                    flex
                    h-[76px]
                    w-[76px]
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-purple-200/70
                    bg-white/95
                    p-2
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
                      src={BRANDING_SIDE_IMAGE}
                      alt="Corporate Branding"
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
                  Corporate Branding
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
                At Geecon, honesty, energy &amp; passion are values we take
                seriously and they run through every project we undertake.
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
                    {/* Decorative Glow */}

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

                          <p className="pt-1 font-semibold text-slate-900 dark:text-white">
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
                    {/* Top Glow */}

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

                    {/* Bottom Glow */}

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

                    {/* Small Branding Icon */}

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
                        src={BRANDING_SIDE_IMAGE}
                        alt="Corporate branding strategy"
                        fill
                        sizes="340px"
                        className="object-contain p-5"
                      />
                    </div>
                  </div>
                </MouseGlow>
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