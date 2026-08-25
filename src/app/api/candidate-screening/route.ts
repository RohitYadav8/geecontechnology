import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { supabaseAdmin } from "../../../../lib/supabase-admin";

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

    /* =====================================================
       HELPER
    ===================================================== */

    const getValue = (
      name: string
    ) => {
      const value =
        formData.get(name);

      return typeof value === "string"
        ? value.trim()
        : "";
    };

    /* =====================================================
       FORM VALUES
    ===================================================== */

    const fullName =
      getValue("fullName");

    const email =
      getValue("email");

    const phone =
      getValue("phone");

    const dob =
      getValue("dob");

    const qualification =
      getValue("qualification");

    const qualificationYear =
      getValue(
        "qualificationYear"
      );

    const pursuingDegree =
      getValue(
        "pursuingDegree"
      );

    const position =
      getValue("position");

    const totalExperience =
      getValue(
        "totalExperience"
      );

    const relevantExperience =
      getValue(
        "relevantExperience"
      );

    const currentLocation =
      getValue(
        "currentLocation"
      );

    const relocate =
      getValue("relocate");

    const travelAbroad =
      getValue("travelAbroad");

    const passport =
      getValue("passport");

    const visa =
      getValue("visa");

    const currentlyWorking =
      getValue(
        "currentlyWorking"
      );

    const reasonForChange =
      getValue(
        "reasonForChange"
      );

    const currentCtc =
      getValue("currentCtc");

    const inHandSalary =
      getValue(
        "inHandSalary"
      );

    const expectedCtc =
      getValue("expectedCtc");

    const expectedInHand =
      getValue(
        "expectedInHand"
      );

    const noticePeriod =
      getValue("noticePeriod");

    const earliestJoinDate =
      getValue(
        "earliestJoinDate"
      );

    const dependents =
      getValue("dependents");

    const readyOnCurrentCtc =
      getValue(
        "readyOnCurrentCtc"
      );

    const resume =
      formData.get("resume");

    /* =====================================================
       REQUIRED FIELDS
    ===================================================== */

    if (!fullName) {
      return NextResponse.json(
        {
          error:
            "Full name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          error:
            "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          error:
            "Phone number is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
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
            "Resume is required.",
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
            "Resume size must be less than 5 MB.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       FILE EXTENSION
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
            "Please upload your resume in PDF, DOC, or DOCX format.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       MIME TYPE
    ===================================================== */

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
       UNIQUE STORAGE PATH
    ===================================================== */

    const safeOriginalName =
      sanitizeFileName(
        resume.name
      );

    const uniqueId =
      crypto.randomUUID();

    const filePath =
      `candidate-screening/${Date.now()}-${uniqueId}-${safeOriginalName}`;

    /* =====================================================
       FILE → BUFFER
    ===================================================== */

    const arrayBuffer =
      await resume.arrayBuffer();

    const buffer =
      Buffer.from(arrayBuffer);

    /* =====================================================
       UPLOAD RESUME TO SUPABASE
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
        "Candidate resume upload error:",
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
       SAVE CANDIDATE IN TIDB
    ===================================================== */

    const candidate =
      await prisma.candidateSubmission.create({
        data: {
          fullName,

          email:
            email.toLowerCase(),

          phone,

          dob: dob || null,

          qualification:
            qualification || null,

          qualificationYear:
            qualificationYear ||
            null,

          pursuingDegree:
            pursuingDegree ||
            null,

          position:
            position || null,

          totalExperience:
            totalExperience ||
            null,

          relevantExperience:
            relevantExperience ||
            null,

          currentLocation:
            currentLocation ||
            null,

          relocate:
            relocate || null,

          travelAbroad:
            travelAbroad || null,

          passport:
            passport || null,

          visa:
            visa || null,

          currentlyWorking:
            currentlyWorking ||
            null,

          reasonForChange:
            reasonForChange ||
            null,

          currentCtc:
            currentCtc || null,

          inHandSalary:
            inHandSalary || null,

          expectedCtc:
            expectedCtc || null,

          expectedInHand:
            expectedInHand ||
            null,

          noticePeriod:
            noticePeriod || null,

          earliestJoinDate:
            earliestJoinDate ||
            null,

          dependents:
            dependents || null,

          readyOnCurrentCtc:
            readyOnCurrentCtc ||
            null,

          /*
           * Private Supabase bucket.
           * Public URL nahi save kar rahe.
           *
           * Example:
           * candidate-screening/xxx-resume.pdf
           */
          resumeUrl:
            uploadedResumePath,
        },
      });

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Candidate application submitted successfully.",

        candidate: {
          id: candidate.id,
          fullName:
            candidate.fullName,
          email:
            candidate.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Candidate submission error:",
      error
    );

    /* =====================================================
       CLEANUP

       Supabase upload successful ho gaya
       but TiDB save fail hua to resume delete.
    ===================================================== */

    if (
      uploadedResumePath
    ) {
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
          "Candidate resume cleanup error:",
          cleanupError
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "Failed to submit candidate application.",
      },
      {
        status: 500,
      }
    );
  }
}