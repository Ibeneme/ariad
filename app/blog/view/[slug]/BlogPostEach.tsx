"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

const heroBgFallback =
  "https://images.unsplash.com/photo-1600427652630-f97cc4db10cd?q=80&w=2070&auto=format&fit=crop";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  ogImage?: string;
  author?: string;
  category?: string;
  created_at: string;
}

interface BlogPostClientProps {
  slug: string;
  initialPost: any;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatArticle(data: any): BlogPost {
  const words = data.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
  const computedReadTime = Math.max(1, Math.ceil(words / 200)) + " min read";
  const formattedDate = data.created_at
    ? new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent";

  return {
    id: data._id || data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt || "",
    content: data.content || "",
    category: data.category || "General",
    date: formattedDate,
    readTime: computedReadTime,
    image: data.image_url || heroBgFallback,
    ogImage: data.og_image_url,
    author: data.author || "ARIAD Team",
    created_at: data.created_at,
  };
}

function formatRelated(article: any): BlogPost {
  return formatArticle(article);
}

// ── Main component ────────────────────────────────────────────────────────────

export default function BlogPostEach({
  slug,
  initialPost,
}: BlogPostClientProps) {
  const [post, setPost] = useState<BlogPost | null>(
    initialPost ? formatArticle(initialPost) : null
  );

  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(!initialPost);
  const [shareSuccess, setShareSuccess] = useState(false);
  const relatedFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let currentPost = initialPost;

        // 1. If no initialPost, fetch the main article
        if (!currentPost) {
          const res = await fetch(`/api/articles/${slug}`);
          currentPost = await res.json();
          if (currentPost) setPost(formatArticle(currentPost));
        }

        // 2. Fetch related posts
        if (currentPost && !relatedFetched.current) {
          relatedFetched.current = true;
          const res = await fetch(
            `/api/articles?category=${currentPost.category}&exclude=${slug}`
          );
          const relatedData = await res.json();
          if (Array.isArray(relatedData)) {
            setRelatedPosts(relatedData.map(formatRelated));
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, initialPost]);

  const handleShare = async () => {
    if (!post) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url: window.location.href });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  if (loading) return <ArticleSkeleton />;
  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Article Not Found
      </div>
    );

  const sanitizedContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "p",
      "div",
      "br",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "a",
      "img",
      "table",
      "th",
      "td",
      "tr",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "style", "class"],
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      {/* Styles omitted for brevity, ensure they remain in your file */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#067F76]"
        >
          <ArrowLeft className="w-5 h-5" /> Back to All Articles
        </Link>
      </div>

      <section className="relative h-[70vh] flex items-end mt-5">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 text-white w-full">
          <div className="inline-flex items-center px-4 py-1.5 bg-white/10 rounded-full text-sm mb-6">
            {post.category}
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">{post.title}</h1>
          <div className="flex gap-6 text-sm">
            <span>
              <User className="inline w-4 h-4 mr-1" /> {post.author}
            </span>
            <span>
              <Calendar className="inline w-4 h-4 mr-1" /> {post.date}
            </span>
            <button onClick={handleShare}>
              {shareSuccess ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-10 md:p-16">
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className="article-body"
          />
        </div>
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-bold mb-10">More in {post.category}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((rel) => (
              <div key={rel.id} className="bg-white rounded-3xl p-8 shadow-sm">
                <h3 className="font-bold text-lg mb-3">{rel.title}</h3>
                <Link href={`/blog/view/${rel.slug}`} className="text-[#067F76]">
                  Read Article
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Shimmer Skeleton ──────────────────────────────────────────────────────────
function ArticleSkeleton() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      <style jsx global>{`
        @keyframes shimmer-sweep {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
        }
        .shimmer {
          position: relative;
          overflow: hidden;
          background-color: #e7e9ee;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.65) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 400px 100%;
          animation: shimmer-sweep 1.5s ease-in-out infinite;
        }
        .shimmer-dark {
          position: relative;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.08);
        }
        .shimmer-dark::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.18) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 400px 100%;
          animation: shimmer-sweep 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-6 pt-8">
        <div className="h-5 w-40 rounded-full shimmer" />
      </div>

      <section className="relative h-[70vh] flex items-end overflow-hidden bg-slate-800 mt-6">
        <div className="absolute inset-0 shimmer-dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full">
          <div className="h-7 w-32 rounded-full shimmer-dark mb-6" />
          <div className="space-y-4 mb-6">
            <div className="h-12 md:h-14 w-full max-w-xl rounded-2xl shimmer-dark" />
            <div className="h-12 md:h-14 w-3/4 max-w-md rounded-2xl shimmer-dark" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="h-4 w-24 rounded-full shimmer-dark" />
            <div className="h-4 w-32 rounded-full shimmer-dark" />
            <div className="h-4 w-20 rounded-full shimmer-dark" />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 space-y-5">
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-5/6 rounded-full shimmer" />
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-2/3 rounded-full shimmer" />
          <div className="pt-4" />
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-4/5 rounded-full shimmer" />
          <div className="h-4 w-full rounded-full shimmer" />
          <div className="h-4 w-3/4 rounded-full shimmer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="h-8 w-64 rounded-full shimmer mb-10" />
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100"
            >
              <div className="h-52 shimmer" />
              <div className="p-8 space-y-3">
                <div className="h-4 w-full rounded-full shimmer" />
                <div className="h-4 w-2/3 rounded-full shimmer" />
                <div className="h-4 w-28 rounded-full shimmer mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
