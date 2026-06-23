import { Metadata } from "next";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/configs/supabase";
import BlogPostEach from "./BlogPostEach";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("articles")
    .select("slug")
    .limit(100); // safety limit

  return (posts || []).map((post: any) => ({ slug: post.slug }));
}

export const dynamicParams = true;
export const revalidate = 1; // Disable ISR for now during debugging

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("articles")
    .select(
      "title, excerpt, meta_title, meta_description, og_image_url, image_url, canonical_url, category"
    )
    .eq("slug", slug)
    .maybeSingle(); // ← Changed from .single()

  if (!post) {
    return {
      title: "Article Not Found | ARIAD Psychological Services",
      robots: { index: false },
    };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const imageUrl = post.og_image_url || post.image_url;

  return {
    title,
    description,
    alternates: {
      canonical:
        post.canonical_url || `https://ariadpsychservices.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const { data: initialPost, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle(); // ← Changed from .single()

  if (error) {
    console.error("Supabase error:", error);
  }

  if (!initialPost) {
    notFound();
  }

  return <BlogPostEach slug={slug} initialPost={initialPost} />;
}
