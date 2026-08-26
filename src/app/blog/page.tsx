import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  User,
} from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";

import { prisma } from "../../../lib/prisma";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
    },

    orderBy: [
      {
        isFeatured: "desc",
      },
      {
        order: "asc",
      },
      {
        publishedAt: "desc",
      },
    ],
  });

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}

        <section className="border-b border-slate-200 bg-slate-50/60 px-6 py-16 dark:border-slate-800 dark:bg-slate-900/40 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <AnimateIn>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                Insights
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                Blog
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Explore insights, updates and ideas from
                Geecon Technology.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* BLOG POSTS */}

        <section className="px-6 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No published blog posts yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <AnimateIn
                    key={post.id}
                    delay={Math.min(index * 0.05, 0.25)}
                  >
                    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/40">
                      {/* IMAGE */}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative block aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950"
                      >
                        {post.featuredImage ? (
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-slate-400">
                            No Image
                          </div>
                        )}

                        {post.isFeatured && (
                          <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                            Featured
                          </span>
                        )}
                      </Link>

                      {/* CONTENT */}

                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          {post.category && (
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              {post.category}
                            </span>
                          )}

                          {post.publishedAt && (
                            <span className="flex items-center gap-1">
                              <CalendarDays size={13} />

                              {post.publishedAt.toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          )}
                        </div>

                        <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        {post.excerpt && (
                          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="mt-5 flex items-center justify-between gap-4">
                          {post.author ? (
                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                              <User size={13} />
                              {post.author}
                            </span>
                          ) : (
                            <span />
                          )}

                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Read More
                            <ArrowUpRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </AnimateIn>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}