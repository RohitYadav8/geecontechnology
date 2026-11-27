import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import {
  SitePage,
  PageHeader,
  Section,
  IndexList,
  Figure,
} from "../../../components/site/ui";

const BANNER_SRC = "/product-service.png";
const SIDEBAR_SRC = "/product-service-1.png";

// "Software Products" itself is this page, so it is not listed again here.
const offerings = [
  { title: "Web Hosting Solutions", href: "/web-hosting" },
  { title: "Mobile Solutions", href: "/mobile-solution" },
  { title: "Branding", href: "/corporate-branding" },
  {
    title: "Internet Technologies & Web Solutions",
    href: "/internet-technology",
  },
  { title: "ERP Solutions", href: "/erp-solutions" },
  { title: "Resourcing & HR Management", href: "/hr-management" },
  { title: "Corporate Training", href: "/corporate-training" },
];

export default function SoftwareProductsPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Solutions", href: "/products" }]}
          title="Products and Services"
          intro={
            <p>
              Geecon products focus on providing innovative business growth for
              clients. Building on its varied expertise and domain knowledge,
              Geecon offers clients a wide range of IT services. These services
              enable business to &ldquo;Do Business Better&rdquo; and help you
              perform in this dynamic market environment.
            </p>
          }
        />

        <Section index="01" label="Overview" tone="tint">
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <Figure
              src={BANNER_SRC}
              alt="Geecon products and services"
              ratio="aspect-[16/10]"
              priority
            />
            <Figure
              src={SIDEBAR_SRC}
              alt="Geecon team illustration"
              ratio="aspect-[4/5] md:aspect-auto md:h-full"
              className="h-full"
            />
          </div>
        </Section>

        <Section
          index="02"
          label="Catalogue"
          title="Products and services we provide to our customers"
        >
          <IndexList items={offerings} />
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
