import { cookies } from "next/headers";
import {
  redirect,
  notFound,
} from "next/navigation";

import { verifyAdminToken } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

import { ServiceForm } from "../../service-form";

type EditServicePageProps = {
  params: Promise<{
    id: string;
  }>;
};

// ============================================================
// JSON HELPERS
// ============================================================

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string"
  );
}

function getSections(
  value: unknown
): {
  title: string;
  body: string;
}[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item) =>
        typeof item === "object" &&
        item !== null
    )
    .map((item) => {
      const section = item as Record<
        string,
        unknown
      >;

      return {
        title:
          typeof section.title === "string"
            ? section.title
            : "",

        body:
          typeof section.body === "string"
            ? section.body
            : "",
      };
    });
}

// ============================================================
// EDIT SERVICE PAGE
// ============================================================

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  // ==========================================
  // ADMIN AUTH
  // ==========================================

  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_session")?.value;

  const payload = token
    ? verifyAdminToken(token)
    : null;

  if (!payload) {
    redirect("/admin/login");
  }

  // ==========================================
  // GET SERVICE ID
  // ==========================================

  const { id } = await params;

  // ==========================================
  // GET SERVICE
  // ==========================================

  const service =
    await prisma.service.findUnique({
      where: {
        id,
      },
    });

  if (!service) {
    notFound();
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="w-full min-w-0">
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1">
          {/* Header */}

          <div className="brand-grad relative max-w-4xl overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />

            <div className="relative min-w-0">
              <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                Edit Service
              </h1>

              <p className="mt-1.5 text-sm text-indigo-50/90">
                Update service information,
                content, visibility and display
                order.
              </p>
            </div>
          </div>

          {/* Form */}

          <div className="mt-6">
            <ServiceForm
              initialValues={{
                id: service.id,

                tag:
                  service.tag ?? "",

                title:
                  service.title,

                slug:
                  service.slug,

                description:
                  service.description,

                image:
                  service.image,

                // LIGHT BANNER
                bannerImage:
                  service.bannerImage ?? "",

                // DARK BANNER
                darkBannerImage:
                  service.darkBannerImage ?? "",

                href:
                  service.href,

                gradient:
                  service.gradient ?? "",

                intro:
                  getStringArray(
                    service.intro
                  ),

                challenges:
                  getStringArray(
                    service.challenges
                  ),

                middle:
                  getStringArray(
                    service.middle
                  ),

                benefits:
                  getStringArray(
                    service.benefits
                  ),

                closing:
                  service.closing ?? "",

                coverage:
                  getStringArray(
                    service.coverage
                  ),

                qa:
                  getStringArray(
                    service.qa
                  ),

                sections:
                  getSections(
                    service.sections
                  ),

                order:
                  service.order,

                isActive:
                  service.isActive,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}