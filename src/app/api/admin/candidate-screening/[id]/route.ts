import { NextResponse } from "next/server";

import { prisma } from "../../../../../../lib/prisma";
import { supabaseAdmin } from "../../../../../../lib/supabase-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function isSupabaseStoragePath(value: string) {
  return (
    !value.startsWith("http://") &&
    !value.startsWith("https://") &&
    !value.startsWith("/uploads/")
  );
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Candidate ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------
    // 1. Candidate find karo
    // -----------------------------------------

    const candidate =
      await prisma.candidateSubmission.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          resumeUrl: true,
        },
      });

    if (!candidate) {
      return NextResponse.json(
        {
          error: "Candidate application not found.",
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------------------
    // 2. Supabase resume delete try karo
    // -----------------------------------------

    if (
      candidate.resumeUrl &&
      isSupabaseStoragePath(candidate.resumeUrl)
    ) {
      try {
        const bucketName =
          process.env.SUPABASE_RESUME_BUCKET ||
          "resume";

        const { error: storageError } =
          await supabaseAdmin.storage
            .from(bucketName)
            .remove([
              candidate.resumeUrl,
            ]);

        if (storageError) {
          // Storage cleanup fail hone par
          // DB delete ko block nahi karenge.
          console.error(
            "Supabase resume delete error:",
            storageError
          );
        }
      } catch (storageError) {
        console.error(
          "Supabase resume cleanup failed:",
          storageError
        );
      }
    }

    // -----------------------------------------
    // 3. Candidate database se delete karo
    // -----------------------------------------

    await prisma.candidateSubmission.delete({
      where: {
        id,
      },
    });

    // -----------------------------------------
    // 4. Success
    // -----------------------------------------

    return NextResponse.json({
      success: true,
      message:
        "Candidate application deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete candidate error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete candidate application.",
      },
      {
        status: 500,
      }
    );
  }
}