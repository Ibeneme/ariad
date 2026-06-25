// app/admin/edit/[id]/page.tsx
import { notFound } from "next/navigation";
import EditArticleClient from "./EditArticleClient";
import { getAllArticles, getArticleById } from "@/app/api/articles/route";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;

  // Primary: Get by ID (fastest)
  let article = await getArticleById(id);

  // Fallback: Get all articles and find by ID (in case getArticleById has issues)
  if (!article) {
    const allArticles = await getAllArticles();
    article = allArticles.find((a: any) => a._id.toString() === id);
  }

  if (!article) {
    notFound();
  }

  // Convert Mongoose document to plain object
  const plainArticle = JSON.parse(JSON.stringify(article));

  return <EditArticleClient article={plainArticle} id={id} />;
}