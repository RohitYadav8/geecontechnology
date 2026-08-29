import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        {
          order: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        image: true,
        href: true,
        order: true,
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Public services error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch services.",
      },
      {
        status: 500,
      }
    );
  }
}