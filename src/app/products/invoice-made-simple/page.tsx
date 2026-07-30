import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";

// NOTE: update this path to wherever your actual Invoice Made Simple banner image lives in /public.
const BANNER_SRC = "/invoice..1.png";

const features = [
    "Track All Invoices",
    "Create Recurring Invoices",
    "Managing Multiple Projects",
    "Manage Your Customers",
    "Save hours creating invoices",
    "Send invoices on-the-go",
];

const benefits = ["Access Anytime Anywhere", "Its Flexible and Customisable", "Saves time, works smart", "In the cloud"];

export default function InvoiceMadeSimplePage() {
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
                        text="Invoice Made Simple 2"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-blue-700/40 via-indigo-500/30 to-blue-300/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="Invoice Made Simple"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <h2 className="mt-8 text-lg font-semibold text-slate-900 dark:text-white">
                                    Invoice Made Simple
                                </h2>
                                <div className="mt-3 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <p>
                                        Managing your invoice online — stop stuffing, be professional. Get paid
                                        faster. Easily track invoices. Follow up with the customers and ensure you
                                        get paid.
                                    </p>
                                </div>
                            </AnimateIn>

                            <div className="mt-8 space-y-4">
                                {[
                                    {
                                        title: "Create Recurring Invoices",
                                        desc: "Doing business with a client on a regular basis? Copy old invoices and change dates and send them next time.",
                                    },
                                    {
                                        title: "Managing Multiple Projects",
                                        desc: "Multiple projects with different billing methods are easily managed in My Invoice. Add and assign vendors, start and end projects with ease!",
                                    },
                                    {
                                        title: "Manage Your Customers",
                                        desc: "Create, edit and manage your customers' information in My Invoice. Open the information, edit them and keep them updated at any time.",
                                    },
                                    {
                                        title: "Save hours creating invoices",
                                        desc: "Our quick & easy invoicing system allows you to bypass the hours spent designing invoices — we do it all for you in seconds.",
                                    },
                                ].map((item, i) => (
                                    <AnimateIn key={item.title} delay={0.05 * i}>
                                        <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-5 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                                {item.title}
                                            </h4>
                                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </AnimateIn>
                                ))}
                            </div>

                            <AnimateIn delay={0.15}>
                                <p className="mt-8 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    Our invoice solution specialises in business applications for invoice and bill
                                    management. Our platform is delivered exclusively via the Internet (SaaS) and is
                                    designed for companies of all sizes. It is a web based platform that manages
                                    invoices.
                                </p>
                            </AnimateIn>

                            <div className="mt-10 grid gap-8 sm:grid-cols-2">
                                <AnimateIn delay={0.2}>
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Features</h3>
                                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {features.map((f) => (
                                            <li key={f} className="flex gap-2">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </AnimateIn>

                                <AnimateIn delay={0.25}>
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Benefits</h3>
                                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {benefits.map((b) => (
                                            <li key={b} className="flex gap-2">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </AnimateIn>
                            </div>
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
