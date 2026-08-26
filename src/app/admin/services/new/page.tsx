import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { verifyAdminToken } from "../../../../../lib/auth";
import { ServiceForm } from "../../service-form";

export default async function NewServicePage() {
  // ==========================================
  // ADMIN AUTHENTICATION
  // ==========================================

  const cookieStore = await cookies();

  const token = cookieStore.get("admin_session")?.value;

  const payload = token
    ? verifyAdminToken(token)
    : null;

  if (!payload) {
    redirect("/admin/login");
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="w-full">
      {/* Back Button */}

      <Link
        href="/admin/services"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
      >
        <ArrowLeft size={17} />
        Back to Services
      </Link>

      {/* Header */}

      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Add Service
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create a new service for your website.
        </p>
      </div>

      {/* Service Form */}

      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  );
}