import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FileText } from "lucide-react";

import { verifyAdminToken } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

import { MediaUploadButton } from "../../../../components/admin/media-upload-button";
import { MediaCardActions } from "../../../../components/admin/media-card-actions";

export default async function MediaLibraryPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_session")?.value;

  const payload = token ? verifyAdminToken(token) : null;

  if (!payload) {
    redirect("/admin/login");
  }

  const files = await prisma.media.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full min-w-0">
      {/* Page Header */}
      <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.07]" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
            Media Library
          </h1>

          <p className="mt-1 text-sm text-indigo-50/90">
            Upload once, reuse everywhere — Products, Services, Clients, etc.
          </p>
        </div>

        <MediaUploadButton />
      </div>
      </div>

      {/* Empty State */}
      {files.length === 0 ? (
        <div className="mt-6 rounded-[24px] border-2 border-dashed border-violet-200 bg-white p-12 text-center text-slate-500 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-violet-400/20 dark:bg-[#0b1220] dark:text-slate-400">
          <div className="brand-grad mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
            <FileText size={24} />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">No files uploaded yet.</p>

          <p className="mt-1 text-sm">
            Click &ldquo;Upload New File&rdquo; to add your first one.
          </p>
        </div>
      ) : (
        /* Media Grid */
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {files.map((file) => (
            <div
              key={file.id}
              className="group overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-2 shadow-[0_20px_50px_-40px_rgba(15,23,42,.45)] transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_30px_70px_-35px_rgba(91,33,182,.35)] dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25"
            >
              {/* Preview */}
              <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-[16px] bg-slate-50 dark:bg-white/[0.04]">
                {file.type === "IMAGE" ? (
                  <Image
                    src={file.url}
                    alt={file.altText || file.fileName}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain p-3"
                  />
                ) : (
                  <FileText
                    size={32}
                    className="text-violet-400"
                  />
                )}

                {/* Actions */}
                <div className="absolute inset-0 flex items-end justify-center bg-violet-950/0 p-2 opacity-0 transition-all duration-200 group-hover:bg-violet-950/40 group-hover:opacity-100 group-focus-within:bg-violet-950/40 group-focus-within:opacity-100">
                  <MediaCardActions
                    id={file.id}
                    url={file.url}
                  />
                </div>
              </div>

              {/* File Information */}
              <div className="px-1.5 pb-1 pt-2.5">
                <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                  {file.fileName}
                </p>

                {file.folder && (
                  <p className="mt-0.5 truncate text-[11px] text-slate-400">
                    Folder: {file.folder}
                  </p>
                )}

                <p className="mt-0.5 text-[11px] text-slate-400">
                  {file.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}