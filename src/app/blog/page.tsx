import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import {
  Container,
  PageHeader,
  SitePage,
} from "../../../components/site/ui";

import { prisma } from "../../../lib/prisma";

function formatDate(date: Date | null) {
  if (!date) return null;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

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

  const [lead, ...rest] = posts;

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          title="Blog"
          intro="Explore insights, updates and ideas from Geecon Technology."
        />

        {!lead ? (
          <Container className="py-20">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              No published blog posts yet.
            </p>
          </Container>
        ) : (
          <>
            {/* LEAD STORY */}
            <section className="border-b border-line">
              <Container className="py-12 sm:py-16 lg:py-20">
                <Link
                  href={`/blog/${lead.slug}`}
                  className="group grid gap-8 lg:grid-cols-12 lg:gap-12"
                >
                  {lead.featuredImage && (
                    <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paper-2 lg:col-span-7">
                      <Image
                        src={lead.featuredImage}
                        alt={lead.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  <div
                    className={
                      lead.featuredImage
                        ? "flex flex-col lg:col-span-5"
                        : "flex flex-col lg:col-span-9"
                    }
                  >
                    <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {lead.isFeatured && (
                        <span className="text-accent">Featured</span>
                      )}
                      {lead.category && <span>{lead.category}</span>}
                      {lead.publishedAt && (
                        <time dateTime={lead.publishedAt.toISOString()}>
                          {formatDate(lead.publishedAt)}
                        </time>
                      )}
                    </p>

                    <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.02] text-ink transition-colors group-hover:text-accent sm:text-5xl lg:text-[56px]">
                      {lead.title}
                    </h2>

                    {lead.excerpt && (
                      <p className="mt-6 max-w-[52ch] text-[17px] leading-8 text-ink-2">
                        {lead.excerpt}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted lg:mt-10">
                      <span>{lead.author ?? ""}</span>
                      <span className="inline-flex items-center gap-1.5 text-ink group-hover:text-accent">
                        Read
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Container>
            </section>

            {/* THE REST */}
            {rest.length > 0 && (
              <section className="border-b border-line">
                <Container className="py-12 sm:py-16 lg:py-20">
                  <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted lg:col-span-3">
                      More posts
                    </p>

                    <ul className="border-t border-line lg:col-span-9">
                      {rest.map((post) => (
                        <li key={post.id} className="border-b border-line">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="group grid gap-3 py-6 transition-colors hover:bg-paper-2 sm:grid-cols-[9rem_1fr_auto] sm:gap-6 sm:px-3 sm:py-7"
                          >
                            <span className="pt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                              {post.publishedAt ? (
                                <time
                                  dateTime={post.publishedAt.toISOString()}
                                >
                                  {formatDate(post.publishedAt)}
                                </time>
                              ) : null}
                              {post.category && (
                                <span className="mt-1 block text-accent">
                                  {post.category}
                                </span>
                              )}
                            </span>

                            <span className="min-w-0">
                              <span className="block font-display text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-accent sm:text-[28px]">
                                {post.title}
                              </span>
                              {post.excerpt && (
                                <span className="mt-2 line-clamp-2 block max-w-[62ch] text-[15px] leading-7 text-ink-2">
                                  {post.excerpt}
                                </span>
                              )}
                              {post.author && (
                                <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                                  {post.author}
                                </span>
                              )}
                            </span>

                            <ArrowUpRight
                              size={22}
                              className="hidden text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:mt-1 sm:block"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Container>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </SitePage>
  );
}
