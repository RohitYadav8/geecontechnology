import Image from "next/image";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";

// NOTE: update these paths to wherever your actual Internet Technology graphics live in /public.
const BANNER_SRC = "/internet-technology.png";
const GLOBE_ICON_SRC = "/internet-technology-1.png";

export default function InternetTechnologyPage() {
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
                        text="Internet Technology"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <AnimateIn delay={0.1}>
                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-600/40 via-cyan-400/30 to-slate-400/40 p-[2px]">
                            <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                <Image
                                    src={BANNER_SRC}
                                    alt="Internet Technology"
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </AnimateIn>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_220px]">
                        <AnimateIn delay={0.15}>
                            <div className="space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                <p>
                                    Geecon is your expert in Internet Technology. We work closely with you and your
                                    staff to uncover frustrations with current operations and processes. Our
                                    technological expertise allows us to create custom web solutions that will ease
                                    these points of pain to make your business more efficient. Our focus is to
                                    create an online environment that stimulates your business&apos;s success and
                                    growth.
                                </p>
                                <p>
                                    A great web solution is just the first step in the process to online success. We
                                    can develop a great website that is easy to use, meets your organization&apos;s
                                    needs and is visually impressive. We also need to make sure that your customers
                                    are finding your website online. This is where Internet marketing comes into
                                    play.
                                </p>
                                <p>
                                    With over 10 years experience in IT and web technologies, we are held in high
                                    regard with our customers due to our flexible and innovative approach in
                                    providing business driven solutions matching your needs. Offering a range of
                                    services from web strategy, through delivery of website design, development and
                                    configuration to the management of an online presence, we can take your business
                                    objectives and requirements and design practical and cost effective solutions to
                                    deliver to your needs and provide measurable value.
                                </p>
                                <p>
                                    We offer personal touch to all of our customers. For this, we allocate a
                                    dedicated manager to every project that keep communications going
                                    uninterruptedly from the outset. This approach helps us rapidly respond to
                                    changes initiated by our customers, adjust project team size when necessary,
                                    provide all the support, and ensure further project development.
                                </p>
                                <p>
                                    We build custom software products that drive revenue and provide seamless
                                    customer experiences for your business.
                                </p>
                                <p>
                                    Driving revenue means staying tied to business priorities. We do this by
                                    identifying opportunities to improve your customer experience and monetize your
                                    existing data and content.
                                </p>
                            </div>
                        </AnimateIn>

                        <AnimateIn delay={0.25} direction="left" className="lg:sticky lg:top-24 lg:self-start">
                            <div className="relative mx-auto h-40 w-40">
                                <Image
                                    src={GLOBE_ICON_SRC}
                                    alt="Global connectivity"
                                    fill
                                    sizes="160px"
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
