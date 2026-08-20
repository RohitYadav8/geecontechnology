import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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

    const solution =
      await prisma.productSolution.findUnique({
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
    console.error(
      "GET product solution error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to fetch product solution" },
      { status: 500 }
    );
  }
}

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

    const {
      name,
      slug,
      projectTag,
      cardBackTitle,
      excerpt,
      content,
      order,
      isActive,
      logoImage,
      bannerImage,
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      openGraphImage,
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!slug?.trim()) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const normalizedSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

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

    const updatedSolution =
      await prisma.productSolution.update({
        where: {
          id,
        },
        data: {
          name: name.trim(),
          slug: normalizedSlug,

          projectTag: projectTag?.trim() || null,
          cardBackTitle:
            cardBackTitle?.trim() || null,

          excerpt: excerpt?.trim() || null,
          content: content || null,

          order:
            typeof order === "number"
              ? order
              : Number(order) || 0,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : true,

          logoImage: logoImage?.trim() || null,
          bannerImage: bannerImage?.trim() || null,

          metaTitle: metaTitle?.trim() || null,
          metaDescription:
            metaDescription?.trim() || null,
          keywords: keywords?.trim() || null,
          canonicalUrl:
            canonicalUrl?.trim() || null,
          openGraphImage:
            openGraphImage?.trim() || null,
        },
      });

    return NextResponse.json(updatedSolution);
  } catch (error) {
    console.error(
      "PUT product solution error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update product solution" },
      { status: 500 }
    );
  }
}

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
      { error: "Failed to delete product solution" },
      { status: 500 }
    );
  }
}