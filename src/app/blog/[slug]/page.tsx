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
import { FloatingBlob } from "../../../../components/floating-blob";

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
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="flex-1">
        {/* ==================================================
            ARTICLE HEADER
        ================================================== */}

        <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
          {/* Background */}

          <FloatingBlob
            className="-left-40 top-24 h-[460px] w-[460px]"
            color="bg-cyan-300/35"
            duration={18}
          />

          <FloatingBlob
            className="-right-28 -top-24 h-[420px] w-[420px]"
            color="bg-violet-300/40"
            duration={16}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <AnimateIn>
              {/* BACK */}

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.22]"
              >
                <ArrowLeft size={16} />

                Back to Blog
              </Link>

              {/* CATEGORY */}

              {post.category && (
                <div className="mt-8">
                  <p className="inline-flex rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                    {post.category}
                  </p>
                </div>
              )}

              {/* TITLE */}

              <h1 className="mt-6 break-words text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[64px]">
                {post.title}
              </h1>

              {/* EXCERPT */}

              {post.excerpt && (
                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                  {post.excerpt}
                </p>
              )}

              {/* META */}

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-indigo-50/90">
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

        <article className="relative z-10 -mt-28 px-4 pb-24 sm:-mt-32 sm:px-6 sm:pb-28 lg:px-10">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-100 bg-white p-3 shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] sm:p-4">
            {/* FEATURED IMAGE */}

            {post.featuredImage && (
              <AnimateIn>
                <div className="relative aspect-[16/8] overflow-hidden rounded-[22px] bg-slate-100 dark:bg-slate-900">
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

            <div className="px-3 pb-6 pt-8 sm:px-8 sm:pb-10 sm:pt-10 lg:px-12">
              {/* CONTENT */}

              <AnimateIn delay={0.08}>
                <div>
                  <span className="brand-grad mb-8 block h-1 w-12 rounded-full" />

                  <div className="whitespace-pre-line text-[15px] leading-8 text-slate-700 dark:text-slate-300 sm:text-base">
                    {post.content}
                  </div>
                </div>
              </AnimateIn>

              {/* TAGS */}

              {tags.length > 0 && (
                <div className="mt-12 border-t border-slate-100 pt-7 dark:border-white/[0.07]">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag
                      size={15}
                      className="mr-1 text-violet-500"
                    />

                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-violet-100 bg-violet-50/70 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-200"
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
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
                >
                  <ArrowLeft size={15} />

                  View All Blog Posts
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
