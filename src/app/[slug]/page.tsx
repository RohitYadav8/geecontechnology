import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { prisma } from "../../../lib/prisma";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { BrochureForm } from "../../../components/brochure-form";
import {
  Lead,
  NumberedList,
  PageHeader,
  Prose,
  Section,
  SitePage,
  Tag,
} from "../../../components/site/ui";

type ServiceSection = {
  title: string;
  body: string;
};

// ============================================================
// HELPERS
// ============================================================

function getStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string" &&
      item.trim().length > 0
  );
}

function getSections(
  value: unknown
): ServiceSection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item) =>
        typeof item === "object" &&
        item !== null
    )
    .map((item) => {
      const section =
        item as Record<string, unknown>;

      return {
        title:
          typeof section.title === "string"
            ? section.title
            : "",

        body:
          typeof section.body === "string"
            ? section.body
            : "",
      };
    })
    .filter(
      (section) =>
        section.title.trim().length > 0 ||
        section.body.trim().length > 0
    );
}

// ============================================================
// GET SERVICE
// ============================================================

async function getService(
  slug: string
) {
  try {
    console.log(
      "========================================"
    );

    console.log(
      "SERVICE PAGE DEBUG"
    );

    console.log(
      "Incoming slug:",
      slug
    );

    const service =
      await prisma.service.findUnique({
        where: {
          slug,
        },
      });

    if (!service) {
      console.log(
        "Service found: NO"
      );

      console.log(
        "No service exists with slug:",
        slug
      );

      console.log(
        "========================================"
      );

      return null;
    }

    console.log(
      "Service found: YES"
    );

    console.log(
      "Service title:",
      service.title
    );

    console.log(
      "Service slug:",
      service.slug
    );

    console.log(
      "Service href:",
      service.href
    );

    console.log(
      "Service isActive:",
      service.isActive
    );

    console.log(
      "========================================"
    );

    return service;
  } catch (error) {
    console.error(
      "========================================"
    );

    console.error(
      "SERVICE DATABASE ERROR"
    );

    console.error(
      "Requested slug:",
      slug
    );

    console.error(
      "Service detail fetch error:",
      error
    );

    console.error(
      "========================================"
    );

    return null;
  }
}

