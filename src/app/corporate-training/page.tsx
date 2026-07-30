import Image from "next/image";
import { GraduationCap, Briefcase } from "lucide-react";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";

// NOTE: update this path to wherever your actual Corporate Training banner image lives in /public.
const BANNER_SRC = "/corp-train.png";

const training = [
    "Customer Service Training",
    "Trainer Training",
    "Skills Development Programmes",
    "Tourism & Hospitality Training",
    "Customised Training Programme Design",
];

const consultancy = [
    "Group Facilitation",
    "Creating a Customer Focused Culture",
    "Service System Development",
    "Mystery Shopping",
    "Training Needs Analysis",
    "Induction Programme Development",
    "HR Strategy & System Development",
    "Tourism Business Development",
    "Innovation Support",
];

export default function CorporateTrainingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />
                <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
                <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />

                <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-20">
                    <AnimatedHeading
                        text="Corporate Training"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <AnimateIn delay={0.1}>
                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-400/40 via-blue-300/30 to-slate-500/40 p-[2px]">
                            <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                <Image
                                    src={BANNER_SRC}
                                    alt="Corporate Training"
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </AnimateIn>

                    <AnimateIn delay={0.15}>
                        <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                            Our training &amp; consultancy services are designed to assist you in the development of a
                            cutting edge workforce so that you or your team can excel in today&apos;s competitive
                            environment. We offer a wide variety of solutions either on an in-house basis or through
                            our open programmes. Courses can be specifically tailored to meet your needs or you can
                            choose from our extensive range of programmes. If you require support in the following
                            areas then you have come to the right place:
                        </p>
                    </AnimateIn>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        <AnimateIn delay={0.2}>
                            <div className="h-full rounded-2xl border border-slate-200/60 bg-white/60 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                                        <GraduationCap size={18} />
                                    </span>
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                                        Training
                                    </h3>
                                </div>
                                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {training.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimateIn>

                        <AnimateIn delay={0.25}>
                            <div className="h-full rounded-2xl border border-slate-200/60 bg-white/60 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                                        <Briefcase size={18} />
                                    </span>
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                                        Consultancy
                                    </h3>
                                </div>
                                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {consultancy.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimateIn>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
