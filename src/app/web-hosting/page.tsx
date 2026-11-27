import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import {
  SitePage,
  Container,
  PageHeader,
  Section,
  Prose,
  Columns,
  Figure,
} from "../../../components/site/ui";

const BANNER_SRC = "/hosting.png";
const SIDEBAR_SRC = "/web-hosting-1.png";

const plans = [
  {
    kicker: "Plan 01",
    title: "VPS Hosting",
    body: (
      <div className="space-y-4">
        <p>
          Our VPS hosting as a cost-efficient solution comes right in the
          middle of dedicated and webspace hosting product ranges and provides
          you with the advantages of both of these types. We use a
          virtualization solution based on KVM and hardware that corresponds to
          the latest state of the art. Furthermore you are provided with
          guaranteed RAM and disk space.
        </p>
        <p>
          Customize your virtual private server to suit your needs and select
          the operating system (Linux or Windows Server 2012 and Windows Server
          2008) of your choice. To manage and administer your virtual machine,
          you can optionally choose between Parallels Plesk, cPanel/WHM and
          Webmin. Decide now and rely on high-quality, powerful VPS hosting
          solutions.
        </p>
      </div>
    ),
  },
  {
    kicker: "Plan 02",
    title: "Dedicated Server",
    body: (
      <p>
        Our entire fleet of dedicated servers is 100% managed, so you do not
        have to worry about running your servers or fixing any problems. What
        we mean by Dedicated Servers, is that we will take care of the setup of
        your dedicated web hosting account, troubleshooting with your dedicated
        server, and everything in between.
      </p>
    ),
  },
];

export default function WebHostingServicesPage() {
  return (
    <SitePage>
      <Navbar />

      <main className="flex-1">
        <PageHeader
          trail={[{ label: "Solutions", href: "/products" }]}
          title="Web Hosting Services"
          intro={
            <p>
              We provide dedicated servers and VPS hosting services that can be
              matched to fit your needs. Whether you are an individual looking
              for a basic shared hosting package or your small business needs a
              scalable dedicated web hosting solution, we are willing and able
              to meet your web hosting needs.
            </p>
          }
        />

        <div className="border-b border-line">
          <Container className="py-10 sm:py-14">
            <Figure
              src={BANNER_SRC}
              alt="Web hosting infrastructure"
              ratio="aspect-[21/9]"
              priority
            />
          </Container>
        </div>

        <Section index="01" label="Plans">
          <Columns items={plans} cols={2} />
        </Section>

        <Section
          index="02"
          label="Document hosting"
          tone="tint"
        >
          <div className="grid gap-10 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-12">
            <Prose>
              <p>
                Data and document hosting services in the cloud from microMEDIA
                include designing and implementing cost-effective Web-based
                Document Management systems. We use these systems to create an
                Archive at our web hosting sites that leverage the latest web
                based document management technologies.
              </p>
              <p>
                Each application is customized to meet a client&apos;s specific
                needs for an online web document hosting application. Web-based
                document management users can institute a search and retrieval
                process using previously established indices and document
                identification classifications.
              </p>
              <p>
                microMEDIA delivers all the requisite management,
                infrastructure and support. We offer numerous document
                repository alternatives.
              </p>
            </Prose>
            <Figure
              src={SIDEBAR_SRC}
              alt="Web hosting servers"
              ratio="aspect-[3/4]"
            />
          </div>
        </Section>
      </main>

      <Footer />
    </SitePage>
  );
}
