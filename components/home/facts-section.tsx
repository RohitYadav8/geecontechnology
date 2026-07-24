import { Award, Briefcase, Megaphone } from "lucide-react";
import { facts } from "../../lib/home-data";
import { AnimateIn } from "../../components/animate-in";
import { StaggerContainer, StaggerItem } from "../../components/stagger-container";

const icons = { award: Award, briefcase: Briefcase, megaphone: Megaphone };

export function FactsSection() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn>
          <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1a2b4a] dark:text-blue-400">
                Who we are
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                Some facts to know
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
              We are a diverse team of competent, dynamic and experienced individuals passionate
              about our work and company. Our ascendancy lies in business and management
              consultancy, development of online/offline software solutions and IT consulting and
              brand management. Geecon is a firm driven by creativity, inventiveness, innovation and
              team work. We endeavor to ensure customer satisfaction and achieve customer confidence.
              We care for and value our esteemed customers and believe in creating fulfilling
              business relationships.
            </p>
          </div>
        </AnimateIn>

        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-3">
          {facts.map((fact) => {
            const Icon = icons[fact.icon as keyof typeof icons];
            return (
              <StaggerItem key={fact.title}>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/40">
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#1a2b4a] transition-transform duration-300 group-hover:scale-x-100 dark:bg-blue-500" />

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1a2b4a]/10 text-[#1a2b4a] transition-colors duration-300 group-hover:bg-[#1a2b4a] group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">
                    {fact.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {fact.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}