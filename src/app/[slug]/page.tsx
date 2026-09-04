import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import { prisma } from "../../../lib/prisma";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";
import { BrochureForm } from "../../../components/brochure-form";

type ServiceSection = {
  title: string;
  body: string;
};

// ============================================================
// HELPERS
// ============================================================

function getStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string" &&
      item.trim().length > 0
  );
}

function getSections(
  value: unknown
): ServiceSection[] {
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
        section.title.trim().length > 0 ||
        section.body.trim().length > 0
    );
}

// ============================================================
// GET SERVICE
// ============================================================

async function getService(
  slug: string
) {
  try {
    console.log(
      "========================================"
    );

    console.log(
      "SERVICE PAGE DEBUG"
    );

    console.log(
      "Incoming slug:",
      slug
    );

    const service =
      await prisma.service.findUnique({
        where: {
          slug,
        },
      });

    if (!service) {
      console.log(
        "Service found: NO"
      );

      console.log(
        "No service exists with slug:",
        slug
      );

      console.log(
        "========================================"
      );

      return null;
    }

    console.log(
      "Service found: YES"
    );

    console.log(
      "Service title:",
      service.title
    );

    console.log(
      "Service slug:",
      service.slug
    );

    console.log(
      "Service href:",
      service.href
    );

    console.log(
      "Service isActive:",
      service.isActive
    );

    console.log(
      "========================================"
    );

    return service;
  } catch (error) {
    console.error(
      "========================================"
    );

    console.error(
      "SERVICE DATABASE ERROR"
    );

    console.error(
      "Requested slug:",
      slug
    );

    console.error(
      "Service detail fetch error:",
      error
    );

    console.error(
      "========================================"
    );

    return null;
  }
}

