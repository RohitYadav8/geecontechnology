import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { slug } = await params;

    if (!slug?.trim()) {
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

    const product =
      await prisma.product.findUnique({
        where: {
          slug: cleanSlug,
        },

        select: {
          id: true,
          title: true,
          slug: true,

          bannerImage: true,
          logoImage: true,

          shortDescription: true,
          description: true,

          cardTagline: true,
          cardSecondaryText: true,

          flipEyebrow: true,
          flipTitle: true,
          flipDescription: true,

          features: true,
          benefits: true,
          sections: true,
          faqs: true,

          brochureUrl: true,

          // IMPORTANT
          brochureGradientFrom: true,
          brochureGradientVia: true,
          brochureGradientTo: true,

          isActive: true,
          order: true,

          createdAt: true,
          updatedAt: true,
        },
      });

    if (!product || !product.isActive) {
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
      "GET public product error:",
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