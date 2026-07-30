import Image from "next/image";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";
import { BrochureForm } from "../../../components/brochure-form";

// NOTE: update this path to wherever your actual HR Solutions banner image lives in /public.
const BANNER_SRC = "/hr-solutions.png";

export default function ResourceHrManagementPage() {
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
                        text="Resource & HR Management"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-slate-800/40 via-slate-500/30 to-slate-300/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="HR Solutions — Human Resource Management"
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
                                        HR Management should have a clear understanding of the level of training and
                                        technical expertise that will be required and the amount of time expected.
                                        Questioning solution providers on this topic can provide insight into subtle
                                        areas that might initially appear simple, yet involve significant
                                        technological expertise. HR can then determine specific tasks that may be so
                                        cumbersome as to realistically impede completion, potentially reducing HR
                                        information technology value and ROI.
                                    </p>
                                    <p>
                                        What is the degree of flexibility and scalability that the HR information
                                        technology software provides? HR professionals should determine if the
                                        software can import data from multiple Excel spreadsheets, databases, and
                                        paper documents and the level with which it can interface with all kinds of
                                        other systems and data needed.
                                    </p>
                                    <p>
                                        The software should be able to take in and filter information from multiple
                                        sources. Ideally, this process should also be automated. Many online
                                        enrollment solutions require that data be manually manipulated before it can
                                        go to a carrier to update their systems. Automation of the update format,
                                        transmission schedule, and delivery method can help to eliminate billing and
                                        eligibility issues.
                                    </p>
                                    <p>
                                        Will the software be able to accommodate HR&apos;s company and benefits
                                        carriers&apos; rules? A truly capable enrollment engine will evaluate each
                                        enrollment activity and apply any necessary combination of rules, messages,
                                        prompts, and options specifically designed to meet the exact eligibility
                                        requirements desired. The software should accommodate any eligibility rules
                                        that the company and carriers have.
                                    </p>
                                    <p>
                                        Will the HR information technology be able to grow and scale with the
                                        organization? HR should assess the technology&apos;s ability to grow as the
                                        company hires new employees, offices, benefits changes, and rules. HR should
                                        ask about the thresholds for each of these elements.
                                    </p>
                                    <p>
                                        Is the HR information technology software able to integrate with other
                                        systems? Payroll and other functions often share much of the same
                                        information as the benefits management. HR can obtain greater efficiencies
                                        when data and other employee information entered into one system are shared
                                        with another system. Tracking employee recruitment is another needed
                                        function.
                                    </p>
                                    <p>
                                        Who is responsible for implementing, or building, the solution? What level of
                                        training is involved? Some solutions require the client to be very involved
                                        with the initial implementation, which can be overwhelming for already busy
                                        HR administrators.
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
