"use client";

import {
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import {
    Pencil,
    Plus,
    RefreshCw,
    Star,
    Trash2,
    X,
} from "lucide-react";

type Testimonial = {
    id: number;
    quote: string;
    name: string;
    isActive: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
};

type FormData = {
    quote: string;
    name: string;
    isActive: boolean;
    order: string;
};

const initialForm: FormData = {
    quote: "",
    name: "",
    isActive: true,
    order: "0",
};

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState<
        Testimonial[]
    >([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(
        null
    );

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(
        null
    );

    const [form, setForm] = useState<FormData>(initialForm);

    /*
    |--------------------------------------------------------------------------
    | Fetch Testimonials
    |--------------------------------------------------------------------------
    */

    const fetchTestimonials = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "/api/admin/testimonials",
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                        "Failed to fetch testimonials"
                );
            }

            const sortedTestimonials = Array.isArray(data)
                ? [...data].sort(
                      (a: Testimonial, b: Testimonial) =>
                          a.order - b.order
                  )
                : [];

            setTestimonials(sortedTestimonials);
        } catch (error) {
            console.error(
                "Testimonials fetch error:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch testimonials"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        fetchTestimonials();
    }, [fetchTestimonials]);

    /*
    |--------------------------------------------------------------------------
    | Form Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (
        field: keyof FormData,
        value: string | boolean
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | Open Add Form
    |--------------------------------------------------------------------------
    */

    const openAddForm = () => {
        setEditingId(null);
        setForm(initialForm);
        setError("");
        setSuccess("");
        setShowForm(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Open Edit Form
    |--------------------------------------------------------------------------
    */

    const openEditForm = (testimonial: Testimonial) => {
        setEditingId(testimonial.id);

        setForm({
            quote: testimonial.quote,
            name: testimonial.name,
            isActive: testimonial.isActive,
            order: String(testimonial.order),
        });

        setError("");
        setSuccess("");
        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Close Form
    |--------------------------------------------------------------------------
    */

    const closeForm = () => {
        if (saving) return;

        setShowForm(false);
        setEditingId(null);
        setForm(initialForm);
    };

    /*
    |--------------------------------------------------------------------------
    | Submit - Add / Edit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!form.quote.trim()) {
            setError("Testimonial quote is required.");
            return;
        }

        if (!form.name.trim()) {
            setError("Client name is required.");
            return;
        }

        try {
            setSaving(true);

            const isEditing = editingId !== null;

            const url = isEditing
                ? `/api/admin/testimonials/${editingId}`
                : "/api/admin/testimonials";

            const method = isEditing ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quote: form.quote.trim(),
                    name: form.name.trim(),
                    isActive: form.isActive,
                    order: Number(form.order) || 0,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                        (isEditing
                            ? "Failed to update testimonial"
                            : "Failed to create testimonial")
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Update Local State
            |--------------------------------------------------------------------------
            */

            if (isEditing) {
                setTestimonials((previous) =>
                    [...previous]
                        .map((item) =>
                            item.id === data.id ? data : item
                        )
                        .sort(
                            (a, b) => a.order - b.order
                        )
                );

                setSuccess(
                    "Testimonial updated successfully."
                );
            } else {
                setTestimonials((previous) =>
                    [...previous, data].sort(
                        (a, b) => a.order - b.order
                    )
                );

                setSuccess(
                    "Testimonial added successfully."
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Reset Form
            |--------------------------------------------------------------------------
            */

            setForm(initialForm);
            setEditingId(null);
            setShowForm(false);
        } catch (error) {
            console.error(
                editingId !== null
                    ? "Update testimonial error:"
                    : "Create testimonial error:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : editingId !== null
                    ? "Failed to update testimonial"
                    : "Failed to create testimonial"
            );
        } finally {
            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Delete Testimonial
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this testimonial?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);
            setError("");
            setSuccess("");

            const response = await fetch(
                `/api/admin/testimonials/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                        "Failed to delete testimonial"
                );
            }

            setTestimonials((previous) =>
                previous.filter((item) => item.id !== id)
            );

            setSuccess(
                "Testimonial deleted successfully."
            );
        } catch (error) {
            console.error(
                "Delete testimonial error:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete testimonial"
            );
        } finally {
            setDeletingId(null);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="w-full min-w-0">
            <div className="mx-auto max-w-7xl">
                {/* =========================================================
                    HEADER
                ========================================================= */}

                <div className="mb-6 brand-grad relative overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
                    <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.07]" />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                            Testimonials
                        </h1>

                        <p className="mt-1 text-sm text-indigo-50/90">
                            Manage customer testimonials
                            displayed on the website.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Refresh */}

                        <button
                            type="button"
                            onClick={fetchTestimonials}
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/[0.14] text-white backdrop-blur-xl transition hover:bg-white/25 px-5 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <RefreshCw
                                size={16}
                                className={
                                    loading
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Refresh
                        </button>

                        {/* Add */}

                        <button
                            type="button"
                            onClick={openAddForm}
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5"
                        >
                            <Plus size={17} />

                            Add Testimonial
                        </button>
                    </div>
                </div>
                </div>

                {/* =========================================================
                    SUCCESS MESSAGE
                ========================================================= */}

                {success && (
                    <div className="mb-5 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
                        <span>{success}</span>

                        <button
                            type="button"
                            onClick={() => setSuccess("")}
                            className="ml-4 rounded-lg p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                        >
                            <X size={15} />
                        </button>
                    </div>
                )}

                {/* =========================================================
                    ERROR MESSAGE
                ========================================================= */}

                {error && (
                    <div className="mb-5 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                        <span>{error}</span>

                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="ml-4 rounded-lg p-1 hover:bg-red-100 dark:hover:bg-red-900/30"
                        >
                            <X size={15} />
                        </button>
                    </div>
                )}

                {/* =========================================================
                    ADD / EDIT FORM
                ========================================================= */}

                {showForm && (
                    <div className="relative mb-8 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                        <div className="brand-grad absolute left-0 top-0 h-1 w-full" />
                        {/* Form Header */}

                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/[0.06]">
                            <div>
                                <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white">
                                    {editingId !== null
                                        ? "Edit Testimonial"
                                        : "Add Testimonial"}
                                </h2>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    {editingId !== null
                                        ? "Update customer testimonial details."
                                        : "Add a new customer testimonial."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                disabled={saving}
                                className="rounded-xl p-2 text-slate-500 transition hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/[0.06] dark:hover:text-violet-300"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-6"
                        >
                            {/* Quote */}

                            <div>
                                <label className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                                    Testimonial / Quote *
                                </label>

                                <textarea
                                    value={form.quote}
                                    onChange={(event) =>
                                        handleChange(
                                            "quote",
                                            event.target.value
                                        )
                                    }
                                    required
                                    rows={5}
                                    placeholder="Enter customer testimonial..."
                                    className="resize-none w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]"
                                />
                            </div>

                            {/* Name */}

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
                                    placeholder="e.g. Andy Ridley"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]"
                                />
                            </div>

                            {/* Order + Active */}

                            <div className="grid gap-5 sm:grid-cols-2">
                                {/* Display Order */}

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
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]"
                                    />

                                    <p className="mt-1 text-xs text-slate-400">
                                        Smaller number appears
                                        first.
                                    </p>
                                </div>

                                {/* Active */}

                                <div className="flex items-end">
                                    <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition hover:border-violet-300 dark:border-white/[0.08] dark:bg-white/[0.04]">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                Active
                                            </p>

                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Show this testimonial
                                            </p>
                                        </div>

                                        <input
                                            type="checkbox"
                                            checked={
                                                form.isActive
                                            }
                                            onChange={(event) =>
                                                handleChange(
                                                    "isActive",
                                                    event.target
                                                        .checked
                                                )
                                            }
                                            className="h-5 w-5 rounded border-slate-300 accent-violet-600 text-violet-600 focus:ring-violet-500"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Buttons */}

                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-white/[0.06]">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    disabled={saving}
                                    className="rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300 px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="brand-grad rounded-xl text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:shadow-violet-500/40 px-5 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId !== null
                                        ? "Update Testimonial"
                                        : "Save Testimonial"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* =========================================================
                    TESTIMONIAL LIST
                ========================================================= */}

                <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
                    {/* List Header */}

                    <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5 dark:border-white/[0.06] dark:bg-white/[0.03]">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white">
                                    All Testimonials
                                </h2>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    {testimonials.length}{" "}
                                    testimonial
                                    {testimonials.length !== 1
                                        ? "s"
                                        : ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Loading */}

                    {loading ? (
                        <div className="flex min-h-60 items-center justify-center">
                            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                <RefreshCw
                                    size={18}
                                    className="animate-spin"
                                />

                                Loading testimonials...
                            </div>
                        </div>
                    ) : testimonials.length === 0 ? (
                        /* Empty */

                        <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
                            <div className="brand-grad mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
                                <Star size={25} />
                            </div>

                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                                No testimonials available
                            </h3>

                            <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                                Add your first testimonial to
                                display it on the website.
                            </p>

                            <button
                                type="button"
                                onClick={openAddForm}
                                className="mt-5 inline-flex items-center gap-2 brand-grad rounded-xl text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:shadow-violet-500/40 px-5 py-2.5"
                            >
                                <Plus size={16} />

                                Add Testimonial
                            </button>
                        </div>
                    ) : (
                        /* List */

                        <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                            {testimonials.map(
                                (testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="p-6 transition hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                                    >
                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                            {/* Content */}

                                            <div className="min-w-0 flex-1">
                                                {/* Stars */}

                                                <div className="mb-3 flex gap-1 text-amber-400">
                                                    {Array.from(
                                                        {
                                                            length: 5,
                                                        }
                                                    ).map(
                                                        (
                                                            _,
                                                            index
                                                        ) => (
                                                            <Star
                                                                key={
                                                                    index
                                                                }
                                                                size={
                                                                    15
                                                                }
                                                                fill="currentColor"
                                                                strokeWidth={
                                                                    0
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>

                                                {/* Quote */}

                                                <p className="max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                                                    “
                                                    {
                                                        testimonial.quote
                                                    }
                                                    ”
                                                </p>

                                                {/* Client */}

                                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                                    {/* Avatar */}

                                                    <div className="brand-grad flex h-9 w-9 items-center justify-center rounded-[12px] text-xs font-bold text-white shadow-md shadow-violet-500/25">
                                                        {testimonial.name
                                                            .trim()
                                                            .split(
                                                                /\s+/
                                                            )
                                                            .map(
                                                                (
                                                                    word
                                                                ) =>
                                                                    word.charAt(
                                                                        0
                                                                    )
                                                            )
                                                            .join(
                                                                ""
                                                            )
                                                            .slice(
                                                                0,
                                                                2
                                                            )
                                                            .toUpperCase()}
                                                    </div>

                                                    {/* Name */}

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                                            {
                                                                testimonial.name
                                                            }
                                                        </p>

                                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                                            Display
                                                            order:{" "}
                                                            {
                                                                testimonial.order
                                                            }
                                                        </p>
                                                    </div>

                                                    {/* Status */}

                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                                            testimonial.isActive
                                                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                                                                : "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-400"
                                                        }`}
                                                    >
                                                        {testimonial.isActive
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* =====================================================
                                                ACTIONS
                                            ===================================================== */}

                                            <div className="flex shrink-0 items-center gap-2">
                                                {/* Edit */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditForm(
                                                            testimonial
                                                        )
                                                    }
                                                    disabled={
                                                        saving ||
                                                        deletingId !==
                                                            null
                                                    }
                                                    title="Edit testimonial"
                                                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300 px-3.5 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <Pencil
                                                        size={14}
                                                    />

                                                    Edit
                                                </button>

                                                {/* Delete */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            testimonial.id
                                                        )
                                                    }
                                                    disabled={
                                                        saving ||
                                                        deletingId !==
                                                            null
                                                    }
                                                    title="Delete testimonial"
                                                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20 px-3.5 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {deletingId ===
                                                    testimonial.id ? (
                                                        <>
                                                            <RefreshCw
                                                                size={
                                                                    14
                                                                }
                                                                className="animate-spin"
                                                            />

                                                            Deleting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Trash2
                                                                size={
                                                                    14
                                                                }
                                                            />

                                                            Delete
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}