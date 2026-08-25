import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../../lib/prisma";
import { supabaseAdmin } from "../../../../../../lib/supabase-admin";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

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
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    // ==========================================
    // 1. ADMIN AUTH
    // ==========================================

    const admin = getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // ==========================================
    // 2. GET APPLICATION ID
    // ==========================================

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Application ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // 3. FIND APPLICATION
    // ==========================================

    const application =
      await prisma.application.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          resumeUrl: true,
        },
      });

    if (!application) {
      return NextResponse.json(
        {
          error: "Application not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ==========================================
    // 4. DELETE RESUME FROM SUPABASE
    // ==========================================

    if (
      application.resumeUrl &&
      isSupabaseStoragePath(
        application.resumeUrl
      )
    ) {
      try {
        const bucketName =
          process.env.SUPABASE_RESUME_BUCKET ||
          "resume";

        const { error: storageError } =
          await supabaseAdmin.storage
            .from(bucketName)
            .remove([
              application.resumeUrl,
            ]);

        if (storageError) {
          console.error(
            "Supabase careers resume delete error:",
            storageError
          );
        }
      } catch (storageError) {
        /*
         * Resume cleanup fail hua to application
         * deletion ko block nahi karenge.
         */
        console.error(
          "Supabase careers resume cleanup error:",
          storageError
        );
      }
    }

    // ==========================================
    // 5. DELETE APPLICATION FROM TIDB
    // ==========================================

    await prisma.application.delete({
      where: {
        id,
      },
    });

    // ==========================================
    // 6. SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,
      message:
        "Application deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete application error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}