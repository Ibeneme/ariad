"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Search,
} from "lucide-react";
import Image from "next/image";

type BlogPost = {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
  read_time?: string;
};

export default function BlogDashboardClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [fetchError, setFetchError] = useState<string>("");

  const router = useRouter();

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  const fetchPosts = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/articles", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      const data: BlogPost[] = await res.json();
      setPosts(data);
    } catch (error: any) {
      console.error("Fetch error:", error);
      setFetchError(error.message || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete?._id) return;

    const postId = postToDelete._id;
    setDeletingId(postId);

    try {
      const res = await fetch(`/api/articles/${postId}`, { method: "DELETE" });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete");
      }

      // Functional update ensures you don't use stale post list data
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));

      // Close modal on success
      setShowDeleteModal(false);
      setPostToDelete(null);
    } catch (error: any) {
      alert(`Delete failed: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto pt-16">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#023B37]">
              Blog Management
            </h1>
            <p className="text-slate-500 mt-1">ARIAD Psychological Insights</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-full border border-slate-200 focus:border-[#067F76] focus:ring-2 focus:ring-[#067F76]/20 outline-none transition-all"
              />
            </div>

            <button
              onClick={() => router.push("/admin/blog/create")}
              className="flex items-center justify-center gap-2 bg-[#023B37] hover:bg-[#067F76] text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-[#023B37]/20 active:scale-[0.985]"
            >
              <Plus size={18} /> New Article
            </button>
          </div>
        </div>

        {/* Error */}
        {fetchError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center justify-between">
            <span>{fetchError}</span>
            <button
              onClick={fetchPosts}
              className="text-sm underline hover:no-underline font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* Posts Grid */}
        <div className="relative">
          {filteredPosts.length === 0 && !loading && (
            <div className="bg-white rounded-3xl py-20 text-center">
              <p className="text-slate-400 text-lg">
                {searchQuery
                  ? `No articles found for "${searchQuery}"`
                  : "No articles yet."}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <BlogCard key={`loading-${idx}`} isLoading={true} />
                ))
              : filteredPosts.map((post) => (
                  <BlogCard
                    key={post._id}
                    post={post}
                    isLoading={false}
                    onEdit={() => router.push(`/admin/blog/edit/${post._id}`)}
                    onDelete={() => handleDeleteClick(post)}
                    onView={() =>
                      router.push(`/blog/view/${post.slug || post._id}`)
                    }
                  />
                ))}
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-[#023B37]" size={42} />
                <p className="font-semibold text-[#023B37]">
                  Loading insights...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && postToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Delete Article?
            </h2>
            <p className="text-slate-600 mb-8">
              Are you sure you want to permanently delete{" "}
              <strong>"{postToDelete.title}"</strong>?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-4 border border-slate-300 rounded-2xl hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="flex-1 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-2xl font-semibold transition-colors"
              >
                {deletingId ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== BlogCard Component ====================
function BlogCard({
  post,
  isLoading,
  onEdit,
  onDelete,
  onView,
}: {
  post?: BlogPost;
  isLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}) {
  if (isLoading || !post) {
    return <div className="bg-white rounded-3xl h-[420px] animate-pulse" />;
  }

  return (
    <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100">
      <div className="h-56 relative overflow-hidden">
        <Image
          src={post.image_url || "/placeholder.png"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#023B37]">
          {post.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl leading-tight mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-3 mb-6">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-400 border-t pt-4">
          <div className="flex items-center gap-4">
            <span>
              <Calendar size={13} className="inline mr-1" />
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {post.read_time && (
              <span>
                <Clock size={13} className="inline mr-1" />
                {post.read_time}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              aria-label="Edit article"
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={onDelete}
              aria-label="Delete article"
              className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={onView}
              aria-label="View article"
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
