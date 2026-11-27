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

const BRANDING_IMAGE = "/branding.png";
const BRANDING_SIDE_IMAGE = "/corporate-branding-1.png";

const advice = [
  {
    title: "Focus on your audience",
    body: "Always keep in mind to focus on your target audience's needs and not to focus on the feature of your product. It's not that your product or service is not awesome, just that your audience needs to feel that you understand them and are aware of their needs, so focusing on how your product can help them is a more engaging and convincing way to convey your message to them.",
  },
  {
    title: "Don't write the script yourself",
    body: "You know too much about your company, and this much information can distract the attention of the viewer so your main vision can be missed. Keep your script clear and concise, with some sizzle in it.",
  },
];

export default function CorporateBrandingPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Solutions", href: "/products" }]}
          title="Corporate Branding"
          intro={
            <p>
              At Geecon, honesty, energy &amp; passion are values we take
              seriously and they run through every project we undertake.
            </p>
          }
        />

        <Section index="01" label="Agency">
          <Figure
            src={BRANDING_IMAGE}
            alt="Brand identity and visual communication"
            ratio="aspect-[16/9]"
            priority
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
            <Prose>
              <p>
                Geecon is a full service creative agency focused on Brand
                Identity Creation, Brand Experience Design (Retail &amp;
                Corporate Office Space), &amp; Specialized Web Solutions. We
                create seamless quality Visual Communication across different
                mediums that helps inspire &amp; transform business &amp;
                brands.
              </p>
            </Prose>
            <Prose>
              <p>
                We offer a broad range of strategic and creative services
                articulated through a successful collaborative model. We
                provide a comfortable and meaningful service by studying truly
                necessary creative and marketing functions. We bring about a
                new experience by acquiring a design motive through
                investigating into and analyzing the user&apos;s behavior
                pattern. Through user-centered design thinking, if it&apos;s
                about communicating visually — we do it.
              </p>
            </Prose>
          </div>
        </Section>

        <Section index="02" label="Goals" tone="ink">
          <p className="max-w-4xl font-display text-3xl font-semibold leading-[1.1] sm:text-5xl">
            At Geecon our goals are all about helping you meet and beat your
            goals.
          </p>
        </Section>

        <Section index="03" label="Advice">
          <div className="grid gap-10 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-12">
            <Figure
              src={BRANDING_SIDE_IMAGE}
              alt="Corporate branding strategy"
              ratio="aspect-square"
            />
            <NumberedList items={advice} />
          </div>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
