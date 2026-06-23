import BlogPostEach from "./BlogPostEach";
import { supabase } from "@/lib/configs/supabase";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: initialPost, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !initialPost) {
    return <div>Article not found</div>;
  }

  return <BlogPostEach slug={slug} initialPost={initialPost} />;
}