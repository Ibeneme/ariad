// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/configs/supabase";

import BlogPostEach from "./BlogPostEach";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("articles")
    .select(
      "title, excerpt, meta_title, meta_description, og_image_url, image_url, canonical_url, category"
    )
    .eq("slug", slug)
    .single();

  if (!post) {
    return {
      title: "Article Not Found | ARIAD Psychological Services",
    };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const imageUrl = post.og_image_url || post.image_url;
  const canonical =
    post.canonical_url || `https://ariad-nine.vercel.app/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
      siteName: "ARIAD Psychological Services",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    keywords: [
      "mental health",
      "psychology",
      "therapy",
      post.category?.toLowerCase(),
      "ARIAD Psychological Services",
    ].filter(Boolean),
  };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
  
    const { data: initialPost, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();
  
    if (error) console.error("Supabase Error:", error);
    if (!initialPost) {
      console.log("No post found for slug:", slug);
      notFound();
    }
  
    return <BlogPostEach slug={slug} initialPost={initialPost} />;
  }
