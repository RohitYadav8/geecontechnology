"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteServiceButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this service? This can't be undone."
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(
        `/api/admin/services/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          credentials: "same-origin",
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Delete service failed:", {
          status: response.status,
          data,
        });

        alert(
          data?.error ||
            `Failed to delete service. Status: ${response.status}`
        );

        return;
      }

      router.refresh();
    } catch (error) {
      console.error("Delete service network error:", error);

      alert(
        "Could not connect to the server. Check the Next.js terminal for the exact error."
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
      className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
    >
      <Trash2 size={14} />

      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}