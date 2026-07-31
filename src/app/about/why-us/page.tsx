import Image from "next/image";
import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";

// NOTE: update this path to wherever your actual hero image lives in /public.
const HERO_SRC = "/core.png";

const reasons = [
    {
        title: "The ultimate tiebreaker:",
        body: "We deliver consistency of performance. While it's great to hear \u201csuperstar\u201d stories about our employees that go above and beyond for a customer, the most powerful tiebreaker in today's marketplace for us is consistency. Our customers realises & knows that no matter who they deal with in our company, they will receive the same level of great service every single time, that's the most powerful differentiator for us.",
    },
    {
        title: "Solve problems on the spot:",
        body: "We empower our employees to make it happen. We understand that nothing is more frustrating to customers than hearing the words \u201cI'll have to ask my manager\u201d or \u201cI'm sorry, but our policy is . . .\u201d We have trained our employees to resolve customer problems fairly, amicably, and, whenever possible, on the spot. Effective problem resolution wins us customers for life.",
    },
    {
        // NOTE: on the original site this section had the exact same body text as
        // "Solve problems on the spot:" above (looks like a copy-paste bug in the old
        // content). Left as-is for now — replace with real "Be Relevant" copy when ready.
        title: "Be Relevant:",
        body: "We empower our employees to make it happen. We understand that nothing is more frustrating to customers than hearing the words \u201cI'll have to ask my manager\u201d or \u201cI'm sorry, but our policy is . . .\u201d We have trained our employees to resolve customer problems fairly, amicably, and, whenever possible, on the spot. Effective problem resolution wins us customers for life.",
    },
    {
        title: "Demonstrate value:",
        body: "We offer competitive price and clear value. We believe in keeping things clear, concise and transparent, we do not say something to win the project and drag the project, solution and business by deviating from our initial false commitment used to win the project. We have demonstrated to our existing business relations that we're a great deal. That's the essence of value. We never take our customer for granted. We spell it out for our customers & educate them.",
    },
    {
        title: "We allow the customer to choose:",
        body: "We offer more selection and customisation. Today's customers want exactly what they want, exactly how they want it. Whether it's the music mix on their iPod or their no fat, no whip, double shot, extra hot latte with a shot of vanilla at the coffee shop, everyone wants it their way. Hence we let our customers decide and give them what they want through agile methodology, not what a traditional company wants to give them.",
    },
    {
        title: "Easiest to do business with:",
        body: "The number one factor with business to business customers is that we are the no hassle choice. We are continuously looking at every aspect of how we interface with customers and correct anything that might make us the least bit difficult to do business with. Our invoices are clear and easily understood. We empower employees to say \u201cyes\u201d to customers without always having to get approval from a manager. Our motto is \u201cBe easy and win business\u201d.",
    },
    {
        title: "Quick response and always in time:",
        body: "Over the period of time we have become known for returning customer's calls within committed time. We guarantee the delivery deadlines and always doing it in one of the fastest response time as compared to industry of a service call, responding to emails with lightning speed. We are known for a quick response in our customer community and always being on time is one of our powerful differentiator.",
    },
];

export default function WhyUsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />
            <main className="flex-1">
                <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
                    <Image src={HERO_SRC} alt="Why Choose Geecon" fill sizes="100vw" className="object-cover" priority />
                </div>

                <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
                    <div className="space-y-14">
                        {reasons.map((reason, i) => (
                            <AnimateIn key={reason.title} delay={i * 0.04}>
                                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
                                    {reason.title}
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {reason.body}
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
