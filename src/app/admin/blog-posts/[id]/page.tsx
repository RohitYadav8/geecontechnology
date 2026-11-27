import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { verifyAdminToken } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";
import { BlogPostForm } from "../../../../../components/admin/blog-post-form";

type EditBlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  // =========================================================
  // ADMIN AUTH
  // =========================================================

  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_session")?.value;

  const payload = token
    ? verifyAdminToken(token)
    : null;

  if (!payload) {
    redirect("/admin/login");
  }

  // =========================================================
  // GET BLOG ID
  // =========================================================

  const { id } = await params;

  // =========================================================
  // FETCH BLOG POST
  // =========================================================

  const post = await prisma.blogPost.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    notFound();
  }

  // =========================================================
  // CONVERT TAGS
  // =========================================================

  let tags = "";

  if (Array.isArray(post.tags)) {
    tags = post.tags
      .filter(
        (tag): tag is string =>
          typeof tag === "string"
      )
      .join(", ");
  }

  // =========================================================
  // FORMAT DATETIME-LOCAL
  // =========================================================

  const publishedAt = post.publishedAt
    ? new Date(
        post.publishedAt.getTime() -
          post.publishedAt.getTimezoneOffset() *
            60 *
            1000
      )
        .toISOString()
        .slice(0, 16)
    : "";

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full min-w-0">
      <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative min-w-0">
      {/* BACK */}

      <Link
        href="/admin/blog-posts"
        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-xs font-bold text-white backdrop-blur-xl transition-colors hover:bg-white/25"
      >
        <ArrowLeft size={15} />

        Back to Blog Posts
      </Link>

      {/* HEADER */}

        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-100">
          Blog Management
        </p>

        <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
          Edit Blog Post
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-indigo-50/90">
          Update your blog content, publishing settings and SEO
          information.
        </p>
        </div>
      </div>

      {/* FORM */}

      <div className="mt-6">
        <BlogPostForm
          initialValues={{
            id: post.id,

            title: post.title,

            slug: post.slug,

            excerpt:
              post.excerpt ?? "",

            content:
              post.content,

            featuredImage:
              post.featuredImage ?? "",

            category:
              post.category ?? "",

            author:
              post.author ?? "",

            tags,

            isPublished:
              post.isPublished,

            isFeatured:
              post.isFeatured,

            publishedAt,

            metaTitle:
              post.metaTitle ?? "",

            metaDescription:
              post.metaDescription ?? "",

            keywords:
              post.keywords ?? "",

            openGraphImage:
              post.openGraphImage ?? "",

            order:
              post.order,
          }}
        />
      </div>
    </div>
  );
}