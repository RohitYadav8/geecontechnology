import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return NextResponse.json(
        {
          error: "Email address is required.",
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
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    const existingSubscriber =
      await prisma.newsletterSubscriber.findUnique({
        where: {
          email,
        },
      });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          {
            error: "You are already subscribed.",
          },
          {
            status: 409,
          }
        );
      }

      await prisma.newsletterSubscriber.update({
        where: {
          email,
        },
        data: {
          isActive: true,
          subscribedAt: new Date(),
          unsubscribedAt: null,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Welcome back! You are subscribed again.",
      });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing!",
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