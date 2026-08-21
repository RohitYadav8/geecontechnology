import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Package,
  Settings,
  Star,
  Users,
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
  ] = await Promise.all([
    prisma.service.count(),
    prisma.product.count(),
    prisma.testimonial.count(),
    prisma.application.count(),
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
  ];

  const chartData = stats.map((stat) => ({
    label: stat.label,
    value: stat.value,
  }));

  return (
    <div className="w-full">
      {/* Header */}
      <AnimateIn>
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-blue-600 to-cyan-400" />

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Welcome back, Admin
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Here&apos;s an overview of your admin panel.
            </p>
          </div>
        </div>
      </AnimateIn>

      {/* Stats */}
      <StaggerContainer className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  rounded-2xl
                  border
                  border-slate-200/80
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:hover:shadow-black/20
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-[2px]
                    w-full
                    bg-gradient-to-r
                    from-blue-600
                    via-cyan-400
                    to-transparent
                  "
                />

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-11
                      w-11
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
                      dark:border-blue-500/10
                      dark:bg-blue-500/10
                      dark:text-blue-400
                      dark:group-hover:bg-blue-500
                      dark:group-hover:text-white
                    "
                  >
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Charts */}
      <AnimateIn delay={0.25}>
        <div
          className="
            mt-8
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            p-5
            shadow-sm
            sm:p-6
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <AdminDashboardCharts data={chartData} />
        </div>
      </AnimateIn>
    </div>
  );
}