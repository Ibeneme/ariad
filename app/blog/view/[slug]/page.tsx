// app/blog/view/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostEach from "./BlogPostEach";
import { getArticleBySlug } from "@/app/api/articles/[id]/route";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://ariad-web.netlify.app";
const SITE_NAME = "ARIAD Psychological Services";
const TWITTER_HANDLE = "@ariadpsych"; // update if you have a real handle

function stripHtml(html: string = ""): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | " + SITE_NAME,
      robots: { index: false, follow: false },
    };
  }

  const url = post.canonical_url || `${SITE_URL}/blog/view/${slug}`;
  const title = post.meta_title || post.title;
  const description =
    post.meta_description ||
    post.excerpt ||
    stripHtml(post.content).slice(0, 160);

  // og_image_url is missing on some posts in the DB — always fall back to image_url,
  // then to a site-wide default so an image NEVER fails to render in shares
  const image =
    post.og_image_url || post.image_url || `${SITE_URL}/default-og.jpg`;

  const publishedTime = post.created_at;
  const modifiedTime = post.updated_at || post.created_at;

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
      publishedTime,
      modifiedTime,
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
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
      "article:section": post.category || "",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = post.canonical_url || `${SITE_URL}/blog/view/${slug}`;
  const image =
    post.og_image_url || post.image_url || `${SITE_URL}/default-og.jpg`;
  const description =
    post.meta_description ||
    post.excerpt ||
    stripHtml(post.content).slice(0, 160);

  // Always build JSON-LD fresh from real post fields — never trust post.structured_data,
  // it contains stale/mismatched test data in the current DB
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: post.title,
    description,
    image: [image],
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    articleSection: post.category,
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
