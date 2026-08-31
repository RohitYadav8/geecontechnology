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
   BROCHURE GRADIENTS

   Har product ka gradient uske banner / branding ke
   according alag rahega.
========================================================= */

const productBrochureGradients: Record<
  string,
  string
> = {
  "global-hr":
    "from-[#49266f] via-[#684195] to-[#8b67b5]",

  facewebinar:
    "from-[#006d84] via-[#0284a8] to-[#1d9fc2]",

  "gift-aid-claims":
    "from-[#173c8f] via-[#2563b8] to-[#3b82d0]",

  "invoice-made-simple":
    "from-[#3730a3] via-[#4f46e5] to-[#2563eb]",

  "crm-360":
    "from-[#076b57] via-[#059669] to-[#0d9488]",

  "bulk-sms-solution":
    "from-[#54228c] via-[#7135ab] to-[#9333c5]",

  "my-projects":
    "from-[#a44d0a] via-[#d26a0b] to-[#ed8614]",

  "cms-avatar":
    "from-[#9f2525] via-[#d3362d] to-[#e35b26]",

  "listing-based-portals":
    "from-[#a94310] via-[#d85a0b] to-[#e99216]",

  syncmydocs:
    "from-[#075985] via-[#087eac] to-[#2563c4]",

  data360:
    "from-[#0f625e] via-[#108781] to-[#169ca5]",
};

const defaultBrochureGradient =
  "from-[#1a2b4a] via-[#254b7a] to-[#2563a8]";

/* =========================================================
   SUBTLE CONTENT ACCENTS
========================================================= */

type ProductAccent = {
  card: string;
  border: string;
  icon: string;
  glow: string;
};

const productAccents: Record<
  string,
  ProductAccent
> = {
  "global-hr": {
    card:
      "bg-[#f7f8ff] dark:bg-slate-900/70",
    border:
      "border-[#ebe9f5] dark:border-slate-800",
    icon:
      "bg-[#eee9f8] text-[#684195] dark:bg-[#684195]/15 dark:text-[#bba2dc]",
    glow: "bg-[#8060ad]/10",
  },

  facewebinar: {
    card:
      "bg-cyan-50/50 dark:bg-slate-900/70",
    border:
      "border-cyan-100 dark:border-slate-800",
    icon:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400",
    glow: "bg-cyan-400/10",
  },

  "gift-aid-claims": {
    card:
      "bg-blue-50/50 dark:bg-slate-900/70",
    border:
      "border-blue-100 dark:border-slate-800",
    icon:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    glow: "bg-blue-400/10",
  },

  "invoice-made-simple": {
    card:
      "bg-indigo-50/50 dark:bg-slate-900/70",
    border:
      "border-indigo-100 dark:border-slate-800",
    icon:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
    glow: "bg-indigo-400/10",
  },

  "crm-360": {
    card:
      "bg-emerald-50/50 dark:bg-slate-900/70",
    border:
      "border-emerald-100 dark:border-slate-800",
    icon:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    glow: "bg-emerald-400/10",
  },

  "bulk-sms-solution": {
    card:
      "bg-violet-50/50 dark:bg-slate-900/70",
    border:
      "border-violet-100 dark:border-slate-800",
    icon:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    glow: "bg-violet-400/10",
  },

  "my-projects": {
    card:
      "bg-amber-50/50 dark:bg-slate-900/70",
    border:
      "border-amber-100 dark:border-slate-800",
    icon:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    glow: "bg-amber-400/10",
  },

  "cms-avatar": {
    card:
      "bg-red-50/50 dark:bg-slate-900/70",
    border:
      "border-red-100 dark:border-slate-800",
    icon:
      "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    glow: "bg-red-400/10",
  },

  "listing-based-portals": {
    card:
      "bg-orange-50/50 dark:bg-slate-900/70",
    border:
      "border-orange-100 dark:border-slate-800",
    icon:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
    glow: "bg-orange-400/10",
  },

  syncmydocs: {
    card:
      "bg-sky-50/50 dark:bg-slate-900/70",
    border:
      "border-sky-100 dark:border-slate-800",
    icon:
      "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
    glow: "bg-sky-400/10",
  },

  data360: {
    card:
      "bg-teal-50/50 dark:bg-slate-900/70",
    border:
      "border-teal-100 dark:border-slate-800",
    icon:
      "bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400",
    glow: "bg-teal-400/10",
  },
};

