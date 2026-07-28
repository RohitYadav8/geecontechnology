import { notFound } from "next/navigation";
import Image from "next/image";
import {  ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { services } from "../../../lib/home-data";
import { serviceDetails, fallbackDetail } from "../../../lib/service-details";
import { products } from "../../../lib/products-data";
import { productDetails, fallbackProductDetail } from "../../../lib/product-details";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { StaggerContainer, StaggerItem } from "../../../components/stagger-container";
import { BrochureForm } from "../../../components/brochure-form";

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function generateStaticParams() {
  const serviceParams = services.map((s) => ({ slug: s.href.replace("/", "") }));
  const productParams = products.map((p) => ({ slug: p.href.replace("/", "") }));
  return [...serviceParams, ...productParams];
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const service = services.find((s) => s.href === `/${slug}`);
  const product = products.find((p) => p.href === `/${slug}`);

  if (service) {
    const detail = serviceDetails[service.id] ?? fallbackDetail(service.title, service.description);

    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
        <Navbar />
        <main className="flex-1">
          <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-20">
            <AnimatedHeading
              text={detail.title}
              as="h1"
              className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
            />

            <AnimateIn delay={0.15}>
              {detail.bannerImage ? (
                <div className="relative mt-8 w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900">
                  <Image
                    src={detail.bannerImage}
                    alt={detail.title}
                    width={1200}
                    height={400}
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    className="h-auto w-full"
                  />
                </div>
              ) : (
                <div
                  className={`relative mt-8 flex h-56 items-center justify-end overflow-hidden rounded-2xl bg-gradient-to-r ${detail.gradient} px-10 sm:h-64`}
                >
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full border-[16px] border-white/40"
                        style={{
                          width: `${140 - i * 24}px`,
                          height: `${140 - i * 24}px`,
                          left: `${10 + i * 12}%`,
                          top: `${20 + (i % 2) * 15}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm sm:h-28 sm:w-28">
                    <CheckCircle2 size={48} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>
              )}
            </AnimateIn>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
              <AnimateIn delay={0.25}>
                <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {detail.intro.map((p, i) => (
                    <p key={`intro-${i}`}>{p}</p>
                  ))}

                  {detail.challenges.length > 0 && (
                    <StaggerContainer className="space-y-2 pt-1">
                      {detail.challenges.map((point, i) => (
                        <StaggerItem key={i}>
                          <p className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                            {point}
                          </p>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  )}

                  {detail.middle.map((p, i) => (
                    <p key={`middle-${i}`} className="pt-1">
                      {p}
                    </p>
                  ))}

                  {detail.benefits.length > 0 && (
                    <StaggerContainer className="space-y-2 pt-1">
                      {detail.benefits.map((point, i) => (
                        <StaggerItem key={i}>
                          <p className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                            {point}
                          </p>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  )}

                  {detail.closing && <p className="pt-1">{detail.closing}</p>}

                  {detail.coverage.length > 0 && (
                    <div className="pt-4">
                      <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                        Our service coverage areas include:
                      </h2>
                      <StaggerContainer className="mt-3 grid gap-2 sm:grid-cols-2">
                        {detail.coverage.map((item, i) => (
                          <StaggerItem key={i}>
                            <p className="flex items-center gap-2 text-sm">
                              <CheckCircle2 size={15} className="shrink-0 text-[#1a2b4a] dark:text-blue-400" />
                              {item}
                            </p>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  )}

                  {detail.qa.length > 0 && (
                    <div className="space-y-4 pt-4">
                      {detail.qa.map((p, i) => (
                        <p key={`qa-${i}`}>{p}</p>
                      ))}
                    </div>
                  )}

                  {detail.sections && detail.sections.length > 0 && (
                    <StaggerContainer className="space-y-5 pt-4">
                      {detail.sections.map((sec, i) => (
                        <StaggerItem key={i}>
                          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                            {sec.title}
                          </h3>
                          <p className="mt-2 leading-7">{sec.body}</p>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  )}
                </div>
              </AnimateIn>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <BrochureForm />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (product) {
    const detail = productDetails[product.id] ?? fallbackProductDetail(product.name, product.tagline);

    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-6 py-20">
          <AnimateIn className="w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
              <div className="border-b border-slate-100 px-8 pb-4 pt-6 dark:border-slate-800">
                <p className="text-center text-sm font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  &ldquo;{detail.eyebrow}&rdquo;
                </p>
              </div>

              <div className="px-8 py-8 text-center">
                <h1 className="text-xl font-bold uppercase text-slate-900 dark:text-white">
                  {detail.headline}
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {detail.description}
                </p>

                <div className="mt-7 flex justify-center gap-6 text-slate-700 dark:text-slate-300">
                  <a href="#" aria-label="Facebook" className="hover:text-[#1a2b4a] dark:hover:text-white">
                    <FacebookIcon />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-[#1a2b4a] dark:hover:text-white">
                    <LinkedinIcon />
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:text-[#1a2b4a] dark:hover:text-white">
                    <TwitterIcon />
                  </a>
                </div>
              </div>

              <Link
                href="/products"
                className="group flex items-center justify-center gap-1.5 bg-[#1a2b4a] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d1830] dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Back to Products
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimateIn>
        </main>
        <Footer />
      </div>
    );
  }

  notFound();
}