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
    return await prisma.service.findUnique({
      where: {
        slug,
      },
    });
  } catch (error) {
    console.error(
      "Service detail fetch error:",
      error
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

  const service =
    await getService(slug);

  if (
    !service ||
    !service.isActive
  ) {
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
            HERO / SERVICE INTRO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-slate-100 bg-white dark:border-white/[0.06] dark:bg-[#07111f]">
          {/* Background decoration */}

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

          <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:px-10 lg:pb-16 lg:pt-14">
            {/* Small tag */}

            {service.tag && (
              <AnimateIn>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600 dark:border-blue-400/15 dark:bg-blue-400/[0.08] dark:text-blue-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

                  {service.tag}
                </div>
              </AnimateIn>
            )}

            {/* Title */}

            <AnimatedHeading
              text={service.title}
              as="h1"
              className="max-w-4xl text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-950 dark:text-white sm:text-4xl lg:text-[46px]"
            />

            {/* Description */}

            {service.description && (
              <AnimateIn delay={0.08}>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-[15px] sm:leading-8">
                  {
                    service.description
                  }
                </p>
              </AnimateIn>
            )}

            {/* Banner */}

            <AnimateIn delay={0.15}>
              {service.bannerImage ? (
                <div className="group relative mt-8 overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-100 shadow-[0_25px_70px_rgba(15,23,42,0.08)] dark:border-white/[0.08] dark:bg-[#0b1728] dark:shadow-[0_25px_80px_rgba(0,0,0,0.28)]">
                  <div className="relative h-[230px] w-full sm:h-[290px] md:h-[330px] lg:h-[360px]">
                    <Image
                      src={
                        service.bannerImage
                      }
                      alt={
                        service.title
                      }
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/[0.05] via-transparent to-white/[0.03] dark:from-black/20 dark:to-transparent" />
                </div>
              ) : (
                <div
                  className={`relative mt-8 flex h-[230px] items-center justify-end overflow-hidden rounded-[28px] bg-gradient-to-r ${gradient} px-8 shadow-[0_25px_70px_rgba(15,23,42,0.12)] sm:h-[290px] sm:px-12 lg:h-[330px]`}
                >
                  <div className="absolute inset-0 opacity-20">
                    {[
                      ...Array(4),
                    ].map(
                      (
                        _,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="absolute rounded-full border-[16px] border-white/40"
                          style={{
                            width: `${
                              160 -
                              index *
                                26
                            }px`,

                            height: `${
                              160 -
                              index *
                                26
                            }px`,

                            left: `${
                              10 +
                              index *
                                12
                            }%`,

                            top: `${
                              18 +
                              (index %
                                2) *
                                16
                            }%`,
                          }}
                        />
                      )
                    )}
                  </div>

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-[24px] border border-white/20 bg-white/15 shadow-xl backdrop-blur-sm sm:h-28 sm:w-28">
                    <CheckCircle2
                      size={48}
                      className="text-white"
                      strokeWidth={
                        1.5
                      }
                    />
                  </div>
                </div>
              )}
            </AnimateIn>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <section className="relative bg-[#fbfcfe] py-12 dark:bg-[#07111f] sm:py-14 lg:py-16">
          <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 lg:px-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-12">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="min-w-0">
              {/* INTRO */}

              {intro.length >
                0 && (
                <AnimateIn delay={0.08}>
                  <div className="space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-8">
                    {intro.map(
                      (
                        paragraph,
                        index
                      ) => (
                        <p
                          key={`intro-${index}`}
                        >
                          {
                            paragraph
                          }
                        </p>
                      )
                    )}
                  </div>
                </AnimateIn>
              )}

              {/* CHALLENGES */}

              {challenges.length >
                0 && (
                <AnimateIn delay={0.1}>
                  <div className="mt-8 rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.035)] dark:border-white/[0.07] dark:bg-[#0b1728] dark:shadow-none sm:p-6">
                    <StaggerContainer className="grid gap-3 sm:grid-cols-2">
                      {challenges.map(
                        (
                          point,
                          index
                        ) => (
                          <StaggerItem
                            key={
                              index
                            }
                          >
                            <div className="group flex h-full items-start gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.03]">
                              <span className="mt-[5px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <CheckCircle2
                                  size={
                                    12
                                  }
                                  strokeWidth={
                                    2.2
                                  }
                                />
                              </span>

                              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {
                                  point
                                }
                              </p>
                            </div>
                          </StaggerItem>
                        )
                      )}
                    </StaggerContainer>
                  </div>
                </AnimateIn>
              )}

              {/* MIDDLE PARAGRAPHS */}

              {middle.length >
                0 && (
                <AnimateIn delay={0.12}>
                  <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-8">
                    {middle.map(
                      (
                        paragraph,
                        index
                      ) => (
                        <p
                          key={`middle-${index}`}
                        >
                          {
                            paragraph
                          }
                        </p>
                      )
                    )}
                  </div>
                </AnimateIn>
              )}

              {/* SECTIONS */}

              {sections.length >
                0 && (
                <StaggerContainer className="mt-9 space-y-5">
                  {sections.map(
                    (
                      section,
                      index
                    ) => (
                      <StaggerItem
                        key={
                          index
                        }
                      >
                        <div className="group rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,23,42,0.06)] dark:border-white/[0.07] dark:bg-[#0b1728] dark:shadow-none dark:hover:border-blue-400/20 sm:p-6">
                          {section.title && (
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <ChevronRight
                                  size={
                                    16
                                  }
                                />
                              </div>

                              <h2 className="pt-1 text-[15px] font-semibold leading-6 text-slate-950 dark:text-white sm:text-base">
                                {
                                  section.title
                                }
                              </h2>
                            </div>
                          )}

                          {section.body && (
                            <p
                              className={`whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-8 ${
                                section.title
                                  ? "mt-4 pl-0 sm:pl-11"
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

              {/* BENEFITS */}

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
                            key={
                              index
                            }
                          >
                            <div className="flex h-full items-start gap-3 rounded-[16px] border border-slate-200/80 bg-white px-4 py-3.5 transition-all duration-300 hover:border-blue-200 hover:shadow-[0_8px_25px_rgba(15,23,42,0.05)] dark:border-white/[0.07] dark:bg-[#0b1728] dark:hover:border-blue-400/20">
                              <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm dark:bg-blue-500">
                                <CheckCircle2
                                  size={
                                    12
                                  }
                                  strokeWidth={
                                    2.5
                                  }
                                />
                              </span>

                              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {
                                  point
                                }
                              </p>
                            </div>
                          </StaggerItem>
                        )
                      )}
                    </StaggerContainer>
                  </div>
                </AnimateIn>
              )}

              {/* CLOSING */}

              {service.closing && (
                <AnimateIn delay={0.16}>
                  <div className="mt-8 border-l-2 border-blue-500 pl-4">
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-8">
                      {
                        service.closing
                      }
                    </p>
                  </div>
                </AnimateIn>
              )}

              {/* COVERAGE */}

              {coverage.length >
                0 && (
                <AnimateIn delay={0.18}>
                  <div className="mt-10">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                      Our service
                      coverage areas
                      include:
                    </h2>

                    <div className="mt-2 h-[2px] w-10 rounded-full bg-blue-500" />

                    <StaggerContainer className="mt-5 grid gap-3 sm:grid-cols-2">
                      {coverage.map(
                        (
                          item,
                          index
                        ) => (
                          <StaggerItem
                            key={
                              index
                            }
                          >
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white px-4 py-3 dark:border-white/[0.07] dark:bg-[#0b1728]">
                              <CheckCircle2
                                size={
                                  16
                                }
                                className="shrink-0 text-blue-600 dark:text-blue-400"
                              />

                              <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {
                                  item
                                }
                              </span>
                            </div>
                          </StaggerItem>
                        )
                      )}
                    </StaggerContainer>
                  </div>
                </AnimateIn>
              )}

              {/* QA */}

              {qa.length >
                0 && (
                <AnimateIn delay={0.2}>
                  <div className="mt-9 space-y-5 rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.035)] dark:border-white/[0.07] dark:bg-[#0b1728] dark:shadow-none sm:p-6">
                    {qa.map(
                      (
                        paragraph,
                        index
                      ) => (
                        <p
                          key={`qa-${index}`}
                          className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px] sm:leading-8"
                        >
                          {
                            paragraph
                          }
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
              <div className="relative">
                <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-blue-500/[0.06] blur-[55px] dark:bg-blue-500/[0.10]" />

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