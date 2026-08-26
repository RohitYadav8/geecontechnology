import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../lib/require-admin";

// ============================================================
// HELPERS
// ============================================================

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanOptionalString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.trim();

  return cleaned || null;
}

function cleanTags(value: unknown): string[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const tags = value
    .filter(
      (tag): tag is string =>
        typeof tag === "string"
    )
    .map((tag) => tag.trim())
    .filter(Boolean);

  return tags.length > 0 ? tags : null;
}

// ============================================================
// GET ALL BLOG POSTS
// ============================================================

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
    const posts = await prisma.blogPost.findMany({
      orderBy: [
        {
          order: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(
      "Get blog posts error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch blog posts.",
      },
      {
        status: 500,
      }
    );
  }
}

// ============================================================
// CREATE BLOG POST
// ============================================================

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
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      author,
      tags,
      isPublished,
      isFeatured,
      publishedAt,
      metaTitle,
      metaDescription,
      keywords,
      openGraphImage,
      order,
    } = body;

    // ========================================================
    // CLEAN REQUIRED FIELDS
    // ========================================================

    const cleanTitle =
      typeof title === "string"
        ? title.trim()
        : "";

    const cleanContent =
      typeof content === "string"
        ? content.trim()
        : "";

    const cleanSlug =
      typeof slug === "string" && slug.trim()
        ? createSlug(slug)
        : createSlug(cleanTitle);

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!cleanTitle) {
      return NextResponse.json(
        {
          error: "Title is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!cleanSlug) {
      return NextResponse.json(
        {
          error: "Slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!cleanContent) {
      return NextResponse.json(
        {
          error: "Blog content is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // DUPLICATE SLUG CHECK
    // ========================================================

    const existingPost =
      await prisma.blogPost.findUnique({
        where: {
          slug: cleanSlug,
        },
      });

    if (existingPost) {
      return NextResponse.json(
        {
          error:
            "A blog post with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // ========================================================
    // PUBLISHING
    // ========================================================

    const published =
      typeof isPublished === "boolean"
        ? isPublished
        : false;

    let cleanPublishedAt: Date | null = null;

    if (
      typeof publishedAt === "string" &&
      publishedAt.trim()
    ) {
      const date = new Date(publishedAt);

      if (Number.isNaN(date.getTime())) {
        return NextResponse.json(
          {
            error: "Invalid published date.",
          },
          {
            status: 400,
          }
        );
      }

      cleanPublishedAt = date;
    } else if (published) {
      cleanPublishedAt = new Date();
    }

    // ========================================================
    // CLEAN TAGS
    // ========================================================

    const cleanedTags = cleanTags(tags);

    // ========================================================
    // CREATE DATA
    // ========================================================

    const createData: Prisma.BlogPostCreateInput = {
      title: cleanTitle,

      slug: cleanSlug,

      excerpt:
        cleanOptionalString(excerpt),

      content: cleanContent,

      featuredImage:
        cleanOptionalString(featuredImage),

      category:
        cleanOptionalString(category),

      author:
        cleanOptionalString(author),

      tags:
        cleanedTags ?? Prisma.DbNull,

      isPublished: published,

      isFeatured:
        typeof isFeatured === "boolean"
          ? isFeatured
          : false,

      publishedAt:
        cleanPublishedAt,

      metaTitle:
        cleanOptionalString(metaTitle),

      metaDescription:
        cleanOptionalString(metaDescription),

      keywords:
        cleanOptionalString(keywords),

      openGraphImage:
        cleanOptionalString(openGraphImage),

      order:
        typeof order === "number" &&
        Number.isFinite(order)
          ? Math.trunc(order)
          : 0,
    };

    // ========================================================
    // CREATE BLOG POST
    // ========================================================

    const post = await prisma.blogPost.create({
      data: createData,
    });

    return NextResponse.json(
      {
        success: true,
        post,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Create blog post error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while creating the blog post.",
      },
      {
        status: 500,
      }
    );
  }
}