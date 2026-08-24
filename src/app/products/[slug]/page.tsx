import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  Sparkles,
} from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../../components/stagger-container";

/* =========================================================
   TYPES
========================================================= */

type Product = {
  id: string;
  title: string;
  slug: string;
  bannerImage: string | null;
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

function getTextItem(value: unknown): TextItem {
  if (typeof value === "string") {
    return {
      description: value,
    };
  }

  if (
    typeof value === "object" &&
    value !== null
  ) {
    const item = value as Record<
      string,
      unknown
    >;

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

  return {};
}

function getFaqItem(value: unknown): FaqItem {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return {};
  }

  const item = value as Record<
    string,
    unknown
  >;

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

  const product = await getProduct(slug);

  if (!product || !product.isActive) {
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

  const faqs = Array.isArray(product.faqs)
    ? product.faqs
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="relative flex-1 overflow-hidden">
        {/* =====================================================
            GLOBAL BACKGROUND
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.18] dark:opacity-[0.06]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.18),transparent_50%)]" />

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#071326] text-white">
          <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[140px]" />

          <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            {/* Back */}

            <AnimateIn>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                Back to Products
              </Link>
            </AnimateIn>

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              {/* LEFT */}

              <div>
                <AnimateIn delay={0.05}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5">
                    <Sparkles
                      size={14}
                      className="text-blue-400"
                    />

                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                      Geecon Product
                    </span>
                  </div>
                </AnimateIn>

                <AnimatedHeading
                  text={product.title}
                  as="h1"
                  delay={0.1}
                  className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
                />

                {product.shortDescription && (
                  <AnimateIn delay={0.2}>
                    <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                      {
                        product.shortDescription
                      }
                    </p>
                  </AnimateIn>
                )}

                <AnimateIn delay={0.3}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#overview"
                      className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500"
                    >
                      Explore Product

                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </a>

                    {product.brochureUrl && (
                      <a
                        href={
                          product.brochureUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                      >
                        <Download size={16} />

                        Brochure
                      </a>
                    )}
                  </div>
                </AnimateIn>
              </div>

              {/* RIGHT IMAGE */}

              <AnimateIn
                delay={0.15}
                direction="left"
              >
                <div className="relative">
                  <div className="absolute -inset-8 rounded-[40px] bg-blue-500/10 blur-3xl" />

                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-3 shadow-2xl backdrop-blur">
                    <div className="relative h-[260px] overflow-hidden rounded-[20px] bg-white sm:h-[360px] lg:h-[420px]">
                      {product.bannerImage ? (
                        <Image
                          src={
                            product.bannerImage
                          }
                          alt={product.title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-contain p-5 sm:p-7"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50">
                          <span className="text-lg font-semibold text-slate-400">
                            {product.title}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* =====================================================
            OVERVIEW
        ====================================================== */}

        {product.description && (
          <section
            id="overview"
            className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-16 sm:px-8 sm:py-20 lg:px-10"
          >
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <AnimateIn>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    Product Overview
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    About{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      {product.title}
                    </span>
                  </h2>

                  <span className="mt-5 block h-1 w-12 rounded-full bg-blue-500" />
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-7 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 sm:p-9">
                  <p className="whitespace-pre-line text-base leading-8 text-slate-600 dark:text-slate-400">
                    {product.description}
                  </p>
                </div>
              </AnimateIn>
            </div>
          </section>
        )}

        {/* =====================================================
            FEATURES
        ====================================================== */}

        {features.length > 0 && (
          <section className="relative border-y border-slate-100 bg-slate-50/70 px-6 py-16 dark:border-slate-900 dark:bg-slate-900/30 sm:px-8 sm:py-20 lg:px-10">
            <div className="mx-auto max-w-7xl">
              <AnimateIn>
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    Capabilities
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Product Features
                  </h2>
                </div>
              </AnimateIn>

              <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {features.map(
                  (feature, index) => {
                    const item =
                      getTextItem(feature);

                    return (
                      <StaggerItem
                        key={index}
                      >
                        <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400">
                            <Check
                              size={18}
                            />
                          </div>

                          {item.title && (
                            <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">
                              {item.title}
                            </h3>
                          )}

                          {item.description && (
                            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
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
          </section>
        )}

        {/* =====================================================
            BENEFITS
        ====================================================== */}

        {benefits.length > 0 && (
          <section className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
            <AnimateIn>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  Why Choose It
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
                  Key Benefits
                </h2>
              </div>
            </AnimateIn>

            <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map(
                (benefit, index) => {
                  const item =
                    getTextItem(benefit);

                  return (
                    <StaggerItem key={index}>
                      <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-start gap-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <CheckCircle2
                              size={18}
                            />
                          </div>

                          <div>
                            {item.title && (
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {
                                  item.title
                                }
                              </h3>
                            )}

                            {item.description && (
                              <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                {
                                  item.description
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                }
              )}
            </StaggerContainer>
          </section>
        )}

        {/* =====================================================
            DYNAMIC SECTIONS
        ====================================================== */}

        {sections.length > 0 && (
          <section className="relative overflow-hidden bg-[#071326] px-6 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
            <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

            <div className="relative mx-auto max-w-5xl">
              <AnimateIn>
                <div className="mb-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                    More Details
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold">
                    Explore{" "}
                    {product.title}
                  </h2>
                </div>
              </AnimateIn>

              <StaggerContainer className="space-y-4">
                {sections.map(
                  (section, index) => {
                    const item =
                      getTextItem(section);

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
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-7">
                          <div className="flex gap-5">
                            <span className="font-mono text-xs text-blue-400">
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <div>
                              {item.title && (
                                <h3 className="text-xl font-semibold">
                                  {
                                    item.title
                                  }
                                </h3>
                              )}

                              {item.description && (
                                <p className="mt-3 leading-8 text-slate-300">
                                  {
                                    item.description
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  }
                )}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* =====================================================
            FAQs
        ====================================================== */}

        {faqs.length > 0 && (
          <section className="relative mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
            <AnimateIn>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  Need Help?
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
            </AnimateIn>

            <StaggerContainer className="mt-10 space-y-4">
              {faqs.map((faq, index) => {
                const item =
                  getFaqItem(faq);

                if (
                  !item.question &&
                  !item.answer
                ) {
                  return null;
                }

                return (
                  <StaggerItem key={index}>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      {item.question && (
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {
                            item.question
                          }
                        </h3>
                      )}

                      {item.answer && (
                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </section>
        )}

        {/* =====================================================
            FINAL CTA / BROCHURE
        ====================================================== */}

        <section className="relative border-t border-slate-100 px-6 py-14 dark:border-slate-900 sm:px-8 lg:px-10">
          <AnimateIn>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[28px] bg-gradient-to-r from-[#0b3476] via-blue-700 to-[#0865c8] px-7 py-8 text-white shadow-xl shadow-blue-900/10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <div>
                <p className="text-sm text-blue-100">
                  Interested in{" "}
                  {product.title}?
                </p>

                <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                  Let&apos;s discuss how it can
                  support your business.
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5"
                >
                  Contact Us

                  <ArrowRight size={16} />
                </Link>

                {product.brochureUrl && (
                  <a
                    href={product.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                  >
                    <Download size={16} />

                    Download Brochure
                  </a>
                )}
              </div>
            </div>
          </AnimateIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}