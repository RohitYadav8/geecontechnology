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
    <div className="w-full">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Media Library
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Upload once, reuse everywhere — Products, Services, Clients, etc.
          </p>
        </div>

        <MediaUploadButton />
      </div>

      {/* Empty State */}
      {files.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-400 dark:border-slate-700 dark:bg-slate-900">
          <p>No files uploaded yet.</p>

          <p className="mt-1 text-sm">
            Click &ldquo;Upload New File&rdquo; to add your first one.
          </p>
        </div>
      ) : (
        /* Media Grid */
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {files.map((file) => (
            <div
              key={file.id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Preview */}
              <div className="relative flex h-32 items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800">
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
                    className="text-slate-400"
                  />
                )}

                {/* Actions */}
                <div className="absolute inset-0 flex items-end justify-center bg-black/0 p-2 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
                  <MediaCardActions
                    id={file.id}
                    url={file.url}
                  />
                </div>
              </div>

              {/* File Information */}
              <div className="p-2.5">
                <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
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