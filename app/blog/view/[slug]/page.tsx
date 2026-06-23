import BlogPostEach from "./BlogPostEach";
import { supabase } from "@/lib/configs/supabase";

export const dynamic = "force-dynamic"; // or remove if you want static

// Optional: pre-generate known slugs at build time
export async function generateStaticParams() {
  const { data } = await supabase.from("articles").select("slug");
  return data?.map((post) => ({ slug: post.slug })) || [];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: initialPost, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !initialPost) {
    // handle 404
    return <div>Article not found</div>;
  }

  return <BlogPostEach slug={slug} initialPost={initialPost} />;
}