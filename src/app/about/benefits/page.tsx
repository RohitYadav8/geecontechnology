import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";

// NOTE: update this path to wherever your actual Benefits hero image lives in /public.
const HERO_SRC = "/benefits.png";

const sections = [
    {
        title: "All in one",
        body: "There is no need for our customers to travel for a complete IT package they are searching for. We provide one stop solution consulting for IT and Creative services.",
    },
    {
        title: "Speech from technology",
        body: "Technology speaks as we focus on it the most. We provide a complete package of media and technology related solution from ideation to brand conceptualization to marketing toolkit design, software development and retail / market front.",
    },
    {
        title: "Experience Speaks",
        body: "We have a dynamic team of expert and experienced professionals who are dedicated and passionate about their work. This results in punctual and efficient results.",
    },
    {
        title: "For the limelight",
        body: "Creative designing is in the nerves of Geecon. We innovatively provide a fusion of creative designing and hardcore time-tested technology.",
    },
];

export default function BenefitsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="flex-1">
                <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
                    <Image src={HERO_SRC} alt="Geecon Benefits" fill sizes="100vw" className="object-cover" priority />
                </div>

                <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
                    <div className="space-y-16">
                        {sections.map((section, i) => (
                            <AnimateIn key={section.title} delay={i * 0.05}>
                                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
                                    {section.title}
                                </h2>
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {section.body}
                                </p>
                            </AnimateIn>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
