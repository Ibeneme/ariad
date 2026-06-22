// app/blog/[slug]/page.tsx
//
// DROP THIS FILE INTO:  app/blog/[slug]/page.tsx
// Make sure the folder is literally named [slug] with square brackets.
export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/configs/supabase";
import BlogPostEach from "./BlogPostEach";


type Props = {
  params: Promise<{ slug: string }>;
};

// ── Dynamic SEO metadata ──────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("articles")
    .select(
      "title, excerpt, meta_title, meta_description, og_image_url, image_url, canonical_url, category"
    )
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return {
      title: "Article Not Found | ARIAD Psychological Services",
      robots: { index: false, follow: false },
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
      siteName: "ARIAD Psychological Services",
      locale: "en_US",
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
    ].filter(Boolean) as string[],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const { data: initialPost, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  // Log on the server so you can see this in Vercel's function logs
  // if articles are unexpectedly missing.
  if (error) {
    console.error(`[BlogPostPage] Supabase error for slug "${slug}":`, error);
  }

  if (!initialPost) {
    notFound();
  }

  return <BlogPostEach slug={slug} initialPost={initialPost} />;
}
