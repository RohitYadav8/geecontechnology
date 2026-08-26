"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Settings,
  Search,
} from "lucide-react";

type BlogPostFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: string;
  tags: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  openGraphImage: string;
  order: number;
};

const emptyForm: BlogPostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  category: "",
  author: "",
  tags: "",
  isPublished: false,
  isFeatured: false,
  publishedAt: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  openGraphImage: "",
  order: 0,
};

type BlogPostFormProps = {
  initialValues?: BlogPostFormValues;
};

export function BlogPostForm({
  initialValues,
}: BlogPostFormProps) {
  const router = useRouter();

  const [form, setForm] =
    useState<BlogPostFormValues>(
      initialValues ?? emptyForm
    );

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const isEditing =
    Boolean(initialValues?.id);

  // =========================================================
  // HELPERS
  // =========================================================

  const generateSlug = (
    value: string
  ) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const updateField = <
    K extends keyof BlogPostFormValues,
  >(
    field: K,
    value: BlogPostFormValues[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =========================================================
  // TITLE
  // =========================================================

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.value;

    setForm((previous) => ({
      ...previous,
      title: value,

      // Generate slug automatically
      // while creating a new blog.
      slug: isEditing
        ? previous.slug
        : generateSlug(value),
    }));
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    setError("");

    if (!form.title.trim()) {
      setError(
        "Blog title is required."
      );
      return;
    }

    if (!form.slug.trim()) {
      setError(
        "Blog slug is required."
      );
      return;
    }

    if (!form.content.trim()) {
      setError(
        "Blog content is required."
      );
      return;
    }

    setSaving(true);

    try {
      const url = isEditing
        ? `/api/admin/blog-posts/${initialValues!.id}`
        : "/api/admin/blog-posts";

      const method = isEditing
        ? "PUT"
        : "POST";

      // Convert comma-separated tags
      // into an array for Prisma Json.
      const tags = form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const payload = {
        title:
          form.title.trim(),

        slug:
          generateSlug(form.slug),

        excerpt:
          form.excerpt.trim() ||
          null,

        content:
          form.content.trim(),

        featuredImage:
          form.featuredImage.trim() ||
          null,

        category:
          form.category.trim() ||
          null,

        author:
          form.author.trim() ||
          null,

        tags:
          tags.length > 0
            ? tags
            : null,

        isPublished:
          form.isPublished,

        isFeatured:
          form.isFeatured,

        publishedAt:
          form.isPublished &&
          form.publishedAt
            ? new Date(
                form.publishedAt
              ).toISOString()
            : null,

        metaTitle:
          form.metaTitle.trim() ||
          null,

        metaDescription:
          form.metaDescription.trim() ||
          null,

        keywords:
          form.keywords.trim() ||
          null,

        openGraphImage:
          form.openGraphImage.trim() ||
          null,

        order:
          Number(form.order) || 0,
      };

      const response =
        await fetch(url, {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to save blog post."
        );
      }

      router.push(
        "/admin/blog-posts"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Save blog post error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // CLASSES
  // =========================================================

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  const textareaClass =
    `${inputClass} resize-y`;

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

  const helpClass =
    "mt-1.5 text-xs text-slate-400";

  // =========================================================
  // UI
  // =========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ===============================================
          BASIC INFORMATION
      =============================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <FileText size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Basic Information
            </h2>

            <p className="text-xs text-slate-400">
              Main blog post content.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          {/* TITLE */}

          <div>
            <label
              htmlFor="title"
              className={labelClass}
            >
              Title *
            </label>

            <input
              id="title"
              type="text"
              required
              value={form.title}
              onChange={
                handleTitleChange
              }
              placeholder="Enter blog title"
              className={inputClass}
            />
          </div>

          {/* SLUG */}

          <div>
            <label
              htmlFor="slug"
              className={labelClass}
            >
              Slug *
            </label>

            <input
              id="slug"
              type="text"
              required
              value={form.slug}
              onChange={(event) =>
                updateField(
                  "slug",
                  generateSlug(
                    event.target.value
                  )
                )
              }
              placeholder="my-blog-post"
              className={`${inputClass} font-mono`}
            />

            <p className={helpClass}>
              Public URL:
              /blog/
              {form.slug ||
                "your-blog-slug"}
            </p>
          </div>

          {/* EXCERPT */}

          <div>
            <label
              htmlFor="excerpt"
              className={labelClass}
            >
              Excerpt
            </label>

            <textarea
              id="excerpt"
              rows={3}
              value={form.excerpt}
              onChange={(event) =>
                updateField(
                  "excerpt",
                  event.target.value
                )
              }
              placeholder="Short summary of the blog post..."
              className={textareaClass}
            />

            <p className={helpClass}>
              Short description used on
              blog cards.
            </p>
          </div>

          {/* CONTENT */}

          <div>
            <label
              htmlFor="content"
              className={labelClass}
            >
              Content *
            </label>

            <textarea
              id="content"
              required
              rows={16}
              value={form.content}
              onChange={(event) =>
                updateField(
                  "content",
                  event.target.value
                )
              }
              placeholder="Write your blog content here..."
              className={textareaClass}
            />
          </div>
        </div>
      </section>

      {/* ===============================================
          MEDIA
      =============================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <ImageIcon size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Media
            </h2>

            <p className="text-xs text-slate-400">
              Blog images.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="featuredImage"
            className={labelClass}
          >
            Featured Image
          </label>

          <input
            id="featuredImage"
            type="text"
            value={
              form.featuredImage
            }
            onChange={(event) =>
              updateField(
                "featuredImage",
                event.target.value
              )
            }
            placeholder="/blog/my-blog-image.jpg"
            className={inputClass}
          />

          <p className={helpClass}>
            For now enter an image path
            from the public folder. Media
            Library selection can be
            connected later.
          </p>
        </div>
      </section>

      {/* ===============================================
          BLOG DETAILS
      =============================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Settings size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Blog Details
            </h2>

            <p className="text-xs text-slate-400">
              Category, author and tags.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* CATEGORY */}

          <div>
            <label
              htmlFor="category"
              className={labelClass}
            >
              Category
            </label>

            <input
              id="category"
              type="text"
              value={form.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.target.value
                )
              }
              placeholder="Technology"
              className={inputClass}
            />
          </div>

          {/* AUTHOR */}

          <div>
            <label
              htmlFor="author"
              className={labelClass}
            >
              Author
            </label>

            <input
              id="author"
              type="text"
              value={form.author}
              onChange={(event) =>
                updateField(
                  "author",
                  event.target.value
                )
              }
              placeholder="Geecon Technology"
              className={inputClass}
            />
          </div>

          {/* TAGS */}

          <div className="md:col-span-2">
            <label
              htmlFor="tags"
              className={labelClass}
            >
              Tags
            </label>

            <input
              id="tags"
              type="text"
              value={form.tags}
              onChange={(event) =>
                updateField(
                  "tags",
                  event.target.value
                )
              }
              placeholder="Next.js, Technology, Web Development"
              className={inputClass}
            />

            <p className={helpClass}>
              Separate multiple tags with
              commas.
            </p>
          </div>
        </div>
      </section>

      {/* ===============================================
          PUBLISHING
      =============================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Publishing
        </h2>

        <div className="mt-6 space-y-5">
          {/* PUBLISHED */}

          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Publish Post
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Published posts can be
                displayed on the public
                website.
              </p>
            </div>

            <input
              type="checkbox"
              checked={
                form.isPublished
              }
              onChange={(event) =>
                updateField(
                  "isPublished",
                  event.target.checked
                )
              }
              className="h-4 w-4 accent-violet-600"
            />
          </label>

          {/* FEATURED */}

          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Featured Post
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Highlight this post on the
                blog page.
              </p>
            </div>

            <input
              type="checkbox"
              checked={
                form.isFeatured
              }
              onChange={(event) =>
                updateField(
                  "isFeatured",
                  event.target.checked
                )
              }
              className="h-4 w-4 accent-violet-600"
            />
          </label>

          {/* PUBLISHED DATE */}

          {form.isPublished && (
            <div>
              <label
                htmlFor="publishedAt"
                className={labelClass}
              >
                Published Date
              </label>

              <input
                id="publishedAt"
                type="datetime-local"
                value={
                  form.publishedAt
                }
                onChange={(event) =>
                  updateField(
                    "publishedAt",
                    event.target.value
                  )
                }
                className={inputClass}
              />

              <p className={helpClass}>
                Leave empty to use the
                current date when the post
                is published.
              </p>
            </div>
          )}

          {/* ORDER */}

          <div>
            <label
              htmlFor="order"
              className={labelClass}
            >
              Display Order
            </label>

            <input
              id="order"
              type="number"
              min={0}
              value={form.order}
              onChange={(event) =>
                updateField(
                  "order",
                  Number(
                    event.target.value
                  ) || 0
                )
              }
              className={`${inputClass} max-w-40`}
            />
          </div>
        </div>
      </section>

      {/* ===============================================
          SEO
      =============================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <Search size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              SEO
            </h2>

            <p className="text-xs text-slate-400">
              Search engine metadata.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="metaTitle"
              className={labelClass}
            >
              Meta Title
            </label>

            <input
              id="metaTitle"
              type="text"
              value={form.metaTitle}
              onChange={(event) =>
                updateField(
                  "metaTitle",
                  event.target.value
                )
              }
              placeholder="SEO title"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="metaDescription"
              className={labelClass}
            >
              Meta Description
            </label>

            <textarea
              id="metaDescription"
              rows={4}
              value={
                form.metaDescription
              }
              onChange={(event) =>
                updateField(
                  "metaDescription",
                  event.target.value
                )
              }
              placeholder="SEO description..."
              className={textareaClass}
            />
          </div>

          <div>
            <label
              htmlFor="keywords"
              className={labelClass}
            >
              Keywords
            </label>

            <input
              id="keywords"
              type="text"
              value={form.keywords}
              onChange={(event) =>
                updateField(
                  "keywords",
                  event.target.value
                )
              }
              placeholder="technology, web development, nextjs"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="openGraphImage"
              className={labelClass}
            >
              Open Graph Image
            </label>

            <input
              id="openGraphImage"
              type="text"
              value={
                form.openGraphImage
              }
              onChange={(event) =>
                updateField(
                  "openGraphImage",
                  event.target.value
                )
              }
              placeholder="/blog/og-image.jpg"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* ===============================================
          ERROR
      =============================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ===============================================
          ACTIONS
      =============================================== */}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} />

          {saving
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Post"}
        </button>

        <button
          type="button"
          disabled={saving}
          onClick={() =>
            router.push(
              "/admin/blog-posts"
            )
          }
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={16} />
          Back to Posts
        </button>
      </div>
    </form>
  );
}