const defaultAccent: ProductAccent = {
  card:
    "bg-[#f7f8ff] dark:bg-slate-900/70",

  border:
    "border-slate-200 dark:border-slate-800",

  icon:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

  glow:
    "bg-blue-400/10",
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
      `${baseUrl}/api/products/${encodeURIComponent(
        slug
      )}`,
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

  const brochureGradient =
    productBrochureGradients[
      product.slug
    ] ?? defaultBrochureGradient;

  const accent =
    productAccents[
      product.slug
    ] ?? defaultAccent;

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

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* =====================================================
            BANNER
        ====================================================== */}

        {product.bannerImage && (
          <section className="relative w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
            <div className="relative h-[210px] w-full sm:h-[260px] md:h-[300px] lg:h-[330px] xl:h-[350px]">
              <Image
                src={product.bannerImage}
                alt={product.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </section>
        )}

        {/* =====================================================
            PRODUCT INTRO
        ====================================================== */}

        <section className="relative bg-white dark:bg-slate-950">
          <div
            className={`pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full blur-[130px] ${accent.glow}`}
          />

          <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 lg:px-10">
            <AnimateIn>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                All products
              </Link>
            </AnimateIn>

            <div className="mt-7 flex items-center gap-5">
              {productLogo && (
                <AnimateIn>
                  <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 sm:h-[82px] sm:w-[82px]">
                    <Image
                      src={productLogo}
                      alt={`${product.title} logo`}
                      fill
                      sizes="82px"
                      className="object-contain p-3"
                    />
                  </div>
                </AnimateIn>
              )}

              <AnimatedHeading
                text={product.title}
                as="h1"
                delay={0.05}
                className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-[42px]"
              />
            </div>

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
            CONTENT + BROCHURE FORM
        ====================================================== */}

        <section className="relative pb-16">
          <div className="mx-auto grid max-w-7xl items-start gap-7 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-10 xl:grid-cols-[minmax(0,1fr)_320px]">
            {/* =================================================
                LEFT
            ================================================= */}

            <div className="min-w-0 space-y-7">
              {/* ===============================================
                  OVERVIEW
              =============================================== */}

              {(product.description ||
                sections.length > 0) && (
                <AnimateIn>
                  <div
                    className={`relative overflow-hidden rounded-[26px] border p-6 shadow-[0_12px_45px_rgba(15,23,42,0.035)] sm:p-8 ${accent.card} ${accent.border}`}
                  >
                    <div
                      className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[100px] ${accent.glow}`}
                    />

                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent.icon}`}
                        >
                          <CheckCircle2
                            size={17}
                          />
                        </div>

                        <h2 className="text-[16px] font-semibold text-slate-950 dark:text-white">
                          Overview
                        </h2>
                      </div>

                      {product.description && (
                        <p className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px]">
                          {
                            product.description
                          }
                        </p>
                      )}

                      {sections.length >
                        0 && (
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
                                  .length ===
                                  0
                              ) {
                                return null;
                              }

                              return (
                                <StaggerItem
                                  key={
                                    index
                                  }
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
                                      <ul className="mt-3 space-y-1.5">
                                        {item.features.map(
                                          (
                                            feature,
                                            featureIndex
                                          ) => (
                                            <li
                                              key={
                                                featureIndex
                                              }
                                              className="flex items-start gap-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300"
                                            >
                                              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />

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

              {/* ===============================================
                  FEATURES
              =============================================== */}

              {features.length > 0 && (
                <AnimateIn>
                  <div
                    className={`relative overflow-hidden rounded-[26px] border p-6 shadow-[0_12px_45px_rgba(15,23,42,0.035)] sm:p-8 ${accent.card} ${accent.border}`}
                  >
                    <div
                      className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[100px] ${accent.glow}`}
                    />

                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent.icon}`}
                        >
                          <ListChecks
                            size={17}
                          />
                        </div>

                        <h2 className="text-[16px] font-semibold text-slate-950 dark:text-white">
                          Key features
                        </h2>
                      </div>

                      <StaggerContainer className="mt-6 space-y-5">
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
                                key={
                                  index
                                }
                              >
                                <div className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                                  {item.title && (
                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                      {
                                        item.title
                                      }
                                    </h3>
                                  )}

                                  {item.description && (
                                    <p
                                      className={
                                        item.title
                                          ? "mt-1"
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

              {/* ===============================================
                  BENEFITS
              =============================================== */}

              {benefits.length > 0 && (
                <AnimateIn>
                  <div
                    className={`relative overflow-hidden rounded-[26px] border p-6 shadow-[0_12px_45px_rgba(15,23,42,0.035)] sm:p-8 ${accent.card} ${accent.border}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent.icon}`}
                      >
                        <CheckCircle2
                          size={17}
                        />
                      </div>

                      <h2 className="text-[16px] font-semibold text-slate-950 dark:text-white">
                        Benefits
                      </h2>
                    </div>

                    <StaggerContainer className="mt-6 space-y-5">
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
                              <div className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                                {item.title && (
                                  <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {
                                      item.title
                                    }
                                  </h3>
                                )}

                                {item.description && (
                                  <p
                                    className={
                                      item.title
                                        ? "mt-1"
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

              

              {faqs.length > 0 && (
                <AnimateIn>
                  <div
                    className={`relative overflow-hidden rounded-[26px] border p-6 shadow-[0_12px_45px_rgba(15,23,42,0.035)] sm:p-8 ${accent.card} ${accent.border}`}
                  >
                    <StaggerContainer className="space-y-6">
                      {faqs.map(
                        (
                          faq,
                          index
                        ) => {
                          const item =
                            getFaqItem(
                              faq
                            );

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
                              <div>
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

            

            <AnimateIn
              delay={0.15}
              direction="left"
              className="lg:sticky lg:top-24"
            >
              <BrochureForm
                productId={product.id}
                gradient={
                  brochureGradient
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