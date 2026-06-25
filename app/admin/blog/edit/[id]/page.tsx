// app/admin/edit/[id]/page.tsx
import { notFound } from "next/navigation";
import EditArticleClient from "./EditArticleClient";
import { getArticleById } from "@/app/api/articles/route"; // Keep this import here (server only)

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  // Convert to plain object
  const plainArticle = JSON.parse(JSON.stringify(article));

  return <EditArticleClient article={plainArticle} id={id} />;
}
