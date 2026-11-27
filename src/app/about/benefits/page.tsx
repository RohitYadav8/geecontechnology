import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import {
  SitePage,
  Container,
  PageHeader,
  Section,
  Columns,
  Figure,
} from "../../../../components/site/ui";

const HERO_SRC = "/benefits.png";

const benefits = [
  {
    kicker: "One stop",
    title: "All in one",
    body: "There is no need for our customers to travel for the complete IT package they are searching for. We provide one-stop consulting for IT and Creative services.",
  },
  {
    kicker: "Technology",
    title: "Speech from technology",
    body: "Technology speaks, as we focus on it the most. We provide a complete package of media and technology solutions, from ideation to brand conceptualization to marketing toolkit design, software development and retail / market front.",
  },
  {
    kicker: "People",
    title: "Experience speaks",
    body: "We have a dynamic team of expert and experienced professionals who are dedicated and passionate about their work. This results in punctual and efficient results.",
  },
  {
    kicker: "Design",
    title: "For the limelight",
    body: "Creative design is in Geecon's nerves. We innovatively provide a fusion of creative design and hardcore, time-tested technology.",
  },
];

export default function BenefitsPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Company" }]}
          title="Benefits"
          intro="What clients get when they work with Geecon."
        />

        <section className="border-b border-line">
          <Container className="py-10 sm:py-14">
            <Figure
              src={HERO_SRC}
              alt="Geecon benefits illustration"
              contain={false}
              ratio="aspect-[16/7]"
              priority
            />
          </Container>
        </section>

        <Section index="01" label="Four benefits">
          <Columns cols={2} items={benefits} />
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
