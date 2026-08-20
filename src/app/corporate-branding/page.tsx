import Image from "next/image";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";

/* =========================================================
   IMAGES
========================================================= */

const BRANDING_IMAGE = "/corporate-branding.png";
const BRANDING_SIDE_IMAGE = "/corporate-branding-1.png";

/* =========================================================
   PAGE
========================================================= */

export default function CorporateBrandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        <section className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
          {/* =================================================
              HEADING
          ================================================= */}

          <AnimateIn>
            <div>
              <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl">
                Corporate Branding
              </h1>

              <span className="mt-3 block h-0.5 w-10 rounded-full bg-blue-500" />
            </div>
          </AnimateIn>

          {/* =================================================
              BANNER IMAGE
          ================================================= */}

          <AnimateIn delay={0.1}>
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="relative h-[200px] w-full sm:h-[260px] md:h-[320px] lg:h-[380px]">
                <Image
                  src={BRANDING_IMAGE}
                  alt="Corporate Branding"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                  className="object-contain p-4 sm:p-6"
                />
              </div>
            </div>
          </AnimateIn>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-14">
            {/* ===============================================
                LEFT CONTENT
            =============================================== */}

            <AnimateIn delay={0.15}>
              <div className="space-y-5 text-sm leading-8 text-slate-600 dark:text-slate-400">
                <p>
                  At Geecon, honesty, energy &amp; passion are values we take
                  seriously and they run through every project we undertake.
                </p>

                <p>
                  Geecon is a full service creative agency focused on Brand
                  Identity Creation, Brand Experience Design (Retail &amp;
                  Corporate Office Space), &amp; Specialized Web Solutions. We
                  create seamless quality Visual Communication across different
                  mediums that helps inspire &amp; transform business &amp;
                  brands.
                </p>

                <p>
                  We offer a broad range of strategic and creative services
                  articulated through a successful collaborative model. We
                  provide a comfortable and meaningful service by studying truly
                  necessary creative and marketing functions. We bring about a
                  new experience by acquiring a design motive through
                  investigating into and analyzing the user&apos;s behavior
                  pattern. Through user-centered design thinking, if it&apos;s
                  about communicating visually — we do it.
                </p>

                <p>
                  At Geecon our goals are all about helping you meet and beat
                  your goals.
                </p>

                <p>
                  Always keep in mind to focus on your target audience&apos;s
                  needs and not to focus on the feature of your product.
                  It&apos;s not that your product or service is not awesome,
                  just that your audience needs to feel that you understand them
                  and are aware of their needs, so focusing on how your product
                  can help them is a more engaging and convincing way to convey
                  your message to them.
                </p>

                <p>
                  It is always better for you to not write your script by
                  yourself as you know too much about your company and this much
                  of information can distract the attention of the viewer and
                  your main vision can be missed out. Keep your script clear and
                  concise with some sizzle in it a good script should include.
                </p>
              </div>
            </AnimateIn>

            {/* ===============================================
                RIGHT IMAGE
            =============================================== */}

            <AnimateIn
              delay={0.2}
              direction="left"
              className="lg:self-start"
            >
              <div className="mx-auto w-full max-w-[360px]">
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <Image
                    src={BRANDING_SIDE_IMAGE}
                    alt="Corporate branding strategy"
                    fill
                    sizes="(max-width: 1024px) 360px, 360px"
                    className="object-contain p-6"
                  />
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}