import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  Prose,
  Lead,
  Columns,
  Figure,
} from "../../../components/site/ui";

const BANNER_SRC = "/Internet-Technology.png";
const GLOBE_ICON_SRC = "/internet-technology-1.png";

const services = [
  {
    title: "Web Strategy",
    body: "Build a strong digital strategy aligned with your business goals.",
  },
  {
    title: "Web Development",
    body: "Modern and scalable web solutions built around your requirements.",
  },
  {
    title: "Internet Marketing",
    body: "Improve your online visibility and reach the right customers.",
  },
  {
    title: "Business Growth",
    body: "Turn technology into measurable business value and growth.",
  },
];

export default function InternetTechnologyPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Solutions", href: "/products" }]}
          title="Internet Technology"
          intro={
            <p>
              We work closely with you and your staff to uncover frustrations
              with current operations and processes. Our technological
              expertise allows us to create custom web solutions that will ease
              these points of pain to make your business more efficient. Our
              focus is to create an online environment that stimulates your
              business&apos;s success and growth.
            </p>
          }
        />

        <Section index="01" label="Online success" tone="tint">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <Lead>
                A great web solution is just the first step in the process to
                online success.
              </Lead>
              <Prose className="mt-8">
                <p>
                  We can develop a great website that is easy to use, meets
                  your organization&apos;s needs and is visually impressive. We
                  also need to make sure that your customers are finding your
                  website online. This is where Internet marketing comes into
                  play.
                </p>
              </Prose>
            </div>
            <Figure
              src={BANNER_SRC}
              alt="Internet technology and web solutions"
              ratio="aspect-[4/3]"
              priority
            />
          </div>
        </Section>

        <Section index="02" label="Services">
          <Columns items={services} cols={4} />
        </Section>

        <Section index="03" label="Approach">
          <div className="grid gap-10 md:grid-cols-[1fr_minmax(0,14rem)] md:gap-12">
            <Prose>
              <p>
                With over 10 years experience in IT and web technologies, we
                are held in high regard with our customers due to our flexible
                and innovative approach in providing business driven solutions
                matching your needs.
              </p>
              <p>
                Offering a range of services from web strategy, through
                delivery of website design, development and configuration to
                the management of an online presence, we can take your business
                objectives and requirements and design practical and cost
                effective solutions to deliver to your needs and provide
                measurable value.
              </p>
              <p>
                We offer personal touch to all of our customers. For this, we
                allocate a dedicated manager to every project that keep
                communications going uninterruptedly from the outset. This
                approach helps us rapidly respond to changes initiated by our
                customers, adjust project team size when necessary, provide all
                the support, and ensure further project development.
              </p>
            </Prose>
            <Figure
              src={GLOBE_ICON_SRC}
              alt="Global connectivity"
              ratio="aspect-square"
            />
          </div>
        </Section>

        <Section index="04" label="Revenue" tone="ink">
          <p className="max-w-3xl font-display text-2xl font-medium leading-[1.3] sm:text-[30px]">
            We build custom software products that drive revenue and provide
            seamless customer experiences for your business.
          </p>
          <p className="mt-8 max-w-[62ch] text-[16px] leading-[1.75] text-paper/75 sm:text-[17px]">
            Driving revenue means staying tied to business priorities. We do
            this by identifying opportunities to improve your customer
            experience and monetize your existing data and content.
          </p>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
