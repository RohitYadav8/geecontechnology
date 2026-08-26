import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// ============================================================
// GET SINGLE SERVICE
// ============================================================

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const service = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Get service error:", error);

    return NextResponse.json(
      { error: "Failed to fetch service." },
      { status: 500 }
    );
  }
}

// ============================================================
// UPDATE SERVICE
// ============================================================

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const body = await request.json();

    const {
      tag,
      title,
      slug,
      description,

      image,
      bannerImage,
      href,
      gradient,

      intro,
      challenges,
      middle,
      benefits,
      closing,
      coverage,
      qa,
      sections,

      order,
      isActive,
    } = body;

    // --------------------------------------------------------
    // CHECK EXISTING SERVICE
    // --------------------------------------------------------

    const existingService = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!existingService) {
      return NextResponse.json(
        { error: "Service not found." },
        { status: 404 }
      );
    }

    // --------------------------------------------------------
    // CLEAN VALUES
    // --------------------------------------------------------

    const cleanTitle =
      typeof title === "string"
        ? title.trim()
        : "";

    const cleanSlug =
      typeof slug === "string"
        ? slug
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
        : "";

    const cleanDescription =
      typeof description === "string"
        ? description.trim()
        : "";

    const cleanImage =
      typeof image === "string"
        ? image.trim()
        : "";

    const cleanBannerImage =
      typeof bannerImage === "string" &&
      bannerImage.trim()
        ? bannerImage.trim()
        : null;

    const cleanHref =
      typeof href === "string"
        ? href.trim()
        : "";

    const cleanTag =
      typeof tag === "string" &&
      tag.trim()
        ? tag.trim()
        : null;

    const cleanGradient =
      typeof gradient === "string" &&
      gradient.trim()
        ? gradient.trim()
        : null;

    const cleanClosing =
      typeof closing === "string" &&
      closing.trim()
        ? closing.trim()
        : null;

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!cleanTitle) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    if (!cleanSlug) {
      return NextResponse.json(
        { error: "Slug is required." },
        { status: 400 }
      );
    }

    if (!cleanDescription) {
      return NextResponse.json(
        { error: "Description is required." },
        { status: 400 }
      );
    }

    if (!cleanImage) {
      return NextResponse.json(
        { error: "Image is required." },
        { status: 400 }
      );
    }

    if (!cleanHref) {
      return NextResponse.json(
        { error: "Href is required." },
        { status: 400 }
      );
    }

    // --------------------------------------------------------
    // DUPLICATE SLUG CHECK
    // --------------------------------------------------------

    const serviceWithSameSlug =
      await prisma.service.findUnique({
        where: {
          slug: cleanSlug,
        },
      });

    if (
      serviceWithSameSlug &&
      serviceWithSameSlug.id !== id
    ) {
      return NextResponse.json(
        {
          error:
            "Another service with this slug already exists.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------------
    // UPDATE
    // --------------------------------------------------------

    const service = await prisma.service.update({
      where: {
        id,
      },

      data: {
        tag: cleanTag,

        title: cleanTitle,

        slug: cleanSlug,

        description: cleanDescription,

        image: cleanImage,

        bannerImage: cleanBannerImage,

        href: cleanHref,

        gradient: cleanGradient,

        intro:
          intro !== undefined
            ? intro
            : existingService.intro,

        challenges:
          challenges !== undefined
            ? challenges
            : existingService.challenges,

        middle:
          middle !== undefined
            ? middle
            : existingService.middle,

        benefits:
          benefits !== undefined
            ? benefits
            : existingService.benefits,

        closing: cleanClosing,

        coverage:
          coverage !== undefined
            ? coverage
            : existingService.coverage,

        qa:
          qa !== undefined
            ? qa
            : existingService.qa,

        sections:
          sections !== undefined
            ? sections
            : existingService.sections,

        order:
          typeof order === "number" &&
          Number.isFinite(order)
            ? Math.trunc(order)
            : existingService.order,

        isActive:
          typeof isActive === "boolean"
            ? isActive
            : existingService.isActive,
      },
    });

    return NextResponse.json({
      success: true,
      service,
    });
  } catch (error) {
    console.error(
      "Update service error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while updating the service.",
      },
      {
        status: 500,
      }
    );
  }
}

// ============================================================
// DELETE SERVICE
// ============================================================

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const existingService = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!existingService) {
      return NextResponse.json(
        { error: "Service not found." },
        { status: 404 }
      );
    }

    await prisma.service.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete service error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while deleting the service.",
      },
      {
        status: 500,
      }
    );
  }
}