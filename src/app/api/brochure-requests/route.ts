import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "../../../../lib/prisma";
import { sendMail } from "../../../../lib/mailer";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      company,
      website,
      productId,
    } = body;

    /* =========================================================
       VALIDATION
    ========================================================= */

    if (
      !name?.trim() ||
      !phone?.trim() ||
      !email?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Name, phone and email are required.",
        },
        { status: 400 }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    /* =========================================================
       PRODUCT CHECK
    ========================================================= */

    let productTitle: string | null = null;

    if (productId) {
      const product =
        await prisma.product.findUnique({
          where: {
            id: productId,
          },

          select: {
            id: true,
            title: true,
          },
        });

      if (!product) {
        return NextResponse.json(
          {
            error: "Product not found.",
          },
          { status: 404 }
        );
      }

      productTitle = product.title;
    }

    /* =========================================================
       SAVE BROCHURE REQUEST
    ========================================================= */

    const brochureRequest =
      await prisma.brochureRequest.create({
        data: {
          name: name.trim(),

          phone: phone.trim(),

          email: email
            .trim()
            .toLowerCase(),

          company:
            company?.trim() || null,

          website:
            website?.trim() || null,

          productId:
            productId || null,
        },
      });

    /* =========================================================
       SEND EMAIL
    ========================================================= */

    try {
      const mailTo =
        process.env.MAIL_TO ||
        process.env.SMTP_USER;

      if (!mailTo) {
        throw new Error(
          "MAIL_TO or SMTP_USER is missing."
        );
      }

      const safeName = name.trim();

      const safePhone = phone.trim();

      const safeEmail = email
        .trim()
        .toLowerCase();

      const safeCompany =
        company?.trim() || "Not provided";

      const safeWebsite =
        website?.trim() || "Not provided";

      const safeProduct =
        productTitle || "Not specified";

      await sendMail({
        to: mailTo,

        replyTo: safeEmail,

        subject: `New Brochure Request - ${safeProduct}`,

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
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                overflow: hidden;
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
                  New Brochure Request
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
                    margin-top: 0;
                    margin-bottom: 22px;
                    font-size: 14px;
                    line-height: 1.7;
                  "
                >
                  A new brochure request has been submitted from the website.
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
                        padding: 10px 0;
                        font-weight: 600;
                        width: 150px;
                      "
                    >
                      Name
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
                      Company
                    </td>

                    <td
                      style="
                        padding: 10px 0;
                      "
                    >
                      ${safeCompany}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        font-weight: 600;
                      "
                    >
                      Website
                    </td>

                    <td
                      style="
                        padding: 10px 0;
                      "
                    >
                      ${safeWebsite}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        font-weight: 600;
                      "
                    >
                      Product
                    </td>

                    <td
                      style="
                        padding: 10px 0;
                      "
                    >
                      ${safeProduct}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        `,
      });

      console.log(
        "Brochure request email sent successfully."
      );
    } catch (mailError) {
      console.error(
        "Brochure request email error:",
        mailError
      );
    }

    /* =========================================================
       RESPONSE
    ========================================================= */

    return NextResponse.json(
      {
        message:
          "Brochure request submitted successfully.",

        requestId:
          brochureRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST brochure request error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to submit brochure request.",
      },
      { status: 500 }
    );
  }
}