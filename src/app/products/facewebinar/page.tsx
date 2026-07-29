import Image from "next/image";
import { Video, MonitorPlay, Wifi, FileText, Users, ShieldCheck } from "lucide-react";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";
import { AnimatedHeading } from "../../../../components/animated-heading";
import { FloatingBlob } from "../../../../components/floating-blob";
import { BrochureForm } from "../../../../components/brochure-form";

// NOTE: update this path to wherever your actual FaceWebinar banner image lives in /public.
const BANNER_SRC = "/facewebinar-banner.jpg";

const highlights = [
    { icon: Video, label: "Video & Audio chat" },
    { icon: MonitorPlay, label: "Screen Sharing" },
    { icon: Wifi, label: "Works on Low Bandwidth" },
    { icon: FileText, label: "File Sharing" },
    { icon: Users, label: "Multi Party Conference" },
    { icon: ShieldCheck, label: "Secure Communication" },
];

export default function FacewebinarPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="relative flex-1 overflow-hidden">
                {/* Background grid + radial glow + floating blobs */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 dark:opacity-10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />
                <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
                <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />

                <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20">
                    <AnimatedHeading
                        text="Facewebinar"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
                        {/* ===== Left: banner + content ===== */}
                        <div>
                            <AnimateIn>
                                <div className="rounded-2xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-cyan-400/40 p-[2px]">
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                        <Image
                                            src={BANNER_SRC}
                                            alt="FaceWebinar"
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 800px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </AnimateIn>

                            <AnimateIn delay={0.1}>
                                <h2 className="mt-8 text-lg font-semibold text-slate-900 dark:text-white">FaceWebinar</h2>
                                <div className="mt-3 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <p>
                                        Facewebinar is born on an idea to push the boundaries of ordinary conversional
                                        video conferencing software standards using state-of-the-art technologies to
                                        implement a quick launching and simplified platform shared-as-a-service.
                                    </p>
                                    <p>
                                        Our team cumulates years of experience and knowledge in web base communication
                                        applications and designs who works and shares our new innovations closely with
                                        a group of users representing different industries to transform real time
                                        application communications around the world.
                                    </p>
                                </div>
                            </AnimateIn>

                            {/* ===== Product Highlights grid ===== */}
                            <div className="mt-10">
                                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                                    Product Highlights
                                </h3>
                                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    {highlights.map((item, i) => (
                                        <AnimateIn key={item.label} delay={0.05 * i}>
                                            <div className="flex h-full items-center gap-3 rounded-xl border border-slate-200/60 bg-white/60 p-4 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:border-slate-800/60 dark:bg-slate-900/60">
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1a2b4a]/10 text-[#1a2b4a] dark:bg-blue-500/10 dark:text-blue-400">
                                                    <item.icon size={18} />
                                                </span>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    {item.label}
                                                </span>
                                            </div>
                                        </AnimateIn>
                                    ))}
                                </div>
                            </div>

                            {/* ===== WebRTC explanation ===== */}
                            <AnimateIn delay={0.15}>
                                <div className="mt-10 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    <p>
                                        WebRTC (Web Real-Time Communication) is a standard that defines a collection of
                                        communications protocols and application programming interfaces that enable
                                        real-time communication over peer-to-peer connections. This allows web
                                        browsers to not only request resources from backend servers, but also
                                        real-time information from browsers of other users.
                                    </p>
                                    <p>
                                        This enables applications like video conferencing, file transfer, chat, or
                                        desktop sharing without the need of either internal or external plugins.
                                    </p>
                                </div>
                            </AnimateIn>

                            {/* ===== Uses of WebRTC callout ===== */}
                            <AnimateIn delay={0.2}>
                                <div className="mt-10 rounded-2xl bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-cyan-400/30 p-[1px]">
                                    <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/70">
                                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                                            Uses of WebRTC
                                        </h3>
                                        <div className="mt-3 space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            <p>
                                                WebRTC is a set of standards from WC3 that will enable real-time
                                                communication (RTC) on the web between browsers. Chrome, Firefox, and
                                                Opera browsers natively support it. Using WebRTC, you can make
                                                peer-to-peer calls, video chats, share screens, and exchange files.
                                            </p>
                                            <p>
                                                WebRTC enables users to build apps with HTML5 and Javascript. Software
                                                kits are available to build very compelling desktop and mobile apps.
                                                Any connected device can be WebRTC enabled, which means every connected
                                                device — computers, tablets, televisions — can become a communications
                                                device. These tools are radically disrupting the market by empowering
                                                every user to make their own apps and include WebRTC features.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </AnimateIn>
                        </div>

                        {/* ===== Right: sticky brochure download form ===== */}
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
