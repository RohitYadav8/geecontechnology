import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "../../../../lib/auth";
import { AdminSidebar } from "../sidebar";
import { AdminTopbar } from "../topbar";
import { AdminDashboardCharts } from "../charts";

// TODO: these are placeholders until the corresponding Prisma models
// (Blog, Service, Product, Testimonial, Application) exist. Candidate
// Screening submissions ARE already real (CandidateSubmission model) —
// see the note below on where to surface that count instead.
const stats = [
    { label: "Blog Posts", value: 0 },
    { label: "Services", value: 0 },
    { label: "Products", value: 0 },
    { label: "Testimonials", value: 0 },
    { label: "Applications", value: 0 },
];

export default async function AdminDashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const payload = token ? verifyAdminToken(token) : null;

    if (!payload) {
        redirect("/admin/login");
    }

    const chartData = stats.map((s) => ({ label: s.label.split(" ")[0], value: s.value }));

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <div className="flex flex-1 flex-col">
                <AdminTopbar adminName={payload.email} />
                <main className="flex-1 overflow-y-auto p-8">
                    <h1 className="text-2xl font-semibold text-slate-500 dark:text-slate-400">Welcome back, Admin</h1>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((s) => (
                            <div key={s.label} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
                                <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
                                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <AdminDashboardCharts data={chartData} />
                    </div>
                </main>
            </div>
        </div>
    );
}
