"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { Container, PageHeader, SitePage } from "../../../components/site/ui";

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
          throw new Error(data?.error || "Failed to fetch services.");
        }

        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Load services error:", error);

        setError(
          error instanceof Error ? error.message : "Failed to fetch services."
        );
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          title="IT Services"
          intro="Our company develops custom Web site applications and software across a wide range of technology platforms to ensure successful implementation of your business strategies and enhancement of your operational excellence."
          meta={
            !loading && !error && services.length > 0 ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {String(services.length).padStart(2, "0")} disciplines
              </p>
            ) : null
          }
        />

        <section className="border-b border-line">
          <Container className="py-14 sm:py-20 lg:py-24">
            {loading && (
              <p className="border-t border-line py-10 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Loading services…
              </p>
            )}

            {!loading && error && (
              <p
                role="alert"
                className="border-t border-line py-10 text-sm text-red-700 dark:text-red-300"
              >
                {error}
              </p>
            )}

            {!loading && !error && services.length === 0 && (
              <p className="border-t border-line py-10 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                No services available.
              </p>
            )}

            {!loading && !error && services.length > 0 && (
              <ol className="border-t border-ink">
                {services.map((service, index) => {
                  const href = service.href || `/${service.slug}`;

                  return (
                    <li key={service.id} className="border-b border-line">
                      <Link
                        href={href}
                        className="group grid gap-6 py-8 transition-colors hover:bg-paper-2 sm:py-10 lg:grid-cols-12 lg:gap-10 lg:px-3"
                      >
                        <span className="font-mono text-xs text-accent lg:col-span-1 lg:pt-2">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="lg:col-span-4">
                          <span className="block font-display text-[28px] font-semibold leading-[1.05] text-ink transition-colors group-hover:text-accent sm:text-4xl">
                            {service.title}
                          </span>
                          <span className="mt-5 inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm font-semibold text-ink group-hover:text-accent">
                            Read more
                            <ArrowUpRight
                              size={16}
                              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </span>
                        </span>

                        <span className="max-w-[60ch] text-[15px] leading-7 text-ink-2 lg:col-span-4 lg:pt-1">
                          {service.description}
                        </span>

                        {service.image ? (
                          <span className="relative block aspect-[4/3] w-full overflow-hidden border border-line bg-paper-2 sm:max-w-sm lg:col-span-3 lg:max-w-none">
                            <Image
                              src={service.image}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 384px, 100vw"
                              className="object-cover grayscale-[35%] transition duration-500 group-hover:grayscale-0"
                            />
                          </span>
                        ) : (
                          <span className="hidden lg:col-span-3 lg:block" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </SitePage>
  );
}
