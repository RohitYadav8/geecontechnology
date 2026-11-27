"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Check,
  Eye,
  EyeOff,
  ImageIcon,
  Pencil,
  Plus,
  RefreshCw,
  Search,
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

type MediaItem = {
  id: string;
  fileName: string;
  url: string;
  type: string;
  folder: string | null;
  altText: string | null;
  relatedId?: string | null;
  createdAt: string;
  updatedAt?: string;
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

  // Media Library
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState("");

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

      setClients(Array.isArray(data) ? data : []);
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
  // FETCH MEDIA LIBRARY
  // ----------------------------------------

  const fetchMedia = useCallback(async () => {
    try {
      setMediaLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/media?type=IMAGE",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch media");
      }

      setMediaItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Media fetch error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch media"
      );

      setMediaOpen(false);
    } finally {
      setMediaLoading(false);
    }
  }, []);

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
    setMediaOpen(false);
    setMediaSearch("");
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
    setMediaOpen(false);
    setMediaSearch("");
  };

  // ----------------------------------------
  // OPEN MEDIA LIBRARY
  // ----------------------------------------

  const openMediaLibrary = async () => {
    setMediaOpen(true);
    setMediaSearch("");

    if (mediaItems.length === 0) {
      await fetchMedia();
    }
  };

  // ----------------------------------------
  // CLOSE MEDIA LIBRARY
  // ----------------------------------------

  const closeMediaLibrary = () => {
    setMediaOpen(false);
    setMediaSearch("");
  };

  // ----------------------------------------
  // SELECT MEDIA
  // ----------------------------------------

  const selectMedia = (media: MediaItem) => {
    setForm((previous) => ({
      ...previous,
      logo: media.url,
    }));

    setMediaOpen(false);
    setMediaSearch("");
  };

  // ----------------------------------------
  // FILTER MEDIA
  // ----------------------------------------

  const filteredMedia = useMemo(() => {
    const search = mediaSearch.trim().toLowerCase();

    if (!search) {
      return mediaItems;
    }

    return mediaItems.filter((media) => {
      const fileName = media.fileName.toLowerCase();
      const altText = media.altText?.toLowerCase() ?? "";
      const folder = media.folder?.toLowerCase() ?? "";

      return (
        fileName.includes(search) ||
        altText.includes(search) ||
        folder.includes(search)
      );
    });
  }, [mediaItems, mediaSearch]);

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
      setError("Please choose a logo from Media Library.");
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
      setMediaOpen(false);
      setMediaSearch("");
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
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-7xl">

        {/* -------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------- */}

        <div className="brand-grad relative mb-8 overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              Clients
            </h1>

            <p className="mt-2 text-sm text-indigo-50/90">
              Manage client logos and client engagements
              displayed on the website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={fetchClients}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/[0.14] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />

              Refresh
            </button>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg transition hover:-translate-y-0.5"
            >
              <Plus size={17} />

              Add Client
            </button>
          </div>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* MESSAGES */}
        {/* -------------------------------- */}

        {error && (
          <div className="mb-5 flex items-start justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
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
          <div className="mb-5 flex items-start justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
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
          <div className="mb-8 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/[0.06]">
              <div>
                <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
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
                className="rounded-xl p-2 text-slate-500 transition hover:bg-violet-50 hover:text-violet-600 disabled:opacity-50 dark:hover:bg-white/[0.06] dark:hover:text-slate-200"
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
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                />
              </div>

              {/* CLIENT LOGO */}

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Client Logo *
                </label>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={openMediaLibrary}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      openMediaLibrary();
                    }
                  }}
                  className="group cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5 transition hover:border-violet-400 hover:bg-violet-50/50 focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.1] dark:bg-white/[0.03] dark:hover:border-violet-400/50 dark:hover:bg-violet-500/10"
                >
                  {form.logo ? (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-24 w-32 shrink-0 items-center justify-center rounded-[18px] border border-slate-200 bg-white p-3 dark:border-white/[0.08] dark:bg-[#0b1220]">
                        <img
                          src={form.logo}
                          alt="Selected client logo"
                          className="max-h-16 max-w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                            <Check size={13} />
                          </div>

                          <p className="text-sm font-semibold text-slate-800 dark:text-white">
                            Logo selected
                          </p>
                        </div>

                        <p className="mt-2 max-w-xl truncate text-xs text-slate-500 dark:text-slate-400">
                          {form.logo}
                        </p>

                        <p className="mt-2 text-xs font-semibold text-violet-600 dark:text-violet-400">
                          Click to choose another image from Media Library
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex min-h-28 flex-col items-center justify-center text-center">
                      <div className="brand-grad flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition group-hover:scale-105">
                        <ImageIcon size={21} />
                      </div>

                      <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                        Choose logo from Media Library
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Click anywhere in this area to select an image
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* CATEGORY + ORDER */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
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

                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                  />
                </div>
              </div>

              {/* FEATURED + ACTIVE */}

              <div className="grid gap-4 sm:grid-cols-2">

                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition hover:border-violet-300 dark:border-white/[0.08] dark:bg-white/[0.04]">
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
                    className="h-5 w-5 rounded border-slate-300 accent-violet-600 text-violet-600 focus:ring-violet-500"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition hover:border-violet-300 dark:border-white/[0.08] dark:bg-white/[0.04]">
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
                    className="h-5 w-5 rounded border-slate-300 accent-violet-600 text-violet-600 focus:ring-violet-500"
                  />
                </label>
              </div>

              {/* FORM BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 disabled:opacity-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="brand-grad inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
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
        {/* MEDIA LIBRARY MODAL */}
        {/* -------------------------------- */}

        {mediaOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeMediaLibrary();
              }
            }}
          >
            <div className="flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-2xl dark:border-white/[0.07] dark:bg-[#0b1220]">

              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/[0.06]">
                <div>
                  <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
                    Select Client Logo
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Choose an image from your Media Library.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMediaLibrary}
                  className="rounded-xl p-2 text-slate-500 transition hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-white/[0.06] dark:hover:text-slate-200"
                >
                  <X size={19} />
                </button>
              </div>

              {/* SEARCH */}

              <div className="border-b border-slate-100 p-5 dark:border-white/[0.06]">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={mediaSearch}
                    onChange={(event) =>
                      setMediaSearch(event.target.value)
                    }
                    placeholder="Search by file name, alt text or folder..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                  />
                </div>
              </div>

              {/* MEDIA CONTENT */}

              <div className="overflow-y-auto p-5">
                {mediaLoading ? (
                  <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <RefreshCw
                      size={24}
                      className="animate-spin text-violet-600"
                    />

                    Loading Media Library...
                  </div>
                ) : filteredMedia.length === 0 ? (
                  <div className="flex min-h-72 flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-slate-100 text-slate-400 dark:bg-white/[0.06]">
                      <ImageIcon size={25} />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-white">
                      {mediaSearch
                        ? "No matching images found"
                        : "No images available"}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {mediaSearch
                        ? "Try another search term."
                        : "Upload images from Media Library first."}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {filteredMedia.length} image
                        {filteredMedia.length !== 1 ? "s" : ""}
                      </p>

                      {form.logo && (
                        <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                          Current logo is highlighted
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {filteredMedia.map((media) => {
                        const selected =
                          form.logo === media.url;

                        return (
                          <button
                            type="button"
                            key={media.id}
                            onClick={() =>
                              selectMedia(media)
                            }
                            className={`group relative overflow-hidden rounded-[18px] border bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-30px_rgba(91,33,182,.4)] dark:bg-[#0b1220] ${
                              selected
                                ? "border-violet-500 ring-4 ring-violet-500/15"
                                : "border-slate-200 hover:border-violet-300 dark:border-white/[0.08] dark:hover:border-violet-400/50"
                            }`}
                          >
                            <div className="relative flex h-28 items-center justify-center overflow-hidden bg-slate-50 p-3 dark:bg-white/[0.04]">
                              <img
                                src={media.url}
                                alt={
                                  media.altText ||
                                  media.fileName
                                }
                                className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                              />

                              {selected && (
                                <div className="brand-grad absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md shadow-violet-500/30">
                                  <Check size={14} />
                                </div>
                              )}
                            </div>

                            <div className="p-2.5">
                              <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                                {media.fileName}
                              </p>

                              {media.folder && (
                                <p className="mt-1 truncate text-[10px] text-slate-400">
                                  {media.folder}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------- */}
        {/* CLIENT LIST */}
        {/* -------------------------------- */}

        <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">

          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  All Clients
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {clients.length} client
                  {clients.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

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
            <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
              <div className="brand-grad mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
                <Star size={25} />
              </div>

              <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
                No clients available
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Add your first client to display it
                on the website.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="brand-grad mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5"
              >
                <Plus size={16} />

                Add Client
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">

              {clients.map((client) => (
                <div
                  key={client.id}
                  className="p-5 transition hover:bg-violet-50/40 sm:p-6 dark:hover:bg-white/[0.03]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* CLIENT INFO */}

                    <div className="flex min-w-0 items-center gap-4">

                      <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-[16px] border border-slate-200/80 bg-white p-3 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04]">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-h-12 max-w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="truncate text-base font-extrabold text-slate-950 dark:text-white">
                            {client.name}
                          </h3>

                          {client.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                              <Star
                                size={12}
                                fill="currentColor"
                              />

                              Featured
                            </span>
                          )}

                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                              client.isActive
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-400"
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
                        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                          client.isActive
                            ? "border-emerald-200 bg-emerald-50/60 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "border-slate-200 bg-white text-slate-500 hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300"
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
                        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                          client.featured
                            ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"
                            : "border-slate-200 bg-white text-slate-500 hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300"
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

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(client)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                      >
                        <Pencil size={14} />

                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(client)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
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