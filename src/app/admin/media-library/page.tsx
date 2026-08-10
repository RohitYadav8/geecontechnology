import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FileText } from "lucide-react";
import { verifyAdminToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { AdminSidebar } from "../sidebar";
import { AdminTopbar } from "../topbar";
import { MediaUploadButton } from "../../../../components/admin/media-upload-button";
import { MediaCardActions } from "../../../../components/admin/media-card-actions";

export default async function MediaLibraryPage() {
    const token = cookieStore.get("admin_session")?.value;
    const cookieStore = await cookies();
    const payload = token ? verifyAdminToken(token) : null;
    if (!payload) redirect("/admin/login");

    const files = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <div className="flex flex-1 flex-col">
                <AdminTopbar adminName={payload.email} />
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Media Library</h1>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Upload once, reuse everywhere — Products, Services, Clients, etc.
                            </p>
                        </div>
                        <MediaUploadButton />
                    </div>

                    {files.length === 0 ? (
                        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-400 dark:border-slate-700 dark:bg-slate-900">
                            No files uploaded yet — click &ldquo;Upload New File&rdquo; to add your first one.
                        </div>
                    ) : (
                        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="relative flex h-32 items-center justify-center bg-slate-100 dark:bg-slate-800">
                                        {file.type === "IMAGE" ? (
                                            <Image src={file.url} alt={file.altText || file.fileName} fill className="object-cover" />
                                        ) : (
                                            <FileText size={32} className="text-slate-400" />
                                        )}
                                        <div className="absolute inset-0 flex items-end justify-center bg-black/0 p-2 opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
                                            <MediaCardActions id={file.id} url={file.url} />
                                        </div>
                                    </div>
                                    <div className="p-2.5">
                                        <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                                            {file.fileName}
                                        </p>
                                        <p className="mt-0.5 text-[11px] text-slate-400">
                                            {file.createdAt.toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
