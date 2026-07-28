import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { CtaSection } from "../../../components/cta-section";
import { StaggerContainer, StaggerItem } from "../../../components/stagger-container";
import { BackgroundEffects } from "../../../components/background-effects";
import { ClientHero } from "../../../components/client-hero";
import { ClientMarquee } from "../../../components/client-marquee";
import { ClientLogoGrid } from "../../../components/client-logo-grid";
import { ClientCard } from "../../../components/client-card";
import { clients } from "../../../lib/clients-data";

export default function ClienteleEngagementPage() {
    const featured = clients.filter((client) => client.featured);
    const rest = clients.filter((client) => !client.featured);

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                <BackgroundEffects />

                <ClientHero />

                <ClientMarquee clients={clients} />

                {/* Featured Clients */}
                <section className="relative mx-auto max-w-7xl px-6 py-12">
                    <h2 className="text-center text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                        Featured Clients
                    </h2>
                    <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {featured.map((client) => (
                            <StaggerItem key={client.id}>
                                <ClientCard client={client} featured />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* Full logo grid, scroll-reveal per row */}
                <section className="relative mx-auto max-w-7xl px-6 pb-20">
                    <h2 className="mb-8 text-center text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                        All Engagements
                    </h2>
                    <ClientLogoGrid clients={rest} />
                </section>
            </main>
            <CtaSection />
            <Footer />
        </div>
    );
}
