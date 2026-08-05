import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { services } from "../../../lib/home-data";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        {/* Page header */}
        <section className="mx-auto max-w-7xl px-6 pb-4 pt-16 sm:pt-20">
          <AnimateIn>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1a2b4a] dark:text-blue-400">
              What we offer
            </span>
          </AnimateIn>
          <AnimatedHeading
            text="IT Services"
            as="h1"
            delay={0.1}
            className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl"
          />
          <AnimateIn delay={0.2}>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              Our company develops custom website applications and software across a wide range
              of technology platforms to ensure successful implementation of your business
              strategies and enhancement of your operational excellence.
            </p>
          </AnimateIn>
        </section>

        {/* Alternating service rows */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="space-y-4">
            {services.map((service, index) => {
              const imageFirst = index % 2 === 0;

              return (
                <AnimateIn key={service.id} direction={imageFirst ? "left" : "right"}>
                  <div className="grid overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 sm:grid-cols-2">
                    {/* Image */}
                    <div
                      className={`group relative h-64 overflow-hidden sm:h-auto ${
                        imageFirst ? "sm:order-1" : "sm:order-2"
                      }`}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b4a]/80 via-[#1a2b4a]/10 to-transparent" />
                      <div className="absolute inset-4 border border-white/40" />
                     
                    </div>

                    {/* Text */}
                    <div
                      className={`flex flex-col justify-center bg-slate-50 p-8 dark:bg-slate-900/60 sm:p-10 ${
                        imageFirst ? "sm:order-2" : "sm:order-1"
                      }`}
                    >
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                        {service.description}
                      </p>
                      <Link
                        href={service.href}
                        className="group/link mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#1a2b4a] transition-colors hover:text-[#0d1830] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Read more
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                        />
                      </Link>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}