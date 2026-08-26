import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { verifyAdminToken } from "../../../../../lib/auth";
import { BlogPostForm } from "../../../../../components/admin/blog-post-form";

export default async function NewBlogPostPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_session")?.value;

  const payload = token
    ? verifyAdminToken(token)
    : null;

  if (!payload) {
    redirect("/admin/login");
  }

  return (
    <div className="w-full">
      <Link
        href="/admin/blog-posts"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
      >
        <ArrowLeft size={17} />
        Back to Blog Posts
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Add New Blog Post
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create and publish a new blog post.
        </p>
      </div>

      <div className="mt-6">
        <BlogPostForm />
      </div>
    </div>
  );
}