import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostEach from "./BlogPostEach";
import { getAllArticles, getArticleBySlug } from "@/app/api/articles/route";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://ariad-sooty.vercel.apps";
const SITE_NAME = "ARIAD Psychological Services";
const TWITTER_HANDLE = "@ariadpsych";

console.log("📌 BlogPostPage module loaded");

function stripHtml(html: string = ""): string {
  console.log("🧹 stripHtml called with length:", html?.length);
  const result = html.replace(/<[^>]*>/g, "").trim();
  console.log("✅ stripHtml result length:", result.length);
  return result;
}

export async function generateStaticParams() {
  console.log("🚀 generateStaticParams started");
  const posts = await getAllArticles();
  console.log(
    "✅ generateStaticParams - Total posts fetched:",
    posts?.length || 0
  );
  console.log(
    "📋 First 3 slugs:",
    posts?.slice(0, 3).map((p: any) => p.slug)
  );

  const params = posts.map((post: any) => ({
    slug: post.slug,
  }));

  console.log(
    "📤 generateStaticParams returning",
    params.length,
    "static paths"
  );
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log("🔍 generateMetadata function started");

  const { slug } = await params;
  console.log("📌 generateMetadata - Received slug:", slug);

  const post = await getArticleBySlug(slug);
  console.log("📄 generateMetadata - Post fetched:", post ? "YES" : "NO");
  console.log("🆔 Post ID:", post?._id);

  if (!post) {
    console.log("❌ Article not found in generateMetadata for slug:", slug);
    return {
      title: "Article Not Found | " + SITE_NAME,
      robots: { index: false, follow: false },
    };
  }

  const url = post.canonical_url || `${SITE_URL}/blog/view/${slug}`;
  console.log("🔗 URL:", url);

  const title = post.meta_title || post.title;
  console.log("📝 Title:", title);

  const description =
    post.meta_description ||
    post.excerpt ||
    stripHtml(post.content).slice(0, 160);
  console.log("📄 Description length:", description.length);

  const image =
    post.og_image_url || post.image_url || `${SITE_URL}/default-og.jpg`;
  console.log("🖼️ Image URL:", image);

  const publishedTime = post.created_at;
  const modifiedTime = post.created_at;

  console.log("✅ generateMetadata completed for slug:", slug);

  return {
    title,
    description,
    keywords: post.category ? [post.category] : undefined,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],

      section: post.category,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title,
      description,
      images: [image],
    },
    other: {
      "article:section": post.category || "",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  console.log("🚀 BlogPostPage component started");

  const { slug } = await params;
  console.log("📌 BlogPostPage - Slug from params:", slug);

  let post = await getArticleBySlug(slug);
  console.log("📦 BlogPostPage - Raw post received:", post ? "YES" : "NO");

  if (!post) {
    console.log("❌ Post not found in BlogPostPage → calling notFound()");
    notFound();
  }

  // 🔥 CRITICAL FIX: Convert Mongoose document to plain object
  const plainPost = JSON.parse(JSON.stringify(post));
  console.log("🔄 Converted to plain object");
  console.log("🔑 Available keys in plainPost:", Object.keys(plainPost));
  console.log("📝 Title in plainPost:", plainPost.title);
  console.log("📅 Created at:", plainPost.created_at);
  console.log("📅 Updated at:", plainPost.updated_at);

  const url = plainPost.canonical_url || `${SITE_URL}/blog/view/${slug}`;
  console.log("🔗 Final URL:", url);

  const image =
    plainPost.og_image_url ||
    plainPost.image_url ||
    `${SITE_URL}/default-og.jpg`;
  console.log("🖼️ Final Image:", image);

  const description =
    plainPost.meta_description ||
    plainPost.excerpt ||
    stripHtml(plainPost.content).slice(0, 160);
  console.log("📝 Final Description length:", description.length);

  // Always build JSON-LD fresh
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: plainPost.title,
    description,
    image: [image],
    datePublished: plainPost.created_at,
    dateModified: plainPost.updated_at || plainPost.created_at,
    articleSection: plainPost.category,
    publisher: {
      "@type": "MedicalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  console.log("📌 JSON-LD generated successfully");
  console.log("✅ BlogPostPage rendering completed for slug:", slug);

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <BlogPostEach slug={slug} initialPost={plainPost} />
    </>
  );
}
