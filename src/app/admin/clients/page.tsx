"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  RefreshCw,
  Star,
  Trash2,
  X,
} from "lucide-react";

type ClientCategory =
  | "Technology"
  | "Healthcare"
  | "Education"
  | "Logistics"
  | "Manufacturing"
  | "Finance";

type Client = {
  id: number;
  name: string;
  logo: string;
  category: string;
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type FormData = {
  name: string;
  logo: string;
  category: ClientCategory;
  featured: boolean;
  isActive: boolean;
  order: string;
};

const categories: ClientCategory[] = [
  "Technology",
  "Healthcare",
  "Education",
  "Logistics",
  "Manufacturing",
  "Finance",
];

const initialForm: FormData = {
  name: "",
  logo: "",
  category: "Technology",
  featured: false,
  isActive: true,
  order: "0",
};

export default function ClientsAdminPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<FormData>(initialForm);

  // ----------------------------------------
  // FETCH CLIENTS
  // ----------------------------------------

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/clients", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch clients");
      }

      setClients(data);
    } catch (error) {
      console.error("Clients fetch error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch clients"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // ----------------------------------------
  // FORM CHANGE
  // ----------------------------------------

  const handleChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ----------------------------------------
  // OPEN ADD FORM
  // ----------------------------------------

  const openAddForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // ----------------------------------------
  // OPEN EDIT FORM
  // ----------------------------------------

  const openEditForm = (client: Client) => {
    setEditingId(client.id);

    setForm({
      name: client.name,
      logo: client.logo,
      category: client.category as ClientCategory,
      featured: client.featured,
      isActive: client.isActive,
      order: String(client.order),
    });

    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ----------------------------------------
  // CLOSE FORM
  // ----------------------------------------

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(initialForm);
  };

  // ----------------------------------------
  // SUBMIT
  // ----------------------------------------

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Client name is required.");
      return;
    }

    if (!form.logo.trim()) {
      setError("Logo path is required.");
      return;
    }

    if (!form.category.trim()) {
      setError("Category is required.");
      return;
    }

    try {
      setSaving(true);

      const isEditing = editingId !== null;

      const url = isEditing
        ? `/api/admin/clients/${editingId}`
        : "/api/admin/clients";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          logo: form.logo.trim(),
          category: form.category,
          featured: form.featured,
          isActive: form.isActive,
          order: Number(form.order) || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            (isEditing
              ? "Failed to update client"
              : "Failed to create client")
        );
      }

      if (isEditing) {
        setClients((previous) =>
          previous
            .map((client) =>
              client.id === data.id ? data : client
            )
            .sort((a, b) => a.order - b.order)
        );

        setSuccess("Client updated successfully.");
      } else {
        setClients((previous) =>
          [...previous, data].sort(
            (a, b) => a.order - b.order
          )
        );

        setSuccess("Client added successfully.");
      }

      setShowForm(false);
      setEditingId(null);
      setForm(initialForm);
    } catch (error) {
      console.error(
        editingId
          ? "Update client error:"
          : "Create client error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : editingId
            ? "Failed to update client"
            : "Failed to create client"
      );
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------
  // DELETE
  // ----------------------------------------

  const handleDelete = async (client: Client) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${client.name}"?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/clients/${client.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete client"
        );
      }

      setClients((previous) =>
        previous.filter((item) => item.id !== client.id)
      );

      setSuccess("Client deleted successfully.");
    } catch (error) {
      console.error("Delete client error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete client"
      );
    }
  };

  // ----------------------------------------
  // TOGGLE ACTIVE
  // ----------------------------------------

  const toggleActive = async (client: Client) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/clients/${client.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: client.name,
            logo: client.logo,
            category: client.category,
            featured: client.featured,
            isActive: !client.isActive,
            order: client.order,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update client"
        );
      }

      setClients((previous) =>
        previous.map((item) =>
          item.id === data.id ? data : item
        )
      );

      setSuccess(
        data.isActive
          ? "Client activated successfully."
          : "Client deactivated successfully."
      );
    } catch (error) {
      console.error("Toggle active error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update client"
      );
    }
  };

  // ----------------------------------------
  // TOGGLE FEATURED
  // ----------------------------------------

  const toggleFeatured = async (client: Client) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/clients/${client.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: client.name,
            logo: client.logo,
            category: client.category,
            featured: !client.featured,
            isActive: client.isActive,
            order: client.order,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update client"
        );
      }

      setClients((previous) =>
        previous.map((item) =>
          item.id === data.id ? data : item
        )
      );

      setSuccess(
        data.featured
          ? "Client marked as featured."
          : "Client removed from featured."
      );
    } catch (error) {
      console.error("Toggle featured error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update client"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        {/* -------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------- */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Clients
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage client logos and client engagements
              displayed on the website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchClients}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RefreshCw
                size={16}
                className={
                  loading ? "animate-spin" : ""
                }
              />

              Refresh
            </button>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={17} />

              Add Client
            </button>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* MESSAGES */}
        {/* -------------------------------- */}

        {error && (
          <div className="mb-5 flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-start justify-between gap-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
            <span>{success}</span>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* -------------------------------- */}
        {/* ADD / EDIT FORM */}
        {/* -------------------------------- */}

        {showForm && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {editingId
                    ? "Edit Client"
                    : "Add Client"}
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {editingId
                    ? "Update client information."
                    : "Add a new client to your website."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Client Name *
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    handleChange(
                      "name",
                      event.target.value
                    )
                  }
                  required
                  placeholder="e.g. Cisco"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* LOGO */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Logo Path *
                </label>

                <input
                  type="text"
                  value={form.logo}
                  onChange={(event) =>
                    handleChange(
                      "logo",
                      event.target.value
                    )
                  }
                  required
                  placeholder="/cisco-logo.png"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Example: /cisco-logo.png
                </p>
              </div>

              {/* LOGO PREVIEW */}

              {form.logo.trim() && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                  <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    Logo Preview
                  </p>

                  <div className="flex h-28 items-center justify-center rounded-lg bg-white p-4 dark:bg-slate-900">
                    <img
                      src={form.logo}
                      alt="Logo preview"
                      className="max-h-20 max-w-[220px] object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* CATEGORY + ORDER */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* CATEGORY */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Category *
                  </label>

                  <select
                    value={form.category}
                    onChange={(event) =>
                      handleChange(
                        "category",
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ORDER */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={(event) =>
                      handleChange(
                        "order",
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              {/* FEATURED + ACTIVE */}

              <div className="grid gap-4 sm:grid-cols-2">

                {/* FEATURED */}

                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Featured Client
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Show in Featured Clients
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) =>
                      handleChange(
                        "featured",
                        event.target.checked
                      )
                    }
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>

                {/* ACTIVE */}

                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Active
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Show this client on website
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) =>
                      handleChange(
                        "isActive",
                        event.target.checked
                      )
                    }
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>

              {/* FORM BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <RefreshCw
                      size={15}
                      className="animate-spin"
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Client"
                      : "Save Client"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* -------------------------------- */}
        {/* CLIENT LIST */}
        {/* -------------------------------- */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* LIST HEADER */}

          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div className="flex items-center justify-between">

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  All Clients
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {clients.length} client
                  {clients.length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>

            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="flex min-h-60 items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <RefreshCw
                  size={18}
                  className="animate-spin"
                />

                Loading clients...
              </div>
            </div>
          ) : clients.length === 0 ? (
            /* EMPTY */

            <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Star size={25} />
              </div>

              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                No clients available
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Add your first client to display it
                on the website.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={16} />
                Add Client
              </button>
            </div>
          ) : (
            /* LIST */

            <div className="divide-y divide-slate-200 dark:divide-slate-800">

              {clients.map((client) => (
                <div
                  key={client.id}
                  className="p-6 transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* CLIENT INFO */}

                    <div className="flex min-w-0 items-center gap-4">

                      {/* LOGO */}

                      <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-h-12 max-w-full object-contain"
                        />
                      </div>

                      {/* INFO */}

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                            {client.name}
                          </h3>

                          {client.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                              <Star
                                size={12}
                                fill="currentColor"
                              />
                              Featured
                            </span>
                          )}

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              client.isActive
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {client.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">

                          <span>
                            Category:{" "}
                            <strong className="font-medium text-slate-700 dark:text-slate-300">
                              {client.category}
                            </strong>
                          </span>

                          <span>
                            Order:{" "}
                            <strong className="font-medium text-slate-700 dark:text-slate-300">
                              {client.order}
                            </strong>
                          </span>

                        </div>

                        <p className="mt-1 truncate text-xs text-slate-400">
                          {client.logo}
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="flex shrink-0 flex-wrap items-center gap-2">

                      {/* ACTIVE */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleActive(client)
                        }
                        title={
                          client.isActive
                            ? "Deactivate client"
                            : "Activate client"
                        }
                        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                          client.isActive
                            ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900/50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                            : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        }`}
                      >
                        {client.isActive ? (
                          <Eye size={14} />
                        ) : (
                          <EyeOff size={14} />
                        )}

                        {client.isActive
                          ? "Active"
                          : "Inactive"}
                      </button>

                      {/* FEATURED */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleFeatured(client)
                        }
                        title={
                          client.featured
                            ? "Remove featured"
                            : "Make featured"
                        }
                        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                          client.featured
                            ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400"
                            : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Star
                          size={14}
                          fill={
                            client.featured
                              ? "currentColor"
                              : "none"
                          }
                        />

                        Featured
                      </button>

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(client)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                      >
                        <Pencil size={14} />

                        Edit
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(client)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                      >
                        <Trash2 size={14} />

                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}