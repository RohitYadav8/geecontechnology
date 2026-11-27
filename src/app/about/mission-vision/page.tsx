import Image from "next/image";

import { Navbar } from "../../../../components/navbar";
import { Footer } from "../../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  Lead,
  NumberedList,
} from "../../../../components/site/ui";

const VISION_SRC = "/vision.png";
const MISSION_SRC = "/mission.png";

const visionPoints = [
  "World Class Corporation",
  "Globally Respected Corporation",
  "Premium Consultancy & Solutions",
  "Excellent In-Class-People",
];

const missionPoints = [
  "Help Achieving Full Potential",
  "Simplified Quality Solutions",
  "Cost Effective Approach",
  "Timed Delivery",
];

function Illustration({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[16/10] w-full border border-line bg-paper">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 100vw"
        className="object-contain p-6"
      />
    </div>
  );
}

export default function MissionVisionPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Company" }]}
          title="Mission & Vision"
          intro="Geecon is a technology-driven company, developing and implementing new technology to contribute towards the rapid growth of various industries."
        />

        <Section index="01" label="Vision">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,18rem)] lg:gap-14">
            <div>
              <Lead>
                To be a globally respected, premium, world-class corporation
                providing premium Consultancy &amp; IT solutions delivered by
                excellent-in-class people.
              </Lead>
              <div className="mt-10">
                <NumberedList items={visionPoints} />
              </div>
            </div>
            <Illustration src={VISION_SRC} alt="Vision illustration" />
          </div>
        </Section>

        <Section index="02" label="Mission" tone="ink">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14">
            <div className="order-2 lg:order-1">
              <Illustration src={MISSION_SRC} alt="Mission illustration" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="max-w-3xl font-display text-2xl font-medium leading-[1.3] sm:text-[30px]">
                Helping customers by providing the world&apos;s most simplified,
                best quality solutions and delivering value that enables
                businesses to achieve their full potential in a cost-effective
                and timely fashion.
              </p>
              <ol className="mt-10 grid border-t border-paper/20 sm:grid-cols-2">
                {missionPoints.map((point, i) => (
                  <li
                    key={point}
                    className="flex gap-4 border-b border-paper/20 py-5 sm:odd:pr-6"
                  >
                    <span className="pt-0.5 font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[16px] leading-7">{point}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
