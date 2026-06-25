// app/blog/view/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostEach from "./BlogPostEach";
import { getArticleBySlug } from "@/app/api/articles/[id]/route";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ariad-web.netlify.app";
const SITE_NAME = "Your Site Name";
const TWITTER_HANDLE = "@yourhandle";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/blog/view/${slug}`;
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || "";
  const image =
    post.og_image_url || post.image_url || `${SITE_URL}/default-og.jpg`;
  const publishedTime = post.published_at || post.created_at;
  const modifiedTime = post.updated_at || publishedTime;
  const authorName = post.author_name || SITE_NAME;
  const tags: string[] = post.tags || [];

  return {
    title,
    description,
    keywords: tags.length ? tags.join(", ") : undefined,
    authors: [{ name: authorName }],
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
          alt: post.image_alt || title,
        },
      ],
      publishedTime,
      modifiedTime,
      authors: [authorName],
      tags,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: post.author_twitter || TWITTER_HANDLE,
      title,
      description,
      images: [image],
    },
    other: {
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `${SITE_URL}/blog/view/${slug}`;
  const image =
    post.og_image_url || post.image_url || `${SITE_URL}/default-og.jpg`;

  // JSON-LD structured data for rich snippets (Google Search appearance)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    image: [image],
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      "@type": "Person",
      name: post.author_name || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostEach slug={slug} initialPost={post} />
    </>
  );
}
