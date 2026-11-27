import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  Prose,
  Lead,
  Figure,
} from "../../../components/site/ui";

const BANNER_SRC = "/mobile-solution-3.png";
const PHONE_ICON_SRC = "/mobile-solution-service.png";

const benefits = [
  {
    title: "Accelerated Solutions",
    body: "Decrease time-to-market through facilitated collaboration.",
  },
  {
    title: "Flexibility and Versatility",
    body: "Through incremental and modular delivery.",
  },
  {
    title: "Cost Effectiveness",
    body: "A per-device-payment model for better cash flow.",
  },
  {
    title: "Scale and Reach",
    body: "End-to-end service and delivery.",
  },
];

export default function MobileSolutionPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Solutions", href: "/products" }]}
          title="Mobile Solution"
          intro={
            <p>
              Mobile solutions have become central to the way enterprises
              conduct their business, enabling customers and employees to be
              always-on and even powering the next wave of connected services —
              the Internet of Things.
            </p>
          }
        />

        <Section
          index="01"
          label="B2C & B2E"
          title="From mobile opportunity to business advantage"
        >
          <div className="grid gap-10 xl:grid-cols-[1fr_minmax(0,24rem)] xl:gap-12">
            <Prose>
              <p>
                We help enterprises harness mobile opportunities with
                customers, from marketing campaigns to sales transactions and
                customer service. A coherent &ldquo;B2C&rdquo; mobile strategy
                and execution creates opportunities to build brand awareness,
                enhance services, develop a fuller understanding of customer
                needs and reach new customers.
              </p>
              <p>
                Employees today want mobile solutions that enable them to be
                always connected to any device in any location. Enterprise
                mobility results in accelerated processes, more flexible
                working practices, greater employee productivity and a
                workforce proud of its tools. We help clients with their
                &ldquo;B2E&rdquo; strategies to unleash and manage their
                employees&apos; potential.
              </p>
            </Prose>
            <Figure
              src={BANNER_SRC}
              alt="Mobile apps on connected devices"
              ratio="aspect-[4/5]"
              priority
            />
          </div>
        </Section>

        <Section index="02" label="Your benefits" tone="ink">
          <dl className="grid border-t border-paper/20 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="border-b border-paper/20 py-8 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
              >
                <p className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <dt className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                  {b.title}
                </dt>
                <dd className="mt-3 text-[16px] leading-7 text-paper/75">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section index="03" label="Development">
          <Lead>
            Partner with a group of thinkers, makers, code ninjas and problem
            solvers that believe in building software products that have real
            purpose.
          </Lead>
          <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-12">
            <Figure
              src={PHONE_ICON_SRC}
              alt="Mobile applications"
              ratio="aspect-square"
            />
            <Prose>
              <p>
                Geecon offers design and development services for mobile apps.
                Based on your requirements we produce apps which can be
                standalone or integrate with other data sources using secure
                management systems. Our mobile application development allows
                for apps to be output for native iOS and Android platforms.
              </p>
              <p>
                At Geecon all mobile apps are developed to deliver content and
                functionality to users through an intuitive and optimised
                interface. Our team of experts will work with you to ensure the
                latest smartphone features are integrated with your mobile app.
              </p>
              <p>
                We build custom software products that drive revenue and
                provide seamless customer experiences for your business.
              </p>
            </Prose>
          </div>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