// ============================================================
// PAGE
// ============================================================

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  console.log(
    "Root dynamic route slug:",
    slug
  );

  const service =
    await getService(slug);

  if (!service) {
    console.log(
      `404 REASON: Service "${slug}" was not found in database.`
    );

    notFound();
  }

  if (!service.isActive) {
    console.log(
      `404 REASON: Service "${slug}" exists but isActive is false.`
    );

    notFound();
  }

  const intro =
    getStringArray(service.intro);

  const challenges =
    getStringArray(
      service.challenges
    );

  const middle =
    getStringArray(service.middle);

  const benefits =
    getStringArray(
      service.benefits
    );

  const coverage =
    getStringArray(
      service.coverage
    );

  const qa =
    getStringArray(service.qa);

  const sections =
    getSections(
      service.sections
    );

  const gradient =
    service.gradient?.trim() ||
    "from-[#1a2b4a] via-blue-600 to-cyan-500";

  const brochureGradientFrom =
    service.brochureGradientFrom?.trim() ||
    "#1a2b4a";

  const brochureGradientVia =
    service.brochureGradientVia?.trim() ||
    "#2563eb";

  const brochureGradientTo =
    service.brochureGradientTo?.trim() ||
    "#06b6d4";

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-[#07111f] dark:text-white">
      <Navbar />

      <main className="flex-1">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-slate-100 bg-white dark:border-white/[0.06] dark:bg-[#07111f]">
          {/* =====================================================
              BACKGROUND DECORATION
          ====================================================== */}

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-500/[0.06] blur-[100px] dark:bg-blue-500/[0.12]" />

            <div className="absolute left-[-180px] top-[180px] h-[360px] w-[360px] rounded-full bg-cyan-400/[0.04] blur-[110px] dark:bg-cyan-400/[0.08]" />

            <div
              className="absolute inset-0 opacity-[0.018] dark:opacity-[0.035]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize:
                  "24px 24px",
              }}
            />
          </div>

          {/* =====================================================
              BANNER IMAGE - TOP
          ====================================================== */}

          <AnimateIn delay={0.05}>
            {service.bannerImage ||
            service.darkBannerImage ? (
              <div className="relative w-full overflow-hidden border-b border-slate-200/70 bg-slate-100 dark:border-white/[0.07] dark:bg-[#081525]">
                {/* LIGHT THEME BANNER */}

                <div className="relative h-[145px] w-full dark:hidden sm:h-[165px] md:h-[185px] lg:h-[205px] xl:h-[220px] 2xl:h-[235px]">
                  <Image
                    src={
                      service.bannerImage ||
                      service.darkBannerImage!
                    }
                    alt={service.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* DARK THEME BANNER */}

                <div className="relative hidden h-[145px] w-full dark:block sm:h-[165px] md:h-[185px] lg:h-[205px] xl:h-[220px] 2xl:h-[235px]">
                  <Image
                    src={
                      service.darkBannerImage ||
                      service.bannerImage!
                    }
                    alt={service.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/[0.03] via-transparent to-transparent dark:from-black/[0.08]" />
              </div>
            ) : (
              /* =================================================
                  FALLBACK BANNER
              ================================================= */

              <div
                className={`relative flex h-[145px] w-full items-center justify-end overflow-hidden bg-gradient-to-r ${gradient} px-6 sm:h-[165px] sm:px-10 md:h-[185px] lg:h-[205px] lg:px-16 xl:h-[220px] 2xl:h-[235px]`}
              >
                <div className="absolute inset-0 opacity-20">
                  {[...Array(4)].map(
                    (_, index) => (
                      <div
                        key={index}
                        className="absolute rounded-full border-[12px] border-white/40"
                        style={{
                          width: `${
                            130 -
                            index * 22
                          }px`,
                          height: `${
                            130 -
                            index * 22
                          }px`,
                          left: `${
                            10 +
                            index * 12
                          }%`,
                          top: `${
                            12 +
                            (index % 2) *
                              18
                          }%`,
                        }}
                      />
                    )
                  )}
                </div>

                <div className="relative flex h-16 w-16 items-center justify-center rounded-[18px] border border-white/20 bg-white/15 shadow-xl backdrop-blur-sm sm:h-20 sm:w-20">
                  <CheckCircle2
                    size={34}
                    className="text-white"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            )}
          </AnimateIn>

          {/* =====================================================
              TITLE / DESCRIPTION - BELOW BANNER
          ====================================================== */}

          <div className="relative mx-auto max-w-7xl px-5 pb-7 pt-7 sm:px-8 sm:pb-8 sm:pt-8 lg:px-10 lg:pb-9 lg:pt-9">
            {service.tag && (
              <AnimateIn>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600 dark:border-blue-400/15 dark:bg-blue-400/[0.08] dark:text-blue-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

                  {service.tag}
                </div>
              </AnimateIn>
            )}

            <AnimatedHeading
              text={service.title}
              as="h1"
              className="max-w-4xl text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-950 dark:text-white sm:text-4xl lg:text-[44px]"
            />

            {service.description && (
              <AnimateIn delay={0.08}>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-[15px] sm:leading-7">
                  {service.description}
                </p>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <section className="relative bg-[#fbfcfe] pb-14 pt-8 dark:bg-[#07111f] sm:pb-16 sm:pt-9 lg:pb-20 lg:pt-10">
          <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-9 lg:px-10 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="min-w-0">
              {/* =================================================
                  INTRO
              ================================================= */}

              {intro.length > 0 && (
                <AnimateIn delay={0.08}>
                  <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-8">
                    {intro.map(
                      (
                        paragraph,
                        index
                      ) => (
                        <p
                          key={`intro-${index}`}
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>
                </AnimateIn>
              )}

              {/* =================================================
                  CHALLENGES
              ================================================= */}

              {challenges.length >
                0 && (
                <AnimateIn delay={0.1}>
                  <div className="mt-7 rounded-[18px] border border-slate-200/80 bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.03)] dark:border-white/[0.07] dark:bg-[#0b1728] dark:shadow-none sm:p-5">
                    <StaggerContainer className="grid gap-2 sm:grid-cols-2 sm:gap-x-4">
                      {challenges.map(
                        (
                          point,
                          index
                        ) => (
                          <StaggerItem
                            key={index}
                          >
                            <div className="group flex h-full items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.03]">
                              <span className="mt-[4px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <CheckCircle2
                                  size={12}
                                  strokeWidth={2.2}
                                />
                              </span>

                              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {point}
                              </p>
                            </div>
                          </StaggerItem>
                        )
                      )}
                    </StaggerContainer>
                  </div>
                </AnimateIn>
              )}

              {/* =================================================
                  MIDDLE
              ================================================= */}

              {middle.length > 0 && (
                <AnimateIn delay={0.12}>
                  <div className="mt-7 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-8">
                    {middle.map(
                      (
                        paragraph,
                        index
                      ) => (
                        <p
                          key={`middle-${index}`}
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>
                </AnimateIn>
              )}

              {/* =================================================
                  SECTIONS
              ================================================= */}

              {sections.length >
                0 && (
                <StaggerContainer className="mt-8 space-y-4">
                  {sections.map(
                    (
                      section,
                      index
                    ) => (
                      <StaggerItem
                        key={index}
                      >
                        <div className="group rounded-[18px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.03)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:border-white/[0.07] dark:bg-[#0b1728] dark:shadow-none dark:hover:border-blue-400/20">
                          {section.title && (
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <ChevronRight
                                  size={15}
                                />
                              </div>

                              <h2 className="pt-0.5 text-[15px] font-semibold leading-6 text-slate-950 dark:text-white">
                                {
                                  section.title
                                }
                              </h2>
                            </div>
                          )}

                          {section.body && (
                            <p
                              className={`whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px] ${
                                section.title
                                  ? "mt-3 sm:pl-10"
                                  : ""
                              }`}
                            >
                              {
                                section.body
                              }
                            </p>
                          )}
                        </div>
                      </StaggerItem>
                    )
                  )}
                </StaggerContainer>
              )}

              {/* =================================================
                  BENEFITS
              ================================================= */}

              {benefits.length >
                0 && (
                <AnimateIn delay={0.15}>
                  <div className="mt-8">
                    <StaggerContainer className="grid gap-3 sm:grid-cols-2">
                      {benefits.map(
                        (
                          point,
                          index
                        ) => (
                          <StaggerItem
                            key={index}
                          >
                            <div className="flex h-full items-start gap-3 rounded-[15px] border border-slate-200/80 bg-white px-4 py-3 transition-all duration-300 hover:border-blue-200 hover:shadow-[0_8px_22px_rgba(15,23,42,0.04)] dark:border-white/[0.07] dark:bg-[#0b1728] dark:hover:border-blue-400/20">
                              <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-500">
                                <CheckCircle2
                                  size={12}
                                  strokeWidth={2.5}
                                />
                              </span>

                              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {point}
                              </p>
                            </div>
                          </StaggerItem>
                        )
                      )}
                    </StaggerContainer>
                  </div>
                </AnimateIn>
              )}

              {/* =================================================
                  CLOSING
              ================================================= */}

              {service.closing && (
                <AnimateIn delay={0.16}>
                  <div className="mt-7 border-l-2 border-blue-500 pl-4">
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-8">
                      {
                        service.closing
                      }
                    </p>
                  </div>
                </AnimateIn>
              )}

              {/* =================================================
                  COVERAGE
              ================================================= */}

              {coverage.length >
                0 && (
                <AnimateIn delay={0.18}>
                  <div className="mt-9">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                      Our service coverage areas include:
                    </h2>

                    <div className="mt-2 h-[2px] w-10 rounded-full bg-blue-500" />

                    <StaggerContainer className="mt-4 grid gap-3 sm:grid-cols-2">
                      {coverage.map(
                        (
                          item,
                          index
                        ) => (
                          <StaggerItem
                            key={index}
                          >
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white px-4 py-3 dark:border-white/[0.07] dark:bg-[#0b1728]">
                              <CheckCircle2
                                size={16}
                                className="shrink-0 text-blue-600 dark:text-blue-400"
                              />

                              <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {item}
                              </span>
                            </div>
                          </StaggerItem>
                        )
                      )}
                    </StaggerContainer>
                  </div>
                </AnimateIn>
              )}

              {/* =================================================
                  QA
              ================================================= */}

              {qa.length > 0 && (
                <AnimateIn delay={0.2}>
                  <div className="mt-8 space-y-4 rounded-[18px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.03)] dark:border-white/[0.07] dark:bg-[#0b1728] dark:shadow-none">
                    {qa.map(
                      (
                        paragraph,
                        index
                      ) => (
                        <p
                          key={`qa-${index}`}
                          className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px]"
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>
                </AnimateIn>
              )}
            </div>

            {/* =================================================
                BROCHURE FORM
            ================================================= */}

            <AnimateIn
              delay={0.15}
              direction="left"
              className="lg:sticky lg:top-24"
            >
              <div className="relative mx-auto w-full max-w-[320px] lg:mx-0">
                <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-blue-500/[0.05] blur-[45px] dark:bg-blue-500/[0.08]" />

                <BrochureForm
                  gradientFrom={
                    brochureGradientFrom
                  }
                  gradientVia={
                    brochureGradientVia
                  }
                  gradientTo={
                    brochureGradientTo
                  }
                />
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}