import Image from "next/image";
import { HardDrive, ShieldCheck, Users, Tag } from "lucide-react";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";

// NOTE: update this path to wherever your actual SyncMyDocs banner image lives in /public.
const BANNER_SRC = "/sync-new.png";

const sections = [
    {
        icon: HardDrive,
        title: "More storage space",
        description: "SyncMyDocs online storage offers the ideal solution for your storage needs – up to 500 GB of storage space!",
    },
    {
        icon: ShieldCheck,
        title: "Data security",
        description: "SyncMyDocs is the ultimate data backup: Your files are securely stored.",
    },
    {
        icon: Users,
        title: "Flexible enough for business, Easy enough for everyone",
        description:
            "We support businesses as well as professionals, hobbyists and home users. That means we know how to look after our customers and we can adapt to your needs. Our service is second to none.",
    },
    {
        icon: Tag,
        title: "The most competitive pricing",
        description:
            "Because we've got the infrastructure. Many competitors charge a lot more for space than we do because they use third parties to store your data.",
    },
];

export default function SyncMyDocsPage() {
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
                        text="Sync my doc"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-sky-500/40 via-cyan-300/30 to-slate-400/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="SyncMyDocs"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <h2 className="mt-8 text-lg font-semibold text-slate-900 dark:text-white">Sync My Docs</h2>
                                <div className="mt-3 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <p>
                                        <span className="font-semibold text-slate-900 dark:text-white">SyncMyDocs</span>{" "}
                                        is hosted in your data center, on your servers, using your storage. SyncMyDocs
                                        integrates seamlessly into your IT infrastructure; you can leave data where it
                                        lives and still deliver file sharing services that meet your data security and
                                        compliance policies.
                                    </p>
                                    <p>
                                        SyncMyDocs provides the ability to utilize cloud technologies while retaining
                                        that precious right we call privacy. No one else can gain access. This
                                        orientation makes it impossible for us to betray your trust.
                                    </p>
                                </div>
                            </AnimateIn>

                            <div className="mt-10 grid gap-4 sm:grid-cols-2">
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
