
"use client";

import { useEffect, useState } from "react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { CtaSection } from "../../../components/cta-section";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";

import { ClientHero } from "../../../components/client-hero";
import { ClientMarquee } from "../../../components/client-marquee";
import ClientLogoGrid from "../../../components/client-logo-grid";
import { ClientCard } from "../../../components/client-card";

import type { Client } from "../../../lib/clients-data";

export default function ClienteleEngagementPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }

        const data = await response.json();

        setClients(data);
      } catch (error) {
        console.error("Clients fetch error:", error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const featuredClients = clients.filter(
    (client) => client.featured
  );

  const otherClients = clients.filter(
    (client) => !client.featured
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#060b16]">
      {/* Navbar */}
      <Navbar />

      <main className="relative flex-1 overflow-hidden">
        <ClientHero />

        <div className="relative z-10 -mt-28 px-4 sm:-mt-32 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
        {loading ? (
          <section className="relative mx-auto flex min-h-60 max-w-7xl items-center justify-center px-6 py-16">
            <div className="text-center">
              <span className="brand-grad mx-auto block h-10 w-10 animate-spin rounded-full [mask:radial-gradient(farthest-side,transparent_calc(100%-4px),#000_0)]" />

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Loading clients...
              </p>
            </div>
          </section>
        ) : clients.length > 0 ? (
          <div className="px-2 py-4 sm:px-4 sm:py-6">
            {/* Client Logo Marquee */}
            <ClientMarquee clients={clients} />
          </div>
        ) : (
          /* Empty State */
          <section className="mx-auto max-w-7xl px-6 py-20 text-center">
            <h2 className="text-xl font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">
              No clients available
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Client information will appear here once it is
              added.
            </p>
          </section>
        )}
          </div>
        </div>

        {!loading && clients.length > 0 && (
          <>
            {/* Featured Clients */}
            {featuredClients.length > 0 && (
              <section
                aria-labelledby="featured-clients-heading"
                className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10"
              >
                <div className="mx-auto max-w-2xl text-center">
                  <span className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
                    Our Clients
                  </span>

                  <h2
                    id="featured-clients-heading"
                    className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-[46px] sm:leading-[1.1]"
                  >
                    Featured Clients
                  </h2>

                  <p className="mt-4 text-[15px] leading-8 text-slate-500 dark:text-slate-400">
                    We are proud to work with organizations that
                    trust Geecon for technology, consulting, and
                    digital solutions.
                  </p>
                </div>

                <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                  {featuredClients.map((client) => (
                    <StaggerItem key={client.id}>
                      <ClientCard
                        client={client}
                        featured
                      />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </section>
            )}

            {/* All Client Engagements */}
            {otherClients.length > 0 && (
              <section
                aria-labelledby="all-engagements-heading"
                className={`relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10 ${
                  featuredClients.length > 0 ? "" : "pt-20 sm:pt-24"
                }`}
              >
                <div className="rounded-[32px] border border-slate-100 bg-white px-4 py-12 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:px-8 sm:py-16 lg:px-12">
                <div className="mb-10 text-center">
                  <span className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
                    Our Work
                  </span>

                  <h2
                    id="all-engagements-heading"
                    className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-[46px] sm:leading-[1.1]"
                  >
                    All Engagements
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-slate-500 dark:text-slate-400">
                    Explore some of the organizations and
                    businesses we have supported through our
                    technology and consulting services.
                  </p>
                </div>

                {/* Client Logo Grid */}
                <ClientLogoGrid clients={otherClients} />
                </div>
              </section>
            )}
          </>
        )}

        {(loading || clients.length === 0) && <div className="pb-20 sm:pb-24" />}
      </main>

      {/* CTA */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
