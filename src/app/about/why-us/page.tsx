"use client";

import Image from "next/image";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { ScrollProgress } from "../../../../components/scroll-progress";

const HERO_SRC = "/core.png";

const reasons = [
  {
    title: "The ultimate tiebreaker:",
    body: "We deliver consistency of performance. While it's great to hear “superstar” stories about our employees that go above and beyond for a customer, the most powerful tiebreaker in today's marketplace for us is consistency. Our customers realises & knows that no matter who they deal with in our company, they will receive the same level of great service every single time, that's the most powerful differentiator for us.",
  },
  {
    title: "Solve problems on the spot:",
    body: "We empower our employees to make it happen. We understand that nothing is more frustrating to customers than hearing the words “I'll have to ask my manager” or “I'm sorry, but our policy is . . .” We have trained our employees to resolve customer problems fairly, amicably, and, whenever possible, on the spot. Effective problem resolution wins us customers for life.",
  },
  {
    title: "Be Relevant:",
    body: "We believe in understanding what matters to our customers and responding to their real business needs. Our approach is focused on practical solutions, meaningful communication and services that remain relevant as requirements evolve.",
  },
  {
    title: "Demonstrate value:",
    body: "We offer competitive price and clear value. We believe in keeping things clear, concise and transparent, we do not say something to win the project and drag the project, solution and business by deviating from our initial false commitment used to win the project. We have demonstrated to our existing business relations that we're a great deal. That's the essence of value. We never take our customer for granted. We spell it out for our customers & educate them.",
  },
  {
    title: "We allow the customer to choose:",
    body: "We Offer more selection and customisation. Today's customers want exactly what they want, exactly how they want it. Whether it's the music mix on their iPod or their no fat, no whip, double shot, extra hot latte with a shot of vanilla at the coffee shop, everyone wants it their way, Hence we let our customers decide and give them what they want through agile methodology, not what a traditional company wants to give them.",
  },
  {
    title: "Easiest to do business with:",
    body: "The number one factor with business to business customers is that we are the no hassle choice. We are continuously looking at every aspect of how we interface with customers and correct anything that might make us the least bit difficult to do business with. Our invoices are clear and easily understood. We empower employees to say “yes” to customers without always having to get approval from a manager. Our motto is “Be easy and win business”.",
  },
  {
    title: "Quick response and always in time:",
    body: "Over the period of time we have become known for returning customer's calls within committed time. We guarantee the delivery deadlines and always doing it in one of the fastest response time as compared to industry of a service call, responding to emails with lightning speed. We are known for a quick response in our customer community and always being on time is one of our powerful differentiator.",
  },
];

export default function WhyUsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main>
        {/* =========================================================
            HERO IMAGE
        ========================================================= */}
        <section className="relative w-full overflow-hidden bg-slate-950">
          <div className="group relative h-[300px] w-full overflow-hidden sm:h-[380px] lg:h-[460px]">
            <Image
              src={HERO_SRC}
              alt="Why Choose Geecon"
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[1800ms] ease-out group-hover:scale-[1.03]"
            />

            {/* Hero overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/5 via-transparent to-slate-950/40" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/15 via-transparent to-slate-950/10" />

            {/* Subtle hero glow */}
            <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
          </div>
        </section>

        {/* =========================================================
            REASONS
        ========================================================= */}
        <section className="relative overflow-hidden bg-slate-50 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 dark:bg-slate-950">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-3xl dark:bg-cyan-400/[0.035]" />

          <div className="pointer-events-none absolute -left-48 top-[20%] h-96 w-96 rounded-full bg-blue-500/[0.025] blur-3xl dark:bg-blue-500/[0.04]" />

          <div className="pointer-events-none absolute -right-48 top-[55%] h-96 w-96 rounded-full bg-cyan-400/[0.025] blur-3xl dark:bg-cyan-400/[0.04]" />

          <div className="relative mx-auto max-w-5xl">
            <div className="space-y-8 sm:space-y-10">
              {reasons.map((reason, index) => (
                <AnimateIn key={reason.title} delay={index * 0.07}>
                  <article className="group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/95 p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)] backdrop-blur-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:border-blue-300 hover:shadow-[0_25px_70px_rgba(37,99,235,0.14)] sm:p-10 lg:p-12 dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] dark:hover:border-cyan-400/40 dark:hover:shadow-[0_25px_80px_rgba(34,211,238,0.1)]">
                    {/* Top-right glow */}
                    <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/0 blur-3xl transition-all duration-1000 ease-out group-hover:bg-blue-500/15 dark:group-hover:bg-cyan-400/10" />

                    {/* Bottom-left glow */}
                    <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-1000 ease-out group-hover:bg-cyan-400/10" />

                    {/* Left animated accent */}
                    <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-cyan-400 to-blue-600 transition-transform duration-700 ease-out group-hover:scale-y-100" />

                    {/* Top animated accent */}
                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 transition-transform duration-700 ease-out group-hover:scale-x-100" />

                    <div className="relative z-10">
                      {/* Title */}
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-blue-700 sm:text-3xl dark:text-white dark:group-hover:text-cyan-300">
                        {reason.title}
                      </h2>

                      {/* Animated underline */}
                      <div className="relative mt-5 h-px w-12 overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <div className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 transition-transform duration-700 ease-out group-hover:scale-x-100" />
                      </div>

                      {/* Body */}
                      <p className="mt-6 max-w-5xl text-[15px] leading-8 text-slate-500 transition-colors duration-500 group-hover:text-slate-700 sm:text-base dark:text-slate-400 dark:group-hover:text-slate-300">
                        {reason.body}
                      </p>
                    </div>

                    {/* Soft hover highlight */}
                    <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-br from-blue-500/[0.00] via-transparent to-cyan-400/[0.00] transition-all duration-700 group-hover:from-blue-500/[0.025] group-hover:to-cyan-400/[0.035]" />
                  </article>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}