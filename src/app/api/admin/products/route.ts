import {
  NextRequest,
  NextResponse,
} from "next/server";

import { Prisma } from "@prisma/client";

import { prisma } from "../../../../../lib/prisma";

function cleanOptionalString(value: unknown) {
  return typeof value === "string" &&
    value.trim()
    ? value.trim()
    : null;
}

function cleanJson(
  value: unknown
):
  | Prisma.InputJsonValue
  | Prisma.NullableJsonNullValueInput {
  if (
    value === undefined ||
    value === null
  ) {
    return Prisma.DbNull;
  }

  return value as Prisma.InputJsonValue;
}

/* =========================================================
   GET ALL PRODUCTS
========================================================= */

export async function GET() {
  try {
    const products =
      await prisma.product.findMany({
        orderBy: [
          {
            order: "asc",
          },
          {
            createdAt: "desc",
          },
        ],
      });

    return NextResponse.json(products);
  } catch (error) {
    console.error(
      "GET products error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   CREATE PRODUCT
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const {
      title,
      slug,

      bannerImage,
      logoImage,

      shortDescription,
      description,

      cardTagline,
      cardSecondaryText,

      flipEyebrow,
      flipTitle,
      flipDescription,

      features,
      benefits,
      sections,
      faqs,

      brochureUrl,

      // Brochure gradient
      brochureGradientFrom,
      brochureGradientVia,
      brochureGradientTo,

      isActive,
      order,
    } = body;

    /* -----------------------------------------------------
       Validation
    ----------------------------------------------------- */

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Product title is required",
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
          error:
            "Product slug is required",
        },
        {
          status: 400,
        }
      );
    }

    const cleanTitle =
      title.trim();

    const cleanSlug = slug
      .trim()
      .toLowerCase();

    /* -----------------------------------------------------
       Duplicate slug
    ----------------------------------------------------- */

    const existingProduct =
      await prisma.product.findUnique({
        where: {
          slug: cleanSlug,
        },
      });

    if (existingProduct) {
      return NextResponse.json(
        {
          error:
            "A product with this slug already exists",
        },
        {
          status: 409,
        }
      );
    }

    /* -----------------------------------------------------
       Create
    ----------------------------------------------------- */

    const product =
      await prisma.product.create({
        data: {
          title: cleanTitle,

          slug: cleanSlug,

          /* =========================
             MEDIA
          ========================= */

          bannerImage:
            cleanOptionalString(
              bannerImage
            ),

          logoImage:
            cleanOptionalString(
              logoImage
            ),

          /* =========================
             BASIC CONTENT
          ========================= */

          shortDescription:
            cleanOptionalString(
              shortDescription
            ),

          description:
            cleanOptionalString(
              description
            ),

          /* =========================
             FRONT CARD
          ========================= */

          cardTagline:
            cleanOptionalString(
              cardTagline
            ),

          cardSecondaryText:
            cleanOptionalString(
              cardSecondaryText
            ),

          /* =========================
             FLIP CARD
          ========================= */

          flipEyebrow:
            cleanOptionalString(
              flipEyebrow
            ),

          flipTitle:
            cleanOptionalString(
              flipTitle
            ),

          flipDescription:
            cleanOptionalString(
              flipDescription
            ),

          /* =========================
             DETAIL PAGE JSON
          ========================= */

          features:
            cleanJson(features),

          benefits:
            cleanJson(benefits),

          sections:
            cleanJson(sections),

          faqs:
            cleanJson(faqs),

          /* =========================
             BROCHURE
          ========================= */

          brochureUrl:
            cleanOptionalString(
              brochureUrl
            ),

          brochureGradientFrom:
            cleanOptionalString(
              brochureGradientFrom
            ),

          brochureGradientVia:
            cleanOptionalString(
              brochureGradientVia
            ),

          brochureGradientTo:
            cleanOptionalString(
              brochureGradientTo
            ),

          /* =========================
             DISPLAY
          ========================= */

          isActive:
            typeof isActive ===
            "boolean"
              ? isActive
              : true,

          order: Number.isFinite(
            Number(order)
          )
            ? Number(order)
            : 0,
        },
      });

    return NextResponse.json(
      product,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST product error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}