import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ListChecks,
} from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../../components/stagger-container";
import { BrochureForm } from "../../../../components/brochure-form";
import { prisma } from "../../../../lib/prisma";

/* =========================================================
   TYPES
========================================================= */

type Product = {
  id: string;
  title: string;
  slug: string;

  bannerImage: string | null;
  logoImage: string | null;

  shortDescription: string | null;
  description: string | null;

  features: unknown;
  benefits: unknown;
  sections: unknown;
  faqs: unknown;

  brochureUrl: string | null;

  brochureGradientFrom: string | null;
  brochureGradientVia: string | null;
  brochureGradientTo: string | null;

  isActive: boolean;
};

type TextItem = {
  title?: string;
  description?: string;
};

type SectionItem = {
  title?: string;
  description?: string;
  features: string[];
};

type FaqItem = {
  question?: string;
  answer?: string;
};

/* =========================================================
   FETCH PRODUCT
========================================================= */

async function getProduct(
  slug: string
): Promise<Product | null> {
  try {
    const product =
      await prisma.product.findUnique({
        where: {
          slug,
        },

        select: {
          id: true,
          title: true,
          slug: true,

          bannerImage: true,
          logoImage: true,

          shortDescription: true,
          description: true,

          features: true,
          benefits: true,
          sections: true,
          faqs: true,

          brochureUrl: true,

          brochureGradientFrom: true,
          brochureGradientVia: true,
          brochureGradientTo: true,

          isActive: true,
        },
      });

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    console.error(
      "Product detail database error:",
      error
    );

    return null;
  }
}

/* =========================================================
   HELPERS
========================================================= */

function getTextItem(
  value: unknown
): TextItem {
  if (typeof value === "string") {
    return {
      description: value,
    };
  }

  if (
    typeof value !== "object" ||
    value === null
  ) {
    return {};
  }

  const item =
    value as Record<string, unknown>;

  return {
    title:
      typeof item.title === "string"
        ? item.title
        : undefined,

    description:
      typeof item.description === "string"
        ? item.description
        : typeof item.body === "string"
          ? item.body
          : typeof item.text === "string"
            ? item.text
            : undefined,
  };
}

function getSectionItem(
  value: unknown
): SectionItem {
  if (typeof value === "string") {
    return {
      description: value,
      features: [],
    };
  }

  if (
    typeof value !== "object" ||
    value === null
  ) {
    return {
      features: [],
    };
  }

  const item =
    value as Record<string, unknown>;

  const nestedFeatures = Array.isArray(
    item.features
  )
    ? item.features.filter(
        (
          feature
        ): feature is string =>
          typeof feature === "string" &&
          feature.trim().length > 0
      )
    : [];

  return {
    title:
      typeof item.title === "string"
        ? item.title
        : undefined,

    description:
      typeof item.description === "string"
        ? item.description
        : typeof item.body === "string"
          ? item.body
          : typeof item.text === "string"
            ? item.text
            : undefined,

    features: nestedFeatures,
  };
}

