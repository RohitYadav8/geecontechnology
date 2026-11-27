"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";

type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  href: string;
  order: number;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/services", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || "Failed to fetch services."
          );
        }

        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Load services error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch services."
        );
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="flex-1">
        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-center text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
          <div className="pointer-events-none absolute -left-40 top-24 h-[460px] w-[460px] rounded-full bg-cyan-300/35 blur-3xl" />
          <div className="pointer-events-none absolute -right-28 -top-24 h-[420px] w-[420px] rounded-full bg-violet-300/40 blur-3xl" />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <AnimateIn className="relative mx-auto max-w-4xl">
            <h1 className="text-[44px] font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
              <span className="brand-text-light">
                IT Services
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-indigo-50/90 sm:text-lg">
              Our company develops custom Web site applications
              and software across a wide range of technology
              platforms to ensure successful implementation of
              your business strategies and enhancement of your
              operational excellence.
            </p>
          </AnimateIn>
        </section>

        {/* ================================================= */}
        {/* SERVICES */}
        {/* ================================================= */}

        <section className="relative z-10 -mt-28 px-4 pb-24 sm:-mt-32 sm:px-6 sm:pb-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Loading */}

            {loading && (
              <div className="rounded-[30px] border border-slate-100 bg-white px-6 py-20 text-center shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                <span className="brand-grad mx-auto block h-10 w-10 animate-spin rounded-full [mask:radial-gradient(farthest-side,transparent_calc(100%-4px),#000_0)]" />

                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Loading services...
                </p>
              </div>
            )}

            {/* Error */}

            {!loading && error && (
              <div className="rounded-[30px] border border-red-200 bg-red-50 px-6 py-12 text-center shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-red-900/50 dark:bg-red-950/30">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* No Services */}

            {!loading &&
              !error &&
              services.length === 0 && (
                <div className="rounded-[30px] border border-slate-100 bg-white px-6 py-20 text-center shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No services available.
                  </p>
                </div>
              )}

            {/* Services */}

            {!loading &&
              !error &&
              services.length > 0 && (
                <div className="space-y-6 sm:space-y-8">
                  {services.map((service, index) => {
                    const imageLeft = index % 2 === 0;

                    return (
                      <AnimateIn
                        key={service.id}
                        delay={Math.min(index * 0.04, 0.2)}
                      >
                        <article className="group grid overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-3 shadow-[0_30px_80px_-45px_rgba(15,23,42,.45)] transition-all duration-500 hover:border-violet-200 hover:shadow-[0_40px_90px_-40px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25 lg:grid-cols-2">
                          {/* Image */}

                          <div
                            className={`relative min-h-[240px] overflow-hidden rounded-[22px] bg-slate-100 dark:bg-slate-900 sm:min-h-[300px] lg:min-h-[340px] ${
                              imageLeft ? "lg:order-1" : "lg:order-2"
                            }`}
                          >
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                            />

                            <span className="brand-grad absolute bottom-4 left-4 rounded-[10px] px-3 py-1.5 font-mono text-[12px] font-bold text-white shadow-lg">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Content */}

                          <div
                            className={`flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-12 ${
                              imageLeft ? "lg:order-2" : "lg:order-1"
                            }`}
                          >
                            <span className="brand-grad block h-1 w-12 rounded-full transition-all duration-500 group-hover:w-20" />

                            <h2 className="mt-6 text-2xl font-extrabold leading-tight tracking-[-0.03em] text-slate-950 sm:text-[30px] dark:text-white">
                              {service.title}
                            </h2>

                            <p className="mt-4 text-[15px] leading-8 text-slate-500 dark:text-slate-400">
                              {service.description}
                            </p>

                            <div className="mt-7">
                              <Link
                                href={service.href || `/${service.slug}`}
                                className="brand-grad group/link inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5"
                              >
                                Read More
                                <ArrowUpRight
                                  size={15}
                                  className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                                />
                              </Link>
                            </div>
                          </div>
                        </article>
                      </AnimateIn>
                    );
                  })}
                </div>
              )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
