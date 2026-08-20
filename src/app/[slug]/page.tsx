import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { services } from "../../../lib/home-data";
import {
  serviceDetails,
  fallbackDetail,
} from "../../../lib/service-details";

import { products } from "../../../lib/products-data";
import {
  productDetails,
  fallbackProductDetail,
} from "../../../lib/product-details";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";
import { BrochureForm } from "../../../components/brochure-form";

/* -------------------------------------------------------------------------- */
/*                              SOCIAL ICONS                                  */
/* -------------------------------------------------------------------------- */

function FacebookIcon({ size = 15 }: { size?: number }) {
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

function LinkedinIcon({ size = 15 }: { size?: number }) {
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

function TwitterIcon({ size = 15 }: { size?: number }) {
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
/*                         STATIC ROUTE PARAMETERS                            */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  const serviceParams = services.map((service) => ({
    slug: service.href.replace(/^\/+/, ""),
  }));

  const standaloneServiceParams = [
    {
      slug: "website-development",
    },
  ];

  const productParams = products.map((product) => ({
    slug: product.href.replace(/^\/+/, ""),
  }));

  return [
    ...serviceParams,
    ...standaloneServiceParams,
    ...productParams,
  ];
}

/* -------------------------------------------------------------------------- */
/*                              PAGE COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  /* ------------------------------------------------------------------------
     NORMAL HOME SERVICES
  ------------------------------------------------------------------------ */

  const service = services.find(
    (item) => item.href === `/${slug}`
  );

  /* ------------------------------------------------------------------------
     STANDALONE SERVICES

     Website Development should work from Navbar / direct URL,
     but should NOT be added to the home page services array.
  ------------------------------------------------------------------------ */

  const standaloneService =
    slug === "website-development"
      ? {
          id: "website-development",
          title: "Website Development",
          description: "",
          href: "/website-development",
        }
      : null;

  const matchedService =
    service ?? standaloneService;

  /* ------------------------------------------------------------------------
     PRODUCTS
  ------------------------------------------------------------------------ */

  const product = products.find(
    (item) => item.href === `/${slug}`
  );

  /* ======================================================================== */
  /*                              SERVICE PAGE                                */
  /* ======================================================================== */

  if (matchedService) {
    const detail =
      serviceDetails[matchedService.id] ??
      fallbackDetail(
        matchedService.title,
        matchedService.description
      );

    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
        <Navbar />

        <main className="relative flex-1 overflow-hidden">
          {/* Background grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
              bg-[size:48px_48px]
              opacity-20
              dark:opacity-10
            "
          />

          {/* Background glow */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top,rgba(59,130,246,.12),transparent_60%)]
            "
          />

          <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20">
            {/* ---------------------------------------------------------------- */}
            {/* Heading                                                          */}
            {/* ---------------------------------------------------------------- */}

            <AnimatedHeading
              text={detail.title}
              as="h1"
              className="
                text-2xl
                font-semibold
                text-blue-600
                dark:text-blue-400
                sm:text-3xl
              "
            />

            {/* ---------------------------------------------------------------- */}
            {/* Banner                                                           */}
            {/* ---------------------------------------------------------------- */}

            <AnimateIn delay={0.15}>
              {detail.bannerImage ? (
                <div
                  className="
                    relative
                    mt-8
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200/70
                    bg-slate-50
                    shadow-sm
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  <Image
                    src={detail.bannerImage}
                    alt={detail.title}
                    width={1200}
                    height={400}
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 90vw,
                      1200px
                    "
                    className="
                      h-auto
                      max-h-[420px]
                      w-full
                      object-contain
                    "
                    priority
                  />
                </div>
              ) : (
                <div
                  className={`
                    relative
                    mt-8
                    flex
                    h-56
                    items-center
                    justify-end
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    ${detail.gradient}
                    px-8
                    shadow-lg
                    sm:h-64
                    sm:px-10
                  `}
                >
                  {/* Decorative circles */}

                  <div className="pointer-events-none absolute inset-0 opacity-20">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="
                          absolute
                          rounded-full
                          border-[16px]
                          border-white/40
                        "
                        style={{
                          width: `${140 - index * 24}px`,
                          height: `${140 - index * 24}px`,
                          left: `${10 + index * 12}%`,
                          top: `${20 + (index % 2) * 15}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Icon */}

                  <div
                    className="
                      relative
                      flex
                      h-24
                      w-24
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/20
                      bg-white/15
                      shadow-xl
                      backdrop-blur-md
                      sm:h-28
                      sm:w-28
                    "
                  >
                    <CheckCircle2
                      size={48}
                      strokeWidth={1.5}
                      className="text-white"
                    />
                  </div>
                </div>
              )}
            </AnimateIn>

            {/* ---------------------------------------------------------------- */}
            {/* Main Content                                                     */}
            {/* ---------------------------------------------------------------- */}

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              {/* ============================================================ */}
              {/* Left Content                                                   */}
              {/* ============================================================ */}

              <AnimateIn delay={0.25}>
                <div
                  className="
                    space-y-4
                    text-sm
                    leading-7
                    text-slate-600
                    dark:text-slate-400
                  "
                >
                  {/* Intro */}

                  {detail.intro.map((paragraph, index) => (
                    <p key={`intro-${index}`}>
                      {paragraph}
                    </p>
                  ))}

                  {/* Challenges */}

                  {detail.challenges.length > 0 && (
                    <StaggerContainer className="space-y-2 pt-1">
                      {detail.challenges.map((point, index) => (
                        <StaggerItem key={`challenge-${index}`}>
                          <p className="flex items-start gap-3">
                            <span
                              className="
                                mt-2
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                bg-[#1a2b4a]
                                dark:bg-blue-400
                              "
                            />

                            <span>{point}</span>
                          </p>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  )}

                  {/* Middle Content */}

                  {detail.middle.map((paragraph, index) => (
                    <p
                      key={`middle-${index}`}
                      className="pt-1"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Benefits */}

                  {detail.benefits.length > 0 && (
                    <StaggerContainer className="space-y-2 pt-1">
                      {detail.benefits.map((point, index) => (
                        <StaggerItem key={`benefit-${index}`}>
                          <p className="flex items-start gap-3">
                            <span
                              className="
                                mt-2
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                bg-[#1a2b4a]
                                dark:bg-blue-400
                              "
                            />

                            <span>{point}</span>
                          </p>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  )}

                  {/* Closing */}

                  {detail.closing && (
                    <p className="pt-1">
                      {detail.closing}
                    </p>
                  )}

                  {/* ======================================================== */}
                  {/* Coverage                                                  */}
                  {/* ======================================================== */}

                  {detail.coverage.length > 0 && (
                    <div className="pt-5">
                      <h2
                        className="
                          text-base
                          font-semibold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        Our service coverage areas include:
                      </h2>

                      <StaggerContainer
                        className="
                          mt-4
                          grid
                          gap-3
                          sm:grid-cols-2
                        "
                      >
                        {detail.coverage.map((item, index) => (
                          <StaggerItem
                            key={`coverage-${index}`}
                          >
                            <div
                              className="
                                flex
                                items-start
                                gap-2
                                rounded-lg
                                border
                                border-slate-200/70
                                bg-slate-50/70
                                px-3
                                py-2
                                dark:border-slate-800
                                dark:bg-slate-900/60
                              "
                            >
                              <CheckCircle2
                                size={15}
                                className="
                                  mt-0.5
                                  shrink-0
                                  text-[#1a2b4a]
                                  dark:text-blue-400
                                "
                              />

                              <span className="text-sm">
                                {item}
                              </span>
                            </div>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* Q&A                                                       */}
                  {/* ======================================================== */}

                  {detail.qa.length > 0 && (
                    <div className="space-y-4 pt-5">
                      {detail.qa.map((paragraph, index) => (
                        <p key={`qa-${index}`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* Custom Sections                                           */}
                  {/* ======================================================== */}

                  {detail.sections &&
                    detail.sections.length > 0 && (
                      <StaggerContainer className="space-y-6 pt-5">
                        {detail.sections.map(
                          (section, index) => (
                            <StaggerItem
                              key={`section-${index}`}
                            >
                              <div
                                className="
                                  rounded-2xl
                                  border
                                  border-slate-200/70
                                  bg-white/60
                                  p-5
                                  dark:border-slate-800
                                  dark:bg-slate-900/50
                                "
                              >
                                <h3
                                  className="
                                    text-base
                                    font-semibold
                                    text-slate-900
                                    dark:text-white
                                  "
                                >
                                  {section.title}
                                </h3>

                                <p className="mt-2 leading-7">
                                  {section.body}
                                </p>
                              </div>
                            </StaggerItem>
                          )
                        )}
                      </StaggerContainer>
                    )}
                </div>
              </AnimateIn>

              {/* ============================================================ */}
              {/* Sidebar                                                        */}
              {/* ============================================================ */}

              <AnimateIn
                delay={0.3}
                direction="left"
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <BrochureForm />
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
              {/* ============================================================ */}
              {/* Product Header                                                 */}
              {/* ============================================================ */}

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

              {/* ============================================================ */}
              {/* Product Content                                                */}
              {/* ============================================================ */}

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

              {/* ============================================================ */}
              {/* Back Button                                                    */}
              {/* ============================================================ */}

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
                <span>Back to Products</span>

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