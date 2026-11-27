"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  ButtonLink,
  Tag,
} from "../../../../components/site/ui";

type JobOpening = {
  id: string;
  title: string;
  department?: string | null;
  location?: string | null;
  type?: string | null;
  description: string;
  isActive?: boolean;
  order?: number;
};

export default function CareerOpeningsPage() {
  const [openings, setOpenings] = useState<JobOpening[]>([]);
  const [loadingOpenings, setLoadingOpenings] = useState(true);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        setLoadingOpenings(true);

        const response = await fetch("/api/careers/openings", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job openings");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setOpenings(data);
        } else if (Array.isArray(data.openings)) {
          setOpenings(data.openings);
        } else {
          setOpenings([]);
        }
      } catch (error) {
        console.error("Failed to fetch openings:", error);

        setOpenings([]);
      } finally {
        setLoadingOpenings(false);
      }
    };

    fetchOpenings();
  }, []);

  const countLabel = loadingOpenings
    ? "Loading"
    : `${openings.length} ${
        openings.length === 1 ? "opening available" : "openings available"
      }`;

  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Careers", href: "/careers" }]}
          title="Current Openings"
          intro="Explore our current career opportunities and find a role that matches your skills and experience."
        />

        <Section index="01" label={countLabel}>
          {/* LOADING */}

          {loadingOpenings && (
            <ul className="border-t border-line" aria-busy="true">
              {[1, 2, 3].map((item) => (
                <li
                  key={item}
                  className="grid animate-pulse grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-7 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="h-3 w-6 bg-paper-2" />
                  <span>
                    <span className="block h-6 w-2/5 bg-paper-2" />
                    <span className="mt-4 block h-3 w-4/5 bg-paper-2" />
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* EMPTY */}

          {!loadingOpenings && openings.length === 0 && (
            <div className="border-t border-line pt-10">
              <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-[40px]">
                No current openings
              </h2>

              <p className="mt-4 max-w-[60ch] text-[16px] leading-7 text-ink-2">
                No current openings listed right now. Please check back soon, or
                submit your details and we&apos;ll reach out when a suitable
                role opens up.
              </p>

              <div className="mt-8">
                <ButtonLink href="/careers#application-form">
                  Submit Your Details
                </ButtonLink>
              </div>
            </div>
          )}

          {/* JOBS */}

          {!loadingOpenings && openings.length > 0 && (
            <ul className="border-t border-line">
              {openings.map((opening, index) => (
                <li
                  key={opening.id}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-5 border-b border-line py-8 sm:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_1fr_auto] lg:gap-x-10"
                >
                  <span className="pt-2 font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[28px]">
                      {opening.title}
                    </h2>

                    {(opening.department ||
                      opening.location ||
                      opening.type) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {opening.department && (
                          <Tag>{opening.department}</Tag>
                        )}
                        {opening.location && <Tag>{opening.location}</Tag>}
                        {opening.type && <Tag>{opening.type}</Tag>}
                      </div>
                    )}

                    <p className="mt-4 line-clamp-4 max-w-[68ch] whitespace-pre-line text-[15px] leading-7 text-ink-2">
                      {opening.description}
                    </p>
                  </div>

                  <div className="col-start-2 lg:col-start-3 lg:pt-1">
                    <Link
                      href="/careers#application-form"
                      className="group inline-flex items-center gap-2 border border-ink px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                    >
                      Apply Now
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
