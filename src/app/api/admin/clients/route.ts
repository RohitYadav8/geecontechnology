import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("GET admin clients error:", error);

    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      logo,
      category,
      featured,
      isActive,
      order,
    } = body;

    if (!name?.trim() || !logo?.trim() || !category?.trim()) {
      return NextResponse.json(
        {
          error: "Name, logo and category are required.",
        },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({
      data: {
        name: name.trim(),
        logo: logo.trim(),
        category: category.trim(),
        featured: featured ?? false,
        isActive: isActive ?? true,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(client, {
      status: 201,
    });
  } catch (error) {
    console.error("POST admin client error:", error);

    return NextResponse.json(
      {
        error: "Failed to create client",
      },
      { status: 500 }
    );
  }
}