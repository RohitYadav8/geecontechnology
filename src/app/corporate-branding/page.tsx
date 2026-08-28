import Image from "next/image";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";

/* =========================================================
   IMAGES
========================================================= */

const BRANDING_IMAGE = "/branding.png";

const BRANDING_SIDE_IMAGE =
  "/corporate-branding-1.png";

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
            BACKGROUND GLOWS
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_10%_15%,rgba(59,130,246,.12),transparent_30%),radial-gradient(circle_at_85%_45%,rgba(37,99,235,.08),transparent_32%)]
          "
        />

        {/* =================================================
            HERO / BANNER
        ================================================= */}

        <section className="relative px-5 pb-10 pt-12 sm:px-7 sm:pt-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Heading */}

            <AnimateIn>
              <div className="mb-7">
                <h1
                  className="
                    text-3xl
                    font-semibold
                    tracking-[-0.04em]
                    text-slate-950
                    dark:text-white
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  Corporate Branding
                </h1>

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
                BRANDING BANNER
            ================================================= */}

            <AnimateIn delay={0.1}>
              <div
                className="
                  group
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
                    overflow-hidden
                    sm:h-[220px]
                    md:h-[250px]
                    lg:h-[285px]
                    xl:h-[300px]
                  "
                >
                  <Image
                    src={BRANDING_IMAGE}
                    alt="Corporate Branding"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
                    className="
                      object-cover
                      object-center
                      transition-transform
                      duration-700
                      group-hover:scale-[1.01]
                    "
                  />
                </div>

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-[24px]
                    ring-1
                    ring-inset
                    ring-white/10
                  "
                />
              </div>
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
                lg:grid-cols-[minmax(0,1fr)_340px]
                xl:gap-12
              "
            >
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <AnimateIn delay={0.15}>
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
                      -left-20
                      -top-20
                      h-56
                      w-56
                      rounded-full
                      bg-blue-500/[0.05]
                      blur-3xl
                    "
                  />

                  <div
                    className="
                      relative
                      space-y-6
                      text-sm
                      leading-8
                      text-slate-600
                      dark:text-slate-400
                      sm:text-[15px]
                    "
                  >
                    <p>
                      At Geecon, honesty, energy &amp;
                      passion are values we take seriously
                      and they run through every project we
                      undertake.
                    </p>

                    <p>
                      Geecon is a full service creative
                      agency focused on Brand Identity
                      Creation, Brand Experience Design
                      (Retail &amp; Corporate Office Space),
                      &amp; Specialized Web Solutions. We
                      create seamless quality Visual
                      Communication across different mediums
                      that helps inspire &amp; transform
                      business &amp; brands.
                    </p>

                    <p>
                      We offer a broad range of strategic and
                      creative services articulated through
                      a successful collaborative model. We
                      provide a comfortable and meaningful
                      service by studying truly necessary
                      creative and marketing functions. We
                      bring about a new experience by
                      acquiring a design motive through
                      investigating into and analyzing the
                      user&apos;s behavior pattern. Through
                      user-centered design thinking, if
                      it&apos;s about communicating visually
                      — we do it.
                    </p>

                    <p>
                      At Geecon our goals are all about
                      helping you meet and beat your goals.
                    </p>

                    <p>
                      Always keep in mind to focus on your
                      target audience&apos;s needs and not to
                      focus on the feature of your product.
                      It&apos;s not that your product or
                      service is not awesome, just that your
                      audience needs to feel that you
                      understand them and are aware of their
                      needs, so focusing on how your product
                      can help them is a more engaging and
                      convincing way to convey your message
                      to them.
                    </p>

                    <p>
                      It is always better for you to not
                      write your script by yourself as you
                      know too much about your company and
                      this much of information can distract
                      the attention of the viewer and your
                      main vision can be missed out. Keep
                      your script clear and concise with some
                      sizzle in it a good script should
                      include.
                    </p>
                  </div>
                </div>
              </AnimateIn>

              {/* =================================================
                  RIGHT IMAGE
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
                <div className="mx-auto w-full max-w-[360px]">
                  <div
                    className="
                      group
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
                      sm:p-6
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

                    <div
                      className="
                        relative
                        aspect-square
                        w-full
                        overflow-hidden
                        rounded-[20px]
                        bg-slate-50
                        dark:bg-slate-950/60
                      "
                    >
                      <Image
                        src={BRANDING_SIDE_IMAGE}
                        alt="Corporate branding strategy"
                        fill
                        sizes="(max-width: 1024px) 360px, 360px"
                        className="
                          object-contain
                          p-5
                          transition-transform
                          duration-700
                          group-hover:scale-[1.03]
                        "
                      />
                    </div>
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