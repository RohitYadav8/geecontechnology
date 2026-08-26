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
    <div className="w-full">
      {/* BACK */}

      <Link
        href="/admin/blog-posts"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
      >
        <ArrowLeft size={17} />

        Back to Blog Posts
      </Link>

      {/* HEADER */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">
          Blog Management
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
          Edit Blog Post
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update your blog content, publishing settings and SEO
          information.
        </p>
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