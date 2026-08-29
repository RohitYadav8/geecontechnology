"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { MouseGlow } from "../../../components/mouse-glow";

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
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        <MouseGlow className="relative overflow-hidden">
          {/* Background */}

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:52px_52px] opacity-[0.08] dark:opacity-[0.025]" />

            <div className="absolute right-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/10" />
          </div>

          <section className="relative px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-6xl">
              {/* Heading */}

              <AnimateIn>
                <div className="max-w-5xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                    IT Services
                  </p>

                  <div className="mt-4 h-[3px] w-12 rounded-full bg-blue-600" />

                  <p className="mt-6 max-w-5xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-[15px]">
                    Our company develops custom Web site applications
                    and software across a wide range of technology
                    platforms to ensure successful implementation of
                    your business strategies and enhancement of your
                    operational excellence.
                  </p>
                </div>
              </AnimateIn>

              {/* Loading */}

              {loading && (
                <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Loading services...
                  </p>
                </div>
              )}

              {/* Error */}

              {!loading && error && (
                <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center dark:border-red-900/50 dark:bg-red-950/20">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* No Services */}

              {!loading &&
                !error &&
                services.length === 0 && (
                  <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No services available.
                    </p>
                  </div>
                )}

              {/* Services */}

              {!loading &&
                !error &&
                services.length > 0 && (
                  <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                    {services.map(
                      (service, index) => {
                        const imageLeft =
                          index % 2 === 0;

                        return (
                          <AnimateIn
                            key={service.id}
                            delay={Math.min(
                              index * 0.04,
                              0.2
                            )}
                          >
                            <article className="group relative grid min-h-[290px] overflow-hidden border-b border-slate-200 last:border-b-0 dark:border-slate-800 lg:grid-cols-2">
                              {/* Image */}

                              <div
                                className={`
                                  relative
                                  min-h-[260px]
                                  overflow-hidden
                                  bg-slate-100
                                  dark:bg-slate-950
                                  lg:min-h-[320px]
                                  ${
                                    imageLeft
                                      ? "lg:order-1"
                                      : "lg:order-2"
                                  }
                                `}
                              >
                                <Image
                                  src={
                                    service.image
                                  }
                                  alt={
                                    service.title
                                  }
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 50vw"
                                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                                />

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />

                                <div className="pointer-events-none absolute inset-0 bg-blue-600/0 transition-colors duration-500 group-hover:bg-blue-600/[0.035]" />
                              </div>

                              {/* Content */}

                              <div
                                className={`
                                  relative
                                  flex
                                  min-h-[260px]
                                  flex-col
                                  justify-center
                                  overflow-hidden
                                  bg-white
                                  px-7
                                  py-10
                                  dark:bg-slate-900
                                  sm:px-10
                                  lg:min-h-[320px]
                                  lg:px-12
                                  ${
                                    imageLeft
                                      ? "lg:order-2"
                                      : "lg:order-1"
                                  }
                                `}
                              >
                                {/* Accent Line */}

                                <span
                                  className={`
                                    absolute
                                    top-1/2
                                    hidden
                                    h-10
                                    w-[3px]
                                    -translate-y-1/2
                                    bg-blue-600
                                    transition-all
                                    duration-500
                                    ease-out
                                    group-hover:h-24
                                    lg:block
                                    ${
                                      imageLeft
                                        ? "left-0 rounded-r-full"
                                        : "right-0 rounded-l-full"
                                    }
                                  `}
                                />

                                {/* Hover Glow */}

                                <div
                                  className={`
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    opacity-0
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-100
                                    ${
                                      imageLeft
                                        ? "bg-gradient-to-r from-blue-600/[0.035] via-transparent to-transparent dark:from-blue-500/[0.05]"
                                        : "bg-gradient-to-l from-blue-600/[0.035] via-transparent to-transparent dark:from-blue-500/[0.05]"
                                    }
                                  `}
                                />

                                <div className="relative">
                                  <h2 className="text-xl font-semibold tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400 sm:text-2xl">
                                    {
                                      service.title
                                    }
                                  </h2>

                                  <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {
                                      service.description
                                    }
                                  </p>

                                  <div className="mt-6">
                                    <Link
                                      href={
                                        service.href ||
                                        `/${service.slug}`
                                      }
                                      className="group/link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 transition-colors duration-300 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                      Read More

                                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-200 bg-blue-50 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:border-blue-600 group-hover/link:bg-blue-600 group-hover/link:text-white dark:border-blue-900 dark:bg-blue-950/40">
                                        <ArrowUpRight
                                          size={
                                            13
                                          }
                                        />
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </AnimateIn>
                        );
                      }
                    )}
                  </div>
                )}
            </div>
          </section>
        </MouseGlow>
      </main>

      <Footer />
    </div>
  );
}