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

    const email =
      typeof body.email === "string"
        ? body.email
            .trim()
            .toLowerCase()
        : "";

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!email) {
      return NextResponse.json(
        {
          error:
            "Email address is required.",
        },
        {
          status: 400,
        }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
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
       CHECK EXISTING SUBSCRIBER
    ===================================================== */

    const existingSubscriber =
      await prisma.newsletterSubscriber.findUnique(
        {
          where: {
            email,
          },
        }
      );

    if (existingSubscriber) {
      /* ===================================================
         ALREADY ACTIVE
      =================================================== */

      if (
        existingSubscriber.isActive
      ) {
        return NextResponse.json(
          {
            error:
              "You are already subscribed.",
          },
          {
            status: 409,
          }
        );
      }

      /* ===================================================
         RE-SUBSCRIBE
      =================================================== */

      await prisma.newsletterSubscriber.update(
        {
          where: {
            email,
          },

          data: {
            isActive: true,
            subscribedAt:
              new Date(),
            unsubscribedAt:
              null,
          },
        }
      );

      /* ===================================================
         EMAIL NOTIFICATION
      =================================================== */

      try {
        const adminEmail =
          process.env.MAIL_TO ||
          process.env.SMTP_USER;

        if (adminEmail) {
          await sendMail({
            to: adminEmail,

            subject:
              "Newsletter Subscriber Re-Subscribed",

            html: `
              <div
                style="
                  font-family: Arial, Helvetica, sans-serif;
                  background: #f8fafc;
                  padding: 30px;
                "
              >
                <div
                  style="
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    overflow: hidden;
                  "
                >
                  <div
                    style="
                      background: #0f172a;
                      color: white;
                      padding: 20px 24px;
                    "
                  >
                    <h2
                      style="
                        margin: 0;
                        font-size: 20px;
                      "
                    >
                      Newsletter Re-Subscription
                    </h2>
                  </div>

                  <div
                    style="
                      padding: 24px;
                      color: #334155;
                    "
                  >
                    <p>
                      A subscriber has subscribed again.
                    </p>

                    <p>
                      <strong>Email:</strong>
                      ${email}
                    </p>
                  </div>
                </div>
              </div>
            `,
          });
        }

        /* ===============================================
           SUBSCRIBER CONFIRMATION
        =============================================== */

        await sendMail({
          to: email,

          subject:
            "Welcome Back to Geecon Technology",

          html: `
            <div
              style="
                font-family: Arial, Helvetica, sans-serif;
                background: #f8fafc;
                padding: 30px;
              "
            >
              <div
                style="
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  border: 1px solid #e2e8f0;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >
                <div
                  style="
                    background: #0f172a;
                    color: #ffffff;
                    padding: 20px 24px;
                  "
                >
                  <h2
                    style="
                      margin: 0;
                      font-size: 20px;
                    "
                  >
                    Welcome Back
                  </h2>
                </div>

                <div
                  style="
                    padding: 24px;
                    color: #334155;
                  "
                >
                  <p
                    style="
                      margin-top: 0;
                      line-height: 1.7;
                    "
                  >
                    You have successfully subscribed again to Geecon Technology updates.
                  </p>

                  <p
                    style="
                      margin-bottom: 0;
                      line-height: 1.7;
                    "
                  >
                    Thank you for staying connected with us.
                  </p>
                </div>
              </div>
            </div>
          `,
        });
      } catch (mailError) {
        console.error(
          "Newsletter re-subscribe mail error:",
          mailError
        );
      }

      return NextResponse.json({
        success: true,

        message:
          "Welcome back! You are subscribed again.",
      });
    }

    /* =====================================================
       CREATE NEW SUBSCRIBER
    ===================================================== */

    await prisma.newsletterSubscriber.create(
      {
        data: {
          email,
        },
      }
    );

    /* =====================================================
       SEND EMAILS
    ===================================================== */

    try {
      const adminEmail =
        process.env.MAIL_TO ||
        process.env.SMTP_USER;

      /* ===================================================
         ADMIN NOTIFICATION
      =================================================== */

      if (adminEmail) {
        await sendMail({
          to: adminEmail,

          replyTo: email,

          subject:
            "New Newsletter Subscriber",

          html: `
            <div
              style="
                font-family: Arial, Helvetica, sans-serif;
                background: #f8fafc;
                padding: 30px;
              "
            >
              <div
                style="
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  border: 1px solid #e2e8f0;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >
                <div
                  style="
                    background: #0f172a;
                    color: #ffffff;
                    padding: 20px 24px;
                  "
                >
                  <h2
                    style="
                      margin: 0;
                      font-size: 20px;
                    "
                  >
                    New Newsletter Subscriber
                  </h2>
                </div>

                <div
                  style="
                    padding: 24px;
                    color: #334155;
                  "
                >
                  <p>
                    A new user has subscribed through the Stay Updated section.
                  </p>

                  <p>
                    <strong>Email:</strong>
                    ${email}
                  </p>
                </div>
              </div>
            </div>
          `,
        });
      }

      /* ===================================================
         SUBSCRIBER CONFIRMATION
      =================================================== */

      await sendMail({
        to: email,

        subject:
          "Thank You for Subscribing",

        html: `
          <div
            style="
              font-family: Arial, Helvetica, sans-serif;
              background: #f8fafc;
              padding: 30px;
            "
          >
            <div
              style="
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                overflow: hidden;
              "
            >
              <div
                style="
                  background: #0f172a;
                  color: #ffffff;
                  padding: 20px 24px;
                "
              >
                <h2
                  style="
                    margin: 0;
                    font-size: 20px;
                  "
                >
                  Geecon Technology
                </h2>
              </div>

              <div
                style="
                  padding: 24px;
                  color: #334155;
                "
              >
                <p
                  style="
                    margin-top: 0;
                    line-height: 1.7;
                  "
                >
                  Thank you for subscribing to our newsletter.
                </p>

                <p
                  style="
                    margin-bottom: 0;
                    line-height: 1.7;
                  "
                >
                  You will now receive our latest updates and insights.
                </p>
              </div>
            </div>
          </div>
        `,
      });

      console.log(
        "Newsletter emails sent successfully."
      );
    } catch (mailError) {
      console.error(
        "Newsletter email error:",
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
          "Thank you for subscribing!",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Newsletter subscription error:",
      error
    );

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