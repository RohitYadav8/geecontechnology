"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteApplicationButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this application? This can't be undone."
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      // IMPORTANT:
      // API folder "application" hai, "applications" nahi.
      const res = await fetch(
        `/api/admin/application/${id}`,
        {
          method: "DELETE",
        }
      );

      const text = await res.text();

      let data: {
        error?: string;
        message?: string;
      } = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          console.error(
            "Invalid delete API response:",
            text
          );
        }
      }

      if (!res.ok) {
        throw new Error(
          data.error ||
            `Delete failed with status ${res.status}`
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Delete application error:",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 text-red-500 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={14} />

      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}