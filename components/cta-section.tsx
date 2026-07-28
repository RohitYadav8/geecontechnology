import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * NOTE: href below points to "/contact" — update this to match
 * your actual contact route if it's different.
 */
export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a2b4a] via-[#16233d] to-[#0d1830] py-20 dark:from-blue-950 dark:via-slate-950 dark:to-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.25),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Ready to build your next enterprise solution?
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Let&apos;s talk about how Geecon can help your team ship faster.
        </p>
        <Link
          href="/contact"
          className="group/btn mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1a2b4a] transition-transform hover:scale-105"
        >
          Contact Us
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
