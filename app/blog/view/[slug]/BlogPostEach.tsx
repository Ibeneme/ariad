"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  console.log("🔧 formatArticle called with data:", data ? "YES" : "NO");
  console.log("📝 formatArticle - Title:", data?.title);
  console.log("📝 formatArticle - Slug:", data?.slug);

  const words = data.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
  const computedReadTime = Math.max(1, Math.ceil(words / 200)) + " min read";
  console.log("⏱️ Computed read time:", computedReadTime, "words:", words);

  const formattedDate = data.created_at
    ? new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent";

  console.log("📅 Formatted date:", formattedDate);

  const formatted = {
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

  console.log("✅ formatArticle completed:", formatted.title);
  return formatted;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BlogPostEach({
  slug,
  initialPost,
}: BlogPostClientProps) {
  console.log("🚀 BlogPostEach component mounted");
  console.log("📌 Props received - Slug:", slug);
  console.log("📦 Initial Post received:", initialPost ? "YES" : "NO");

  const [post, setPost] = useState<BlogPost | null>(
    initialPost ? formatArticle(initialPost) : null
  );
  console.log("📊 Initial post state set:", post ? "YES" : "NO");

  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(!initialPost);
  const [shareSuccess, setShareSuccess] = useState(false);
  const relatedFetched = useRef(false);

  console.log("⚙️ Initial loading state:", loading);

  useEffect(() => {
    console.log(
      "🔄 useEffect triggered - Slug:",
      slug,
      "InitialPost:",
      !!initialPost
    );

    const fetchData = async () => {
      console.log("🌐 fetchData started");
      setLoading(true);
      console.log("⏳ Loading set to true");

      try {
        let currentPost = initialPost;
        console.log("📥 Using initialPost:", !!currentPost);

        if (!currentPost) {
          console.log("🔍 Fetching post from API for slug:", slug);
          const res = await fetch(`/api/articles/slug/${slug}`);
          console.log("📡 API response status:", res.status, res.ok);

          if (res.ok) {
            currentPost = await res.json();
            console.log("✅ Fetched post from API:", currentPost?.title);
          } else {
            console.log("❌ API fetch failed");
          }
        }

        if (currentPost) {
          const formatted = formatArticle(currentPost);
          setPost(formatted);
          console.log("✅ Post state updated via setPost");
        }

        if (currentPost && !relatedFetched.current) {
          console.log("🔗 Fetching related posts...");
          relatedFetched.current = true;
          const res = await fetch(
            `/api/articles?category=${currentPost.category}&exclude=${slug}`
          );
          console.log("📡 Related posts API status:", res.status);

          const relatedData = await res.json();
          console.log(
            "📊 Related data received count:",
            relatedData?.length || 0
          );

          if (Array.isArray(relatedData)) {
            const formattedRelated = relatedData.slice(0, 3).map(formatArticle);
            setRelatedPosts(formattedRelated);
            console.log("✅ Related posts set:", formattedRelated.length);
          }
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
        console.log("⏹️ Loading set to false");
      }
    };

    fetchData();
  }, [slug, initialPost]);

  const handleShare = async () => {
    console.log("🔗 handleShare clicked");
    if (!post) {
      console.log("⚠️ handleShare - No post available");
      return;
    }

    if (navigator.share) {
      console.log("📱 Using Web Share API");
      try {
        await navigator.share({ title: post.title, url: window.location.href });
        console.log("✅ Shared successfully via navigator.share");
      } catch (err) {
        console.error("❌ Share failed", err);
      }
    } else {
      console.log("📋 Falling back to clipboard");
      await navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      console.log("✅ Link copied to clipboard");
      setTimeout(() => {
        setShareSuccess(false);
        console.log("⏰ Share success state reset");
      }, 2500);
    }
  };

  console.log(
    "🎨 Rendering BlogPostEach - Loading:",
    loading,
    "Post exists:",
    !!post
  );

  if (loading) {
    console.log("🟡 Showing ArticleSkeleton");
    return <ArticleSkeleton />;
  }

  if (!post) {
    console.log("❌ No post found - Showing Not Found");
    return (
      <div className="min-h-screen flex items-center justify-center">
        Article Not Found
      </div>
    );
  }

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
      "span",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "style", "class"],
  });

  console.log("🧼 Sanitized content length:", sanitizedContent.length);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#067F76] hover:underline text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5" /> Back to All Articles
        </Link>
      </div>

      {/* Hero Section - More Responsive */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-end mt-4">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16 text-white w-full">
          <div className="inline-flex items-center px-4 py-1.5 bg-white/10 rounded-full text-xs sm:text-sm mb-6">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm opacity-90">
            <span>
              <User className="inline w-4 h-4 mr-1" /> {post.author}
            </span>
            <span>
              <Calendar className="inline w-4 h-4 mr-1" /> {post.date}
            </span>
            <span>
              <Clock className="inline w-4 h-4 mr-1" /> {post.readTime}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              {shareSuccess ? "Link Copied!" : "Share"}
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-16 shadow-xl">
          <style jsx global>{`
            .article-body {
              font-size: 1.05rem;
              line-height: 1.8;
              color: #374151;
            }
            .article-body h1,
            .article-body h2 {
              font-weight: 700;
              margin-top: 2rem;
              margin-bottom: 1rem;
              scroll-margin-top: 80px;
            }
            .article-body h2 {
              font-size: 1.65rem;
              color: #1f2937;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 0.75rem;
            }
            .article-body p,
            .article-body div[style*="line-height"] {
              margin-bottom: 1.25rem;
            }
            .article-body ul,
            .article-body ol {
              margin-bottom: 1.5rem;
              padding-left: 1.5rem;
            }
            .article-body li {
              margin-bottom: 0.5rem;
            }
            .article-body strong,
            .article-body b {
              color: #1f2937;
            }
          `}</style>
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className="article-body prose prose-lg max-w-none"
          />
        </div>
      </article>

      {/* Related Posts - Fixed Mobile Overflow + Better Responsive */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-gray-900">
            More in {post.category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedPosts.map((rel, index) => {
              console.log(
                `🔗 Rendering related post #${index + 1}:`,
                rel.title
              );
              return (
                <Link
                  key={rel.id}
                  href={`/blog/view/${rel.slug}`}
                  className="block group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#067F76]/20"
                >
                  <div className="relative h-48 sm:h-52 lg:h-56">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="font-bold text-lg sm:text-xl mb-3 group-hover:text-[#067F76] transition-colors line-clamp-2">
                      {rel.title}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                      {rel.excerpt}
                    </p>
                    <span className="text-[#067F76] font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                      Read Article →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Skeleton ───────────────────────────────────────────────────────────────
function ArticleSkeleton() {
  console.log("🦴 ArticleSkeleton rendered");
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
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <div className="h-5 w-40 rounded-full shimmer" />
      </div>

      <section className="relative h-[50vh] sm:h-[70vh] flex items-end overflow-hidden bg-slate-800 mt-6">
        <div className="absolute inset-0 shimmer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 md:p-16 space-y-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded-full shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}
