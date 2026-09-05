import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "../../../../../lib/prisma";
import { supabaseAdmin } from "../../../../../lib/supabase-admin";
import { sendMail } from "../../../../../lib/mailer";

const MAX_FILE_SIZE =
  5 * 1024 * 1024;

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

function sanitizeFileName(
  fileName: string
) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(
      /[^a-zA-Z0-9._-]/g,
      ""
    );
}

function getFileExtension(
  fileName: string
) {
  return (
    fileName
      .split(".")
      .pop()
      ?.toLowerCase() || ""
  );
}

function escapeHtml(
  value: string
) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(
  request: NextRequest
) {
  let uploadedResumePath:
    | string
    | null = null;

  try {
    /* =====================================================
       FORM DATA
    ===================================================== */

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
      typeof firstName !==
        "string" ||
      !firstName.trim() ||
      typeof lastName !==
        "string" ||
      !lastName.trim() ||
      typeof email !==
        "string" ||
      !email.trim() ||
      typeof phone !==
        "string" ||
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
       CLEAN VALUES
    ===================================================== */

    const cleanFirstName =
      firstName.trim();

    const cleanLastName =
      lastName.trim();

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    const cleanPhone =
      phone.trim();

    const cleanOpeningId =
      typeof openingId ===
        "string" &&
      openingId.trim()
        ? openingId.trim()
        : null;

    /* =====================================================
       JOB OPENING
    ===================================================== */

    let openingTitle:
      | string
      | null = null;

    if (cleanOpeningId) {
      const opening =
        await prisma.jobOpening.findUnique(
          {
            where: {
              id: cleanOpeningId,
            },

            select: {
              id: true,
              title: true,
            },
          }
        );

      if (!opening) {
        return NextResponse.json(
          {
            error:
              "Job opening not found.",
          },
          {
            status: 404,
          }
        );
      }

      openingTitle =
        opening.title;
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
            cleanFirstName,

          lastName:
            cleanLastName,

          email:
            cleanEmail,

          phone:
            cleanPhone,

          /*
           * Private bucket hai.
           *
           * Public URL save nahi
           * kar rahe.
           *
           * Sirf Supabase storage
           * path save hoga.
           */

          resumeUrl:
            uploadedResumePath,

          openingId:
            cleanOpeningId,
        },
      });

    /* =====================================================
       SEND EMAIL TO ADMIN
    ===================================================== */

    try {
      const mailTo =
        process.env.MAIL_TO ||
        process.env.SMTP_USER;

      if (!mailTo) {
        throw new Error(
          "MAIL_TO or SMTP_USER is missing."
        );
      }

      const fullName =
        `${cleanFirstName} ${cleanLastName}`;

      const safeName =
        escapeHtml(fullName);

      const safeEmail =
        escapeHtml(cleanEmail);

      const safePhone =
        escapeHtml(cleanPhone);

      const safeOpening =
        escapeHtml(
          openingTitle ||
            "General Application"
        );

      await sendMail({
        to: mailTo,

        replyTo:
          cleanEmail,

        subject:
          `New Career Application - ${openingTitle || fullName}`,

        attachments: [
          {
            filename:
              safeOriginalName,

            content:
              buffer,

            contentType:
              resume.type ||
              "application/octet-stream",
          },
        ],

        html: `
          <div
            style="
              margin: 0;
              padding: 30px;
              background: #f8fafc;
              font-family: Arial, Helvetica, sans-serif;
            "
          >
            <div
              style="
                max-width: 620px;
                margin: 0 auto;
                overflow: hidden;
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
              "
            >
              <div
                style="
                  padding: 22px 26px;
                  background: #0f172a;
                  color: #ffffff;
                "
              >
                <h2
                  style="
                    margin: 0;
                    font-size: 20px;
                  "
                >
                  New Career Application
                </h2>
              </div>

              <div
                style="
                  padding: 26px;
                  color: #334155;
                "
              >
                <p
                  style="
                    margin: 0 0 22px;
                    font-size: 14px;
                    line-height: 1.7;
                  "
                >
                  A new career application has been submitted from the website.
                </p>

                <table
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 14px;
                  "
                >
                  <tr>
                    <td
                      style="
                        width: 150px;
                        padding: 10px 0;
                        font-weight: 600;
                      "
                    >
                      Candidate
                    </td>

                    <td
                      style="
                        padding: 10px 0;
                      "
                    >
                      ${safeName}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        font-weight: 600;
                      "
                    >
                      Email
                    </td>

                    <td
                      style="
                        padding: 10px 0;
                      "
                    >
                      ${safeEmail}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        font-weight: 600;
                      "
                    >
                      Phone
                    </td>

                    <td
                      style="
                        padding: 10px 0;
                      "
                    >
                      ${safePhone}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        font-weight: 600;
                      "
                    >
                      Job Opening
                    </td>

                    <td
                      style="
                        padding: 10px 0;
                      "
                    >
                      ${safeOpening}
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    margin: 24px 0 0;
                    font-size: 13px;
                    line-height: 1.6;
                    color: #64748b;
                  "
                >
                  The candidate's resume is attached to this email.
                </p>
              </div>
            </div>
          </div>
        `,
      });

      console.log(
        "Career application email sent successfully."
      );
    } catch (mailError) {
      /*
       * Mail fail hone se application
       * delete nahi hogi.
       *
       * DB + Supabase submission
       * successful rahegi.
       */

      console.error(
        "Career application email error:",
        mailError
      );
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Application submitted successfully.",

        id:
          application.id,
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