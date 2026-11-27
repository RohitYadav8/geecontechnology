import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  Columns,
  Figure,
} from "../../../../components/site/ui";

const HERO_SRC = "/core.png";

const principles = [
  {
    title: "Inclusion",
    body: "We agree to include and inform everyone affected by a project or a decision.",
  },
  {
    title: "Acknowledgement & Appreciation",
    body: "We regularly acknowledge and appreciate our fellow employees, our customers, vendors, partners and ourselves for contributions made in support of Geecon's vision and pursuit of excellence.",
  },
  {
    title: "Sound Decision Making",
    body: "We make decisions we L.I.K.E. Our decisions are based on Logic, Intuition, Knowledge and Experience.",
  },
  {
    title: "Discipline",
    body: "In support of collaboration on goals and objectives, the discipline of Geecon lies in elucidating, refining, accomplishing, delineating and completing all activities.",
  },
];

const commitments = [
  {
    title: "Constant Improvement",
    bullets: [
      "Persistent and ceaseless improvement, to ensure quality and productivity across all areas in the company.",
      "Seeking knowledge and understanding, then applying it to ourselves, our customers, processes and products.",
    ],
  },
  {
    title: "Full Self Expression",
    bullets: [
      "Respectful communication of creativity, ideas and concerns.",
      "Freedom to express ideas, concerns and possibilities.",
    ],
  },
  {
    title: "Integrity",
    bullets: [
      "Honest & committed internal/external relationships.",
      "Honoring and respecting others' points of view and feelings.",
      "Doing what's right for us and for our customers.",
    ],
  },
];

export default function CoreValuesPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Company" }]}
          title="Core Values"
          intro="Seven values that shape how we decide, work together and treat the people we work with."
        />

        <Section index="01" label="How we decide">
          <Columns cols={2} items={principles} />
        </Section>

        <Section index="02" label="How we grow" tone="tint">
          <div className="border-t border-line">
            {commitments.map((c, i) => (
              <div
                key={c.title}
                className="grid gap-4 border-b border-line py-8 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {String(i + principles.length + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">
                    {c.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-4 text-[16px] leading-7 text-ink-2"
                    >
                      <span
                        aria-hidden
                        className="mt-3.5 h-px w-4 shrink-0 bg-accent"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <section className="border-b border-line">
          <Figure
            src={HERO_SRC}
            alt="Landscape photograph"
            contain={false}
            ratio="aspect-[21/9]"
            className="[&>div]:border-0"
          />
        </section>
      </main>

      <Footer />
    </SitePage>
  );
}
