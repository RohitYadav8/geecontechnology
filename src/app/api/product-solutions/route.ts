import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const productSolutions =
      await prisma.productSolution.findMany({
        where: {
          isActive: true,
        },
        orderBy: [
          {
            order: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
        select: {
          id: true,
          name: true,
          slug: true,
          projectTag: true,
          cardBackTitle: true,
          excerpt: true,
          logoImage: true,
          bannerImage: true,
          order: true,
        },
      });

    return NextResponse.json(productSolutions);
  } catch (error) {
    console.error(
      "GET public product solutions error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch product solutions",
      },
      {
        status: 500,
      }
    );
  }
}