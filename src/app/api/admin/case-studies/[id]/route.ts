import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "../../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================================================
   GET SINGLE CASE STUDY
========================================================= */

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } = await params;

    const caseStudy = await prisma.caseStudy.findUnique({
      where: {
        id,
      },
    });

    if (!caseStudy) {
      return NextResponse.json(
        {
          error: "Case study not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error(
      "GET admin case study error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch case study",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   UPDATE CASE STUDY
========================================================= */

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } = await params;

    const body = await request.json();

    const {
      title,
      slug,
      clientName,
      industry,
      shortDescription,
      description,
      image,
      challenge,
      solution,
      results,
      technologies,
      projectUrl,
      isActive,
      order,
    } = body;

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          error: "Title is required",
        },
        {
          status: 400,
        }
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
        {
          status: 400,
        }
      );
    }

    if (
      typeof shortDescription !== "string" ||
      !shortDescription.trim()
    ) {
      return NextResponse.json(
        {
          error: "Short description is required",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       CHECK EXISTING CASE STUDY
    ===================================================== */

    const existingCaseStudy =
      await prisma.caseStudy.findUnique({
        where: {
          id,
        },
      });

    if (!existingCaseStudy) {
      return NextResponse.json(
        {
          error: "Case study not found",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       CHECK DUPLICATE SLUG
    ===================================================== */

    const duplicateSlug =
      await prisma.caseStudy.findFirst({
        where: {
          slug: slug.trim(),

          NOT: {
            id,
          },
        },
      });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          error:
            "A case study with this slug already exists",
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       TECHNOLOGIES JSON
    ===================================================== */

    const technologyList: Prisma.InputJsonValue =
      Array.isArray(technologies)
        ? technologies
            .filter(
              (technology): technology is string =>
                typeof technology === "string"
            )
            .map((technology) =>
              technology.trim()
            )
            .filter(Boolean)
        : [];

    /* =====================================================
       UPDATE CASE STUDY
    ===================================================== */

    const caseStudy =
      await prisma.caseStudy.update({
        where: {
          id,
        },

        data: {
          title: title.trim(),

          slug: slug.trim(),

          clientName:
            typeof clientName === "string" &&
            clientName.trim()
              ? clientName.trim()
              : null,

          industry:
            typeof industry === "string" &&
            industry.trim()
              ? industry.trim()
              : null,

          shortDescription:
            shortDescription.trim(),

          description:
            typeof description === "string" &&
            description.trim()
              ? description.trim()
              : null,

          image:
            typeof image === "string" &&
            image.trim()
              ? image.trim()
              : null,

          challenge:
            typeof challenge === "string" &&
            challenge.trim()
              ? challenge.trim()
              : null,

          solution:
            typeof solution === "string" &&
            solution.trim()
              ? solution.trim()
              : null,

          results:
            typeof results === "string" &&
            results.trim()
              ? results.trim()
              : null,

          technologies: technologyList,

          projectUrl:
            typeof projectUrl === "string" &&
            projectUrl.trim()
              ? projectUrl.trim()
              : null,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : true,

          order: Number.isFinite(
            Number(order)
          )
            ? Number(order)
            : 0,
        },
      });

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error(
      "PUT admin case study error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update case study",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE CASE STUDY
========================================================= */

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  const admin = getAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } = await params;

    const existingCaseStudy =
      await prisma.caseStudy.findUnique({
        where: {
          id,
        },
      });

    if (!existingCaseStudy) {
      return NextResponse.json(
        {
          error: "Case study not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.caseStudy.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message:
        "Case study deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE admin case study error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to delete case study",
      },
      {
        status: 500,
      }
    );
  }
}