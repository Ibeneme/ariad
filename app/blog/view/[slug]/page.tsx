// app/blog/view/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostEach from "./BlogPostEach";
import { getArticleBySlug } from "@/app/api/articles/route"; // ← Fixed import

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);

  if (!post) return { title: "Article Not Found" };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      images: [post.og_image_url || post.image_url],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);

  if (!post) notFound();

  return <BlogPostEach slug={slug} initialPost={post} />;
}