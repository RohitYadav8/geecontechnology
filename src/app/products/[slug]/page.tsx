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
import {
  StaggerContainer,
  StaggerItem,
} from "../../../../components/stagger-container";
import { BrochureForm } from "../../../../components/brochure-form";

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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  try {
    const response = await fetch(
      `${baseUrl}/api/products/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(
      "Product detail fetch error:",
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
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#020817]">
      <Navbar />

      <main className="flex-1">
        {/* =====================================================
            PRODUCT BANNER
        ===================================================== */}

        {product.bannerImage && (
          <section className="relative overflow-hidden border-b border-slate-100 bg-white dark:border-slate-800/70 dark:bg-[#07101f]">
            {/* SUBTLE DYNAMIC GLOW */}

            <div
              className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full opacity-[0.08] blur-[100px]"
              style={{
                background: gradientFrom,
              }}
            />

            <div
              className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full opacity-[0.08] blur-[100px]"
              style={{
                background: gradientTo,
              }}
            />

            {/* =================================================
                FULL WIDTH RESPONSIVE BANNER
            ================================================= */}

            <AnimateIn delay={0.05}>
              <div className="relative w-full overflow-hidden bg-white dark:bg-[#07101f]">
                <div className="relative aspect-[91/20] w-full">
                  <Image
                    src={product.bannerImage}
                    alt={product.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/[0.02] via-transparent to-transparent dark:from-black/[0.10]" />
              </div>
            </AnimateIn>
          </section>
        )}

        {/* =====================================================
            PRODUCT INTRO
        ===================================================== */}

        <section className="relative overflow-hidden bg-white dark:bg-[#020817]">
          {/* DYNAMIC BACKGROUND */}

          <div
            className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-20"
            style={{
              background: softProductGradient,
            }}
          />

          <div
            className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full opacity-[0.08] blur-[110px]"
            style={{
              background: gradientFrom,
            }}
          />

          <div className="relative mx-auto max-w-7xl px-5 pb-11 pt-7 sm:px-8 lg:px-10">
            {/* BACK */}

            <AnimateIn>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                All products
              </Link>
            </AnimateIn>

            {/* TITLE */}

            <div className="mt-7 flex items-center gap-4 sm:gap-5">
              {productLogo && (
                <AnimateIn>
                  <div
                    className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] border bg-white p-2 shadow-[0_15px_40px_rgba(15,23,42,0.08)] dark:bg-slate-900 sm:h-[82px] sm:w-[82px]"
                    style={{
                      borderColor: `${gradientFrom}28`,
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
                      sizes="82px"
                      className="relative object-contain p-3"
                    />
                  </div>
                </AnimateIn>
              )}

              <AnimatedHeading
                text={product.title}
                as="h1"
                delay={0.05}
                className="text-3xl font-bold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-4xl lg:text-[42px]"
              />
            </div>

            {/* SHORT DESCRIPTION */}

            {product.shortDescription && (
              <AnimateIn delay={0.1}>
                <p className="mt-7 max-w-4xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-[15px]">
                  {product.shortDescription}
                </p>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* =====================================================
            CONTENT + BROCHURE
        ===================================================== */}

        <section className="relative bg-white pb-20 dark:bg-[#020817]">
          <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:px-10 xl:grid-cols-[minmax(0,1fr)_370px]">
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
                  <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
                    {/* dynamic accent */}

                    <div
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{
                        background: productGradient,
                      }}
                    />

                    <div
                      className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full opacity-[0.07] blur-[100px]"
                      style={{
                        background: gradientVia,
                      }}
                    />

                    <div className="relative">
                      {/* HEADING */}

                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                          style={{
                            background:
                              productGradient,
                          }}
                        >
                          <CheckCircle2
                            size={17}
                          />
                        </div>

                        <h2 className="text-[16px] font-semibold text-slate-950 dark:text-white">
                          Overview
                        </h2>
                      </div>

                      {/* DESCRIPTION */}

                      {product.description && (
                        <p className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px]">
                          {product.description}
                        </p>
                      )}

                      {/* SECTIONS */}

                      {sections.length > 0 && (
                        <StaggerContainer className="mt-7 space-y-7">
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
                                  <div>
                                    {item.title && (
                                      <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white">
                                        {
                                          item.title
                                        }
                                      </h3>
                                    )}

                                    {item.description && (
                                      <p
                                        className={`whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300 ${
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
                                      <ul className="mt-4 space-y-2">
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
                                              <span
                                                className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full"
                                                style={{
                                                  background:
                                                    gradientVia,
                                                }}
                                              />

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
                  <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
                    <div
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{
                        background: productGradient,
                      }}
                    />

                    <div
                      className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full opacity-[0.06] blur-[100px]"
                      style={{
                        background: gradientTo,
                      }}
                    />

                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                          style={{
                            background:
                              productGradient,
                          }}
                        >
                          <ListChecks
                            size={17}
                          />
                        </div>

                        <h2 className="text-[16px] font-semibold text-slate-950 dark:text-white">
                          Key features
                        </h2>
                      </div>

                      <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2">
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
                                <div className="h-full rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
                                  {item.title && (
                                    <div className="flex items-start gap-2.5">
                                      <span
                                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                                        style={{
                                          background:
                                            gradientVia,
                                        }}
                                      />

                                      <h3 className="font-semibold text-slate-900 dark:text-white">
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
                  <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
                    <div
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{
                        background:
                          productGradient,
                      }}
                    />

                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                        style={{
                          background:
                            productGradient,
                        }}
                      >
                        <CheckCircle2
                          size={17}
                        />
                      </div>

                      <h2 className="text-[16px] font-semibold text-slate-950 dark:text-white">
                        Benefits
                      </h2>
                    </div>

                    <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2">
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
                              <div className="h-full rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
                                {item.title && (
                                  <div className="flex items-start gap-2.5">
                                    <span
                                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                                      style={{
                                        background:
                                          gradientVia,
                                      }}
                                    />

                                    <h3 className="font-semibold text-slate-900 dark:text-white">
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
                  <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
                    <div
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{
                        background:
                          productGradient,
                      }}
                    />

                    <StaggerContainer className="divide-y divide-slate-100 dark:divide-slate-800">
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
                                  <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
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
        </section>
      </main>

      <Footer />
    </div>
  );
}