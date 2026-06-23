// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/configs/supabase";
import BlogPostEach from "./BlogPostEach";

type Props = {
  params: Promise<{ slug: string }>;
};

// Helper to normalize slug (lowercase, trim, etc.)
const normalizeSlug = (slug: string): string => {
  return slug?.toLowerCase().trim() || "";
};

export async function generateStaticParams() {
  console.log("🔄 [generateStaticParams] Starting build-time fetch...");

  const { data: posts, error } = await supabase.from("articles").select("slug");

  if (error) {
    console.error("❌ [generateStaticParams] Supabase error:", error);
  } else {
    console.log(`✅ [generateStaticParams] Found ${posts?.length || 0} posts`, posts);
    if (posts && posts.length > 0) {
      console.log(
        "Slugs generated:",
        posts.map((p) => p.slug)
      );
    }
  }

  return (posts || []).map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;
export const revalidate = 3600; // ISR: revalidate every hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);

  console.log("📌 [generateMetadata] Received slug:", rawSlug);
  console.log("🔧 [generateMetadata] Normalized slug:", slug);

  const { data: post, error } = await supabase
    .from("articles")
    .select(
      "title, excerpt, meta_title, meta_description, og_image_url, image_url, canonical_url, category"
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(
      `❌ [generateMetadata] Supabase error for slug "${slug}":`,
      error
    );
  }

  if (!post) {
    console.warn(`⚠️ [generateMetadata] Post not found for slug: "${slug}"`);
    return {
      title: "Article Not Found | ARIAD Psychological Services",
      robots: { index: false, follow: false },
    };
  }

  console.log(
    `✅ [generateMetadata] Found post: `,post
  );

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const imageUrl = post.og_image_url || post.image_url;
  const canonical =
    post.canonical_url || `https://ariadpsychservices.com/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: "ARIAD Psychological Services",
      locale: "en_US",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
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

export default async function BlogPostPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);

  console.log("🚀 [BlogPostPage] Rendering page for slug:", rawSlug);
  console.log("🔧 [BlogPostPage] Normalized slug:", slug);

  const { data: initialPost, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(
      `❌ [BlogPostPage] Supabase error for slug "${slug}":`,
      error
    );
  } else if (initialPost) {
    console.log(
      `✅ [BlogPostPage] Successfully fetched post: "${initialPost.title}"`
    );
    console.log("Post ID:", initialPost.id, "Category:", initialPost.category);
  } else {
    console.warn(
      `⚠️ [BlogPostPage] No post found for slug: "${slug}" — calling notFound()`
    );
  }

  if (!initialPost) {
    notFound();
  }

  return <BlogPostEach slug={slug} initialPost={initialPost} />;
}
