"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Copy,
  RefreshCw,
  Trash2,
} from "lucide-react";

type MediaCardActionsProps = {
  id: string;
  url: string;
};

export function MediaCardActions({
  id,
  url,
}: MediaCardActionsProps) {
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy URL error:", error);

      window.alert("Could not copy the media URL.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this file? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/admin/media/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete media. Please try again."
        );
      }

      router.refresh();
    } catch (error) {
      console.error("Delete media error:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete media. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        disabled={deleting}
        className="flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {copied ? (
          <Check size={12} />
        ) : (
          <Copy size={12} />
        )}

        {copied ? "Copied" : "Copy URL"}
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-red-600 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {deleting ? (
          <RefreshCw
            size={12}
            className="animate-spin"
          />
        ) : (
          <Trash2 size={12} />
        )}

        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}