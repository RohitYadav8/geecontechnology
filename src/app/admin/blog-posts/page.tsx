import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  Plus,
  FileText,
  CheckCircle2,
  Clock3,
  Star,
  ExternalLink,
} from "lucide-react";

import { verifyAdminToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

import { DeleteBlogPostButton } from "../../../../components/admin/delete-blog-post-button";

export default async function AdminBlogPostsPage() {
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
  // FETCH POSTS
  // =========================================================

  const posts = await prisma.blogPost.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  // =========================================================
  // STATS
  // =========================================================

  const totalPosts = posts.length;

  const publishedPosts = posts.filter(
    (post) => post.isPublished
  ).length;

  const draftPosts = posts.filter(
    (post) => !post.isPublished
  ).length;

  const featuredPosts = posts.filter(
    (post) => post.isFeatured
  ).length;

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Blog Posts
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage all your blog posts from here.
          </p>
        </div>

        <Link
          href="/admin/blog-posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
        >
          <Plus size={16} />
          Add New Post
        </Link>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Posts
              </p>

              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                {totalPosts}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <FileText size={20} />
            </div>
          </div>
        </div>

        {/* PUBLISHED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Published
              </p>

              <p className="mt-2 text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
                {publishedPosts}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>

        {/* DRAFTS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Drafts
              </p>

              <p className="mt-2 text-3xl font-semibold text-amber-600 dark:text-amber-400">
                {draftPosts}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <Clock3 size={20} />
            </div>
          </div>
        </div>

        {/* FEATURED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Featured
              </p>

              <p className="mt-2 text-3xl font-semibold text-blue-600 dark:text-blue-400">
                {featuredPosts}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Star size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:bg-white/[0.02]">
              <tr>
                <th className="px-6 py-3">
                  Title
                </th>

                <th className="px-6 py-3">
                  Category
                </th>

                <th className="px-6 py-3">
                  Author
                </th>

                <th className="px-6 py-3">
                  Status
                </th>

                <th className="px-6 py-3">
                  Featured
                </th>

                <th className="px-6 py-3">
                  Published
                </th>

                <th className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-14 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/[0.05]">
                      <FileText size={20} />
                    </div>

                    <p className="mt-3 font-medium text-slate-600 dark:text-slate-300">
                      No blog posts yet.
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Click &ldquo;Add New Post&rdquo; to create your first blog post.
                    </p>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-white/[0.02]"
                  >
                    {/* TITLE */}

                    <td className="px-6 py-4">
                      <div className="max-w-[320px]">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {post.title}
                        </p>

                        <p className="mt-1 truncate font-mono text-xs text-slate-400">
                          /{post.slug}
                        </p>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {post.category || "—"}
                    </td>

                    {/* AUTHOR */}

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {post.author || "—"}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      {post.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Draft
                        </span>
                      )}
                    </td>

                    {/* FEATURED */}

                    <td className="px-6 py-4">
                      {post.isFeatured ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                          <Star
                            size={14}
                            fill="currentColor"
                          />
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">
                          No
                        </span>
                      )}
                    </td>

                    {/* PUBLISHED DATE */}

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {post.publishedAt
                        ? post.publishedAt.toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        {post.isPublished && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                          >
                            <ExternalLink size={14} />
                            View
                          </Link>
                        )}

                        <Link
                          href={`/admin/blog-posts/${post.id}`}
                          className="text-violet-600 hover:underline dark:text-violet-400"
                        >
                          Edit
                        </Link>

                        <DeleteBlogPostButton
                          id={post.id}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}