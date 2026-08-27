import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function cleanOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.trim();
  return cleaned || null;
}

// ============================================================
// GET SINGLE PRODUCT SOLUTION
// ============================================================

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;

    const solution = await prisma.productSolution.findUnique({
      where: {
        id,
      },
    });

    if (!solution) {
      return NextResponse.json(
        { error: "Product solution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(solution);
  } catch (error) {
    console.error("GET product solution error:", error);

    return NextResponse.json(
      { error: "Failed to fetch product solution" },
      { status: 500 }
    );
  }
}

// ============================================================
// UPDATE PRODUCT SOLUTION
// ============================================================

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    // --------------------------------------------------------
    // Check existing record
    // --------------------------------------------------------

    const existingSolution =
      await prisma.productSolution.findUnique({
        where: {
          id,
        },
      });

    if (!existingSolution) {
      return NextResponse.json(
        { error: "Product solution not found" },
        { status: 404 }
      );
    }

    // --------------------------------------------------------
    // Get values
    // --------------------------------------------------------

    const {
      name,
      slug,
      projectTag,
      cardBackTitle,
      excerpt,
      content,

      contentSections,
      benefitsTitle,
      benefits,
      highlightCards,

      order,
      isActive,

      logoImage,
      bannerImage,
      sidebarImage,

      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      openGraphImage,
    } = body;

    // --------------------------------------------------------
    // Required validation
    // --------------------------------------------------------

    const cleanName =
      typeof name === "string" ? name.trim() : "";

    if (!cleanName) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (
      typeof slug !== "string" ||
      !slug.trim()
    ) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    // --------------------------------------------------------
    // Normalize slug
    // --------------------------------------------------------

    const normalizedSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!normalizedSlug) {
      return NextResponse.json(
        { error: "Please enter a valid slug" },
        { status: 400 }
      );
    }

    // --------------------------------------------------------
    // Duplicate slug
    // --------------------------------------------------------

    const duplicateSlug =
      await prisma.productSolution.findFirst({
        where: {
          slug: normalizedSlug,
          NOT: {
            id,
          },
        },
      });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          error:
            "A product solution with this slug already exists",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------------
    // Order
    // --------------------------------------------------------

    const parsedOrder =
      typeof order === "number"
        ? order
        : Number(order);

    const cleanOrder = Number.isFinite(parsedOrder)
      ? Math.trunc(parsedOrder)
      : 0;

    // --------------------------------------------------------
    // Update
    // --------------------------------------------------------

    const updatedSolution =
      await prisma.productSolution.update({
        where: {
          id,
        },

        data: {
          // Basic
          name: cleanName,
          slug: normalizedSlug,
          projectTag:
            cleanOptionalString(projectTag),
          cardBackTitle:
            cleanOptionalString(cardBackTitle),
          excerpt:
            cleanOptionalString(excerpt),

          // Old content
          content:
            cleanOptionalString(content),

          // Dynamic page content
          contentSections:
            Array.isArray(contentSections)
              ? contentSections
              : [],

          benefitsTitle:
            cleanOptionalString(benefitsTitle),

          benefits:
            Array.isArray(benefits)
              ? benefits
              : [],

          highlightCards:
            Array.isArray(highlightCards)
              ? highlightCards
              : [],

          // Display
          order: cleanOrder,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : existingSolution.isActive,

          // Images
          logoImage:
            cleanOptionalString(logoImage),

          bannerImage:
            cleanOptionalString(bannerImage),

          sidebarImage:
            cleanOptionalString(sidebarImage),

          // SEO
          metaTitle:
            cleanOptionalString(metaTitle),

          metaDescription:
            cleanOptionalString(metaDescription),

          keywords:
            cleanOptionalString(keywords),

          canonicalUrl:
            cleanOptionalString(canonicalUrl),

          openGraphImage:
            cleanOptionalString(openGraphImage),
        },
      });

    return NextResponse.json({
      success: true,
      solution: updatedSolution,
    });
  } catch (error) {
    console.error("PUT product solution error:", error);

    return NextResponse.json(
      {
        error: "Failed to update product solution",
      },
      {
        status: 500,
      }
    );
  }
}

// ============================================================
// DELETE PRODUCT SOLUTION
// ============================================================

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;

    const existingSolution =
      await prisma.productSolution.findUnique({
        where: {
          id,
        },
      });

    if (!existingSolution) {
      return NextResponse.json(
        { error: "Product solution not found" },
        { status: 404 }
      );
    }

    await prisma.productSolution.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product solution deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE product solution error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to delete product solution",
      },
      {
        status: 500,
      }
    );
  }
}