import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "../../lib/home-data";
import { AnimateIn } from "../../components/animate-in";
import { StaggerContainer, StaggerItem } from "../../components/stagger-container";

export function ServicesGrid() {
  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateIn>
          <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#1a2b4a] dark:text-blue-400">
                What we do
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                Digital agency focusing on top
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
              Digital marketing dashboards for checking your website and social media come in all
              shapes and sizes. Here we share some of the best that we believe provide a cost
              effective and sometimes innovative insight into your online activity.
            </p>
          </div>
        </AnimateIn>

        <StaggerContainer className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1a2b4a]/30 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30 dark:hover:shadow-black/40">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b4a]/85 via-[#1a2b4a]/20 to-transparent transition-opacity duration-300 group-hover:from-[#1a2b4a]/95" />
                  <p className="absolute bottom-4 left-5 right-5 text-sm font-semibold uppercase tracking-wide text-white">
                    {service.tag}
                  </p>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a2b4a] transition-colors hover:text-[#0d1830] dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Read more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}