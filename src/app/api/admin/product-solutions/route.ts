import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../lib/require-admin";

type ContentSectionType =
  | "heading"
  | "paragraph"
  | "list";

type ContentSection = {
  type: ContentSectionType;
  title: string;
  content: string;
};

type Benefit = {
  title: string;
  description: string;
};

type HighlightCard = {
  title: string;
  description: string;
};

export async function GET(request: NextRequest) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const solutions =
      await prisma.productSolution.findMany({
        orderBy: [
          { order: "asc" },
          { createdAt: "desc" },
        ],
      });

    return NextResponse.json(solutions);
  } catch (error) {
    console.error(
      "GET product solutions error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch product solutions",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  const admin =
    getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const {
      // Basic
      name,
      slug,
      projectTag,
      cardBackTitle,
      excerpt,

      // Legacy content
      content,

      // Generic content
      contentSections,

      // Benefits
      benefitsTitle,
      benefits,

      // Cards
      highlightCards,

      // Display
      order,
      isActive,

      // Media
      logoImage,
      bannerImage,
      sidebarImage,

      // SEO
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      openGraphImage,
    } = body;

    // =========================================================
    // REQUIRED FIELDS
    // =========================================================

    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return NextResponse.json(
        {
          error: "Name is required",
        },
        { status: 400 }
      );
    }

    if (
      typeof slug !== "string" ||
      !slug.trim()
    ) {
      return NextResponse.json(
        {
          error: "Slug is required",
        },
        { status: 400 }
      );
    }

    // =========================================================
    // NORMALIZE SLUG
    // =========================================================

    const normalizedSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!normalizedSlug) {
      return NextResponse.json(
        {
          error: "Invalid slug",
        },
        { status: 400 }
      );
    }

    // =========================================================
    // DUPLICATE SLUG CHECK
    // =========================================================

    const existingSolution =
      await prisma.productSolution.findUnique({
        where: {
          slug: normalizedSlug,
        },
      });

    if (existingSolution) {
      return NextResponse.json(
        {
          error:
            "A product solution with this slug already exists",
        },
        { status: 409 }
      );
    }

    // =========================================================
    // CONTENT SECTIONS CLEANUP
    // =========================================================

    const allowedSectionTypes:
      ContentSectionType[] = [
      "heading",
      "paragraph",
      "list",
    ];

    const cleanContentSections: ContentSection[] =
      Array.isArray(contentSections)
        ? contentSections
            .filter(
              (
                item
              ): item is ContentSection =>
                Boolean(
                  item &&
                    typeof item === "object"
                )
            )
            .map((item) => {
              const rawType =
                typeof item.type === "string"
                  ? item.type
                  : "paragraph";

              const type: ContentSectionType =
                allowedSectionTypes.includes(
                  rawType as ContentSectionType
                )
                  ? (rawType as ContentSectionType)
                  : "paragraph";

              return {
                type,

                title:
                  typeof item.title ===
                  "string"
                    ? item.title.trim()
                    : "",

                content:
                  typeof item.content ===
                  "string"
                    ? item.content.trim()
                    : "",
              };
            })
            .filter(
              (item) =>
                item.title !== "" ||
                item.content !== ""
            )
        : [];

    // =========================================================
    // BENEFITS CLEANUP
    // =========================================================

    const cleanBenefits: Benefit[] =
      Array.isArray(benefits)
        ? benefits
            .filter(
              (item): item is Benefit =>
                Boolean(
                  item &&
                    typeof item === "object"
                )
            )
            .map((item) => ({
              title:
                typeof item.title ===
                "string"
                  ? item.title.trim()
                  : "",

              description:
                typeof item.description ===
                "string"
                  ? item.description.trim()
                  : "",
            }))
            .filter(
              (item) =>
                item.title !== "" ||
                item.description !== ""
            )
        : [];

    // =========================================================
    // HIGHLIGHT CARDS CLEANUP
    // =========================================================

    const cleanHighlightCards: HighlightCard[] =
      Array.isArray(highlightCards)
        ? highlightCards
            .filter(
              (
                item
              ): item is HighlightCard =>
                Boolean(
                  item &&
                    typeof item === "object"
                )
            )
            .map((item) => ({
              title:
                typeof item.title ===
                "string"
                  ? item.title.trim()
                  : "",

              description:
                typeof item.description ===
                "string"
                  ? item.description.trim()
                  : "",
            }))
            .filter(
              (item) =>
                item.title !== "" ||
                item.description !== ""
            )
        : [];

    // =========================================================
    // ORDER CLEANUP
    // =========================================================

    const parsedOrder =
      typeof order === "number"
        ? order
        : Number(order);

    const cleanOrder =
      Number.isFinite(parsedOrder)
        ? Math.max(
            0,
            Math.trunc(parsedOrder)
          )
        : 0;

    // =========================================================
    // CREATE PRODUCT SOLUTION
    // =========================================================

    const solution =
      await prisma.productSolution.create({
        data: {
          // Basic
          name: name.trim(),

          slug: normalizedSlug,

          projectTag:
            typeof projectTag === "string"
              ? projectTag.trim() || null
              : null,

          cardBackTitle:
            typeof cardBackTitle ===
            "string"
              ? cardBackTitle.trim() ||
                null
              : null,

          excerpt:
            typeof excerpt === "string"
              ? excerpt.trim() || null
              : null,

          // Legacy content
          content:
            typeof content === "string"
              ? content.trim() || null
              : null,

          // Generic content
          contentSections:
            cleanContentSections,

          // Benefits
          benefitsTitle:
            typeof benefitsTitle ===
            "string"
              ? benefitsTitle.trim() ||
                null
              : null,

          benefits:
            cleanBenefits,

          // Highlight cards
          highlightCards:
            cleanHighlightCards,

          // Display
          order: cleanOrder,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : true,

          // Media
          logoImage:
            typeof logoImage === "string"
              ? logoImage.trim() || null
              : null,

          bannerImage:
            typeof bannerImage ===
            "string"
              ? bannerImage.trim() ||
                null
              : null,

          sidebarImage:
            typeof sidebarImage ===
            "string"
              ? sidebarImage.trim() ||
                null
              : null,

          // SEO
          metaTitle:
            typeof metaTitle === "string"
              ? metaTitle.trim() || null
              : null,

          metaDescription:
            typeof metaDescription ===
            "string"
              ? metaDescription.trim() ||
                null
              : null,

          keywords:
            typeof keywords === "string"
              ? keywords.trim() || null
              : null,

          canonicalUrl:
            typeof canonicalUrl ===
            "string"
              ? canonicalUrl.trim() ||
                null
              : null,

          openGraphImage:
            typeof openGraphImage ===
            "string"
              ? openGraphImage.trim() ||
                null
              : null,
        },
      });

    return NextResponse.json(
      solution,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST product solution error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create product solution",
      },
      { status: 500 }
    );
  }
}