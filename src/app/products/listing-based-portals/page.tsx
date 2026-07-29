import Image from "next/image";
import { Wrench, ShieldCheck, Zap, Headset } from "lucide-react";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";

// NOTE: update this path to wherever your actual Online Directory banner image lives in /public.
const BANNER_SRC = "/online-directory-banner.jpg";

const badges = [
    { icon: Wrench, label: "Easy Installation" },
    { icon: ShieldCheck, label: "Powerful Administration" },
    { icon: Zap, label: "Automation" },
    { icon: Headset, label: "Exceptional Support" },
];

export default function OnlineDirectoryPage() {
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
                        text="Online Directory"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-orange-500/40 via-amber-400/30 to-slate-700/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="Online Directory"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <div className="mt-8 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <p>
                                        The catalogue has participated in innumerable International trade shows and
                                        exhibitions, the Asia portal would automatically reach out to a wider audience,
                                        thereby promoting your products internationally. Benefits of the portal in
                                        accelerating your business would be for you to get registered with our site.
                                    </p>
                                    <p>
                                        We are India&apos;s online portal providing an opportunity to have real time
                                        access to relevant information regarding various Industries. We boast of
                                        having an overwhelming 2 years experience in circulating the printed version
                                        of the Industrial Products and Services Catalogue (IPSC) in the Gulf countries
                                        and 1 years in India.
                                    </p>
                                    <p>
                                        Any portal takes its credibility from the accuracy of the data that has been
                                        furnished. Our data is continuously updated by a team of media professionals.
                                        You will, therefore, see that this is work in progress.
                                    </p>
                                    <p>
                                        The best way to experience the reach and benefits of the portal in
                                        accelerating your business would be for you to get registered with our site.
                                        Please treat this as a personal invitation to do so.
                                    </p>
                                    <p>
                                        Build and manage a powerful website with ease. Built using PHP and MySQL,
                                        Online Directory can be used to create websites focused on a business
                                        directory, classifieds, link indexing and more!
                                    </p>
                                    <p>
                                        A turn key solution allowing the management of a directory based website in
                                        minutes:
                                    </p>
                                </div>
                            </AnimateIn>

                            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {badges.map((b, i) => (
                                    <AnimateIn key={b.label} delay={0.05 * i}>
                                        <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-slate-200/60 bg-white/60 p-4 text-center backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:border-slate-800/60 dark:bg-slate-900/60">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2b4a]/10 text-[#1a2b4a] dark:bg-blue-500/10 dark:text-blue-400">
                                                <b.icon size={18} />
                                            </span>
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                                {b.label}
                                            </span>
                                        </div>
                                    </AnimateIn>
                                ))}
                            </div>
                        </div>

                        <AnimateIn delay={0.25} direction="left" className="lg:sticky lg:top-24 lg:self-start">
                            <BrochureForm />
                        </AnimateIn>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
