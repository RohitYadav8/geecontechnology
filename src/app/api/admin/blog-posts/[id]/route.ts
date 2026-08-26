import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "../../../../../../lib/prisma";
import { getAdminFromRequest } from "../../../../../../lib/require-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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

  const cleanedTags = value
    .filter(
      (tag): tag is string =>
        typeof tag === "string"
    )
    .map((tag) => tag.trim())
    .filter(Boolean);

  return cleanedTags.length > 0
    ? cleanedTags
    : null;
}

// ============================================================
// GET SINGLE BLOG POST
// ============================================================

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
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

    const post = await prisma.blogPost.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          error: "Blog post not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(
      "Get blog post error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch blog post.",
      },
      {
        status: 500,
      }
    );
  }
}

// ============================================================
// UPDATE BLOG POST
// ============================================================

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
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
    // CHECK EXISTING POST
    // ========================================================

    const existingPost =
      await prisma.blogPost.findUnique({
        where: {
          id,
        },
      });

    if (!existingPost) {
      return NextResponse.json(
        {
          error: "Blog post not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ========================================================
    // CLEAN REQUIRED VALUES
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
      typeof slug === "string" &&
      slug.trim()
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

    const postWithSameSlug =
      await prisma.blogPost.findUnique({
        where: {
          slug: cleanSlug,
        },
      });

    if (
      postWithSameSlug &&
      postWithSameSlug.id !== id
    ) {
      return NextResponse.json(
        {
          error:
            "Another blog post with this slug already exists.",
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
        : existingPost.isPublished;

    let cleanPublishedAt: Date | null =
      existingPost.publishedAt;

    // If post becomes draft, remove published date
    if (!published) {
      cleanPublishedAt = null;
    }

    // If published date was supplied
    else if (
      typeof publishedAt === "string" &&
      publishedAt.trim()
    ) {
      const parsedDate =
        new Date(publishedAt);

      if (
        Number.isNaN(
          parsedDate.getTime()
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid published date.",
          },
          {
            status: 400,
          }
        );
      }

      cleanPublishedAt =
        parsedDate;
    }

    // If publishing for first time
    else if (
      !existingPost.publishedAt
    ) {
      cleanPublishedAt =
        new Date();
    }

    // ========================================================
    // TAGS
    // ========================================================

    const cleanedTags =
      tags !== undefined
        ? cleanTags(tags)
        : undefined;

    // ========================================================
    // UPDATE DATA
    // ========================================================

    const updateData: Prisma.BlogPostUpdateInput = {
      title: cleanTitle,

      slug: cleanSlug,

      excerpt:
        cleanOptionalString(excerpt),

      content:
        cleanContent,

      featuredImage:
        cleanOptionalString(
          featuredImage
        ),

      category:
        cleanOptionalString(category),

      author:
        cleanOptionalString(author),

      isPublished:
        published,

      isFeatured:
        typeof isFeatured === "boolean"
          ? isFeatured
          : existingPost.isFeatured,

      publishedAt:
        cleanPublishedAt,

      metaTitle:
        cleanOptionalString(
          metaTitle
        ),

      metaDescription:
        cleanOptionalString(
          metaDescription
        ),

      keywords:
        cleanOptionalString(
          keywords
        ),

      openGraphImage:
        cleanOptionalString(
          openGraphImage
        ),

      order:
        typeof order === "number" &&
        Number.isFinite(order)
          ? Math.trunc(order)
          : existingPost.order,
    };

    // ========================================================
    // JSON TAGS FIX
    // ========================================================

    if (tags !== undefined) {
      updateData.tags =
        cleanedTags ??
        Prisma.DbNull;
    }

    // ========================================================
    // UPDATE BLOG POST
    // ========================================================

    const post =
      await prisma.blogPost.update({
        where: {
          id,
        },

        data: updateData,
      });

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(
      "Update blog post error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while updating the blog post.",
      },
      {
        status: 500,
      }
    );
  }
}

// ============================================================
// DELETE BLOG POST
// ============================================================

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
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

    // ========================================================
    // CHECK POST EXISTS
    // ========================================================

    const existingPost =
      await prisma.blogPost.findUnique({
        where: {
          id,
        },
      });

    if (!existingPost) {
      return NextResponse.json(
        {
          error: "Blog post not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ========================================================
    // DELETE
    // ========================================================

    await prisma.blogPost.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,

      message:
        "Blog post deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete blog post error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while deleting the blog post.",
      },
      {
        status: 500,
      }
    );
  }
}