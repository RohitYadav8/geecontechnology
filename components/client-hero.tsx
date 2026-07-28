import { AnimateIn } from "./animate-in";
import { AnimatedHeading } from "./animated-heading";
import { StatCounter } from "./stat-counter";
import { clientStats } from "../lib/clients-data";

export function ClientHero() {
    return (
        <div className="relative mx-auto max-w-4xl px-6 pb-12 pt-16 text-center sm:pt-20">
            <AnimateIn>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1a2b4a] dark:text-blue-400">
                    Clientele &amp; Engagement
                </span>
            </AnimateIn>

            <AnimatedHeading
                text="Trusted by Industry Leaders"
                as="h1"
                delay={0.1}
                className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
            />

            <AnimateIn delay={0.25}>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                    It has been a great honour to work with well known organisations across industries.
                    Few of our esteemed engagements are listed below.
                </p>
            </AnimateIn>

            <AnimateIn delay={0.35}>
                <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {clientStats.map((stat) => (
                        <div key={stat.label}>
                            <div className="text-2xl font-bold text-[#1a2b4a] dark:text-blue-400 sm:text-3xl">
                                <StatCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="mt-1 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </AnimateIn>
        </div>
    );
}
