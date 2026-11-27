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
import { FloatingBlob } from "../../../components/floating-blob";

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
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#060b16]">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}

        <section className="brand-grad relative overflow-hidden px-6 pb-40 pt-16 text-center text-white sm:px-8 sm:pb-44 sm:pt-20 lg:px-10">
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

          <div className="relative mx-auto max-w-4xl">
            <AnimateIn>
              <p className="inline-flex items-center rounded-full border border-white/30 bg-white/[0.14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl">
                Insights
              </p>

              <h1 className="mt-6 text-[40px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[72px]">
                <span className="brand-text-light">
                Blog
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-50/90 sm:text-lg">
                Explore insights, updates and ideas from
                Geecon Technology.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* BLOG POSTS */}

        <section className="relative z-10 -mt-28 px-4 pb-24 sm:-mt-32 sm:px-6 sm:pb-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {posts.length === 0 ? (
              <div className="rounded-[30px] border border-slate-100 bg-white px-6 py-20 text-center shadow-[0_40px_100px_-40px_rgba(15,23,42,.35)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No published blog posts yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <AnimateIn
                    key={post.id}
                    delay={Math.min(index * 0.05, 0.25)}
                    className="h-full"
                  >
                    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-3 shadow-[0_30px_80px_-45px_rgba(15,23,42,.45)] transition-all duration-500 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
                      {/* IMAGE */}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative block aspect-[16/10] overflow-hidden rounded-[18px] bg-slate-100 dark:bg-slate-900"
                      >
                        {post.featuredImage ? (
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-slate-400">
                            No Image
                          </div>
                        )}

                        {post.isFeatured && (
                          <span className="brand-grad absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg shadow-violet-500/25">
                            Featured
                          </span>
                        )}
                      </Link>

                      {/* CONTENT */}

                      <div className="flex flex-1 flex-col px-3 pb-3 pt-6 sm:px-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          {post.category && (
                            <span className="brand-text text-[12px] font-extrabold uppercase tracking-[0.2em]">
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

                        <h2 className="mt-4 text-xl font-extrabold leading-snug tracking-[-0.03em] text-slate-950 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        {post.excerpt && (
                          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-5 dark:border-white/[0.07]">
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
                            className="brand-grad group/link inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5"
                          >
                            Read More
                            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
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
