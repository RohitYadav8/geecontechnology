import Image from "next/image";

import { heroSlides } from "../../lib/home-data";
import { ButtonLink, Container } from "../site/ui";

/* =========================================================
   HOME HERO
   One headline (the first theme) and the two other themes as
   numbered rows beside it. Each line of copy appears once.
========================================================= */

export function HomeHero() {
  const [lead, ...themes] = heroSlides;

  return (
    <section className="border-b border-line">
      <Container className="pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Consulting · Software · Hosting · Training
        </p>

        <h1 className="mt-8 font-display text-[54px] font-semibold leading-[0.92] text-ink sm:text-[88px] lg:text-[132px]">
          Take control
          <br />
          of your <span className="text-accent">data.</span>
        </h1>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-md text-[17px] leading-7 text-ink-2 sm:text-lg">
              {lead.description}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ButtonLink href="/contact">Start a project</ButtonLink>
              <ButtonLink href="/services" variant="text">
                What we do
              </ButtonLink>
            </div>
          </div>

          <ol className="border-t border-line lg:col-span-6 lg:col-start-7">
            {themes.map((theme, i) => (
              <li
                key={theme.id}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6"
              >
                <span className="pt-1 font-mono text-xs text-accent">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-2xl font-semibold leading-tight text-ink">
                    {theme.title}
                  </p>
                  <p className="mt-2 text-[15px] leading-7 text-ink-2">
                    {theme.description}.
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      {/* Single wide image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden border-t border-line bg-ink sm:aspect-[24/9]">
        <Image
          src="/banner-3.png"
          alt="Padlock on a laptop keyboard"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
