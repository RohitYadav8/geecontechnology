"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { RippleButton } from "../../../components/ripple-button";

interface ServiceFormValues {
  id?: string;

  tag: string;
  title: string;
  slug: string;
  description: string;

  image: string;
  bannerImage: string;
  darkBannerImage: string;
  href: string;
  gradient: string;

  intro: string[];
  challenges: string[];
  middle: string[];
  benefits: string[];
  closing: string;
  coverage: string[];
  qa: string[];

  sections: {
    title: string;
    body: string;
  }[];

  order: number;
  isActive: boolean;
}

const emptyForm: ServiceFormValues = {
  tag: "",
  title: "",
  slug: "",
  description: "",

  image: "",
  bannerImage: "",
  darkBannerImage: "",
  href: "",
  gradient: "",

  intro: [],
  challenges: [],
  middle: [],
  benefits: [],
  closing: "",
  coverage: [],
  qa: [],

  sections: [],

  order: 0,
  isActive: true,
};

export function ServiceForm({
  initialValues,
}: {
  initialValues?: ServiceFormValues;
}) {
  const router = useRouter();

  const [form, setForm] =
    useState<ServiceFormValues>(
      initialValues ?? emptyForm
    );

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  // =========================================================
  // BANNER FILE STATES
  // =========================================================

  const [
    lightBannerFile,
    setLightBannerFile,
  ] = useState<File | null>(null);

  const [
    darkBannerFile,
    setDarkBannerFile,
  ] = useState<File | null>(null);

  const [
    lightBannerPreview,
    setLightBannerPreview,
  ] = useState(
    initialValues?.bannerImage ?? ""
  );

  const [
    darkBannerPreview,
    setDarkBannerPreview,
  ] = useState(
    initialValues?.darkBannerImage ?? ""
  );

  // =========================================================
  // BULK IMPORT STATES
  // =========================================================

  const [bulkJson, setBulkJson] =
    useState("");

  const [
    importMessage,
    setImportMessage,
  ] = useState("");

  const isEditing = Boolean(
    initialValues?.id
  );

  // =========================================================
  // BANNER UPLOAD
  // =========================================================

  const uploadBanner = async (
    file: File
  ): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const response = await fetch(
      "/api/admin/services/upload",
      {
        method: "POST",
        credentials: "same-origin",
        body: formData,
      }
    );

    const data = await response
      .json()
      .catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.error ||
          "Banner image upload failed."
      );
    }

    if (!data?.url) {
      throw new Error(
        "Uploaded banner path was not returned."
      );
    }

    return data.url;
  };

  // =========================================================
  // LIGHT BANNER CHANGE
  // =========================================================

  const handleLightBannerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select an image file."
      );

      return;
    }

    setError("");

    setLightBannerFile(
      file
    );

    const preview =
      URL.createObjectURL(
        file
      );

    setLightBannerPreview(
      preview
    );
  };

  // =========================================================
  // DARK BANNER CHANGE
  // =========================================================

  const handleDarkBannerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select an image file."
      );

      return;
    }

    setError("");

    setDarkBannerFile(
      file
    );

    const preview =
      URL.createObjectURL(
        file
      );

    setDarkBannerPreview(
      preview
    );
  };

  // =========================================================
  // SLUG GENERATOR
  // =========================================================

  const generateSlug = (
    value: string
  ) => {
    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9\s-]/g,
        ""
      )
      .replace(
        /\s+/g,
        "-"
      )
      .replace(
        /-+/g,
        "-"
      );
  };

  // =========================================================
  // NORMAL INPUT CHANGE
  // =========================================================

  const handleChange =
    (
      field:
        | "tag"
        | "title"
        | "slug"
        | "description"
        | "image"
        | "href"
        | "gradient"
        | "closing"
    ) =>
    (
      e: React.ChangeEvent<
        | HTMLInputElement
        | HTMLTextAreaElement
      >
    ) => {
      setForm((prev) => ({
        ...prev,

        [field]:
          e.target.value,
      }));
    };

  // =========================================================
  // TITLE + AUTO SLUG
  // =========================================================

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      e.target.value;

    setForm((prev) => ({
      ...prev,

      title: value,

      slug:
        !isEditing ||
        !prev.slug
          ? generateSlug(
              value
            )
          : prev.slug,
    }));
  };

  // =========================================================
  // ARRAY HELPERS
  // =========================================================

  const arrayToText = (
    items: string[]
  ) => {
    return items.join(
      "\n"
    );
  };

  const textToArray = (
    value: string
  ) => {
    return value
      .split("\n")
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);
  };

  const handleArrayChange =
    (
      field:
        | "intro"
        | "challenges"
        | "middle"
        | "benefits"
        | "coverage"
        | "qa"
    ) =>
    (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setForm((prev) => ({
        ...prev,

        [field]:
          textToArray(
            e.target.value
          ),
      }));
    };

  // =========================================================
  // SECTIONS
  // =========================================================

  const addSection = () => {
    setForm((prev) => ({
      ...prev,

      sections: [
        ...prev.sections,
        {
          title: "",
          body: "",
        },
      ],
    }));
  };

  const updateSection = (
    index: number,
    field:
      | "title"
      | "body",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,

      sections:
        prev.sections.map(
          (
            section,
            i
          ) =>
            i === index
              ? {
                  ...section,
                  [field]:
                    value,
                }
              : section
        ),
    }));
  };

  const removeSection = (
    index: number
  ) => {
    setForm((prev) => ({
      ...prev,

      sections:
        prev.sections.filter(
          (_, i) =>
            i !== index
        ),
    }));
  };

  // =========================================================
  // BULK JSON IMPORT
  // =========================================================

  const handleBulkImport =
    () => {
      setError("");
      setImportMessage("");

      if (
        !bulkJson.trim()
      ) {
        setError(
          "Please paste service JSON first."
        );

        return;
      }

      try {
        const parsed: unknown =
          JSON.parse(
            bulkJson
          );

        if (
          typeof parsed !==
            "object" ||
          parsed === null ||
          Array.isArray(
            parsed
          )
        ) {
          throw new Error(
            "JSON must contain one service object."
          );
        }

        const data =
          parsed as Record<
            string,
            unknown
          >;

        // ========================================
        // STRING HELPER
        // ========================================

        const getString = (
          key: string,
          fallback = ""
        ) => {
          const value =
            data[key];

          return typeof value ===
            "string"
            ? value
            : fallback;
        };

        // ========================================
        // ARRAY HELPER
        // ========================================

        const getArray = (
          key: string
        ) => {
          const value =
            data[key];

          if (
            !Array.isArray(
              value
            )
          ) {
            return [];
          }

          return value.filter(
            (
              item
            ): item is string =>
              typeof item ===
              "string"
          );
        };

        // ========================================
        // SECTIONS
        // ========================================

        const importedSections =
          Array.isArray(
            data.sections
          )
            ? data.sections
                .filter(
                  (item) =>
                    typeof item ===
                      "object" &&
                    item !==
                      null
                )
                .map(
                  (
                    item
                  ) => {
                    const section =
                      item as Record<
                        string,
                        unknown
                      >;

                    return {
                      title:
                        typeof section.title ===
                        "string"
                          ? section.title
                          : "",

                      body:
                        typeof section.body ===
                        "string"
                          ? section.body
                          : "",
                    };
                  }
                )
                .filter(
                  (
                    section
                  ) =>
                    section.title.trim() ||
                    section.body.trim()
                )
            : [];

        const importedTitle =
          getString(
            "title"
          );

        const importedSlug =
          generateSlug(
            getString(
              "slug",
              importedTitle
            )
          );

        let importedHref =
          getString(
            "href"
          );

        if (
          !importedHref &&
          importedSlug
        ) {
          importedHref =
            `/${importedSlug}`;
        }

        const importedBanner =
          getString(
            "bannerImage"
          );

        const importedDarkBanner =
          getString(
            "darkBannerImage"
          );

        // ========================================
        // FILL FORM
        // ========================================

        setForm(
          (
            previous
          ) => ({
            ...previous,

            tag:
              getString(
                "tag"
              ),

            title:
              importedTitle,

            slug:
              importedSlug,

            description:
              getString(
                "description"
              ),

            image:
              getString(
                "image"
              ),

            bannerImage:
              importedBanner,

            darkBannerImage:
              importedDarkBanner,

            href:
              importedHref,

            gradient:
              getString(
                "gradient"
              ),

            intro:
              getArray(
                "intro"
              ),

            challenges:
              getArray(
                "challenges"
              ),

            middle:
              getArray(
                "middle"
              ),

            benefits:
              getArray(
                "benefits"
              ),

            closing:
              getString(
                "closing"
              ),

            coverage:
              getArray(
                "coverage"
              ),

            qa:
              getArray(
                "qa"
              ),

            sections:
              importedSections,

            order:
              typeof data.order ===
                "number" &&
              Number.isFinite(
                data.order
              )
                ? Math.trunc(
                    data.order
                  )
                : 0,

            isActive:
              typeof data.isActive ===
              "boolean"
                ? data.isActive
                : true,
          })
        );

        // reset selected files after JSON import

        setLightBannerFile(
          null
        );

        setDarkBannerFile(
          null
        );

        setLightBannerPreview(
          importedBanner
        );

        setDarkBannerPreview(
          importedDarkBanner
        );

        setImportMessage(
          isEditing
            ? "Service JSON imported successfully. Review the fields and click Save Changes."
            : "Service JSON imported successfully. Review the fields and click Create Service."
        );
      } catch (
        error
      ) {
        console.error(
          "Bulk JSON import error:",
          error
        );

        setError(
          error instanceof Error
            ? `Invalid JSON: ${error.message}`
            : "Invalid service JSON."
        );
      }
    };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setError("");
      setSaving(true);

      try {
        // ========================================
        // VALIDATION
        // ========================================

        if (
          !form.title.trim()
        ) {
          throw new Error(
            "Title is required."
          );
        }

        if (
          !form.slug.trim()
        ) {
          throw new Error(
            "Slug is required."
          );
        }

        if (
          !form.description.trim()
        ) {
          throw new Error(
            "Description is required."
          );
        }

        if (
          !form.image.trim()
        ) {
          throw new Error(
            "Service image is required."
          );
        }

        if (
          !form.href.trim()
        ) {
          throw new Error(
            "Href is required."
          );
        }

        // ========================================
        // API
        // ========================================

        const url =
          isEditing
            ? `/api/admin/services/${initialValues!.id}`
            : "/api/admin/services";

        const method =
          isEditing
            ? "PUT"
            : "POST";

        // ========================================
        // UPLOAD LIGHT/DARK BANNERS
        // ========================================

        let finalBannerImage =
          form.bannerImage;

        let finalDarkBannerImage =
          form.darkBannerImage;

        if (
          lightBannerFile
        ) {
          finalBannerImage =
            await uploadBanner(
              lightBannerFile
            );
        }

        if (
          darkBannerFile
        ) {
          finalDarkBannerImage =
            await uploadBanner(
              darkBannerFile
            );
        }

        // ========================================
        // CLEAN SECTIONS
        // ========================================

        const cleanSections =
          form.sections
            .map(
              (
                section
              ) => ({
                title:
                  section.title.trim(),

                body:
                  section.body.trim(),
              })
            )
            .filter(
              (
                section
              ) =>
                section.title ||
                section.body
            );

        // ========================================
        // PAYLOAD
        // ========================================

        const payload = {
          tag:
            form.tag.trim() ||
            null,

          title:
            form.title.trim(),

          slug:
            generateSlug(
              form.slug
            ),

          description:
            form.description.trim(),

          image:
            form.image.trim(),

          // LIGHT THEME BANNER
          bannerImage:
            finalBannerImage.trim() ||
            null,

          // DARK THEME BANNER
          darkBannerImage:
            finalDarkBannerImage.trim() ||
            null,

          href:
            form.href.trim(),

          gradient:
            form.gradient.trim() ||
            null,

          intro:
            form.intro.length >
            0
              ? form.intro
              : null,

          challenges:
            form.challenges
              .length > 0
              ? form.challenges
              : null,

          middle:
            form.middle.length >
            0
              ? form.middle
              : null,

          benefits:
            form.benefits
              .length > 0
              ? form.benefits
              : null,

          closing:
            form.closing.trim() ||
            null,

          coverage:
            form.coverage
              .length > 0
              ? form.coverage
              : null,

          qa:
            form.qa.length > 0
              ? form.qa
              : null,

          sections:
            cleanSections.length >
            0
              ? cleanSections
              : null,

          order:
            Number(
              form.order
            ) || 0,

          isActive:
            form.isActive,
        };

        // ========================================
        // SAVE SERVICE
        // ========================================

        const res =
          await fetch(
            url,
            {
              method,

              headers: {
                "Content-Type":
                  "application/json",
              },

              credentials:
                "same-origin",

              body:
                JSON.stringify(
                  payload
                ),
            }
          );

        const data =
          await res
            .json()
            .catch(
              () => null
            );

        if (!res.ok) {
          throw new Error(
            data?.error ||
              `Something went wrong. Status: ${res.status}`
          );
        }

        router.push(
          "/admin/services"
        );

        router.refresh();
      } catch (
        error
      ) {
        console.error(
          "Service save error:",
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
  // COMMON CLASSES
  // =========================================================

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]";

  const labelClass =
    "mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300";

  const helpClass =
    "mt-1.5 text-xs text-slate-400 dark:text-slate-500";

  // =========================================================
  // UI
  // =========================================================

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="w-full max-w-4xl space-y-6 sm:space-y-8"
    >
      {/* ========================================
          BULK JSON IMPORT
      ======================================== */}

      <div className="overflow-hidden rounded-[24px] border border-violet-200/70 bg-white shadow-[0_30px_70px_-45px_rgba(91,33,182,.45)] dark:border-violet-400/15 dark:bg-[#0b1220]">
        <div className="brand-grad relative overflow-hidden px-6 py-6 text-white sm:px-7">
          <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-violet-300/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-12 h-52 w-52 rounded-full bg-cyan-300/30 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-extrabold tracking-[-0.02em] text-white sm:text-xl">
                Bulk Service
                Import
              </h2>

              <p className="mt-1 text-sm text-indigo-50/90">
                Paste complete
                service JSON and
                automatically fill
                every service field.
              </p>
            </div>

            <div className="w-fit rounded-full border border-white/30 bg-white/[0.14] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-xl">
              Quick Import
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <label
            className={
              labelClass
            }
          >
            Service JSON
          </label>

          <textarea
            rows={14}
            value={
              bulkJson
            }
            onChange={(
              e
            ) => {
              setBulkJson(
                e.target.value
              );

              setImportMessage(
                ""
              );

              if (error) {
                setError(
                  ""
                );
              }
            }}
            spellCheck={
              false
            }
            placeholder={`{
  "tag": "",
  "title": "Website Development",
  "slug": "website-development",
  "description": "Service description...",
  "image": "/web-devlopment.png",
  "bannerImage": "/web-development-light.png",
  "darkBannerImage": "/web-development-dark.png",
  "href": "/website-development",
  "gradient": "from-blue-700 to-cyan-300",
  "intro": [],
  "challenges": [],
  "middle": [],
  "benefits": [],
  "closing": "",
  "coverage": [],
  "qa": [],
  "sections": [],
  "order": 0,
  "isActive": true
}`}
            className={`${inputClass} min-h-[300px] resize-y font-mono text-xs leading-6`}
          />

          <p
            className={
              helpClass
            }
          >
            JSON only fills
            the form. Nothing
            is saved to the
            database until you
            click{" "}
            {isEditing
              ? "Save Changes"
              : "Create Service"}
            .
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={
                handleBulkImport
              }
              className="brand-grad rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
            >
              Import & Fill
              All Fields
            </button>

            {bulkJson && (
              <button
                type="button"
                onClick={() => {
                  setBulkJson(
                    ""
                  );

                  setImportMessage(
                    ""
                  );

                  setError(
                    ""
                  );
                }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
              >
                Clear JSON
              </button>
            )}
          </div>

          {importMessage && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              {
                importMessage
              }
            </div>
          )}
        </div>
      </div>

      {/* ========================================
          BASIC INFORMATION
      ======================================== */}

      <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
        <h2 className="flex items-center gap-3 text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
          <span className="brand-grad h-6 w-1.5 shrink-0 rounded-full" />
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Main information
          used on the services
          listing and detail
          page.
        </p>

        <div className="mt-6 space-y-5">
          {/* Tag */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Tag
            </label>

            <input
              type="text"
              value={
                form.tag
              }
              onChange={handleChange(
                "tag"
              )}
              placeholder="e.g. Cloud Services"
              className={
                inputClass
              }
            />
          </div>

          {/* Title */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Title *
            </label>

            <input
              type="text"
              required
              value={
                form.title
              }
              onChange={
                handleTitleChange
              }
              placeholder="Cloud Services"
              className={
                inputClass
              }
            />
          </div>

          {/* Slug */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Slug *
            </label>

            <input
              type="text"
              required
              value={
                form.slug
              }
              onChange={(
                e
              ) =>
                setForm(
                  (
                    prev
                  ) => ({
                    ...prev,

                    slug:
                      generateSlug(
                        e.target
                          .value
                      ),
                  })
                )
              }
              placeholder="cloud-services"
              className={`${inputClass} font-mono`}
            />

            <p
              className={
                helpClass
              }
            >
              Example:
              cloud-services
            </p>
          </div>

          {/* Description */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Description *
            </label>

            <textarea
              required
              rows={5}
              value={
                form.description
              }
              onChange={handleChange(
                "description"
              )}
              placeholder="Short service description..."
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>
      </div>

      {/* ========================================
          MEDIA & URL
      ======================================== */}

      <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
        <h2 className="flex items-center gap-3 text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
          <span className="brand-grad h-6 w-1.5 shrink-0 rounded-full" />
          Media & URL
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Images and public
          URL used by the
          service.
        </p>

        <div className="mt-6 space-y-6">
          {/* Service Image */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Service Card
              Image *
            </label>

            <input
              type="text"
              required
              value={
                form.image
              }
              onChange={handleChange(
                "image"
              )}
              placeholder="/service-grid.png"
              className={
                inputClass
              }
            />

            <p
              className={
                helpClass
              }
            >
              Image displayed
              on the services
              listing page.
            </p>
          </div>

          {/* ======================================
              LIGHT BANNER IMAGE
          ====================================== */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Light Banner
              Image
            </label>

            <div className="rounded-[18px] border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/[0.07] dark:bg-white/[0.02]">
              {lightBannerPreview ? (
                <div className="mb-4 overflow-hidden rounded-[14px] border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-[#060b16]">
                  <img
                    src={
                      lightBannerPreview
                    }
                    alt="Light banner preview"
                    className="h-52 w-full object-contain"
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-40 items-center justify-center rounded-[14px] border border-dashed border-violet-200 bg-white px-4 text-center text-sm text-slate-400 dark:border-white/[0.1] dark:bg-[#060b16]">
                  No light
                  banner selected
                </div>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/avif"
                onChange={
                  handleLightBannerChange
                }
                className="block w-full cursor-pointer rounded-xl border border-slate-200 bg-white text-sm text-slate-500 file:mr-4 file:cursor-pointer file:border-0 file:bg-violet-50 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-violet-700 hover:file:bg-violet-100 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400 dark:file:bg-violet-500/15 dark:file:text-violet-300"
              />
            </div>

            <p
              className={
                helpClass
              }
            >
              Banner displayed
              when website is
              using light
              theme.
            </p>
          </div>

          {/* ======================================
              DARK BANNER IMAGE
          ====================================== */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Dark Banner Image
            </label>

            <div className="rounded-[18px] border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/[0.07] dark:bg-white/[0.02]">
              {darkBannerPreview ? (
                <div className="mb-4 overflow-hidden rounded-[14px] border border-slate-700 bg-slate-950">
                  <img
                    src={
                      darkBannerPreview
                    }
                    alt="Dark banner preview"
                    className="h-52 w-full object-contain"
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-40 items-center justify-center rounded-[14px] border border-dashed border-slate-700 bg-slate-950 px-4 text-center text-sm text-slate-500">
                  No dark
                  banner selected
                </div>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/avif"
                onChange={
                  handleDarkBannerChange
                }
                className="block w-full cursor-pointer rounded-xl border border-slate-200 bg-white text-sm text-slate-500 file:mr-4 file:cursor-pointer file:border-0 file:bg-violet-50 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-violet-700 hover:file:bg-violet-100 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400 dark:file:bg-violet-500/15 dark:file:text-violet-300"
              />
            </div>

            <p
              className={
                helpClass
              }
            >
              Banner displayed
              when website is
              using dark
              theme.
            </p>
          </div>

          {/* Href */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Link (href) *
            </label>

            <input
              type="text"
              required
              value={
                form.href
              }
              onChange={handleChange(
                "href"
              )}
              placeholder="/cloud-services"
              className={
                inputClass
              }
            />

            <p
              className={
                helpClass
              }
            >
              Example:
              /website-development
            </p>
          </div>

          {/* Gradient */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Gradient
            </label>

            <input
              type="text"
              value={
                form.gradient
              }
              onChange={handleChange(
                "gradient"
              )}
              placeholder="from-blue-500 to-cyan-500"
              className={
                inputClass
              }
            />

            <p
              className={
                helpClass
              }
            >
              Optional Tailwind
              gradient classes
              used by the
              service page.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================
          DETAIL PAGE CONTENT
      ======================================== */}

      <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
        <h2 className="flex items-center gap-3 text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
          <span className="brand-grad h-6 w-1.5 shrink-0 rounded-full" />
          Detail Page Content
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Enter one item per
          line for list
          content.
        </p>

        <div className="mt-6 space-y-6">
          {/* Introduction */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Introduction
            </label>

            <textarea
              rows={6}
              value={arrayToText(
                form.intro
              )}
              onChange={handleArrayChange(
                "intro"
              )}
              placeholder={`First introduction paragraph\nSecond introduction paragraph`}
              className={`${inputClass} resize-y`}
            />

            <p
              className={
                helpClass
              }
            >
              One paragraph per
              line.
            </p>
          </div>

          {/* Challenges */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Challenges
            </label>

            <textarea
              rows={6}
              value={arrayToText(
                form.challenges
              )}
              onChange={handleArrayChange(
                "challenges"
              )}
              placeholder={`Challenge one\nChallenge two\nChallenge three`}
              className={`${inputClass} resize-y`}
            />

            <p
              className={
                helpClass
              }
            >
              One challenge per
              line.
            </p>
          </div>

          {/* Middle */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Middle Content
            </label>

            <textarea
              rows={6}
              value={arrayToText(
                form.middle
              )}
              onChange={handleArrayChange(
                "middle"
              )}
              placeholder={`First paragraph\nSecond paragraph`}
              className={`${inputClass} resize-y`}
            />

            <p
              className={
                helpClass
              }
            >
              One paragraph per
              line.
            </p>
          </div>

          {/* Benefits */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Benefits
            </label>

            <textarea
              rows={6}
              value={arrayToText(
                form.benefits
              )}
              onChange={handleArrayChange(
                "benefits"
              )}
              placeholder={`Benefit one\nBenefit two\nBenefit three`}
              className={`${inputClass} resize-y`}
            />

            <p
              className={
                helpClass
              }
            >
              One benefit per
              line.
            </p>
          </div>

          {/* Closing */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Closing Content
            </label>

            <textarea
              rows={6}
              value={
                form.closing
              }
              onChange={handleChange(
                "closing"
              )}
              placeholder="Closing paragraph..."
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Coverage */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Coverage
            </label>

            <textarea
              rows={6}
              value={arrayToText(
                form.coverage
              )}
              onChange={handleArrayChange(
                "coverage"
              )}
              placeholder={`Coverage item one\nCoverage item two`}
              className={`${inputClass} resize-y`}
            />

            <p
              className={
                helpClass
              }
            >
              One coverage item
              per line.
            </p>
          </div>

          {/* QA */}

          <div>
            <label
              className={
                labelClass
              }
            >
              Q&A / Additional
              Points
            </label>

            <textarea
              rows={6}
              value={arrayToText(
                form.qa
              )}
              onChange={handleArrayChange(
                "qa"
              )}
              placeholder={`Question or point one\nQuestion or point two`}
              className={`${inputClass} resize-y`}
            />

            <p
              className={
                helpClass
              }
            >
              One item per line.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================
          CUSTOM SECTIONS
      ======================================== */}

      <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-3 text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
              <span className="brand-grad h-6 w-1.5 shrink-0 rounded-full" />
              Custom Sections
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add title and body
              sections when
              required.
            </p>
          </div>

          <button
            type="button"
            onClick={
              addSection
            }
            className="brand-grad rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5"
          >
            + Add Section
          </button>
        </div>

        {form.sections
          .length === 0 ? (
          <div className="mt-6 rounded-[18px] border border-dashed border-violet-200 bg-violet-50/30 p-8 text-center text-sm text-slate-400 dark:border-white/[0.1] dark:bg-white/[0.02]">
            No custom sections
            added.
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {form.sections.map(
              (
                section,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="rounded-[18px] border border-slate-200/80 bg-slate-50/50 p-5 transition hover:border-violet-200 dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-violet-400/25"
                >
                  <div className="flex items-center justify-between">
                    <p className="brand-text text-[12px] font-extrabold uppercase tracking-[0.16em]">
                      Section{" "}
                      {index +
                        1}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        removeSection(
                          index
                        )
                      }
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 space-y-4">
                    <input
                      type="text"
                      value={
                        section.title
                      }
                      onChange={(
                        e
                      ) =>
                        updateSection(
                          index,
                          "title",
                          e.target
                            .value
                        )
                      }
                      placeholder="Section title"
                      className={
                        inputClass
                      }
                    />

                    <textarea
                      rows={5}
                      value={
                        section.body
                      }
                      onChange={(
                        e
                      ) =>
                        updateSection(
                          index,
                          "body",
                          e.target
                            .value
                        )
                      }
                      placeholder="Section content"
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* ========================================
          DISPLAY SETTINGS
      ======================================== */}

      <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] sm:p-7 dark:border-white/[0.07] dark:bg-[#0b1220]">
        <h2 className="flex items-center gap-3 text-lg font-extrabold tracking-[-0.02em] text-slate-950 dark:text-white">
          <span className="brand-grad h-6 w-1.5 shrink-0 rounded-full" />
          Display Settings
        </h2>

        {/* Display Order */}

        <div className="mt-6">
          <label
            className={
              labelClass
            }
          >
            Display Order
          </label>

          <input
            type="number"
            min={0}
            value={
              form.order
            }
            onChange={(
              e
            ) =>
              setForm(
                (
                  prev
                ) => ({
                  ...prev,

                  order:
                    Number(
                      e.target
                        .value
                    ) || 0,
                })
              )
            }
            className={`${inputClass} max-w-40`}
          />
        </div>

        {/* Active */}

        <div className="mt-6 rounded-[18px] border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/[0.07] dark:bg-white/[0.02]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Active Service
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Inactive services
                can be hidden
                from the public
                website.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm(
                  (
                    prev
                  ) => ({
                    ...prev,

                    isActive:
                      !prev.isActive,
                  })
                )
              }
              aria-pressed={
                form.isActive
              }
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                form.isActive
                  ? "brand-grad shadow-lg shadow-violet-500/25"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  form.isActive
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}

      {/* ========================================
          SUBMIT
      ======================================== */}

      <div className="flex flex-wrap items-center gap-3">
        <RippleButton
          type="submit"
          disabled={
            saving
          }
          className="brand-grad rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Service"}
        </RippleButton>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/services"
            )
          }
          disabled={
            saving
          }
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}