import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { services } from "../../../lib/home-data";
import { serviceDetails, fallbackDetail } from "../../../lib/service-details";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { AnimateIn } from "../../../components/animate-in";
import { AnimatedHeading } from "../../../components/animated-heading";
import { StaggerContainer, StaggerItem } from "../../../components/stagger-container";
import { BrochureForm } from "../../../components/brochure-form";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.href.replace("/", "") }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.href === `/${slug}`);

  if (!service) notFound();

  const detail = serviceDetails[service.id] ?? fallbackDetail(service.title, service.description);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-20">
          <AnimatedHeading
            text={detail.title}
            as="h1"
            className="text-2xl font-semibold text-blue-600 dark:text-blue-400 sm:text-3xl"
          />

          <AnimateIn delay={0.15}>
            {detail.bannerImage ? (
              <div className="relative mt-8 h-56 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900 sm:h-64">
                <Image
                  src={detail.bannerImage}
                  alt={detail.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div
                className={`relative mt-8 flex h-56 items-center justify-end overflow-hidden rounded-2xl bg-gradient-to-r ${detail.gradient} px-10 sm:h-64`}
              >
                <div className="absolute inset-0 opacity-20">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border-[16px] border-white/40"
                      style={{
                        width: `${140 - i * 24}px`,
                        height: `${140 - i * 24}px`,
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 2) * 15}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm sm:h-28 sm:w-28">
                  <CheckCircle2 size={48} className="text-white" strokeWidth={1.5} />
                </div>
              </div>
            )}
          </AnimateIn>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
            <AnimateIn delay={0.25}>
              <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {detail.intro.map((p, i) => (
                  <p key={`intro-${i}`}>{p}</p>
                ))}

                {detail.challenges.length > 0 && (
                  <StaggerContainer className="space-y-2 pt-1">
                    {detail.challenges.map((point, i) => (
                      <StaggerItem key={i}>
                        <p className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                          {point}
                        </p>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}

                {detail.middle.map((p, i) => (
                  <p key={`middle-${i}`} className="pt-1">
                    {p}
                  </p>
                ))}

                {detail.benefits.length > 0 && (
                  <StaggerContainer className="space-y-2 pt-1">
                    {detail.benefits.map((point, i) => (
                      <StaggerItem key={i}>
                        <p className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a2b4a] dark:bg-blue-400" />
                          {point}
                        </p>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}

                {detail.closing && <p className="pt-1">{detail.closing}</p>}

                {detail.coverage.length > 0 && (
                  <div className="pt-4">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                      Our service coverage areas include:
                    </h2>
                    <StaggerContainer className="mt-3 grid gap-2 sm:grid-cols-2">
                      {detail.coverage.map((item, i) => (
                        <StaggerItem key={i}>
                          <p className="flex items-center gap-2 text-sm">
                            <CheckCircle2 size={15} className="shrink-0 text-[#1a2b4a] dark:text-blue-400" />
                            {item}
                          </p>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                )}

                {detail.qa.length > 0 && (
                  <div className="space-y-4 pt-4">
                    {detail.qa.map((p, i) => (
                      <p key={`qa-${i}`}>{p}</p>
                    ))}
                  </div>
                )}

                {detail.sections && detail.sections.length > 0 && (
                  <StaggerContainer className="space-y-5 pt-4">
                    {detail.sections.map((sec, i) => (
                      <StaggerItem key={i}>
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                          {sec.title}
                        </h3>
                        <p className="mt-2 leading-7">{sec.body}</p>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </div>
            </AnimateIn>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <BrochureForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}