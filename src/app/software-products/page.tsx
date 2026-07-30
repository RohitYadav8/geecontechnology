import Image from "next/image";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";

// NOTE: update these paths to wherever your actual Software Products graphics live in /public.
const BANNER_SRC = "/product-service.png";
const SIDEBAR_SRC = "/product-service-1.png";

const offerings = [
    "Software Products",
    "Web Hosting Solutions",
    "Mobile Solutions",
    "Branding",
    "Internet Technologies & Web Solutions",
    "ERP Solutions",
    "Resourcing & HR Management",
    "Corporate Training",
];

export default function SoftwareProductsPage() {
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
                        text="Products and Services"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <AnimateIn delay={0.1}>
                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-300/40 via-blue-300/30 to-slate-400/40 p-[2px]">
                            <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-2xl bg-white dark:bg-slate-900 sm:h-72">
                                <Image
                                    src={BANNER_SRC}
                                    alt="Products and Services"
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </AnimateIn>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_260px]">
                        <AnimateIn delay={0.15}>
                            <div className="space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                <p>
                                    Geecon products focus on providing innovative business growth for clients.
                                    Building on its varied expertise and domain knowledge, Geecon offers clients a
                                    wide range IT services. These services enable business to &ldquo;Do Business
                                    Better&rdquo; that help you to perform in this dynamic market environment.
                                </p>
                                <p className="italic text-slate-600 dark:text-slate-300">
                                    Products and services which we can provide to our customers
                                </p>

                                <ul className="space-y-3 pt-2">
                                    {offerings.map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <span className="h-4 w-1.5 shrink-0 rounded-full bg-red-500" />
                                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimateIn>

                        <AnimateIn delay={0.25} direction="left" className="lg:sticky lg:top-24 lg:self-start">
                            <div className="relative mx-auto h-56 w-56">
                                <Image
                                    src={SIDEBAR_SRC}
                                    alt="Geecon team illustration"
                                    fill
                                    sizes="224px"
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
