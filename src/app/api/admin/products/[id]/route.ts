import { NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

import { prisma } from "../../../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function cleanOptionalString(value: unknown) {
  return typeof value === "string" && value.trim()
    ? value.trim()
    : null;
}

function cleanJson(
  value: unknown
): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput {
  if (value === undefined || value === null) {
    return Prisma.DbNull;
  }

  return value as Prisma.InputJsonValue;
}

/* =========================================================
   GET SINGLE PRODUCT
========================================================= */

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const product =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!product) {
      return NextResponse.json(
        {
          error: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(
      "GET admin product error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch product",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   UPDATE PRODUCT
========================================================= */

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

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
          error: "Product title is required",
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
          error: "Product slug is required",
        },
        {
          status: 400,
        }
      );
    }

    const cleanSlug = slug
      .trim()
      .toLowerCase();

    /* -----------------------------------------------------
       Existing product
    ----------------------------------------------------- */

    const existingProduct =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!existingProduct) {
      return NextResponse.json(
        {
          error: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    /* -----------------------------------------------------
       Duplicate slug check
    ----------------------------------------------------- */

    const slugProduct =
      await prisma.product.findFirst({
        where: {
          slug: cleanSlug,

          NOT: {
            id,
          },
        },
      });

    if (slugProduct) {
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
       Update
    ----------------------------------------------------- */

    const product =
      await prisma.product.update({
        where: {
          id,
        },

        data: {
          title: title.trim(),

          slug: cleanSlug,

          /* MEDIA */

          bannerImage:
            cleanOptionalString(
              bannerImage
            ),

          logoImage:
            cleanOptionalString(
              logoImage
            ),

          /* BASIC */

          shortDescription:
            cleanOptionalString(
              shortDescription
            ),

          description:
            cleanOptionalString(
              description
            ),

          /* FRONT CARD */

          cardTagline:
            cleanOptionalString(
              cardTagline
            ),

          cardSecondaryText:
            cleanOptionalString(
              cardSecondaryText
            ),

          /* FLIP CARD */

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

          /* DETAIL CONTENT */

          features:
            cleanJson(features),

          benefits:
            cleanJson(benefits),

          sections:
            cleanJson(sections),

          faqs:
            cleanJson(faqs),

          brochureUrl:
            cleanOptionalString(
              brochureUrl
            ),

          /* BROCHURE GRADIENT */

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

          /* DISPLAY */

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

    return NextResponse.json(product);
  } catch (error) {
    console.error(
      "PUT admin product error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update product",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE PRODUCT
========================================================= */

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const existingProduct =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!existingProduct) {
      return NextResponse.json(
        {
          error: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE admin product error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to delete product",
      },
      {
        status: 500,
      }
    );
  }
}