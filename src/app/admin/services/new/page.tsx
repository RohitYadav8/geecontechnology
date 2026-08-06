import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "../../../../../lib/auth";
import { AdminSidebar } from "../../sidebar";
import { AdminTopbar } from "../../topbar";
import { ServiceForm } from "../../service-form";

export default async function NewServicePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const payload = token ? verifyAdminToken(token) : null;
    if (!payload) redirect("/admin/login");

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <div className="flex flex-1 flex-col">
                <AdminTopbar adminName={payload.email} />
                <main className="flex-1 overflow-y-auto p-8">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Add Service</h1>
                    <div className="mt-6">
                        <ServiceForm />
                    </div>
                </main>
            </div>
        </div>
    );
}
