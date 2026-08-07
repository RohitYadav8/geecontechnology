import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// UPDATE CLIENT
export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const clientId = Number(id);

    if (!Number.isInteger(clientId)) {
      return NextResponse.json(
        { error: "Invalid client ID" },
        { status: 400 }
      );
    }

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

    const client = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        name: name.trim(),
        logo: logo.trim(),
        category: category.trim(),
        featured: featured ?? false,
        isActive: isActive ?? true,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("PUT client error:", error);

    return NextResponse.json(
      {
        error: "Failed to update client",
      },
      { status: 500 }
    );
  }
}

// DELETE CLIENT
export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const clientId = Number(id);

    if (!Number.isInteger(clientId)) {
      return NextResponse.json(
        { error: "Invalid client ID" },
        { status: 400 }
      );
    }

    await prisma.client.delete({
      where: {
        id: clientId,
      },
    });

    return NextResponse.json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("DELETE client error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete client",
      },
      { status: 500 }
    );
  }
}