import { cookies } from "next/headers";
import {
  redirect,
  notFound,
} from "next/navigation";

import { verifyAdminToken } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

import { AdminSidebar } from "../../sidebar";
import { AdminTopbar } from "../../topbar";
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
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminTopbar
          adminName={payload.email}
        />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}

          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Edit Service
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Update service information,
              content, visibility and display
              order.
            </p>
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