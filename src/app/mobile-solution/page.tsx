import Image from "next/image";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { FloatingBlob } from "../../../components/floating-blob";

// NOTE: update these paths to wherever your actual Mobile Solution graphics live in /public.
const BANNER_SRC = "/mobile-solution.png";
const PHONE_ICON_SRC = "/mobile-Solution-Service.png";

const benefits = [
    "Accelerated Solutions: decrease time-to-market through facilitated collaboration",
    "Flexibility and Versatility: through incremental and modular delivery",
    "Cost Effectiveness: a per-device-payment model for better cash flow",
    "Scale and Reach: end-to-end service and delivery",
];

export default function MobileSolutionPage() {
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
                        text="Mobile Solution"
                        as="h1"
                        className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
                    />

                    <AnimateIn delay={0.1}>
                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-600/40 via-slate-400/30 to-purple-400/40 p-[2px]">
                            <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                                <Image
                                    src={BANNER_SRC}
                                    alt="Mobile Solution"
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </AnimateIn>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_240px]">
                        <AnimateIn delay={0.15}>
                            <div className="space-y-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                <p>
                                    Mobile solutions have become central to the way enterprises conduct their
                                    business, enabling customers and employees to be always-on and even powering the
                                    next wave of connected services — the Internet of Things.
                                </p>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    From Mobile Opportunity to Business Advantage
                                </p>
                                <p>
                                    We help enterprises harness mobile opportunities with customers, from marketing
                                    campaigns to sales transactions and customer service. A coherent &ldquo;B2C&rdquo;
                                    mobile strategy and execution creates opportunities to build brand awareness,
                                    enhance services, develop a fuller understanding of customer needs and reach new
                                    customers.
                                </p>
                                <p>
                                    Employees today want mobile solutions that enable them to be always connected to
                                    any device in any location. Enterprise mobility results in accelerated processes,
                                    more flexible working practices, greater employee productivity and a workforce
                                    proud of its tools. We help clients with their &ldquo;B2E&rdquo; strategies to
                                    unleash and manage their employees&apos; potential.
                                </p>

                                <p className="font-semibold text-slate-900 dark:text-white">Your Benefits</p>
                                <ul className="space-y-2">
                                    {benefits.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p>
                                    Geecon offers design and development services for mobile apps. Based on your
                                    requirements we produce apps which can be standalone or integrate with other data
                                    sources using secure management systems. Our mobile application development
                                    allows for apps to be output for native iOS and Android platforms.
                                </p>
                                <p>
                                    At Geecon all mobile apps are developed to deliver content and functionality to
                                    users through an intuitive and optimised interface. Our team of experts will work
                                    with you to ensure the latest smartphone features are integrated with your mobile
                                    app.
                                </p>
                                <p>
                                    Partner with a group of thinkers, makers, code ninjas and problem solvers that
                                    believe in building software products that have real purpose.
                                </p>
                                <p>
                                    We build custom software products that drive revenue and provide seamless
                                    customer experiences for your business.
                                </p>
                            </div>
                        </AnimateIn>

                        <AnimateIn delay={0.25} direction="left" className="lg:sticky lg:top-24 lg:self-start">
                            <div className="relative mx-auto h-52 w-52">
                                <Image
                                    src={PHONE_ICON_SRC}
                                    alt="Mobile apps"
                                    fill
                                    sizes="208px"
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
