import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const candidates = await prisma.candidateSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(candidates);
  } catch (error) {
    console.error("GET candidate submissions error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch candidate submissions.",
      },
      { status: 500 }
    );
  }
}