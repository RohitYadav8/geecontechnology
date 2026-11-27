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

export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: {
      isActive: true,
    },
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          title="Case Studies"
          intro="Explore how we help businesses solve complex challenges with technology."
        />

        <section className="border-b border-line">
          <Container className="py-12 sm:py-16 lg:py-20">
            {caseStudies.length === 0 ? (
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                No case studies available.
              </p>
            ) : (
              <ol className="border-t border-line">
                {caseStudies.map((study, index) => (
                  <li key={study.id} className="border-b border-line">
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group grid grid-cols-[2.5rem_1fr] gap-4 py-8 transition-colors hover:bg-paper-2 sm:grid-cols-[4rem_1fr_auto] sm:px-3 lg:grid-cols-[4rem_1fr_14rem_12rem] lg:gap-8 lg:py-10"
                    >
                      <span className="pt-2 font-mono text-xs text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0">
                        <span className="block font-display text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-accent sm:text-[34px]">
                          {study.title}
                        </span>
                        {study.shortDescription && (
                          <span className="mt-3 block max-w-[60ch] text-[15px] leading-7 text-ink-2">
                            {study.shortDescription}
                          </span>
                        )}
                        <span className="mt-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink group-hover:text-accent">
                          Read study
                          <ArrowUpRight size={14} />
                        </span>
                      </span>

                      <dl className="col-start-2 space-y-3 font-mono text-[11px] uppercase tracking-[0.14em] sm:col-start-auto sm:pt-2">
                        {study.clientName && (
                          <div>
                            <dt className="text-muted">Client</dt>
                            <dd className="mt-1 text-ink">{study.clientName}</dd>
                          </div>
                        )}
                        {study.industry && (
                          <div>
                            <dt className="text-muted">Industry</dt>
                            <dd className="mt-1 text-ink">{study.industry}</dd>
                          </div>
                        )}
                      </dl>

                      {study.image ? (
                        <span className="relative col-start-2 block aspect-[4/3] overflow-hidden border border-line bg-paper-2 sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-auto">
                          <Image
                            src={study.image}
                            alt={study.title}
                            fill
                            sizes="(min-width: 1024px) 12rem, 100vw"
                            className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                          />
                        </span>
                      ) : (
                        <span className="hidden lg:block" />
                      )}
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </SitePage>
  );
}
