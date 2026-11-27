import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import {
  ButtonLink,
  Container,
  Figure,
  PageHeader,
  SitePage,
  Tag,
} from "../../../../components/site/ui";

import { prisma } from "../../../../lib/prisma";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// ============================================================
// GENERATE SEO METADATA
// ============================================================

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      isPublished: true,
    },
  });

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.metaTitle || post.title,

    description:
      post.metaDescription ||
      post.excerpt ||
      undefined,

    keywords:
      post.keywords || undefined,

    openGraph: {
      title:
        post.metaTitle || post.title,

      description:
        post.metaDescription ||
        post.excerpt ||
        undefined,

      images:
        post.openGraphImage
          ? [post.openGraphImage]
          : post.featuredImage
            ? [post.featuredImage]
            : undefined,

      type: "article",
    },
  };
}

// ============================================================
// BLOG DETAIL PAGE
// ============================================================

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      isPublished: true,
    },
  });

  if (!post) {
    notFound();
  }

  const tags: string[] =
    Array.isArray(post.tags)
      ? post.tags.filter(
          (tag): tag is string =>
            typeof tag === "string"
        )
      : [];

  const metaParts = [
    post.category,
    post.author ? `By ${post.author}` : null,
  ].filter(Boolean) as string[];

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Blog", href: "/blog" }]}
          title={<span className="break-words">{post.title}</span>}
          intro={post.excerpt || undefined}
          meta={
            (metaParts.length > 0 || post.publishedAt) && (
              <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt.toISOString()}>
                    {post.publishedAt.toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                )}
                {metaParts.map((part) => (
                  <span key={part}>
                    <span aria-hidden className="mr-3">/</span>
                    {part}
                  </span>
                ))}
              </p>
            )
          }
        />

        <article className="border-b border-line">
          {post.featuredImage && (
            <Container className="pt-10 sm:pt-14">
              <Figure
                src={post.featuredImage}
                alt={post.title}
                ratio="aspect-[16/8]"
                contain={false}
                priority
              />
            </Container>
          )}

          <Container className="grid py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
            <div className="lg:col-span-8 lg:col-start-4">
              <div className="max-w-[68ch] whitespace-pre-line text-[17px] leading-[1.85] text-ink-2 sm:text-[19px]">
                {post.content}
              </div>

              {tags.length > 0 && (
                <div className="mt-14 flex max-w-[68ch] flex-wrap items-center gap-2 border-t border-line pt-6">
                  <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    Tags
                  </span>
                  {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              )}

              <div className="mt-12">
                <ButtonLink href="/blog" variant="text">
                  All posts
                </ButtonLink>
              </div>
            </div>
          </Container>
        </article>
      </main>

      <Footer />
    </SitePage>
  );
}
