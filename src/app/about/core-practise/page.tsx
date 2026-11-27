import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  Lead,
  Figure,
} from "../../../../components/site/ui";

const HERO_SRC = "/core.png";

const principles = [
  {
    title: "Listening Generously",
    points: [
      "We listen for the contribution in each other's speaking, suspending assessments, opinions and judgments. This means giving the person your undivided attention.",
      "If you can't give your undivided attention right now, request to speak with the person when you can listen to them generously.",
    ],
  },
  {
    title: "Speaking Straight",
    points: [
      "We move past saying “what is supposed to be said” to speak responsibly and honestly in a way that forwards appropriate action.",
      "This includes learning to make clear and direct requests.",
      "Nobody “gets” subtle or veiled requests.",
    ],
  },
  {
    title: "Being “For” Each Other",
    points: [
      "Key to a successful team is being “for” each other, much like one would be for a football team.",
      "This means 100% support for everyone in the company and the roles they play.",
    ],
  },
  {
    title: "Honouring Agreements and Commitments",
    points: [
      "Do what you say you will do: others are depending on you.",
      "If you can't keep your agreement, renegotiate it ahead of time.",
      "If you break an agreement, acknowledge it and negotiate a way to clean up the mess.",
    ],
  },
  {
    title: "Acknowledging and Appreciating Each Other",
    points: [
      "Each of us is a source of acknowledgement and appreciation for every other person.",
      "This includes giving, receiving and requesting acknowledgement.",
    ],
  },
  {
    title: "Taking 100% Ownership",
    points: [
      "Everyone is 100% accountable for their role in the company.",
      "Follow through on your commitments internally and externally.",
      "This does not mean taking on too much (110%) nor does it mean taking too little (90%).",
      "Everything that happens in the company is the result of its people.",
    ],
  },
];

export default function CorePractisePage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader trail={[{ label: "Company" }]} title="Core Practise" />

        <Section index="01" label="Why">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-14">
            <Lead>
              The things we do within our organization to maintain a high level
              of integrity, and to establish an environment where what needs to
              be said can be said, with confidence that both speakers and
              listeners will be treated with respect, and that their ideas and
              contributions will be valued, whether those ideas are implemented
              or not.
            </Lead>
            <Figure
              src={HERO_SRC}
              alt="Landscape photograph"
              contain={false}
              ratio="aspect-[4/5]"
            />
          </div>
        </Section>

        <Section index="02" label="Six practices">
          <div className="grid border-t border-line md:grid-cols-2">
            {principles.map((p, i) => (
              <article
                key={p.title}
                className="border-b border-line py-8 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0"
              >
                <p className="font-display text-5xl font-semibold leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-6 font-display text-2xl font-semibold leading-tight text-ink">
                  {p.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {p.points.map((point) => (
                    <li
                      key={point}
                      className="border-l border-line pl-4 text-[15px] leading-7 text-ink-2"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
