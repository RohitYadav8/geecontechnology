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
    <div className="w-full min-w-0">
      {/* =====================================================
          HEADER
      ===================================================== */}

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

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              Blog Posts
            </h1>

            <p className="mt-2 text-sm text-indigo-50/90">
              Manage all your blog posts from here.
            </p>
          </div>

          <Link
            href="/admin/blog-posts/new"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg shadow-violet-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-50"
          >
            <Plus size={16} />
            Add New Post
          </Link>
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* TOTAL */}

        <div className="group rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Total Posts
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight">
                {totalPosts}
              </p>
            </div>

            <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <FileText size={19} />
            </div>
          </div>
        </div>

        {/* PUBLISHED */}

        <div className="group rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Published
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
                {publishedPosts}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <CheckCircle2 size={19} />
            </div>
          </div>
        </div>

        {/* DRAFTS */}

        <div className="group rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Drafts
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight text-amber-600 dark:text-amber-400">
                {draftPosts}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-lg shadow-amber-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <Clock3 size={19} />
            </div>
          </div>
        </div>

        {/* FEATURED */}

        <div className="group rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Featured
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight text-violet-600 dark:text-violet-400">
                {featuredPosts}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <Star size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">
              <tr>
                <th className="px-6 py-4">
                  Title
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Author
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Featured
                </th>

                <th className="px-6 py-4">
                  Published
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >
                    <div className="brand-grad mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
                      <FileText size={22} />
                    </div>

                    <p className="mt-4 font-bold text-slate-800 dark:text-slate-200">
                      No blog posts yet.
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Click &ldquo;Add New Post&rdquo; to create your first blog post.
                    </p>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="transition-colors hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                  >
                    {/* TITLE */}

                    <td className="px-6 py-4">
                      <div className="max-w-[320px]">
                        <p className="font-bold text-slate-900 dark:text-white">
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
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 ring-1 ring-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-600 ring-1 ring-amber-500/15 dark:bg-amber-500/10 dark:text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Draft
                        </span>
                      )}
                    </td>

                    {/* FEATURED */}

                    <td className="px-6 py-4">
                      {post.isFeatured ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-600 ring-1 ring-violet-500/15 dark:bg-violet-500/10 dark:text-violet-300">
                          <Star
                            size={13}
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
                      <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                        {post.isPublished && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-violet-300"
                          >
                            <ExternalLink size={13} />
                            View
                          </Link>
                        )}

                        <Link
                          href={`/admin/blog-posts/${post.id}`}
                          className="brand-grad inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 transition-transform hover:-translate-y-0.5"
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