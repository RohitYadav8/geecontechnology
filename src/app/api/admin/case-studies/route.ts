import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../lib/require-admin";

/* =========================================================
   GET ALL CASE STUDIES
========================================================= */

export async function GET(request: NextRequest) {
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
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: [
        {
          order: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error(
      "GET admin case studies error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch case studies",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   CREATE CASE STUDY
========================================================= */

export async function POST(request: NextRequest) {
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
       CHECK DUPLICATE SLUG
    ===================================================== */

    const existingCaseStudy =
      await prisma.caseStudy.findUnique({
        where: {
          slug: slug.trim(),
        },
      });

    if (existingCaseStudy) {
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
       PREPARE TECHNOLOGIES JSON
    ===================================================== */

    const technologyList = Array.isArray(
      technologies
    )
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
       CREATE CASE STUDY
    ===================================================== */

    const caseStudy =
      await prisma.caseStudy.create({
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

          // Prisma Json field
          // Empty technologies = []
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

          order: Number.isFinite(Number(order))
            ? Number(order)
            : 0,
        },
      });

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(caseStudy, {
      status: 201,
    });
  } catch (error) {
    console.error(
      "POST admin case study error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create case study",
      },
      {
        status: 500,
      }
    );
  }
}