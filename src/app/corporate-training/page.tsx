import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  Prose,
  NumberedList,
  Figure,
} from "../../../components/site/ui";

const BANNER_SRC = "/Training.png";

const training = [
  "Customer Service Training",
  "Trainer Training",
  "Skills Development Programmes",
  "Tourism & Hospitality Training",
  "Customised Training Programme Design",
];

const consultancy = [
  "Group Facilitation",
  "Creating a Customer Focused Culture",
  "Service System Development",
  "Mystery Shopping",
  "Training Needs Analysis",
  "Induction Programme Development",
  "HR Strategy & System Development",
  "Tourism Business Development",
  "Innovation Support",
];

export default function CorporateTrainingPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Solutions", href: "/products" }]}
          title="Corporate Training"
          intro={
            <p>
              Our training &amp; consultancy services are designed to assist
              you in the development of a cutting edge workforce so that you or
              your team can excel in today&apos;s competitive environment.
            </p>
          }
        />

        <Section index="01" label="Formats">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
            <Prose className="lg:self-center">
              <p>
                We offer a wide variety of solutions either on an in-house
                basis or through our open programmes. Courses can be
                specifically tailored to meet your needs or you can choose from
                our extensive range of programmes.
              </p>
              <p>
                If you require support in the following areas then you have
                come to the right place.
              </p>
            </Prose>
            <Figure
              src={BANNER_SRC}
              alt="Corporate training session"
              ratio="aspect-[4/3]"
              priority
            />
          </div>
        </Section>

        <Section index="02" label="Training">
          <NumberedList items={training} />
        </Section>

        <Section index="03" label="Consultancy" tone="tint">
          <ol className="grid border-t border-line sm:grid-cols-2 xl:grid-cols-3">
            {consultancy.map((item, i) => (
              <li
                key={item}
                className="flex gap-4 border-b border-line py-5 sm:pr-6"
              >
                <span className="pt-1 font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-medium leading-snug text-ink">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
