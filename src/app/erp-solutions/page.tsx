import Image from "next/image";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";

// NOTE: update these paths to wherever your actual ERP graphics live in /public.
const ERP_WORDMARK_SRC = "/erp-1.png";
const ERP_HUB_DIAGRAM_SRC = "/accounting-erp.png";

const benefits = [
    "Assisting you in defining your business processes and ensuring they are complied with throughout the supply chain",
    "Protecting your critical business data through well-defined roles and security access",
    "Enabling you to plan your work load based on existing orders and forecasts",
    "Providing you with the tools to give a high level of service to your customers",
    "Translating your data into decision making information",
];

export default function ErpSolutionsPage() {
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
                        text="ERP Solutions"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <AnimateIn delay={0.1}>
                        <div className="relative mx-auto mt-10 h-56 w-full max-w-xl sm:h-64">
                            <Image
                                src={ERP_WORDMARK_SRC}
                                alt="ERP"
                                fill
                                sizes="(max-width: 640px) 100vw, 576px"
                                className="object-contain"
                            />
                        </div>
                    </AnimateIn>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_260px]">
                        <AnimateIn delay={0.15}>
                            <div className="space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                <p>
                                    Our enterprise resource planning (ERP) software gives your people the tools they
                                    need to connect and manage your entire business, from financial and supply chain
                                    management and from manufacturing to operations, with the insight you need to
                                    make smart decisions. Start with what you need now and easily adapt as your needs
                                    change, in the cloud or on your servers — the choice is yours.
                                </p>

                                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                                    Our ERP systems can drive huge improvements in the effectiveness of any
                                    organisation by:
                                </p>

                                <ul className="space-y-2">
                                    {benefits.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p>
                                    At Geecon, we strive to deliver a consistently excellent standard of service and
                                    we take pride in everything we do. This has enabled us to retain and grow our
                                    client base year on year and a significant proportion of our growth can be
                                    attributed to happy clients recommending us to their colleagues.
                                </p>
                                <p>
                                    We believe that consistency and continuity is a key aspect of the service we
                                    provide to our clients. We have an exceptionally low staff turnover rate — we
                                    enjoy what we do.
                                </p>
                                <p>
                                    We&apos;re a close-knit team that offers a friendly, collaborative and ultimately
                                    helpful approach. We like innovative ideas and getting things done.
                                </p>
                            </div>
                        </AnimateIn>

                        <AnimateIn delay={0.25} direction="left" className="lg:sticky lg:top-24 lg:self-start">
                            <div className="relative mx-auto h-64 w-full max-w-[260px]">
                                <Image
                                    src={ERP_HUB_DIAGRAM_SRC}
                                    alt="ERP hub connecting Manufacturing, Supply Chain, Project Management, CRM, Finance, and HR"
                                    fill
                                    sizes="260px"
                                    className="object-contain"
                                />
                            </div>
                        </AnimateIn>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
