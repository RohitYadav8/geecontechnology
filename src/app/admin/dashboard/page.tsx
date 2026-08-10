import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "../../../../lib/auth";
import { AdminDashboardCharts } from "../charts";

const stats = [
  {
    label: "Blog Posts",
    value: 0,
  },
  {
    label: "Services",
    value: 0,
  },
  {
    label: "Products",
    value: 0,
  },
  {
    label: "Testimonials",
    value: 0,
  },
  {
    label: "Applications",
    value: 0,
  },
];

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_session")?.value;

  const payload = token ? verifyAdminToken(token) : null;

  if (!payload) {
    redirect("/admin/login");
  }

  const chartData = stats.map((stat) => ({
    label: stat.label.split(" ")[0],
    value: stat.value,
  }));

  return (
    <div className="w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Welcome back, Admin
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here&apos;s an overview of your admin panel.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8">
        <AdminDashboardCharts data={chartData} />
      </div>
    </div>
  );
}