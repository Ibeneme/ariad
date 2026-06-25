// app/admin/edit/[id]/page.tsx
import { notFound } from "next/navigation";
import EditArticleClient from "./EditArticleClient";
import { getAllArticles, getArticleById } from "@/app/api/articles/route";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;

  // Primary fetch
  let article = await getArticleById(id);

  // Fallback: search in all articles
  if (!article) {
    const allArticles = await getAllArticles();
    
    // Fix: Use type assertion to avoid strict Mongoose Document conflict
    article = allArticles.find((a: any) => a?._id?.toString() === id) as any;
  }

  if (!article) {
    notFound();
  }

  // Safe plain object conversion
  const plainArticle = JSON.parse(JSON.stringify(article));

  return <EditArticleClient article={plainArticle} id={id} />;
}