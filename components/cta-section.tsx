import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * NOTE: href below points to "/contact" — update this to match
 * your actual contact route if it's different.
 */
export function CtaSection() {
  return (
    <section className="relative px-4 pb-24 sm:px-6 lg:px-10">
      <div className="brand-grad relative mx-auto max-w-7xl overflow-hidden rounded-[36px] px-6 py-16 text-center sm:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-[42px] sm:leading-tight">
          Ready to build your next enterprise solution?
        </h2>
        <p className="mt-4 text-base leading-7 text-indigo-50/90">
          Let&apos;s talk about how Geecon can help your team ship faster.
        </p>
        <Link
          href="/contact"
          className="group/btn mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-[0_18px_40px_-18px_rgba(15,23,42,.6)] transition-transform hover:-translate-y-1"
        >
          Contact Us
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
      </div>
    </section>
  );
}
