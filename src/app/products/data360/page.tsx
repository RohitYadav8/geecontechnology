import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";

// NOTE: update this path to wherever your actual Data360 banner image lives in /public.
const BANNER_SRC = "/data360-banner.jpg";

export default function Data360Page() {
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
                        text="Data360"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-teal-600/40 via-cyan-400/30 to-blue-500/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="Data360"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <h2 className="mt-8 text-lg font-semibold text-slate-900 dark:text-white">Data 360</h2>
                                <div className="mt-3 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <p>
                                        <span className="font-semibold text-slate-900 dark:text-white">DATA360</span> is
                                        a comprehensive business intelligence platform which comes with an inbuilt ETL
                                        tool, reporting tool and analytics. It allows information sources across
                                        systems, channels and repositories to be semantically modeled into business
                                        dimensions and measures. It helps business managers conduct granular analysis
                                        on the data available and thus accelerate accurate decision making.
                                    </p>
                                    <p>
                                        DATA 360 is a robust business intelligence platform. The backend data
                                        integrator and OLAP is scalable, and handles very large volumes of data, while
                                        the front-end provides elegance, functionality, and power to managers and
                                        business analysts alike.
                                    </p>
                                    <p>
                                        Its versatility lies in the absence of some features and processes. Like{" "}
                                        <span className="font-semibold text-slate-900 dark:text-white">no programming</span>.
                                        That means DATA 360 works best in the hands of people who actually use the
                                        information it delivers. Like{" "}
                                        <span className="font-semibold text-slate-900 dark:text-white">no training</span>.
                                        The simple user interface keeps you up and running on your own, though help is
                                        just a step away. Like{" "}
                                        <span className="font-semibold text-slate-900 dark:text-white">no report generators</span>.
                                        Just click away to analyze.. and save your final result. That is your report
                                        and it refreshes it automatically every time your data changes. There are
                                        another dozen such{" "}
                                        <span className="font-semibold text-slate-900 dark:text-white">featureless features</span>{" "}
                                        that would endear DATA 360 to any serious information seeker.
                                    </p>
                                    <p>
                                        Our mission is to tell compelling and data-driven stories about subjects of
                                        importance to our readers. Wherever possible, we strive to let the data speak.
                                        (In God we trust, all others must use data!) To be compelling, data usually
                                        needs some distillation and framing. Our reports do not waste people&apos;s
                                        time. Our site is non-partisan. We strive to make our reports logical,
                                        organized, graphical and insightfully commented. Wherever possible, we link to
                                        original data.
                                    </p>
                                    <p>
                                        Our goal is to have our reports updated 24×7. Inflammatory or objectionable
                                        language is not permitted on our website. Data360 reserves the right to adjust
                                        editorial permissions as it sees fit, in support of our purpose and principles.
                                    </p>
                                </div>
                            </AnimateIn>
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
