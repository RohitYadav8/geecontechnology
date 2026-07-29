import Image from "next/image";
import { Gauge, FolderCog, FileCode, Wrench } from "lucide-react";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";

// NOTE: update this path to wherever your actual CMS Avatar banner image lives in /public.
const BANNER_SRC = "/cms-avatar-banner.jpg";

const sections = [
    {
        icon: Gauge,
        title: "Performance",
        description: "Fast, lightweight core capable of powering multiple sites and millions of hits per day.",
    },
    {
        icon: FolderCog,
        title: "Media Management",
        description: "Control where images and files are stored and who has access to given folders.",
    },
    {
        icon: FileCode,
        title: "Content Strategy",
        description:
            "Create any type of contents using HTML Editors. The sample site includes a flexible content template. Create, manage, and deploy unlimited pages and links. You can control your information as and when you need — in the competitive world you want to change your website more often.",
    },
    {
        icon: Wrench,
        title: "Easy Installation",
        description: "Installing Geecon CMS Avatar 2 is very straight forward.",
    },
];

export default function CmsAvatarPage() {
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
                        text="CMS Avatar 2"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-blue-800/40 via-blue-500/30 to-slate-300/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="CMS Avatar 2"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <p className="mt-8 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    Geecon CMS Avatar 2 is dedicated to creating a user friendly environment to build
                                    websites. Geecon CMS Avatar 2 is built on PHP and MySQL and uses basic PHP and
                                    HTML for presentation.
                                </p>
                            </AnimateIn>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {sections.map((sec, i) => (
                                    <AnimateIn key={sec.title} delay={0.05 * i}>
                                        <div className="h-full rounded-2xl border border-slate-200/60 bg-white/60 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:border-slate-800/60 dark:bg-slate-900/60">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2b4a]/10 text-[#1a2b4a] dark:bg-blue-500/10 dark:text-blue-400">
                                                <sec.icon size={18} />
                                            </span>
                                            <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                                                {sec.title}
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {sec.description}
                                            </p>
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
