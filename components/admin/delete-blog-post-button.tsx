"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteBlogPostButtonProps {
  id: string;
}

export function DeleteBlogPostButton({
  id,
}: DeleteBlogPostButtonProps) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (deleting) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/blog-posts/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Delete failed with status ${response.status}`
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Delete blog post error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete blog post."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center gap-1.5 text-red-500 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
      >
        <Trash2 size={14} />

        {deleting ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <p className="mt-1 max-w-[220px] text-right text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}