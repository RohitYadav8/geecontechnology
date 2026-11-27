import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import {
  ButtonLink,
  Container,
  Figure,
  PageHeader,
  Prose,
  Section,
  SitePage,
  Tag,
} from "../../../../components/site/ui";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CaseStudyDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const caseStudy = await prisma.caseStudy.findUnique({
    where: {
      slug,
    },
  });

  if (!caseStudy || !caseStudy.isActive) {
    notFound();
  }

  const technologies = Array.isArray(caseStudy.technologies)
    ? caseStudy.technologies.filter(
        (technology): technology is string =>
          typeof technology === "string"
      )
    : [];

  /* Only sections that have content are rendered, numbered in order */
  const chapters = [
    { label: "Overview", text: caseStudy.description },
    { label: "Challenge", text: caseStudy.challenge },
    { label: "Solution", text: caseStudy.solution },
    { label: "Result", text: caseStudy.results },
  ].filter((c): c is { label: string; text: string } => Boolean(c.text));

  // Skip any chapter whose text already appeared (header intro or an
  // earlier chapter), so the same copy is never printed twice.
  const seenText = new Set<string>();
  const normaliseText = (t: string) => t.replace(/\s+/g, " ").trim().toLowerCase();
  if (caseStudy.shortDescription) seenText.add(normaliseText(caseStudy.shortDescription));
  const uniqueChapters = chapters.filter((c) => {
    const key = normaliseText(c.text);
    if (seenText.has(key)) return false;
    seenText.add(key);
    return true;
  });

  const facts = [
    { label: "Client", value: caseStudy.clientName },
    { label: "Industry", value: caseStudy.industry },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  const hasFacts =
    facts.length > 0 || technologies.length > 0 || caseStudy.projectUrl;

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Case Studies", href: "/case-studies" }]}
          title={<span className="break-words">{caseStudy.title}</span>}
          intro={caseStudy.shortDescription || undefined}
        />

        {/* FACT STRIP */}
        {hasFacts && (
          <section className="border-b border-line">
            <Container>
              <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="border-b border-line py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 font-display text-xl font-semibold text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}

                {technologies.length > 0 && (
                  <div className="border-b border-line py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      Technologies
                    </dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {technologies.map((technology) => (
                        <Tag key={technology}>{technology}</Tag>
                      ))}
                    </dd>
                  </div>
                )}

                {caseStudy.projectUrl && (
                  <div className="py-6 lg:px-6 lg:first:pl-0">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      Project
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={caseStudy.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 border-b border-current pb-0.5 text-sm font-semibold text-ink hover:text-accent"
                      >
                        Visit project
                        <ArrowUpRight
                          size={15}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </Container>
          </section>
        )}

        {/* IMAGE (once) */}
        {caseStudy.image && (
          <section className="border-b border-line">
            <Container className="py-10 sm:py-14">
              <Figure
                src={caseStudy.image}
                alt={caseStudy.title}
                ratio="aspect-[16/8]"
                contain={false}
                priority
              />
            </Container>
          </section>
        )}

        {/* LONG-FORM CHAPTERS */}
        {uniqueChapters.map((chapter, i) => (
          <Section
            key={chapter.label}
            index={String(i + 1).padStart(2, "0")}
            label={chapter.label}
            tone={chapter.label === "Result" ? "tint" : "paper"}
          >
            <Prose className="whitespace-pre-line sm:text-[18px]">
              {chapter.text}
            </Prose>
          </Section>
        ))}

        <Container className="py-12">
          <ButtonLink href="/case-studies" variant="text">
            All case studies
          </ButtonLink>
        </Container>
      </main>

      <Footer />
    </SitePage>
  );
}
