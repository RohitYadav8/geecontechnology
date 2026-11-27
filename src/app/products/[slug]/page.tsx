import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { BrochureForm } from "../../../../components/brochure-form";
import {
  Container,
  NumberedList,
  PageHeader,
  Prose,
  Section,
  SitePage,
} from "../../../../components/site/ui";
import { prisma } from "../../../../lib/prisma";

/* =========================================================
   TYPES
========================================================= */

type Product = {
  id: string;
  title: string;
  slug: string;

  bannerImage: string | null;
  logoImage: string | null;

  shortDescription: string | null;
  description: string | null;

  features: unknown;
  benefits: unknown;
  sections: unknown;
  faqs: unknown;

  brochureUrl: string | null;

  brochureGradientFrom: string | null;
  brochureGradientVia: string | null;
  brochureGradientTo: string | null;

  isActive: boolean;
};

type TextItem = {
  title?: string;
  description?: string;
};

type SectionItem = {
  title?: string;
  description?: string;
  features: string[];
};

type FaqItem = {
  question?: string;
  answer?: string;
};

/* =========================================================
   FETCH PRODUCT
========================================================= */

async function getProduct(
  slug: string
): Promise<Product | null> {
  try {
    const product =
      await prisma.product.findUnique({
        where: {
          slug,
        },

        select: {
          id: true,
          title: true,
          slug: true,

          bannerImage: true,
          logoImage: true,

          shortDescription: true,
          description: true,

          features: true,
          benefits: true,
          sections: true,
          faqs: true,

          brochureUrl: true,

          brochureGradientFrom: true,
          brochureGradientVia: true,
          brochureGradientTo: true,

          isActive: true,
        },
      });

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    console.error(
      "Product detail database error:",
      error
    );

    return null;
  }
}

/* =========================================================
   HELPERS
========================================================= */

function getTextItem(
  value: unknown
): TextItem {
  if (typeof value === "string") {
    return {
      description: value,
    };
  }

  if (
    typeof value !== "object" ||
    value === null
  ) {
    return {};
  }

  const item =
    value as Record<string, unknown>;

  return {
    title:
      typeof item.title === "string"
        ? item.title
        : undefined,

    description:
      typeof item.description === "string"
        ? item.description
        : typeof item.body === "string"
          ? item.body
          : typeof item.text === "string"
            ? item.text
            : undefined,
  };
}

function getSectionItem(
  value: unknown
): SectionItem {
  if (typeof value === "string") {
    return {
      description: value,
      features: [],
    };
  }

  if (
    typeof value !== "object" ||
    value === null
  ) {
    return {
      features: [],
    };
  }

  const item =
    value as Record<string, unknown>;

  const nestedFeatures = Array.isArray(
    item.features
  )
    ? item.features.filter(
        (
          feature
        ): feature is string =>
          typeof feature === "string" &&
          feature.trim().length > 0
      )
    : [];

  return {
    title:
      typeof item.title === "string"
        ? item.title
        : undefined,

    description:
      typeof item.description === "string"
        ? item.description
        : typeof item.body === "string"
          ? item.body
          : typeof item.text === "string"
            ? item.text
            : undefined,

    features: nestedFeatures,
  };
}

