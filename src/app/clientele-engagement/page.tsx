import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { CtaSection } from "../../../components/cta-section";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/stagger-container";
import { BackgroundEffects } from "../../../components/background-effects";
import { ClientHero } from "../../../components/client-hero";
import { ClientMarquee } from "../../../components/client-marquee";
import { ClientLogoGrid } from "../../../components/client-logo-grid";
import { ClientCard } from "../../../components/client-card";
import { clients } from "../../../lib/clients-data";

export default function ClienteleEngagementPage() {
  const featuredClients = clients.filter((client) => client.featured);
  const otherClients = clients.filter((client) => !client.featured);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      {/* Navbar */}
      <Navbar />

      <main className="relative flex-1 overflow-hidden">
        {/* Background Effects */}
        <BackgroundEffects />

        {/* Hero Section */}
        <ClientHero />

        {/* Client Logo Marquee */}
        <ClientMarquee clients={clients} />

        {/* Featured Clients */}
        {featuredClients.length > 0 && (
          <section
            aria-labelledby="featured-clients-heading"
            className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20"
          >
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1a2b4a] dark:text-blue-400">
                Our Clients
              </span>

              <h2
                id="featured-clients-heading"
                className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
              >
                Featured Clients
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                We are proud to work with organizations that trust Geecon for
                technology, consulting, and digital solutions.
              </p>
            </div>

            <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredClients.map((client) => (
                <StaggerItem key={client.id}>
                  <ClientCard client={client} featured />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}

        {/* All Client Engagements */}
        {otherClients.length > 0 && (
          <section
            aria-labelledby="all-engagements-heading"
            className="relative mx-auto max-w-7xl px-6 pb-20 sm:pb-24"
          >
            <div className="mb-10 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1a2b4a] dark:text-blue-400">
                Our Work
              </span>

              <h2
                id="all-engagements-heading"
                className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
              >
                All Engagements
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Explore some of the organizations and businesses we have
                supported through our technology and consulting services.
              </p>
            </div>

            <ClientLogoGrid clients={otherClients} />
          </section>
        )}

        {/* Empty State */}
        {clients.length === 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20 text-center">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              No clients available
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Client information will appear here once it is added.
            </p>
          </section>
        )}
      </main>

      {/* CTA */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}