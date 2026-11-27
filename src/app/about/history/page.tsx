import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  Prose,
  Figure,
} from "../../../../components/site/ui";

const HERO_SRC = "/core.png";

const timeline = [
  {
    year: "1999",
    phase: "The beginning",
    title: "A thought is born and named Geecon",
    body: "From the beginning, the company was founded on the principle of providing Business and Management Consultancy, Software Solutions and IT Consultancy. For over a decade, Geecon has been focused on bringing to life great ideas and IT solutions that drive progress for our clients. Continuous innovation and rapid transformation have been themes throughout Geecon's history.",
  },
  {
    year: "2007",
    phase: "The beginning",
    title: "Geecon emerges in India",
    body: "Geecon started delivering excellent services to its clients in India and built its reputation primarily as a technology consultant. It began offering a new breed of business integration solutions: solutions that aligned organizational technologies and people with their strategies.",
  },
  {
    year: "2009",
    phase: "The middle",
    title: "Headquarters move to London",
    body: "A decision was made to shift the headquarters to London, United Kingdom, to offer its services globally. Throughout its history, Geecon has provided compelling and cost-effective solutions for IT services, resourcing and design.",
  },
  {
    year: "2011",
    phase: "The middle",
    title: "Private Limited Company in India",
    body: "Geecon acquired the status of a Private Limited Company in India.",
  },
];

export default function HistoryPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Company" }]}
          title="History"
          intro="From a single idea in 1999 to a headquarters in London."
        />

        <Section index="01" label="Timeline">
          <ol className="border-t border-line">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="grid gap-4 border-b border-line py-10 sm:grid-cols-[10rem_1fr] sm:gap-10 sm:py-12"
              >
                <div>
                  <p className="font-display text-5xl font-semibold leading-none text-accent sm:text-6xl">
                    {item.year}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {item.phase}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[30px]">
                    {item.title}
                  </h2>
                  <Prose className="mt-4">
                    <p>{item.body}</p>
                  </Prose>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section index="02" label="Place" tone="tint">
          <Figure
            src={HERO_SRC}
            alt="Landscape photograph"
            contain={false}
            ratio="aspect-[16/9]"
          />
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