function getFaqItem(
  value: unknown
): FaqItem {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return {};
  }

  const item =
    value as Record<string, unknown>;

  return {
    question:
      typeof item.question === "string"
        ? item.question
        : undefined,

    answer:
      typeof item.answer === "string"
        ? item.answer
        : undefined,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const product =
    await getProduct(slug);

  if (
    !product ||
    !product.isActive
  ) {
    notFound();
  }

  const features = Array.isArray(
    product.features
  )
    ? product.features
    : [];

  const benefits = Array.isArray(
    product.benefits
  )
    ? product.benefits
    : [];

  const sections = Array.isArray(
    product.sections
  )
    ? product.sections
    : [];

  const faqs = Array.isArray(
    product.faqs
  )
    ? product.faqs
    : [];

  const productLogo =
    product.logoImage ||
    product.bannerImage;

  /*
   * These colors already come from Admin/DB.
   * They are used throughout the detail page so future
   * products do not need slug-specific code.
   */

  const gradientFrom =
    product.brochureGradientFrom?.trim() ||
    "#7c3aed";

  const gradientVia =
    product.brochureGradientVia?.trim() ||
    "#6366f1";

  const gradientTo =
    product.brochureGradientTo?.trim() ||
    "#2563eb";

  const productGradient =
    `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`;

  const softProductGradient =
    `linear-gradient(135deg, ${gradientFrom}12, ${gradientVia}0d, ${gradientTo}12)`;


  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="flex-1 overflow-x-clip">
        {/* =====================================================
            HERO / PRODUCT INTRO
        ===================================================== */}

        <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-12 text-center text-white sm:px-8 sm:pb-44 sm:pt-16 lg:px-10">
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

          <div className="relative mx-auto max-w-5xl">
            {/* BACK */}

            <AnimateIn>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.22]"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                All products
              </Link>
            </AnimateIn>

            {/* TITLE */}

            <div className="mt-8 flex flex-col items-center gap-6">
              {productLogo && (
                <AnimateIn>
                  <div
                    className="relative flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] border-[3px] bg-white p-2 shadow-[0_20px_50px_-15px_rgba(30,27,75,0.55)] sm:h-[96px] sm:w-[96px]"
                    style={{
                      borderColor: "rgba(255,255,255,0.6)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.07]"
                      style={{
                        background: productGradient,
                      }}
                    />

                    <Image
                      src={productLogo}
                      alt={`${product.title} logo`}
                      fill
                      sizes="96px"
                      className="relative object-contain p-3"
                    />
                  </div>
                </AnimateIn>
              )}

              <AnimatedHeading
                text={product.title}
                as="h1"
                delay={0.05}
                className="mx-auto max-w-5xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]"
              />
            </div>

            {/* SHORT DESCRIPTION */}

            {product.shortDescription && (
              <AnimateIn delay={0.1}>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                  {product.shortDescription}
                </p>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* =====================================================
            BANNER + CONTENT + BROCHURE
        ===================================================== */}

        <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-20 sm:-mt-32 sm:px-6 lg:px-10 lg:pb-24">
          <div className="rounded-[32px] border border-slate-100 bg-white p-3 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] sm:p-4 dark:border-white/[0.07] dark:bg-[#0b1220]">
            {/* =================================================
                PRODUCT BANNER
            ================================================= */}

            {product.bannerImage && (
              <AnimateIn delay={0.05}>
                <div className="relative w-full overflow-hidden rounded-[24px] bg-white dark:bg-[#07101f]">
                  <div className="relative aspect-[91/20] w-full">
                    <Image
                      src={product.bannerImage}
                      alt={product.title}
                      fill
                      priority
                      sizes="(max-width: 1280px) 100vw, 1240px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-slate-900/[0.05] dark:ring-white/[0.06]" />
                </div>
              </AnimateIn>
            )}

            <div className="grid items-start gap-8 px-1 pb-3 pt-6 sm:px-3 sm:pb-5 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-10 lg:px-5 xl:grid-cols-[minmax(0,1fr)_370px]">
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <div className="min-w-0 space-y-6">
                {/* =================================================
                    OVERVIEW
                ================================================= */}

                {(product.description ||
                  sections.length > 0) && (
                  <AnimateIn>
                    <div className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-white/[0.07] dark:bg-white/[0.02]">
                      <div className="brand-grad absolute inset-x-0 top-0 h-[3px]" />

                      <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-violet-400/[0.08] blur-[100px]" />

                      <div className="relative">
                        {/* HEADING */}

                        <div className="flex items-center gap-4">
                          <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                            <CheckCircle2
                              size={20}
                            />
                          </div>

                          <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-[28px] dark:text-white">
                            Overview
                          </h2>
                        </div>

                        {/* DESCRIPTION */}

                        {product.description && (
                          <p className="mt-6 whitespace-pre-line text-[15px] leading-8 text-slate-600 dark:text-slate-300">
                            {product.description}
                          </p>
                        )}

                        {/* SECTIONS */}

                        {sections.length > 0 && (
                          <StaggerContainer className="mt-8 space-y-7">
                            {sections.map(
                              (
                                section,
                                index
                              ) => {
                                const item =
                                  getSectionItem(
                                    section
                                  );

                                if (
                                  !item.title &&
                                  !item.description &&
                                  item.features
                                    .length === 0
                                ) {
                                  return null;
                                }

                                return (
                                  <StaggerItem
                                    key={index}
                                  >
                                    <div className="border-l-[3px] border-violet-300 pl-5 dark:border-violet-400/40">
                                      {item.title && (
                                        <h3 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                                          {
                                            item.title
                                          }
                                        </h3>
                                      )}

                                      {item.description && (
                                        <p
                                          className={`whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-[15px] dark:text-slate-300 ${
                                            item.title
                                              ? "mt-2"
                                              : ""
                                          }`}
                                        >
                                          {
                                            item.description
                                          }
                                        </p>
                                      )}

                                      {item.features
                                        .length >
                                        0 && (
                                        <ul className="mt-4 space-y-2.5">
                                          {item.features.map(
                                            (
                                              feature,
                                              featureIndex
                                            ) => (
                                              <li
                                                key={
                                                  featureIndex
                                                }
                                                className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                                              >
                                                <span className="brand-grad mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-white">
                                                  <CheckCircle2
                                                    size={11}
                                                    strokeWidth={2.5}
                                                  />
                                                </span>

                                                <span>
                                                  {
                                                    feature
                                                  }
                                                </span>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  </StaggerItem>
                                );
                              }
                            )}
                          </StaggerContainer>
                        )}
                      </div>
                    </div>
                  </AnimateIn>
                )}

                {/* =================================================
                    FEATURES
                ================================================= */}

                {features.length > 0 && (
                  <AnimateIn>
                    <div className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-white/[0.07] dark:bg-white/[0.02]">
                      <div className="brand-grad absolute inset-x-0 top-0 h-[3px]" />

                      <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]" />

                      <div className="relative">
                        <div className="flex items-center gap-4">
                          <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                            <ListChecks
                              size={20}
                            />
                          </div>

                          <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-[28px] dark:text-white">
                            Key features
                          </h2>
                        </div>

                        <StaggerContainer className="mt-7 grid gap-4 sm:grid-cols-2">
                          {features.map(
                            (
                              feature,
                              index
                            ) => {
                              const item =
                                getTextItem(
                                  feature
                                );

                              if (
                                !item.title &&
                                !item.description
                              ) {
                                return null;
                              }

                              return (
                                <StaggerItem
                                  key={index}
                                >
                                  <div className="h-full rounded-[20px] border border-slate-200/80 bg-slate-50/70 p-5 text-sm leading-6 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-violet-400/30">
                                    {item.title && (
                                      <div className="flex items-start gap-3">
                                        <span
                                          className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                                          style={{
                                            background:
                                              productGradient,
                                          }}
                                        />

                                        <h3 className="font-bold text-slate-950 dark:text-white">
                                          {
                                            item.title
                                          }
                                        </h3>
                                      </div>
                                    )}

                                    {item.description && (
                                      <p
                                        className={
                                          item.title
                                            ? "mt-2"
                                            : ""
                                        }
                                      >
                                        {
                                          item.description
                                        }
                                      </p>
                                    )}
                                  </div>
                                </StaggerItem>
                              );
                            }
                          )}
                        </StaggerContainer>
                      </div>
                    </div>
                  </AnimateIn>
                )}

                {/* =================================================
                    BENEFITS
                ================================================= */}

                {benefits.length > 0 && (
                  <AnimateIn>
                    <div className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-white/[0.07] dark:bg-white/[0.02]">
                      <div className="brand-grad absolute inset-x-0 top-0 h-[3px]" />

                      <div className="flex items-center gap-4">
                        <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25">
                          <CheckCircle2
                            size={20}
                          />
                        </div>

                        <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-[28px] dark:text-white">
                          Benefits
                        </h2>
                      </div>

                      <StaggerContainer className="mt-7 grid gap-4 sm:grid-cols-2">
                        {benefits.map(
                          (
                            benefit,
                            index
                          ) => {
                            const item =
                              getTextItem(
                                benefit
                              );

                            if (
                              !item.title &&
                              !item.description
                            ) {
                              return null;
                            }

                            return (
                              <StaggerItem
                                key={index}
                              >
                                <div
                                  className="h-full rounded-[20px] border border-slate-200/80 p-5 text-sm leading-6 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:text-slate-300 dark:hover:border-violet-400/30"
                                  style={{
                                    background:
                                      softProductGradient,
                                  }}
                                >
                                  {item.title && (
                                    <div className="flex items-start gap-3">
                                      <span
                                        className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                                        style={{
                                          background:
                                            gradientVia,
                                        }}
                                      />

                                      <h3 className="font-bold text-slate-950 dark:text-white">
                                        {
                                          item.title
                                        }
                                      </h3>
                                    </div>
                                  )}

                                  {item.description && (
                                    <p
                                      className={
                                        item.title
                                          ? "mt-2"
                                          : ""
                                      }
                                    >
                                      {
                                        item.description
                                      }
                                    </p>
                                  )}
                                </div>
                              </StaggerItem>
                            );
                          }
                        )}
                      </StaggerContainer>
                    </div>
                  </AnimateIn>
                )}

                {/* =================================================
                    FAQ
                ================================================= */}

                {faqs.length > 0 && (
                  <AnimateIn>
                    <div className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-white/[0.07] dark:bg-white/[0.02]">
                      <div className="brand-grad absolute inset-x-0 top-0 h-[3px]" />

                      <StaggerContainer className="divide-y divide-slate-100 dark:divide-white/[0.07]">
                        {faqs.map(
                          (faq, index) => {
                            const item =
                              getFaqItem(faq);

                            if (
                              !item.question &&
                              !item.answer
                            ) {
                              return null;
                            }

                            return (
                              <StaggerItem
                                key={index}
                              >
                                <div className="py-5 first:pt-0 last:pb-0">
                                  {item.question && (
                                    <h3 className="text-base font-bold tracking-[-0.01em] text-slate-950 dark:text-white">
                                      {
                                        item.question
                                      }
                                    </h3>
                                  )}

                                  {item.answer && (
                                    <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                                      {
                                        item.answer
                                      }
                                    </p>
                                  )}
                                </div>
                              </StaggerItem>
                            );
                          }
                        )}
                      </StaggerContainer>
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
                <BrochureForm
                  productId={product.id}
                  gradientFrom={
                    product.brochureGradientFrom
                  }
                  gradientVia={
                    product.brochureGradientVia
                  }
                  gradientTo={
                    product.brochureGradientTo
                  }
                />
              </AnimateIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
