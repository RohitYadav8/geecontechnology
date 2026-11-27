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
    <div className="w-full min-w-0">
      {/* Back Button */}

      <Link
        href="/admin/services"
        className="mb-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
      >
        <ArrowLeft size={17} />
        Back to Services
      </Link>

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
            Add Service
          </h1>

          <p className="mt-1.5 text-sm text-indigo-50/90">
            Create a new service for your website.
          </p>
        </div>
      </div>

      {/* Service Form */}

      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  );
}