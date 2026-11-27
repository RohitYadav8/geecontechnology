import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  Package,
  Settings,
  Star,
  Users,
  Building2,
} from "lucide-react";

import { verifyAdminToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

import { AnimateIn } from "../../../../components/animate-in";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../../components/stagger-container";

import { AdminDashboardCharts } from "../charts";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_session")?.value;

  const payload = token ? verifyAdminToken(token) : null;

  if (!payload) {
    redirect("/admin/login");
  }

  const [
    servicesCount,
    productsCount,
    testimonialsCount,
    applicationsCount,
    clientsCount,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.product.count(),
    prisma.testimonial.count(),
    prisma.application.count(),
    prisma.client.count(),
  ]);

  const stats = [
    {
      label: "Services",
      value: servicesCount,
      icon: Settings,
    },
    {
      label: "Products",
      value: productsCount,
      icon: Package,
    },
    {
      label: "Testimonials",
      value: testimonialsCount,
      icon: Star,
    },
    {
      label: "Applications",
      value: applicationsCount,
      icon: Users,
    },
    {
      label: "Clients",
      value: clientsCount,
      icon: Building2,
    },
  ];

  const chartData = stats.map((stat) => ({
    label: stat.label,
    value: stat.value,
  }));

  return (
    <div className="w-full min-w-0">
      {/* ================= WELCOME BANNER ================= */}

      <AnimateIn>
        <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 pb-24 pt-8 text-white sm:px-8 sm:pb-28 sm:pt-10 lg:px-10">
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
            <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl lg:text-[40px]">
              Welcome back, Admin
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90 sm:text-base">
              Here&apos;s an overview of your admin panel.
            </p>
          </div>
        </div>
      </AnimateIn>

      {/* ================= STATS ================= */}

      <StaggerContainer className="relative z-10 -mt-16 grid grid-cols-1 gap-4 px-3 sm:-mt-20 sm:grid-cols-2 sm:gap-5 sm:px-5 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <StaggerItem key={stat.label}>
              <div className="group h-full rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.4)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>

                    <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                      {stat.value}
                    </p>
                  </div>

                  <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
                    <Icon size={19} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* ================= CHART ================= */}

      <AnimateIn delay={0.25}>
        <div className="mt-6 min-w-0 sm:mt-8">
          <AdminDashboardCharts data={chartData} />
        </div>
      </AnimateIn>
    </div>
  );
}
