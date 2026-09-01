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
      {/* ================= HEADER ================= */}

      <AnimateIn>
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-1 h-8 w-1 shrink-0 rounded-full bg-gradient-to-b from-blue-600 to-cyan-400" />

          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl dark:text-white">
              Welcome back, Admin
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
              Here&apos;s an overview of your admin panel.
            </p>
          </div>
        </div>
      </AnimateIn>

      {/* ================= STATS ================= */}

      <StaggerContainer className="mt-5 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <StaggerItem key={stat.label}>
              <div
                className="
                  group
                  relative
                  h-full
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200/80
                  bg-white
                  p-4
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  sm:rounded-2xl
                  sm:p-5
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:hover:shadow-black/20
                "
              >
                {/* Top gradient */}

                <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent" />

                <div className="flex items-start justify-between gap-3">
                  {/* Content */}

                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:mt-3 sm:text-3xl dark:text-white">
                      {stat.value}
                    </p>
                  </div>

                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-blue-100
                      bg-blue-50
                      text-blue-600
                      transition-all
                      duration-300
                      group-hover:scale-105
                      group-hover:bg-blue-600
                      group-hover:text-white
                      sm:h-11
                      sm:w-11
                      dark:border-blue-500/10
                      dark:bg-blue-500/10
                      dark:text-blue-400
                      dark:group-hover:bg-blue-500
                      dark:group-hover:text-white
                    "
                  >
                    <Icon size={19} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* ================= CHARTS ================= */}

      <AnimateIn delay={0.25}>
        <div
          className="
            mt-5
            min-w-0
            overflow-hidden
            rounded-xl
            border
            border-slate-200/80
            bg-white
            p-3
            shadow-sm
            sm:mt-8
            sm:rounded-2xl
            sm:p-5
            lg:p-6
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="w-full min-w-0 overflow-x-auto">
            <AdminDashboardCharts data={chartData} />
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}