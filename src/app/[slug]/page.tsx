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
import { FloatingBlob } from "../../../components/floating-blob";
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
    "from-blue-600 via-violet-500 to-cyan-500";

  const brochureGradientFrom =
    service.brochureGradientFrom?.trim() ||
    "#2563eb";

  const brochureGradientVia =
    service.brochureGradientVia?.trim() ||
    "#7c5cf6";

  const brochureGradientTo =
    service.brochureGradientTo?.trim() ||
    "#06b6d4";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#060b16] dark:text-white">
      <Navbar />

      <main className="flex-1 overflow-x-clip">
        {/* =====================================================
            HERO
        ====================================================== */}

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

          {/* =====================================================
              TITLE / DESCRIPTION
          ====================================================== */}

          <div className="relative mx-auto max-w-5xl">
            {service.tag && (
              <AnimateIn>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />

                  {service.tag}
                </div>
              </AnimateIn>
            )}

            <AnimatedHeading
              text={service.title}
              as="h1"
              delay={0.05}
              className="mx-auto max-w-5xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]"
            />

            {service.description && (
              <AnimateIn delay={0.08}>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                  {service.description}
                </p>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-20 sm:-mt-32 sm:px-6 lg:px-10 lg:pb-24">
          <div className="rounded-[32px] border border-slate-100 bg-white p-3 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-4 dark:border-white/[0.07] dark:bg-[#0b1220]">
            {/* =====================================================
                BANNER IMAGE
            ====================================================== */}

            <AnimateIn delay={0.05}>
              {service.bannerImage ||
              service.darkBannerImage ? (
                <div className="relative w-full overflow-hidden rounded-[24px] bg-slate-100 dark:bg-[#081525]">
                  {/* LIGHT THEME BANNER */}

                  <div className="relative h-[150px] w-full dark:hidden sm:h-[220px] md:h-[260px] lg:h-[300px]">
                    <Image
                      src={
                        service.bannerImage ||
                        service.darkBannerImage!
                      }
                      alt={service.title}
                      fill
                      priority
                      sizes="(max-width: 1280px) 100vw, 1240px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* DARK THEME BANNER */}

                  <div className="relative hidden h-[150px] w-full dark:block sm:h-[220px] md:h-[260px] lg:h-[300px]">
                    <Image
                      src={
                        service.darkBannerImage ||
                        service.bannerImage!
                      }
                      alt={service.title}
                      fill
                      priority
                      sizes="(max-width: 1280px) 100vw, 1240px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/[0.06] via-transparent to-transparent dark:from-black/[0.12]" />
                </div>
              ) : (
                /* =================================================
                    FALLBACK BANNER
                ================================================= */

                <div
                  className={`relative flex h-[150px] w-full items-center justify-end overflow-hidden rounded-[24px] bg-gradient-to-r ${gradient} px-6 sm:h-[220px] sm:px-10 md:h-[260px] lg:h-[300px] lg:px-16`}
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

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-[18px] border border-white/30 bg-white/15 shadow-xl backdrop-blur-sm sm:h-20 sm:w-20">
                    <CheckCircle2
                      size={34}
                      className="text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              )}
            </AnimateIn>

            <div className="grid items-start gap-10 px-3 pb-6 pt-8 sm:px-6 sm:pb-8 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-12">
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <div className="min-w-0">
                {/* =================================================
                    INTRO
                ================================================= */}

                {intro.length > 0 && (
                  <AnimateIn delay={0.08}>
                    <div className="space-y-4 text-[15px] leading-8 text-slate-600 dark:text-slate-300">
                      {intro.map(
                        (
                          paragraph,
                          index
                        ) => (
                          <p
                            key={`intro-${index}`}
                            className={
                              index === 0
                                ? "text-base font-semibold text-slate-900 sm:text-lg dark:text-white"
                                : undefined
                            }
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
                    <div className="mt-8 rounded-[26px] border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5 dark:border-white/[0.07] dark:bg-white/[0.03]">
                      <StaggerContainer className="grid gap-2 sm:grid-cols-2 sm:gap-x-4">
                        {challenges.map(
                          (
                            point,
                            index
                          ) => (
                            <StaggerItem
                              key={index}
                            >
                              <div className="group flex h-full items-start gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-white dark:hover:bg-white/[0.04]">
                                <span className="brand-grad mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-white shadow-md shadow-violet-500/20">
                                  <CheckCircle2
                                    size={13}
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
                    <div className="mt-8 space-y-4 text-[15px] leading-8 text-slate-600 dark:text-slate-300">
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
                  <StaggerContainer className="mt-9 space-y-4">
                    {sections.map(
                      (
                        section,
                        index
                      ) => (
                        <StaggerItem
                          key={index}
                        >
                          <div className="group rounded-[26px] border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] sm:p-6 dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-violet-400/30">
                            {section.title && (
                              <div className="flex items-start gap-4">
                                <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white shadow-lg shadow-violet-500/25">
                                  <ChevronRight
                                    size={17}
                                  />
                                </div>

                                <h2 className="pt-1.5 text-lg font-extrabold leading-7 tracking-[-0.02em] text-slate-950 dark:text-white">
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
                                    ? "mt-3 sm:pl-14"
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
                    <div className="mt-9">
                      <StaggerContainer className="grid gap-3 sm:grid-cols-2">
                        {benefits.map(
                          (
                            point,
                            index
                          ) => (
                            <StaggerItem
                              key={index}
                            >
                              <div className="flex h-full items-start gap-3 rounded-[18px] border border-slate-200/80 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_20px_50px_-30px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-violet-400/30">
                                <span className="brand-grad mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white shadow-md shadow-violet-500/20">
                                  <CheckCircle2
                                    size={13}
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
                    <div className="mt-9 rounded-[22px] border border-violet-100 bg-violet-50/60 p-5 sm:p-6 dark:border-violet-400/15 dark:bg-violet-500/[0.06]">
                      <div className="brand-grad mb-3 h-[3px] w-10 rounded-full" />

                      <p className="text-[15px] font-medium leading-8 text-slate-700 dark:text-slate-200">
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
                    <div className="mt-10">
                      <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-[28px] dark:text-white">
                        Our service coverage areas include:
                      </h2>

                      <div className="brand-grad mt-3 h-[3px] w-12 rounded-full" />

                      <StaggerContainer className="mt-5 grid gap-3 sm:grid-cols-2">
                        {coverage.map(
                          (
                            item,
                            index
                          ) => (
                            <StaggerItem
                              key={index}
                            >
                              <div className="flex items-center gap-3 rounded-[18px] border border-slate-200/80 bg-white px-4 py-3.5 transition-all duration-300 hover:border-violet-200 dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-violet-400/30">
                                <CheckCircle2
                                  size={18}
                                  className="shrink-0 text-violet-600 dark:text-violet-400"
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
                    <div className="mt-9 space-y-4 rounded-[26px] border border-slate-200/80 bg-slate-50/70 p-5 sm:p-6 dark:border-white/[0.07] dark:bg-white/[0.03]">
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
                <div className="relative mx-auto w-full max-w-[360px] lg:mx-0 lg:max-w-none">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
