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
              visibility and display order.
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

                href:
                  service.href,

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