function getFaqItem(
  value: unknown
): FaqItem {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return {};
  }

  const item =
    value as Record<string, unknown>;

  return {
    question:
      typeof item.question === "string"
        ? item.question
        : undefined,

    answer:
      typeof item.answer === "string"
        ? item.answer
        : undefined,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const product =
    await getProduct(slug);

  if (
    !product ||
    !product.isActive
  ) {
    notFound();
  }

  const features = Array.isArray(
    product.features
  )
    ? product.features
    : [];

  const benefits = Array.isArray(
    product.benefits
  )
    ? product.benefits
    : [];

  const sections = Array.isArray(
    product.sections
  )
    ? product.sections
    : [];

  const faqs = Array.isArray(
    product.faqs
  )
    ? product.faqs
    : [];

  const textItems = (values: unknown[]) =>
    values
      .map(getTextItem)
      .filter((item) => item.title || item.description)
      .map((item) =>
        item.title
          ? { title: item.title, body: item.description }
          : (item.description as string)
      );

  const featureItems = textItems(features);
  const benefitItems = textItems(benefits);

  const sectionItems = sections
    .map(getSectionItem)
    .filter(
      (item) => item.title || item.description || item.features.length > 0
    );

  const faqItems = faqs
    .map(getFaqItem)
    .filter((item) => item.question || item.answer);

  const blocks: Array<{
    key: string;
    label: string;
    tone?: "paper" | "tint";
    content: ReactNode;
  }> = [];

  if (product.description || sectionItems.length > 0) {
    blocks.push({
      key: "overview",
      label: "Overview",
      content: (
        <>
          {product.description && (
            <Prose>
              <p className="whitespace-pre-line">{product.description}</p>
            </Prose>
          )}

          {sectionItems.length > 0 && (
            <div
              className={`space-y-12 ${product.description ? "mt-14" : ""}`}
            >
              {sectionItems.map((item, index) => (
                <div key={index} className="border-t border-line pt-6">
                  {item.title && (
                    <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
                      {item.title}
                    </h3>
                  )}

                  {item.description && (
                    <Prose className={item.title ? "mt-4" : undefined}>
                      <p className="whitespace-pre-line">{item.description}</p>
                    </Prose>
                  )}

                  {item.features.length > 0 && (
                    <ul className="mt-6 max-w-[68ch]">
                      {item.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex gap-4 border-t border-line py-3 text-[15px] leading-7 text-ink-2"
                        >
                          <span
                            aria-hidden
                            className="mt-3 h-1.5 w-1.5 shrink-0 bg-accent"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ),
    });
  }

  if (featureItems.length > 0) {
    blocks.push({
      key: "features",
      label: "Key features",
      content: <NumberedList items={featureItems} />,
    });
  }

  if (benefitItems.length > 0) {
    blocks.push({
      key: "benefits",
      label: "Benefits",
      content: <NumberedList items={benefitItems} />,
    });
  }

  if (faqItems.length > 0) {
    blocks.push({
      key: "faq",
      label: "Questions",
      content: (
        <dl className="border-t border-line">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 border-b border-line py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10"
            >
              <dt className="font-display text-lg font-semibold leading-snug text-ink">
                {item.question}
              </dt>
              {item.answer && (
                <dd className="whitespace-pre-line text-[15px] leading-7 text-ink-2">
                  {item.answer}
                </dd>
              )}
            </div>
          ))}
        </dl>
      ),
    });
  }

  blocks.push({
    key: "brochure",
    label: "Brochure",
    tone: "tint",
    content: (
      <div className="max-w-3xl">
        <BrochureForm productId={product.id} />
      </div>
    ),
  });

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Products", href: "/products" }]}
          title={product.title}
          intro={product.shortDescription || undefined}
          meta={
            product.logoImage ? (
              <span className="relative block h-20 w-20 border border-line bg-white">
                <Image
                  src={product.logoImage}
                  alt={`${product.title} logo`}
                  fill
                  sizes="80px"
                  className="object-contain p-3"
                />
              </span>
            ) : undefined
          }
        />

        {product.bannerImage && (
          <div className="border-b border-line">
            <Container className="py-10 sm:py-14">
              <div className="relative aspect-[91/20] w-full overflow-hidden border border-line bg-paper-2">
                <Image
                  src={product.bannerImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1320px) 100vw, 1220px"
                  className="object-cover object-center"
                />
              </div>
            </Container>
          </div>
        )}

        {blocks.map((block, index) => (
          <Section
            key={block.key}
            index={String(index + 1).padStart(2, "0")}
            label={block.label}
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
