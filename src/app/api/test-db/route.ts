import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 AS connected`;

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("DB TEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}