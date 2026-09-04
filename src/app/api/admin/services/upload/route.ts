import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { getAdminFromRequest } from "../../../../../../lib/require-admin";

const MAX_FILE_SIZE = 8 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

function createSafeFileName(originalName: string) {
  const extension =
    path.extname(originalName).toLowerCase() || ".png";

  const baseName = path
    .basename(originalName, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const uniqueId = `${Date.now()}-${crypto
    .randomUUID()
    .slice(0, 8)}`;

  return `${baseName || "service-banner"}-${uniqueId}${extension}`;
}

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

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Please select an image.",
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Only JPG, PNG, WEBP and AVIF images are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Image must be smaller than 8MB.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "services"
    );

    await mkdir(uploadDirectory, {
      recursive: true,
    });

    const fileName = createSafeFileName(file.name);

    const filePath = path.join(
      uploadDirectory,
      fileName
    );

    await writeFile(filePath, buffer);

    const publicUrl =
      `/uploads/services/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error(
      "Service banner upload error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while uploading the image.",
      },
      {
        status: 500,
      }
    );
  }
}