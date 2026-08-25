import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import { supabaseAdmin } from "../../../../../lib/supabase-admin";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
];

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

function getFileExtension(fileName: string) {
  return (
    fileName
      .split(".")
      .pop()
      ?.toLowerCase() || ""
  );
}

export async function POST(
  request: NextRequest
) {
  let uploadedResumePath: string | null =
    null;

  try {
    const formData =
      await request.formData();

    const firstName =
      formData.get("firstName");

    const lastName =
      formData.get("lastName");

    const email =
      formData.get("email");

    const phone =
      formData.get("phone");

    const openingId =
      formData.get("openingId");

    const resume =
      formData.get("resume");

    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    if (
      typeof firstName !== "string" ||
      !firstName.trim() ||
      typeof lastName !== "string" ||
      !lastName.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof phone !== "string" ||
      !phone.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Please fill in all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        email.trim()
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       RESUME REQUIRED
    ===================================================== */

    if (
      !(resume instanceof File) ||
      resume.size === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Please upload your resume.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       FILE SIZE
    ===================================================== */

    if (
      resume.size >
      MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          error:
            "Resume must be smaller than 5 MB.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       FILE TYPE
    ===================================================== */

    const extension =
      getFileExtension(
        resume.name
      );

    if (
      !ALLOWED_EXTENSIONS.includes(
        extension
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Only PDF, DOC and DOCX files are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      resume.type &&
      !ALLOWED_MIME_TYPES.includes(
        resume.type
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid resume file type.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       SUPABASE BUCKET
    ===================================================== */

    const bucketName =
      process.env
        .SUPABASE_RESUME_BUCKET ||
      "resume";

    /* =====================================================
       UNIQUE FILE NAME
    ===================================================== */

    const safeOriginalName =
      sanitizeFileName(
        resume.name
      );

    const uniquePart =
      crypto.randomUUID();

    const filePath =
      `careers/${Date.now()}-${uniquePart}-${safeOriginalName}`;

    /* =====================================================
       FILE → BUFFER
    ===================================================== */

    const arrayBuffer =
      await resume.arrayBuffer();

    const buffer =
      Buffer.from(arrayBuffer);

    /* =====================================================
       UPLOAD TO SUPABASE
    ===================================================== */

    const {
      data: uploadData,
      error: uploadError,
    } =
      await supabaseAdmin.storage
        .from(bucketName)
        .upload(
          filePath,
          buffer,
          {
            contentType:
              resume.type ||
              "application/octet-stream",

            upsert: false,
          }
        );

    if (
      uploadError ||
      !uploadData
    ) {
      console.error(
        "Supabase resume upload error:",
        uploadError
      );

      return NextResponse.json(
        {
          error:
            "Failed to upload resume. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    uploadedResumePath =
      uploadData.path;

    /* =====================================================
       SAVE APPLICATION TO TIDB
    ===================================================== */

    const application =
      await prisma.application.create({
        data: {
          firstName:
            firstName.trim(),

          lastName:
            lastName.trim(),

          email:
            email
              .trim()
              .toLowerCase(),

          phone:
            phone.trim(),

          /*
           * Important:
           * Private bucket hai.
           *
           * Isliye public URL save nahi kar rahe.
           * Sirf Supabase storage path save hoga.
           *
           * Example:
           * careers/172456...-resume.pdf
           */
          resumeUrl:
            uploadedResumePath,

          openingId:
            typeof openingId ===
              "string" &&
            openingId.trim()
              ? openingId.trim()
              : null,
        },
      });

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Application submitted successfully.",

        id: application.id,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Career application error:",
      error
    );

    /*
     * Agar Supabase upload ho gaya
     * but TiDB save fail ho gaya,
     * orphan resume delete kar do.
     */

    if (uploadedResumePath) {
      try {
        const bucketName =
          process.env
            .SUPABASE_RESUME_BUCKET ||
          "resume";

        await supabaseAdmin.storage
          .from(bucketName)
          .remove([
            uploadedResumePath,
          ]);
      } catch (
        cleanupError
      ) {
        console.error(
          "Resume cleanup error:",
          cleanupError
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}