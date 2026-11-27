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

const strengths = [
  {
    title: "Simplicity and User Friendliness",
    body: "Our products are known for their ultimate simplicity and user friendliness. Geecon products are designed taking into consideration the comfort level of the user. This is why we meet and exceed user satisfaction in the user interface of a product.",
  },
  {
    title: "A Team with a Common Dream",
    body: "We come together to define and create unrivalled, unique user experiences. Our team consists of a qualified and experienced Business Strategy expert, a business development head, a Visual Communication guru, professional Web developers, Mainframe Application developers, creative content writers, and a dynamic team of Software developers.",
  },
  {
    title: "Latest Technology with Unique Ideas",
    body: "Geecon emphasizes developing a world-class, sturdy, efficient, lucid product that provides the results users want. We stress using and developing potent new technology that helps create a product with quick, more competent and optimum results.",
  },
  {
    title: "Organized Approach",
    body: "We have an organized and well-defined approach to each target. Clear definitions of work areas and dedicated team efforts on laid-out plans leave no room for compromise on the internal growth of the organization.",
  },
];

export default function StrengthsPage() {
  const [first, second, ...rest] = strengths;

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Company" }]}
          title="Strengths"
          intro="Four things we rely on to build products people find simple to use."
        />

        <Section index="01" tone="ink" title={first.title}>
          <p className="max-w-3xl font-display text-2xl font-medium leading-[1.3] sm:text-[30px]">
            {first.body}
          </p>
        </Section>

        <Section index="02" title={second.title}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Prose>
              <p>{second.body}</p>
            </Prose>
            <Figure
              src={HERO_SRC}
              alt="Landscape photograph"
              contain={false}
              ratio="aspect-[4/3]"
            />
          </div>
        </Section>

        <Section index="03" tone="tint">
          <div className="grid border-t border-line md:grid-cols-2">
            {rest.map((s, i) => (
              <div
                key={s.title}
                className="border-b border-line py-8 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {String(i + 3).padStart(2, "0")}
                </p>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink">
                  {s.title}
                </h2>
                <p className="mt-4 text-[16px] leading-7 text-ink-2">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
