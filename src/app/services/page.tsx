import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Code2, Database, Plug, Monitor, BriefcaseBusiness, Server, Users, FileCode2, Rocket, Headphones, ShieldCheck, SlidersHorizontal, TrendingUp } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { services } from "../../../lib/home-data";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[#0b1b3a] dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main>
        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="relative overflow-hidden bg-[#03112f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(0,102,255,0.22),transparent_35%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(37,99,235,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.15)_1px,transparent_1px)] [background-size:45px_45px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
            <AnimateIn direction="left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                  Custom Software Development
                </p>

                <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Software Built Around
                  <span className="block text-blue-500">
                    Your Business
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                  Off-the-shelf software rarely fits every business perfectly.
                  We build custom, scalable and secure software around the way
                  your business works — not the other way around.
                </p>

                <div className="mt-10 grid max-w-xl grid-cols-3 gap-6">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/70 bg-blue-500/10 text-blue-400">
                      <ShieldCheck size={20} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-white">
                      Scalable
                    </p>

                    <p className="text-sm text-white">
                      Architecture
                    </p>
                  </div>

                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/70 bg-blue-500/10 text-blue-400">
                      <ShieldCheck size={20} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-white">
                      Secure
                    </p>

                    <p className="text-sm text-white">
                      Development
                    </p>
                  </div>

                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-500/70 bg-blue-500/10 text-blue-400">
                      <Code2 size={20} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-white">
                      Future-ready
                    </p>

                    <p className="text-sm text-white">
                      Solutions
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.15}>
              <div className="relative mx-auto h-[350px] w-full max-w-[520px] sm:h-[420px]">
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-blue-400/30 bg-blue-500/10 p-8 shadow-[0_0_80px_rgba(37,99,235,0.25)] backdrop-blur-sm sm:w-[340px]">
                  <div className="flex h-40 items-center justify-center rounded-2xl border border-blue-400/30 bg-[#061a43]">
                    <Code2
                      size={110}
                      strokeWidth={1}
                      className="text-blue-400"
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-center">
                      <Monitor
                        size={20}
                        className="mx-auto text-blue-400"
                      />
                      <p className="mt-2 text-[11px] text-white">
                        Web Applications
                      </p>
                    </div>

                    <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-center">
                      <Plug
                        size={20}
                        className="mx-auto text-blue-400"
                      />
                      <p className="mt-2 text-[11px] text-white">
                        API Integration
                      </p>
                    </div>

                    <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-center">
                      <Database
                        size={20}
                        className="mx-auto text-blue-400"
                      />
                      <p className="mt-2 text-[11px] text-white">
                        Database Architecture
                      </p>
                    </div>

                    <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-center">
                      <Server
                        size={20}
                        className="mx-auto text-blue-400"
                      />
                      <p className="mt-2 text-[11px] text-white">
                        Legacy Modernisation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* =========================================================
            CHALLENGE + APPROACH + BROCHURE
        ========================================================= */}
        <section className="bg-white px-6 py-16 dark:bg-slate-950 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr_340px]">
            <AnimateIn direction="left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  The Challenge
                </p>

                <h2 className="mt-4 text-2xl font-bold leading-tight text-[#0b1b3a] dark:text-white">
                  Generic software creates
                  <br />
                  friction, not growth.
                </h2>

                <div className="mt-8 space-y-7">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10">
                      <Code2 size={19} />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Generic Tools
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Designed for the average business, not for your unique
                        workflows.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10">
                      <Users size={19} />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Disconnected Systems
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Multiple tools create unnecessary complexity and manual
                        work.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10">
                      <SlidersHorizontal size={19} />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Limited Flexibility
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Your processes have to adapt to the software — not the
                        other way around.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  Our Approach
                </p>

                <h2 className="mt-4 text-2xl font-bold leading-tight text-[#0b1b3a] dark:text-white">
                  We build software
                  <br />
                  around how you work.
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  Our engineering teams work closely with you to understand
                  your processes before writing a single line of code. From
                  design to deployment, we ensure the solution is scalable,
                  secure and easy to maintain.
                </p>

                <div className="mt-10 grid grid-cols-4 gap-2">
                  {[
                    ["01", "Discover"],
                    ["02", "Design"],
                    ["03", "Build"],
                    ["04", "Deploy & Support"],
                  ].map(([number, title]) => (
                    <div key={number}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                        {number}
                      </div>

                      <p className="mt-2 text-xs font-bold">
                        {title}
                      </p>

                      <div className="mt-1 h-px bg-blue-200 dark:bg-blue-900" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.15}>
              <div className="rounded-2xl bg-[#071735] p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white">
                  Download Brochure
                </h2>

                <p className="mt-2 text-xs leading-5 text-slate-300">
                  Fill in your details below to download brochure.
                </p>

                <form className="mt-6 space-y-3">
                  <div>
                    <label className="text-[11px] text-white">
                      Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="mt-1 w-full rounded-lg border-0 bg-white px-3 py-3 text-sm text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-white">
                      Email:
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="mt-1 w-full rounded-lg border-0 bg-white px-3 py-3 text-sm text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-white">
                      Company Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="mt-1 w-full rounded-lg border-0 bg-white px-3 py-3 text-sm text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-white">
                      Company Website:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter website"
                      className="mt-1 w-full rounded-lg border-0 bg-white px-3 py-3 text-sm text-slate-900 outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                  >
                    <Download size={16} />
                    DOWNLOAD
                  </button>
                </form>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* =========================================================
            WHAT WE BUILD
        ========================================================= */}
        <section className="bg-[#f5f9ff] px-6 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl">
            <AnimateIn>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  What We Build
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Our Service Coverage Areas
                </h2>
              </div>
            </AnimateIn>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Monitor,
                  title: "Custom Web Applications",
                  text: "High-performing, secure and scalable web applications tailored to your business goals.",
                },
                {
                  icon: BriefcaseBusiness,
                  title: "Internal Business Tools",
                  text: "Streamline operations with custom internal tools and workflow automation.",
                },
                {
                  icon: Server,
                  title: "Client-Server Systems",
                  text: "Reliable and secure client-server applications built for performance and scalability.",
                },
                {
                  icon: Database,
                  title: "Database Design & Architecture",
                  text: "Well-structured databases that ensure integrity, performance and reporting excellence.",
                },
                {
                  icon: Plug,
                  title: "API Development & Integration",
                  text: "Seamlessly integrate with third-party systems and build powerful APIs.",
                },
                {
                  icon: FileCode2,
                  title: "Legacy System Modernisation",
                  text: "Modernise legacy systems for better performance, security and future-readiness.",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <AnimateIn key={item.title} delay={index * 0.05}>
                    <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <Icon size={25} />
                      </div>

                      <h3 className="mt-5 text-base font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {item.text}
                      </p>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            ENGINEERING PROCESS
        ========================================================= */}
        <section className="bg-[#03112f] px-6 py-16 text-white lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                Our Engineering Process
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                From Idea to Impact
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-5">
              {[
                [Users, "01", "Understand", "We learn your business, goals and challenges."],
                [FileCode2, "02", "Plan & Design", "We design the right solution and architecture."],
                [Code2, "03", "Develop & Test", "We build, test and ensure quality in every step."],
                [Rocket, "04", "Deploy", "We deploy the solution smoothly and securely."],
                [Headphones, "05", "Support & Evolve", "We support, maintain and evolve as you grow."],
              ].map(([Icon, number, title, text]) => {
                const ProcessIcon = Icon as typeof Users;

                return (
                  <div key={number as string} className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
                      <ProcessIcon size={24} />
                    </div>

                    <p className="mt-4 text-xs font-bold text-blue-400">
                      {number as string}
                    </p>

                    <h3 className="mt-1 font-bold">
                      {title as string}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      {text as string}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            WHY BUSINESSES CHOOSE CUSTOM SOFTWARE
        ========================================================= */}
        <section className="bg-white px-6 py-16 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Why Businesses Choose Custom Software
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                [Code2, "Full ownership of source code"],
                [ShieldCheck, "No vendor lock-in or hidden costs"],
                [SlidersHorizontal, "Built specifically for your processes"],
                [TrendingUp, "Scalable as your business grows"],
                [Headphones, "Long-term support and maintenance"],
              ].map(([Icon, text]) => {
                const WhyIcon = Icon as typeof Code2;

                return (
                  <div
                    key={text as string}
                    className="text-center lg:border-r lg:border-slate-200 lg:last:border-0 dark:lg:border-slate-800"
                  >
                    <WhyIcon
                      size={38}
                      strokeWidth={1.5}
                      className="mx-auto text-blue-600"
                    />

                    <p className="mx-auto mt-5 max-w-[180px] text-sm font-semibold leading-6">
                      {text as string}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            BROCHURE CTA
        ========================================================= */}
        <section className="px-6 pb-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl bg-[#edf5ff] px-8 py-10 sm:flex-row lg:px-14">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Let&apos;s Build Software That
                <br />
                Drives Your Business Forward
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Download our brochure to explore how we can help you design,
                build and deploy custom software that truly fits your business.
              </p>
            </div>

            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              <Download size={16} />
              DOWNLOAD BROCHURE
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}