import Image from "next/image";

import { clients, facts, services } from "../../lib/home-data";
import {
  ButtonLink,
  Columns,
  IndexList,
  Lead,
  Prose,
  Section,
} from "../site/ui";

/* =========================================================
   01 — ABOUT
========================================================= */

export function HomeAbout() {
  return (
    <Section index="01" label="Who we are">
      <Lead>
        A diverse team of competent, dynamic and experienced people —
        consultants, engineers and brand builders driven by creativity and
        teamwork.
      </Lead>

      <Prose className="mt-8">
        <p>
          Our strength lies in business and management consultancy, online and
          offline software, IT consulting and brand management. We care for our
          customers and believe in building business relationships that last.
        </p>
      </Prose>

      <div className="mt-14">
        <Columns
          items={facts.map((f) => ({
            title: f.title,
            body: f.description,
          }))}
        />
      </div>
    </Section>
  );
}

/* =========================================================
   02 — SERVICES
========================================================= */

function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
}

export function HomeServices() {
  return (
    <Section
      index="02"
      label="Services"
      title="Digital work, done properly and kept running."
    >
      <IndexList
        items={services.map((s) => ({
          href: s.href,
          title: s.title,
          body: firstSentence(s.description),
        }))}
      />
      <div className="mt-10">
        <ButtonLink href="/services" variant="outline">
          All services
        </ButtonLink>
      </div>
    </Section>
  );
}

/* =========================================================
   05 — CLIENTS (logo wall)
========================================================= */

export function HomeClients() {
  return (
    <Section index="05" label="Clients" title="Trusted by teams we keep working with.">
      <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
        {clients.map((client) => (
          <li
            key={client.id}
            className="group flex h-28 items-center justify-center border-b border-r border-line bg-white px-6 sm:h-32"
          >
            <div className="relative h-12 w-full">
              <Image
                src={client.logo}
                alt={client.name}
                fill
                sizes="200px"
                className="object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
