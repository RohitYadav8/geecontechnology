import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../lib/require-admin";

// ============================================================
// GET ALL SERVICES
// ============================================================

export async function GET(request: NextRequest) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const services = await prisma.service.findMany({
      orderBy: [
        {
          order: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Get services error:", error);

    return NextResponse.json(
      { error: "Failed to fetch services." },
      { status: 500 }
    );
  }
}

// ============================================================
// CREATE SERVICE
// ============================================================

export async function POST(request: NextRequest) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
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
    // DUPLICATE SLUG
    // --------------------------------------------------------

    const existingService =
      await prisma.service.findUnique({
        where: {
          slug: cleanSlug,
        },
      });

    if (existingService) {
      return NextResponse.json(
        {
          error:
            "A service with this slug already exists.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------------
    // CREATE
    // --------------------------------------------------------

    const service =
      await prisma.service.create({
        data: {
          tag: cleanTag,
          title: cleanTitle,
          slug: cleanSlug,
          description: cleanDescription,

          image: cleanImage,
          bannerImage:
            cleanBannerImage,
          href: cleanHref,
          gradient:
            cleanGradient,

          intro:
            intro ?? null,

          challenges:
            challenges ?? null,

          middle:
            middle ?? null,

          benefits:
            benefits ?? null,

          closing:
            cleanClosing,

          coverage:
            coverage ?? null,

          qa:
            qa ?? null,

          sections:
            sections ?? null,

          order:
            typeof order === "number" &&
            Number.isFinite(order)
              ? Math.trunc(order)
              : 0,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        service,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Create service error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while creating the service.",
      },
      {
        status: 500,
      }
    );
  }
}