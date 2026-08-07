import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Candidate ID is required." },
        { status: 400 }
      );
    }

    await prisma.candidateSubmission.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Candidate application deleted successfully.",
    });
  } catch (error) {
    console.error("Delete candidate error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete candidate application.",
      },
      { status: 500 }
    );
  }
}