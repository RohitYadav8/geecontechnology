import { NextRequest, NextResponse } from "next/server";

import { unlink } from "fs/promises";
import path from "path";

import { prisma } from "../../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  // =========================================================
  // ADMIN AUTH
  // =========================================================

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

  try {
    const { id } = await params;

    // =========================================================
    // FIND MEDIA
    // =========================================================

    const media = await prisma.media.findUnique({
      where: {
        id,
      },
    });

    if (!media) {
      return NextResponse.json(
        {
          error: "Media file not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =========================================================
    // CHECK IF MEDIA IS USED BY A CLIENT
    // =========================================================

    const clientUsingMedia = await prisma.client.findFirst({
      where: {
        logo: media.url,
      },

      select: {
        id: true,
        name: true,
      },
    });

    if (clientUsingMedia) {
      return NextResponse.json(
        {
          error: `This image is currently being used by client "${clientUsingMedia.name}". Remove or change the client logo before deleting this media file.`,
        },
        {
          status: 409,
        }
      );
    }

    // =========================================================
    // DELETE PHYSICAL FILE
    // =========================================================

    try {
      const relativePath = media.url.replace(/^\/+/, "");

      const filePath = path.join(
        process.cwd(),
        "public",
        relativePath
      );

      await unlink(filePath);
    } catch (fileError) {
      /*
       * If the physical file is already missing,
       * we still allow the database record to be deleted.
       */
      console.warn(
        "Physical media file could not be deleted:",
        fileError
      );
    }

    // =========================================================
    // DELETE DATABASE RECORD
    // =========================================================

    await prisma.media.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Media deleted successfully.",
    });
  } catch (error) {
    console.error("Delete media error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while deleting media.",
      },
      {
        status: 500,
      }
    );
  }
}