import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  NumberedList,
  Figure,
} from "../../../../components/site/ui";

const HERO_SRC = "/core.png";

const reasons = [
  {
    title: "The ultimate tiebreaker",
    body: "We deliver consistency of performance. While it's great to hear “superstar” stories about our employees going above and beyond for a customer, the most powerful tiebreaker in today's marketplace is consistency. Our customers know that no matter who they deal with in our company, they will receive the same level of great service every single time.",
  },
  {
    title: "Solve problems on the spot",
    body: "We empower our employees to make it happen. Nothing is more frustrating to customers than hearing “I'll have to ask my manager” or “I'm sorry, but our policy is . . .” We have trained our employees to resolve customer problems fairly, amicably and, whenever possible, on the spot. Effective problem resolution wins us customers for life.",
  },
  {
    title: "Be relevant",
    body: "We believe in understanding what matters to our customers and responding to their real business needs. Our approach is focused on practical solutions, meaningful communication and services that remain relevant as requirements evolve.",
  },
  {
    title: "Demonstrate value",
    body: "We offer competitive prices and clear value. We keep things clear, concise and transparent: we do not say something to win a project and then drag the project, solution and business by deviating from a false initial commitment. We have demonstrated to our existing business relations that we're a great deal. That's the essence of value. We never take our customers for granted; we spell it out for them and educate them.",
  },
  {
    title: "We let the customer choose",
    body: "We offer more selection and customisation. Today's customers want exactly what they want, exactly how they want it. Whether it's the music mix on their iPod or their no fat, no whip, double shot, extra hot latte with a shot of vanilla, everyone wants it their way. Hence we let our customers decide and give them what they want through agile methodology, not what a traditional company wants to give them.",
  },
  {
    title: "Easiest to do business with",
    body: "The number one factor with business-to-business customers is being the no-hassle choice. We continuously look at every aspect of how we interface with customers and correct anything that might make us the least bit difficult to do business with. Our invoices are clear and easily understood. We empower employees to say “yes” to customers without always having to get approval from a manager.",
  },
  {
    title: "Quick response, always on time",
    body: "Over time we have become known for returning customers' calls within the committed time. We guarantee delivery deadlines, respond to service calls faster than is typical in the industry, and answer emails with lightning speed. Being quick and always on time is one of our most powerful differentiators.",
  },
];

export default function WhyUsPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Company" }]}
          title="Why Us"
          intro="Seven reasons to choose Geecon."
        />

        <Section index="01" label="Our motto" tone="tint">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-14">
            <p className="font-display text-5xl font-semibold leading-[1] text-ink sm:text-7xl">
              Be easy and <span className="text-accent">win business.</span>
            </p>
            <Figure
              src={HERO_SRC}
              alt="Landscape photograph"
              contain={false}
              ratio="aspect-[3/2]"
            />
          </div>
        </Section>

        <Section index="02" label="Reasons">
          <NumberedList items={reasons} />
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