// ============================================================
// PAGE
// ============================================================

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  console.log(
    "Root dynamic route slug:",
    slug
  );

  const service =
    await getService(slug);

  if (!service) {
    console.log(
      `404 REASON: Service "${slug}" was not found in database.`
    );

    notFound();
  }

  if (!service.isActive) {
    console.log(
      `404 REASON: Service "${slug}" exists but isActive is false.`
    );

    notFound();
  }

  // Drop intro paragraphs that just repeat the header description
  const normaliseText = (t: string) => t.replace(/\s+/g, " ").trim().toLowerCase();
  const descriptionKey = service.description
    ? normaliseText(service.description)
    : "";
  const intro = getStringArray(service.intro).filter(
    (paragraph) => normaliseText(paragraph) !== descriptionKey
  );

  const challenges = getStringArray(service.challenges);

  const middle = getStringArray(service.middle);

  const benefits = getStringArray(service.benefits);

  const coverage = getStringArray(service.coverage);

  const qa = getStringArray(service.qa);

  const sections = getSections(service.sections);

  /*
   * Light and dark banners are separate artworks. Render both
   * (one per theme) only when they actually differ, so the
   * same image is never output twice.
   */
  const lightBanner = service.bannerImage || service.darkBannerImage;
  const darkBanner = service.darkBannerImage || service.bannerImage;
  const hasThemedBanners = Boolean(
    lightBanner && darkBanner && lightBanner !== darkBanner
  );

  const showTag =
    service.tag &&
    service.tag.trim().toLowerCase() !== service.title.trim().toLowerCase();

  // Build the numbered sections in order, skipping empty ones.
  const blocks: Array<{
    key: string;
    label: string;
    title?: ReactNode;
    tone?: "paper" | "tint";
    content: ReactNode;
  }> = [];

  if (intro.length > 0) {
    blocks.push({
      key: "overview",
      label: "Overview",
      content: (
        <>
          <Lead>{intro[0]}</Lead>
          {intro.length > 1 && (
            <Prose className="mt-8">
              {intro.slice(1).map((paragraph, index) => (
                <p key={`intro-${index}`}>{paragraph}</p>
              ))}
            </Prose>
          )}
        </>
      ),
    });
  }

  if (challenges.length > 0) {
    blocks.push({
      key: "challenges",
      label: "Challenges",
      content: <NumberedList items={challenges} />,
    });
  }

  if (middle.length > 0) {
    blocks.push({
      key: "approach",
      label: "Approach",
      content: (
        <Prose>
          {middle.map((paragraph, index) => (
            <p key={`middle-${index}`}>{paragraph}</p>
          ))}
        </Prose>
      ),
    });
  }

  if (sections.length > 0) {
    blocks.push({
      key: "details",
      label: "In detail",
      content: (
        <NumberedList
          items={sections.map((section) =>
            section.title
              ? {
                  title: section.title,
                  body: section.body ? (
                    <span className="whitespace-pre-line">{section.body}</span>
                  ) : undefined,
                }
              : (
                  <span className="whitespace-pre-line">{section.body}</span>
                )
          )}
        />
      ),
    });
  }

  if (benefits.length > 0 || service.closing) {
    blocks.push({
      key: "benefits",
      label: "Benefits",
      tone: "tint",
      content: (
        <>
          {benefits.length > 0 && <NumberedList items={benefits} />}
          {service.closing && (
            <div className={benefits.length > 0 ? "mt-12" : undefined}>
              <Lead>{service.closing}</Lead>
            </div>
          )}
        </>
      ),
    });
  }

  if (coverage.length > 0) {
    blocks.push({
      key: "coverage",
      label: "Coverage",
      title: "Service coverage areas",
      content: (
        <ul className="grid border-t border-line sm:grid-cols-2">
          {coverage.map((item, index) => (
            <li
              key={index}
              className="flex gap-4 border-b border-line py-4 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
            >
              <span className="pt-0.5 font-mono text-xs text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] leading-7 text-ink">{item}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (qa.length > 0) {
    blocks.push({
      key: "quality",
      label: "Quality",
      content: (
        <Prose>
          {qa.map((paragraph, index) => (
            <p key={`qa-${index}`}>{paragraph}</p>
          ))}
        </Prose>
      ),
    });
  }

  blocks.push({
    key: "brochure",
    label: "Brochure",
    tone: "tint",
    content: (
      <div className="max-w-3xl">
        <BrochureForm />
      </div>
    ),
  });

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Services", href: "/services" }]}
          title={service.title}
          intro={service.description || undefined}
          meta={showTag ? <Tag>{service.tag}</Tag> : undefined}
        />

        {lightBanner && (
          <div className="border-b border-line">
            <div className="mx-auto w-full max-w-[1320px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
              <div
                className={`relative aspect-[16/7] w-full overflow-hidden border border-line bg-paper-2 sm:aspect-[4/1] ${
                  hasThemedBanners ? "dark:hidden" : ""
                }`}
              >
                <Image
                  src={lightBanner}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1320px) 100vw, 1220px"
                  className="object-cover object-center"
                />
              </div>

              {hasThemedBanners && darkBanner && (
                <div className="relative hidden aspect-[16/7] w-full overflow-hidden border border-line bg-paper-2 dark:block sm:aspect-[4/1]">
                  <Image
                    src={darkBanner}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1320px) 100vw, 1220px"
                    className="object-cover object-center"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {blocks.map((block, index) => (
          <Section
            key={block.key}
            index={String(index + 1).padStart(2, "0")}
            label={block.label}
            title={block.title}
            tone={block.tone}
          >
            {block.content}
          </Section>
        ))}
      </main>

      <Footer />
    </SitePage>
  );
}
