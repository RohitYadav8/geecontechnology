"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";
import { Marquee } from "../../../components/marquee";
import { CtaSection } from "../../../components/cta-section";

/* =========================================================
   PRODUCT TYPE
========================================================= */

type Product = {
  id: string;
  title: string;
  slug: string;

  bannerImage: string | null;
  logoImage: string | null;

  shortDescription: string | null;
  description: string | null;

  // FRONT CARD
  cardTagline: string | null;
  cardSecondaryText: string | null;

  // FLIP CARD
  flipEyebrow: string | null;
  flipTitle: string | null;
  flipDescription: string | null;

  isActive: boolean;
  order: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const activeProducts = Array.isArray(data)
          ? data
              .filter(
                (product: Product) => product.isActive
              )
              .sort(
                (a: Product, b: Product) =>
                  a.order - b.order
              )
          : [];

        setProducts(activeProducts);
      } catch (err) {
        console.error("Products fetch error:", err);

        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="relative flex-1 overflow-hidden">
        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.15] dark:opacity-[0.05]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.16),transparent_55%)]" />

        <FloatingBlob
          className="-right-24 top-20 h-72 w-72"
          color="bg-blue-400/10"
          duration={17}
        />

        <FloatingBlob
          className="-left-20 top-[620px] h-64 w-64"
          color="bg-cyan-400/10"
          duration={21}
        />

        <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          {/* =====================================================
              HERO
          ===================================================== */}

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <AnimateIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 dark:border-blue-900/40 dark:bg-blue-950/30">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    Geecon Products
                  </span>
                </div>
              </AnimateIn>

              <AnimatedHeading
                text="Technology products built for real business challenges"
                as="h1"
                delay={0.08}
                className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.07] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-[56px]"
              />

              <AnimateIn delay={0.16}>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                  Explore practical digital products designed to
                  simplify operations, improve productivity and help
                  businesses scale with confidence.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn
              delay={0.2}
              direction="left"
              className="lg:flex lg:justify-end"
            >
              <div className="inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Boxes size={20} />
                </div>

                <div>
                  <p className="text-2xl font-semibold text-slate-950 dark:text-white">
                    {loading ? "..." : products.length}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Active Products
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* =====================================================
              ERROR
          ===================================================== */}

          {error && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (
            <div className="mt-12">
              <div className="mb-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" />

                Loading products...
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="h-[410px] animate-pulse rounded-[18px] border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
                    />
                  )
                )}
              </div>
            </div>
          ) : products.length === 0 ? (
            /* =================================================
               EMPTY
            ================================================= */

            <div className="mt-12 rounded-3xl border border-slate-200 bg-white/80 p-12 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <Boxes size={24} />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">
                No products available
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Products will appear here once they are added from
                the admin panel.
              </p>
            </div>
          ) : (
            /* =================================================
               PRODUCT GRID
            ================================================= */

            <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <div className="group/card relative h-[410px] [perspective:1500px]">
                    <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] [transform-style:preserve-3d] lg:group-hover/card:[transform:rotateY(180deg)]">
                      {/* =========================================
                          FRONT CARD
                      ========================================= */}

                      <article
                        className="
                          absolute
                          inset-0
                          flex
                          h-full
                          flex-col
                          overflow-hidden
                          rounded-[18px]
                          border
                          border-slate-200
                          bg-white
                          shadow-[0_10px_30px_rgba(15,23,42,0.08)]
                          transition-all
                          duration-500
                          [backface-visibility:hidden]
                          lg:group-hover/card:border-blue-300
                          lg:group-hover/card:shadow-[0_18px_45px_rgba(15,23,42,0.12)]
                          dark:border-slate-800
                          dark:bg-slate-900
                          dark:lg:group-hover/card:border-blue-500/30
                        "
                      >
                        {/* =====================================
                            TOP BANNER
                        ===================================== */}

                        <div className="relative h-[110px] shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                          {product.bannerImage ? (
                            <Image
                              src={product.bannerImage}
                              alt={product.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover object-center transition-transform duration-700 lg:group-hover/card:scale-[1.03]"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-400" />
                          )}

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.02] dark:to-black/10" />
                        </div>

                        {/* =====================================
                            PRODUCT LOGO
                        ===================================== */}

                        {product.logoImage && (
                          <div className="relative z-10 mx-auto -mt-[42px] flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-blue-500 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.12)] dark:border-blue-400 dark:bg-slate-950">
                            <Image
                              src={product.logoImage}
                              alt={`${product.title} logo`}
                              width={84}
                              height={84}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        )}

                        {/* If logo missing */}

                        {!product.logoImage && (
                          <div className="relative z-10 mx-auto -mt-[26px] flex h-[52px] items-center justify-center rounded-full border border-blue-200 bg-white px-4 text-[11px] font-semibold text-blue-600 shadow-sm dark:border-blue-500/20 dark:bg-slate-950 dark:text-blue-400">
                            {product.title}
                          </div>
                        )}

                        {/* =====================================
                            FRONT CONTENT
                        ===================================== */}

                        <div className="flex min-h-0 flex-1 flex-col px-5 pb-5 pt-4 text-center">
                          <h2 className="text-[20px] font-medium leading-tight tracking-[-0.02em] text-slate-800 dark:text-white">
                            {product.title}
                          </h2>

                          {/* SHORT DESCRIPTION */}

                          {product.shortDescription && (
                            <p className="mt-1.5 text-[13px] leading-5 text-slate-400 dark:text-slate-500">
                              {product.shortDescription}
                            </p>
                          )}

                          {/* CARD TAGLINE */}

                          {product.cardTagline && (
                            <p className="mt-5 line-clamp-3 text-[13px] leading-[1.65] text-slate-600 dark:text-slate-300">
                              {product.cardTagline}
                            </p>
                          )}

                          {/* SECONDARY TEXT */}

                          {product.cardSecondaryText && (
                            <p className="mt-1 line-clamp-2 text-[13px] leading-[1.65] text-slate-600 dark:text-slate-300">
                              {product.cardSecondaryText}
                            </p>
                          )}

                          {/* MOBILE READ MORE */}

                          <div className="mt-auto pt-3 lg:hidden">
                            <Link
                              href={`/products/${product.slug}`}
                              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 dark:text-blue-400"
                            >
                              Read More

                              <ArrowUpRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </article>

                      {/* =========================================
                          BACK / FLIP CARD
                      ========================================= */}

                      <article
                        className="
                          absolute
                          inset-0
                          hidden
                          h-full
                          overflow-hidden
                          rounded-[18px]
                          border
                          border-slate-200
                          bg-white
                          text-slate-700
                          shadow-[0_10px_30px_rgba(15,23,42,0.08)]
                          [backface-visibility:hidden]
                          [transform:rotateY(180deg)]
                          dark:border-slate-800
                          dark:bg-slate-900
                          dark:text-slate-200
                          lg:flex
                          lg:flex-col
                        "
                      >
                        <div className="flex h-full flex-col text-center">
                          {/* =====================================
                              FLIP CONTENT
                          ===================================== */}

                          <div className="flex min-h-0 flex-1 flex-col px-5 pb-4 pt-5">
                            {/* EYEBROW */}

                            <p className="line-clamp-1 text-[10px] font-medium uppercase tracking-[0.04em] text-slate-400 dark:text-slate-500">
                              {product.flipEyebrow ||
                                `TAKE A TOUR OF ${product.title}`}
                            </p>

                            <div className="mt-4 h-px w-full bg-slate-100 dark:bg-slate-800" />

                            {/* CENTER */}

                            <div className="flex min-h-0 flex-1 flex-col justify-center">
                              {/* TITLE */}

                              <h3 className="text-[18px] font-semibold uppercase leading-tight text-slate-700 dark:text-white">
                                {product.flipTitle ||
                                  product.title}
                              </h3>

                              {/* DESCRIPTION */}

                              <p className="mt-4 line-clamp-7 text-[13px] leading-[1.7] text-slate-500 dark:text-slate-300">
                                {product.flipDescription ||
                                  product.description ||
                                  product.shortDescription ||
                                  ""}
                              </p>
                            </div>

                            {/* SOCIAL ICON STYLE DIVIDER
                                Keeping only visual placeholders,
                                no additional links/content added.
                            */}

                            <div className="mx-auto mt-3 flex w-[190px] items-center justify-center">
                              <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />

                              {product.logoImage && (
                                <div className="mx-4 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white p-1.5 dark:border-slate-700 dark:bg-slate-950">
                                  <Image
                                    src={product.logoImage}
                                    alt={`${product.title} logo`}
                                    width={32}
                                    height={32}
                                    className="h-full w-full object-contain"
                                  />
                                </div>
                              )}

                              <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                            </div>
                          </div>

                          {/* =====================================
                              READ MORE
                          ===================================== */}

                          <Link
                            href={`/products/${product.slug}`}
                            className="flex h-[48px] shrink-0 items-center justify-center bg-[#4597d1] text-[16px] font-medium text-white transition-colors duration-300 hover:bg-[#3488c3] dark:bg-blue-600 dark:hover:bg-blue-500"
                          >
                            Read More
                          </Link>
                        </div>
                      </article>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* =====================================================
              MARQUEE
          ===================================================== */}

          {!loading && products.length > 0 && (
            <AnimateIn delay={0.15}>
              <div className="mt-16 overflow-hidden rounded-2xl border border-slate-200 bg-white/70 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
                <Marquee
                  items={products.map(
                    (product) => product.title
                  )}
                />
              </div>
            </AnimateIn>
          )}
        </section>
      </main>

      <CtaSection />

      <Footer />
    </div>
  );
}