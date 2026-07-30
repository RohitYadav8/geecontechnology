import Image from "next/image";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";

// NOTE: update these paths to wherever your actual Web Hosting graphics live in /public.
const BANNER_SRC = "/web-hosting.png";
const SIDEBAR_SRC = "/web-hosting-1.png";

export default function WebHostingServicesPage() {
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
                        text="Web Hosting Services"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <AnimateIn delay={0.1}>
                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-700/40 via-blue-500/30 to-slate-400/40 p-[2px]">
                            <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-2xl bg-white dark:bg-slate-900 sm:h-72">
                                <Image
                                    src={BANNER_SRC}
                                    alt="Web Hosting Services"
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
                                    We provide dedicated servers and VPS hosting services that can be matched to fit
                                    your needs. Whether you are an individual looking for a basic shared hosting
                                    package or your small business needs a scalable dedicated web hosting solution,
                                    we are willing and able to meet your web hosting needs.
                                </p>

                                <p className="font-semibold text-slate-900 dark:text-white">VPS Hosting:</p>
                                <p>
                                    Our VPS hosting as a cost-efficient solution comes right in the middle of
                                    dedicated and webspace hosting product ranges and provides you with the
                                    advantages of both of these types. We use a virtualization solution based on KVM
                                    and hardware that corresponds to the latest state of the art. Furthermore you are
                                    provided with guaranteed RAM and disk space. Customize your virtual private
                                    server to suit your needs and select the operating system (Linux or Windows
                                    Server 2012 and Windows Server 2008) of your choice. To manage and administer
                                    your virtual machine, you can optionally choose between Parallels Plesk,
                                    cPanel/WHM and Webmin. Decide now and rely on high-quality, powerful VPS hosting
                                    solutions.
                                </p>

                                <p className="font-semibold text-slate-900 dark:text-white">Dedicated Server:</p>
                                <p>
                                    Our entire fleet of dedicated servers is 100% managed, so you do not have to
                                    worry about running your servers or fixing any problems. What we mean by
                                    Dedicated Servers, is that we will take care of the setup of your dedicated web
                                    hosting account, troubleshooting with your dedicated server, and everything in
                                    between.
                                </p>
                                <p>
                                    Data and document hosting services in the cloud from microMEDIA include
                                    designing and implementing cost-effective Web-based Document Management systems.
                                    We use these systems to create an Archive at our web hosting sites that leverage
                                    the latest web based document management technologies.
                                </p>
                                <p>
                                    Each application is customized to meet a client&apos;s specific needs for an
                                    online web document hosting application. Web-based document management users can
                                    institute a search and retrieval process using previously established indices
                                    and document identification classifications. microMEDIA delivers all the
                                    requisite management, infrastructure and support. We offer numerous document
                                    repository alternatives.
                                </p>
                            </div>
                        </AnimateIn>

                        <AnimateIn delay={0.25} direction="left" className="lg:sticky lg:top-24 lg:self-start">
                            <div className="relative mx-auto h-48 w-56">
                                <Image
                                    src={SIDEBAR_SRC}
                                    alt="Server racks"
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
