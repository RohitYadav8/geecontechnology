import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  User,
  Tag,
} from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import { AnimateIn } from "../../../../components/animate-in";

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

  // ==========================================================
  // FETCH BLOG
  // ==========================================================

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      isPublished: true,
    },
  });

  if (!post) {
    notFound();
  }

  // ==========================================================
  // TAGS
  // ==========================================================

  const tags: string[] =
    Array.isArray(post.tags)
      ? post.tags.filter(
          (tag): tag is string =>
            typeof tag === "string"
        )
      : [];

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* ==================================================
            ARTICLE HEADER
        ================================================== */}

        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50/70 px-6 py-14 dark:border-slate-800 dark:bg-slate-900/40 sm:px-8 sm:py-16 lg:px-10">
          {/* Background */}

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px] dark:bg-blue-500/10" />

            <div className="absolute left-[-150px] bottom-[-150px] h-[350px] w-[350px] rounded-full bg-violet-500/5 blur-[100px] dark:bg-violet-500/10" />
          </div>

          <div className="relative mx-auto max-w-4xl">
            <AnimateIn>
              {/* BACK */}

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                <ArrowLeft size={16} />

                Back to Blog
              </Link>

              {/* CATEGORY */}

              {post.category && (
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                  {post.category}
                </p>
              )}

              {/* TITLE */}

              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {/* EXCERPT */}

              {post.excerpt && (
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                  {post.excerpt}
                </p>
              )}

              {/* META */}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User size={15} />

                    <span>
                      {post.author}
                    </span>
                  </div>
                )}

                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} />

                    <time
                      dateTime={post.publishedAt.toISOString()}
                    >
                      {post.publishedAt.toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </time>
                  </div>
                )}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ==================================================
            ARTICLE
        ================================================== */}

        <article className="px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="mx-auto max-w-4xl">
            {/* FEATURED IMAGE */}

            {post.featuredImage && (
              <AnimateIn>
                <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                </div>
              </AnimateIn>
            )}

            {/* CONTENT */}

            <AnimateIn delay={0.08}>
              <div className="mt-10">
                <div className="whitespace-pre-line text-[15px] leading-8 text-slate-700 dark:text-slate-300 sm:text-base">
                  {post.content}
                </div>
              </div>
            </AnimateIn>

            {/* TAGS */}

            {tags.length > 0 && (
              <div className="mt-12 border-t border-slate-200 pt-7 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag
                    size={15}
                    className="mr-1 text-slate-400"
                  />

                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* BACK */}

            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
              >
                <ArrowLeft size={15} />

                View All Blog Posts
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}