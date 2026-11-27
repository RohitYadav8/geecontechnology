"use client";

import { useEffect, useState } from "react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import {
  Container,
  PageHeader,
  SitePage,
} from "../../../components/site/ui";
import ClientLogoGrid from "../../../components/client-logo-grid";

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

  /* One wall, featured clients first. Each logo appears once. */
  const wall = [
    ...clients.filter((client) => client.featured),
    ...clients.filter((client) => !client.featured),
  ].filter((client) => Boolean(client.logo));

  const hasFeatured = wall.some((client) => client.featured);

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          title="Trusted by industry leaders"
          intro="It has been a great honour to work with well known organisations across industries. Few of our esteemed engagements are listed below."
        />

        <section className="border-b border-line">
          <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted lg:sticky lg:top-28">
                Engagements
                {!loading && wall.length > 0 && (
                  <span className="ml-2 text-accent">
                    {String(wall.length).padStart(2, "0")}
                  </span>
                )}
              </p>
              {hasFeatured && (
                <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
                  Featured
                </p>
              )}
            </div>

            <div className="min-w-0 lg:col-span-9">
              {loading ? (
                <p
                  role="status"
                  className="font-mono text-xs uppercase tracking-[0.16em] text-muted"
                >
                  Loading clients…
                </p>
              ) : wall.length > 0 ? (
                <ClientLogoGrid clients={wall} />
              ) : (
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  Client information will appear here once it is added.
                </p>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </SitePage>
  );
}
