import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { BrochureForm } from "../../../components/brochure-form";
import {
  SitePage,
  PageHeader,
  Section,
  Prose,
  NumberedList,
  Figure,
} from "../../../components/site/ui";

const BANNER_SRC = "/hr-solutions.png";

const questions = [
  "What is the degree of flexibility and scalability that the HR information technology software provides? HR professionals should determine if the software can import data from multiple Excel spreadsheets, databases, and paper documents and the level with which it can interface with all kinds of other systems and data needed.",
  "The software should be able to take in and filter information from multiple sources. Ideally, this process should also be automated. Many online enrollment solutions require that data be manually manipulated before it can go to a carrier to update their systems. Automation of the update format, transmission schedule, and delivery method can help to eliminate billing and eligibility issues.",
  "Will the software be able to accommodate HR's company and benefits carriers' rules? A truly capable enrollment engine will evaluate each enrollment activity and apply any necessary combination of rules, messages, prompts, and options specifically designed to meet the exact eligibility requirements desired. The software should accommodate any eligibility rules that the company and carriers have.",
  "Will the HR information technology be able to grow and scale with the organization? HR should assess the technology's ability to grow as the company hires new employees, offices, benefits changes, and rules. HR should ask about the thresholds for each of these elements.",
  "Is the HR information technology software able to integrate with other systems? Payroll and other functions often share much of the same information as the benefits management. HR can obtain greater efficiencies when data and other employee information entered into one system are shared with another system. Tracking employee recruitment is another needed function.",
  "Who is responsible for implementing, or building, the solution? What level of training is involved? Some solutions require the client to be very involved with the initial implementation, which can be overwhelming for already busy HR administrators.",
];

export default function ResourceHrManagementPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Solutions", href: "/products" }]}
          title="Resource & HR Management"
        />

        <Section index="01" label="Expertise">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <Figure
              src={BANNER_SRC}
              alt="Human resource management"
              ratio="aspect-[4/3]"
              priority
            />
            <Prose className="lg:self-center">
              <p>
                HR Management should have a clear understanding of the level of
                training and technical expertise that will be required and the
                amount of time expected. Questioning solution providers on this
                topic can provide insight into subtle areas that might
                initially appear simple, yet involve significant technological
                expertise. HR can then determine specific tasks that may be so
                cumbersome as to realistically impede completion, potentially
                reducing HR information technology value and ROI.
              </p>
            </Prose>
          </div>
        </Section>

        <Section index="02" label="Questions to ask">
          <NumberedList items={questions} />
        </Section>

        <Section index="03" label="Brochure" tone="tint" title="Get the brochure">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12">
            <p className="text-[16px] leading-7 text-ink-2">
              Learn more about our resource and HR management solutions.
            </p>
            <div className="max-w-xl">
              <BrochureForm />
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
