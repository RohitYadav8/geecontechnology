import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { prisma } from "../../../lib/prisma";

import { products } from "../../../lib/products-data";
import {
  productDetails,
  fallbackProductDetail,
} from "../../../lib/product-details";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { MouseGlow } from "../../../components/mouse-glow";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";
import { BrochureForm } from "../../../components/brochure-form";

/* -------------------------------------------------------------------------- */
/*                              SOCIAL ICONS                                  */
/* -------------------------------------------------------------------------- */

function FacebookIcon({
  size = 15,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

function LinkedinIcon({
  size = 15,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

function TwitterIcon({
  size = 15,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                              JSON HELPERS                                  */
/* -------------------------------------------------------------------------- */

function getStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string"
  );
}

function getSections(
  value: unknown
): {
  title: string;
  body: string;
}[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item) =>
        typeof item === "object" &&
        item !== null
    )
    .map((item) => {
      const section =
        item as Record<string, unknown>;

      return {
        title:
          typeof section.title === "string"
            ? section.title
            : "",

        body:
          typeof section.body === "string"
            ? section.body
            : "",
      };
    })
    .filter(
      (section) =>
        section.title.trim() ||
        section.body.trim()
    );
}

/* -------------------------------------------------------------------------- */
/*                         STATIC ROUTE PARAMETERS                            */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  const dbServices =
    await prisma.service.findMany({
      where: {
        isActive: true,
      },

      select: {
        slug: true,
      },
    });

  const serviceParams =
    dbServices.map((service) => ({
      slug: service.slug,
    }));

  const productParams =
    products.map((product) => ({
      slug: product.href.replace(
        /^\/+/,
        ""
      ),
    }));

  return [
    ...serviceParams,
    ...productParams,
  ];
}

/* -------------------------------------------------------------------------- */
/*                              PAGE COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default async function SlugPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  /* ------------------------------------------------------------------------ */
  /*                         DATABASE SERVICE                                 */
  /* ------------------------------------------------------------------------ */

  const service =
    await prisma.service.findFirst({
      where: {
        slug,
        isActive: true,
      },
    });

  /* ------------------------------------------------------------------------ */
  /*                              PRODUCTS                                    */
  /* ------------------------------------------------------------------------ */

  const product = products.find(
    (item) =>
      item.href === `/${slug}`
  );

  /* ======================================================================== */
  /*                              SERVICE PAGE                                */
  /* ======================================================================== */

  if (service) {
    const detail = {
      title: service.title,

      gradient:
        service.gradient ||
        "from-blue-600 to-cyan-400",

      bannerImage:
        service.bannerImage ||
        undefined,

      intro: getStringArray(
        service.intro
      ),

      challenges: getStringArray(
        service.challenges
      ),

      middle: getStringArray(
        service.middle
      ),

      benefits: getStringArray(
        service.benefits
      ),

      closing:
        service.closing || "",

      coverage: getStringArray(
        service.coverage
      ),

      qa: getStringArray(
        service.qa
      ),

      sections: getSections(
        service.sections
      ),
    };

    return (
      <div className="flex min-h-screen flex-col overflow-hidden bg-white dark:bg-slate-950">
        <Navbar />

        <main className="relative flex-1 overflow-hidden">
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
              bg-[size:48px_48px]
              opacity-[0.16]
              dark:opacity-[0.07]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top,rgba(59,130,246,.14),transparent_58%)]
            "
          />

          <FloatingBlob
            className="-right-20 top-14 h-72 w-72"
            color="bg-blue-400/10"
            duration={16}
          />

          <FloatingBlob
            className="-left-20 top-[620px] h-72 w-72"
            color="bg-cyan-300/10"
            duration={20}
          />

          <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10 lg:px-8">
            {/* Premium hero */}
            <AnimateIn delay={0.05}>
              <MouseGlow className="rounded-[28px]">
                <div
                  className={`
                    relative
                    overflow-hidden
                    rounded-[28px]
                    bg-gradient-to-br
                    ${detail.gradient}
                    p-[2px]
                    shadow-[0_24px_80px_-32px_rgba(15,23,42,0.28)]
                  `}
                >
                  <div
                    className="
                      relative
                      min-h-[300px]
                      overflow-hidden
                      rounded-[26px]
                      bg-white
                      dark:bg-slate-950
                      sm:min-h-[360px]
                      lg:min-h-[420px]
                    "
                  >
                    {detail.bannerImage ? (
                      <Image
                        src={detail.bannerImage}
                        alt={detail.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 1280px"
                        className="object-cover object-center"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${detail.gradient}`}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-slate-950 dark:via-slate-950/15" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent dark:from-slate-950/30" />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                      <div className="flex items-end gap-4 sm:gap-5">
                        <div
                          className={`
                            flex
                            h-16
                            w-16
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            ${detail.gradient}
                            text-white
                            shadow-lg
                            sm:h-20
                            sm:w-20
                          `}
                        >
                          <CheckCircle2 size={30} strokeWidth={1.7} />
                        </div>

                        <div className="min-w-0 pb-1">
                          <AnimatedHeading
                            text={detail.title}
                            as="h1"
                            className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MouseGlow>
            </AnimateIn>

            {/* Content + brochure */}
            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
              <div className="space-y-6">
                {(detail.intro.length > 0 ||
                  detail.middle.length > 0 ||
                  detail.closing) && (
                  <AnimateIn delay={0.1}>
                    <MouseGlow className="rounded-3xl">
                      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-7">
                        <div className="mb-5 flex items-center gap-3">
                          <div
                            className={`h-9 w-1.5 rounded-full bg-gradient-to-b ${detail.gradient}`}
                          />
                          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                            Overview
                          </h2>
                        </div>

                        <StaggerContainer className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                          {detail.intro.map((paragraph, index) => (
                            <StaggerItem key={`intro-${index}`}>
                              <p>{paragraph}</p>
                            </StaggerItem>
                          ))}

                          {detail.middle.map((paragraph, index) => (
                            <StaggerItem key={`middle-${index}`}>
                              <p>{paragraph}</p>
                            </StaggerItem>
                          ))}

                          {detail.closing && (
                            <StaggerItem>
                              <p>{detail.closing}</p>
                            </StaggerItem>
                          )}
                        </StaggerContainer>
                      </div>
                    </MouseGlow>
                  </AnimateIn>
                )}

                {detail.challenges.length > 0 && (
                  <AnimateIn delay={0.14}>
                    <MouseGlow className="rounded-3xl">
                      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-7">
                        <div className="mb-5 flex items-center gap-3">
                          <div
                            className={`h-9 w-1.5 rounded-full bg-gradient-to-b ${detail.gradient}`}
                          />
                          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                            Challenges
                          </h2>
                        </div>

                        <StaggerContainer className="space-y-3">
                          {detail.challenges.map((point, index) => (
                            <StaggerItem key={`challenge-${index}`}>
                              <div className="group flex gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
                                <span
                                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${detail.gradient} text-[10px] font-semibold text-white`}
                                >
                                  {index + 1}
                                </span>
                                <span>{point}</span>
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </MouseGlow>
                  </AnimateIn>
                )}

                {detail.benefits.length > 0 && (
                  <AnimateIn delay={0.18}>
                    <MouseGlow className="rounded-3xl">
                      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-7">
                        <div className="mb-5 flex items-center gap-3">
                          <div
                            className={`h-9 w-1.5 rounded-full bg-gradient-to-b ${detail.gradient}`}
                          />
                          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                            Benefits
                          </h2>
                        </div>

                        <StaggerContainer className="grid gap-3 sm:grid-cols-2">
                          {detail.benefits.map((point, index) => (
                            <StaggerItem key={`benefit-${index}`}>
                              <div className="flex h-full items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
                                <CheckCircle2
                                  size={17}
                                  className="mt-1 shrink-0 text-blue-600 dark:text-blue-400"
                                />
                                <span>{point}</span>
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </MouseGlow>
                  </AnimateIn>
                )}

                {detail.coverage.length > 0 && (
                  <AnimateIn delay={0.22}>
                    <MouseGlow className="rounded-3xl">
                      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-7">
                        <div className="mb-5 flex items-center gap-3">
                          <div
                            className={`h-9 w-1.5 rounded-full bg-gradient-to-b ${detail.gradient}`}
                          />
                          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                            Our service coverage areas include:
                          </h2>
                        </div>

                        <StaggerContainer className="grid gap-3 sm:grid-cols-2">
                          {detail.coverage.map((item, index) => (
                            <StaggerItem key={`coverage-${index}`}>
                              <div className="flex h-full items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
                                <CheckCircle2
                                  size={17}
                                  className="mt-1 shrink-0 text-blue-600 dark:text-blue-400"
                                />
                                <span>{item}</span>
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </MouseGlow>
                  </AnimateIn>
                )}

                {detail.sections.map((section, index) => (
                  <AnimateIn key={`section-${index}`} delay={0.24}>
                    <MouseGlow className="rounded-3xl">
                      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-7">
                        {section.title && (
                          <div className="mb-4 flex items-center gap-3">
                            <div
                              className={`h-9 w-1.5 rounded-full bg-gradient-to-b ${detail.gradient}`}
                            />
                            <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                              {section.title}
                            </h2>
                          </div>
                        )}

                        {section.body && (
                          <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {section.body}
                          </p>
                        )}
                      </div>
                    </MouseGlow>
                  </AnimateIn>
                ))}

                {detail.qa.length > 0 && (
                  <AnimateIn delay={0.28}>
                    <MouseGlow className="rounded-3xl">
                      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-7">
                        <div className="mb-5 flex items-center gap-3">
                          <div
                            className={`h-9 w-1.5 rounded-full bg-gradient-to-b ${detail.gradient}`}
                          />
                          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                            Frequently asked questions
                          </h2>
                        </div>

                        <StaggerContainer className="space-y-3">
                          {detail.qa.map((paragraph, index) => (
                            <StaggerItem key={`qa-${index}`}>
                              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
                                {paragraph}
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </MouseGlow>
                  </AnimateIn>
                )}
              </div>

              {/* Dynamic brochure */}
              <AnimateIn
                delay={0.2}
                direction="left"
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <BrochureForm gradient={detail.gradient} />
              </AnimateIn>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  /* ======================================================================== */
  /*                              PRODUCT PAGE                                */
  /* ======================================================================== */

  if (product) {
    const detail =
      productDetails[product.id] ??
      fallbackProductDetail(
        product.name,
        product.tagline
      );

    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
        <Navbar />

        <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20">
          {/* Background glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-96
              w-96
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blue-500/10
              blur-3xl
            "
          />

          <AnimateIn className="relative w-full max-w-md">
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-2xl
                shadow-slate-900/10
                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-black/40
              "
            >
              {/* ========================================================== */}
              {/* Product Header                                             */}
              {/* ========================================================== */}

              <div
                className="
                  border-b
                  border-slate-100
                  bg-gradient-to-b
                  from-slate-50
                  to-white
                  px-8
                  pb-5
                  pt-7
                  dark:border-slate-800
                  dark:from-slate-900
                  dark:to-slate-900
                "
              >
                <p
                  className="
                    text-center
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-blue-600
                    dark:text-blue-400
                  "
                >
                  {detail.eyebrow}
                </p>
              </div>

              {/* ========================================================== */}
              {/* Product Content                                            */}
              {/* ========================================================== */}

              <div className="px-8 py-9 text-center">
                <h1
                  className="
                    text-xl
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-900
                    dark:text-white
                  "
                >
                  {detail.headline}
                </h1>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {detail.description}
                </p>

                {/* Social Links */}

                <div
                  className="
                    mt-8
                    flex
                    justify-center
                    gap-3
                  "
                >
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      text-slate-600
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-blue-500
                      hover:bg-blue-500
                      hover:text-white
                      dark:border-slate-700
                      dark:text-slate-400
                      dark:hover:border-blue-500
                      dark:hover:bg-blue-500
                      dark:hover:text-white
                    "
                  >
                    <FacebookIcon />
                  </a>

                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      text-slate-600
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-blue-500
                      hover:bg-blue-500
                      hover:text-white
                      dark:border-slate-700
                      dark:text-slate-400
                      dark:hover:border-blue-500
                      dark:hover:bg-blue-500
                      dark:hover:text-white
                    "
                  >
                    <LinkedinIcon />
                  </a>

                  <a
                    href="#"
                    aria-label="Twitter"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      text-slate-600
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-blue-500
                      hover:bg-blue-500
                      hover:text-white
                      dark:border-slate-700
                      dark:text-slate-400
                      dark:hover:border-blue-500
                      dark:hover:bg-blue-500
                      dark:hover:text-white
                    "
                  >
                    <TwitterIcon />
                  </a>
                </div>
              </div>

              {/* ========================================================== */}
              {/* Back Button                                                */}
              {/* ========================================================== */}

              <Link
                href="/products"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-[#1a2b4a]
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#0d1830]
                  dark:bg-blue-600
                  dark:hover:bg-blue-500
                "
              >
                <span>
                  Back to Products
                </span>

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </AnimateIn>
        </main>

        <Footer />
      </div>
    );
  }

  /* ======================================================================== */
  /*                               404                                         */
  /* ======================================================================== */

  notFound();
}