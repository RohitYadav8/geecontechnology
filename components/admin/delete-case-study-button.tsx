"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

type DeleteCaseStudyButtonProps = {
  id: string;
  title?: string;
};

export function DeleteCaseStudyButton({
  id,
  title,
}: DeleteCaseStudyButtonProps) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const message = title
      ? `Are you sure you want to delete "${title}"?`
      : "Are you sure you want to delete this case study?";

    const confirmed = window.confirm(message);

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/admin/case-studies/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to delete case study"
        );
      }

      router.refresh();
    } catch (error) {
      console.error("Delete case study error:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete case study"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={15} />

      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}