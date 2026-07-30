import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";

// NOTE: update this path to wherever your actual Gift Aid banner image lives in /public.
const BANNER_SRC = "/giftaid..1.png";

const teamResponsibilities = [
    "Check declarations (including sponsorship forms) for validity, and flag those that do not meet the rules for follow-up.",
    "Produce a Monthly Report with comparisons across your supporter base.",
    "Scan declarations and electronically link them to supporter records in your database, allowing you quick access from within a record.",
];

export default function GiftAidPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />
                <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
                <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />

                <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20">
                    <AnimatedHeading
                        text="Gift Aid"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-blue-600/40 via-red-400/30 to-orange-500/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="Gift Aid Claims"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <div className="mt-8 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <p>
                                        Gift Aid is great because it means charities get extra money added to their
                                        donations at no extra cost to the donor. Gift Aid Services provide a variety
                                        of services designed to help charities maintain their focus on their cause and
                                        leave the technical details in experienced hands. Make your donation go
                                        further.
                                    </p>
                                    <p>
                                        One of the biggest challenges when setting up a charity is determining how to
                                        maximise your returns. It is a methodical process that requires a great deal
                                        of experience and know how, something which many charities might not want to
                                        focus on. With a charity focussed on a cause, it is natural to want to put all
                                        efforts into helping that cause and not be weighed down by such
                                        considerations.
                                    </p>
                                    <p>
                                        If you are wondering how to set up a charity or the process of charity
                                        registration, it is difficult to know where to start — our charity
                                        registration service can help make the process quick and simple.
                                    </p>
                                    <p>
                                        As you begin to receive contributions, taking advantage of our gift aid
                                        recovery service can help you keep more of your donations by reclaiming some
                                        of the tax. This allows you to focus on your charity whilst maximising the
                                        return it ultimately makes. We are also able to provide payroll bureau
                                        services to ease the burden of dealing with administration, payroll and
                                        expenses, which ultimately allows a charity to make the most of their income.
                                    </p>
                                    <p>
                                        Gift Aid has worked with several leading not-for-profit organisations in the
                                        UK and collaborated with the HMRC to develop a unique service developed
                                        specifically to meet the needs of not-for-profit organisations in the UK.
                                    </p>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.2}>
                                <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-600/30 via-red-400/20 to-orange-500/30 p-[1px]">
                                    <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/70">
                                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                                            The Gift Aid Management team at Blackbaud will:
                                        </h3>
                                        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {teamResponsibilities.map((item, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.25}>
                                <p className="mt-8 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    Your donation to Christian Aid could be worth almost 25% more — at no extra cost
                                    to you. If you are a UK taxpayer, Gift Aid lets Christian Aid reclaim tax on
                                    donations you have made to us. Taxpayers in the Republic of Ireland can ask for
                                    your donations to be made tax-efficient.
                                </p>
                            </AnimateIn>
                        </div>

                        <AnimateIn delay={0.3} direction="left" className="lg:sticky lg:top-24 lg:self-start">
                            <BrochureForm />
                        </AnimateIn>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
