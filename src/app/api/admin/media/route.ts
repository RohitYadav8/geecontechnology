import { NextRequest, NextResponse } from "next/server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { prisma } from "../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../lib/require-admin";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
];

function getFileType(mimeType: string): string {
  if (mimeType.startsWith("image/")) {
    return "IMAGE";
  }

  if (mimeType === "application/pdf") {
    return "DOCUMENT";
  }

  return "OTHER";
}

// =========================================================
// GET MEDIA
// Example:
// /api/admin/media
// /api/admin/media?type=IMAGE
// =========================================================

export async function GET(request: NextRequest) {
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
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");

    const media = await prisma.media.findMany({
      where: type
        ? {
            type,
          }
        : undefined,

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("GET media error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch media.",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================================================
// UPLOAD MEDIA
// =========================================================

export async function POST(request: NextRequest) {
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
    const formData = await request.formData();

    const file = formData.get("file");

    const folderValue = formData.get("folder");

    const altTextValue = formData.get("altText");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        {
          error: "No file provided.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // FILE TYPE VALIDATION
    // -----------------------------------------------------

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload an image or PDF.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // FILE SIZE VALIDATION
    // -----------------------------------------------------

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File size must be less than 10 MB.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // OPTIONAL VALUES
    // -----------------------------------------------------

    const folder =
      typeof folderValue === "string"
        ? folderValue.trim()
        : null;

    const altText =
      typeof altTextValue === "string"
        ? altTextValue.trim()
        : null;

    // -----------------------------------------------------
    // CONVERT FILE TO BUFFER
    // -----------------------------------------------------

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // -----------------------------------------------------
    // CREATE UPLOAD DIRECTORY
    // public/uploads/media
    // -----------------------------------------------------

    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "media"
    );

    await mkdir(uploadsDir, {
      recursive: true,
    });

    // -----------------------------------------------------
    // SAFE FILE NAME
    // -----------------------------------------------------

    const originalName = file.name;

    const sanitizedName = originalName.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );

    const safeName = `${Date.now()}-${randomUUID()}-${sanitizedName}`;

    // -----------------------------------------------------
    // SAVE ACTUAL FILE
    // -----------------------------------------------------

    const filePath = path.join(
      uploadsDir,
      safeName
    );

    await writeFile(filePath, buffer);

    // -----------------------------------------------------
    // PUBLIC URL
    // -----------------------------------------------------

    const mediaUrl = `/uploads/media/${safeName}`;

    // -----------------------------------------------------
    // SAVE MEDIA RECORD
    // -----------------------------------------------------

    const media = await prisma.media.create({
      data: {
        id: randomUUID(),

        fileName: originalName,

        url: mediaUrl,

        type: getFileType(file.type),

        folder: folder || null,

        altText: altText || null,

        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      media,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Media upload error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong during upload.",
      },
      {
        status: 500,
      }
    );
  }
}