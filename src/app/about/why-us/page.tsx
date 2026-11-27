"use client";

import Image from "next/image";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { ScrollProgress } from "../../../../components/scroll-progress";
import { FloatingBlob } from "../../../../components/floating-blob";

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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#060b16] dark:text-white">
      <ScrollProgress />

      <Navbar />

      <main className="relative">
        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="brand-grad relative overflow-hidden px-4 pb-40 pt-12 text-white sm:px-8 sm:pb-44 sm:pt-16 lg:px-10">
          <FloatingBlob
            className="-left-40 top-24 h-[460px] w-[460px]"
            color="bg-cyan-300/35"
            duration={18}
          />

          <FloatingBlob
            className="-right-28 -top-24 h-[420px] w-[420px]"
            color="bg-violet-300/40"
            duration={16}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <AnimateIn>
            <div className="relative mx-auto max-w-6xl rounded-[28px] border border-white/30 bg-white/15 p-2 shadow-[0_30px_80px_-30px_rgba(15,23,42,.55)] backdrop-blur-xl">
              <div className="group relative h-[220px] w-full overflow-hidden rounded-[22px] sm:h-[320px] lg:h-[400px]">
                <Image
                  src={HERO_SRC}
                  alt="Why Choose Geecon"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 1200px) 100vw, 1150px"
                  className="object-cover object-center transition-transform duration-[1800ms] ease-out group-hover:scale-[1.03]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent" />
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* =========================================================
            REASONS
        ========================================================= */}
        <section className="relative z-10 mx-auto -mt-28 max-w-5xl px-4 pb-24 sm:-mt-32 sm:px-6 lg:px-8 lg:pb-28">
          <div className="space-y-6 sm:space-y-8">
            {reasons.map((reason, index) => (
              <AnimateIn key={reason.title} delay={Math.min(index * 0.07, 0.3)}>
                <article className={`group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] sm:p-10 dark:border-white/[0.07] dark:bg-[#0b1220] ${index === 0 ? "shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)]" : "shadow-[0_20px_60px_-40px_rgba(15,23,42,.25)]"}`}>
                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-400/0 blur-3xl transition-all duration-700 group-hover:bg-violet-400/15" />

                  <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-gradient-to-b from-blue-600 via-violet-500 to-cyan-400 transition-transform duration-700 ease-out group-hover:scale-y-100" />

                  <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div className="brand-grad flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-[15px] font-extrabold text-white shadow-lg shadow-violet-500/25 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-slate-950 transition-colors duration-300 group-hover:text-violet-700 sm:text-[30px] sm:leading-tight dark:text-white dark:group-hover:text-violet-300">
                        {reason.title}
                      </h2>

                      <div className="brand-grad mt-4 h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-24" />

                      <p className="mt-5 text-[15px] leading-8 text-slate-600 sm:text-base dark:text-slate-400">
                        {reason.body}
                      </p>
                    </div>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
