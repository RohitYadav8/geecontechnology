import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import {
  SitePage,
  Container,
  PageHeader,
  Section,
  NumberedList,
  Columns,
  Figure,
} from "../../../components/site/ui";

const ERP_WORDMARK_SRC = "/ERP.png";
const ERP_HUB_DIAGRAM_SRC = "/accounting-erp.png";

const benefits = [
  "Assisting you in defining your business processes and ensuring they are complied with throughout the supply chain",
  "Protecting your critical business data through well-defined roles and security access",
  "Enabling you to plan your work load based on existing orders and forecasts",
  "Providing you with the tools to give a high level of service to your customers",
  "Translating your data into decision making information",
];

const modules = [
  {
    title: "Finance",
    body: "Manage financial data and make informed business decisions.",
  },
  {
    title: "Supply Chain",
    body: "Connect supply chain operations and improve overall efficiency.",
  },
  {
    title: "CRM",
    body: "Build stronger customer relationships with connected data.",
  },
  {
    title: "Human Resources",
    body: "Manage people, processes and resources through one connected platform.",
  },
];

export default function ErpSolutionsPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Solutions", href: "/products" }]}
          title="ERP Solutions"
          intro={
            <p>
              Our enterprise resource planning (ERP) software gives your people
              the tools they need to connect and manage your entire business,
              from financial and supply chain management and from manufacturing
              to operations, with the insight you need to make smart decisions.
              Start with what you need now and easily adapt as your needs
              change, in the cloud or on your servers — the choice is yours.
            </p>
          }
        />

        <div className="border-b border-line">
          <Container className="py-10 sm:py-14">
            <Figure
              src={ERP_WORDMARK_SRC}
              alt="ERP"
              ratio="aspect-[21/9]"
              priority
            />
          </Container>
        </div>

        <Section
          index="01"
          label="Benefits"
          title="Our ERP systems can drive huge improvements in the effectiveness of any organisation by:"
        >
          <NumberedList items={benefits} />
        </Section>

        <Section index="02" label="Modules" tone="tint">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <Figure
              src={ERP_HUB_DIAGRAM_SRC}
              alt="ERP hub connecting Manufacturing, Supply Chain, Project Management, CRM, Finance, and HR"
              ratio="aspect-square"
            />
            <Columns items={modules} cols={2} />
          </div>
        </Section>

        <Section index="03" label="Working with us" tone="ink">
          <p className="max-w-3xl font-display text-2xl font-medium leading-[1.3] sm:text-[30px]">
            We&apos;re a close-knit team that offers a friendly, collaborative
            and ultimately helpful approach. We like innovative ideas and
            getting things done.
          </p>
          <div className="mt-10 grid max-w-4xl gap-6 text-[16px] leading-[1.75] text-paper/75 md:grid-cols-2 md:gap-10">
            <p>
              At Geecon, we strive to deliver a consistently excellent standard
              of service and we take pride in everything we do. This has
              enabled us to retain and grow our client base year on year and a
              significant proportion of our growth can be attributed to happy
              clients recommending us to their colleagues.
            </p>
            <p>
              We believe that consistency and continuity is a key aspect of the
              service we provide to our clients. We have an exceptionally low
              staff turnover rate — we enjoy what we do.
            </p>
          </div>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
