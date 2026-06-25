// app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) {
    try {
      const { slug } = await params;
      await connectDB();
      
      const article = await Article.findOne({ slug }).lean();
  
      if (!article) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
      }
  
      return NextResponse.json(article);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
    }
  }
  
export async function getArticleBySlug(slug: string) {
    await connectDB();
    const post = await Article.findOne({ slug }).lean(); // .lean() makes it plain JSON
    return post ? JSON.parse(JSON.stringify(post)) : null;
}

// export async function GET(req: Request, { params }: { params: { slug: string } }) {
//     await connectDB();
//     const article = await Article.findOne({ slug: params.slug });
//     return NextResponse.json(article || { error: "Not found" });
// }


export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;   // ← Await params

        await connectDB();
        const data = await req.json();

        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { ...data, updated_at: new Date() },
            { new: true }
        );

        if (!updatedArticle) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            slug: updatedArticle.slug
        });
    } catch (error: any) {
        console.error("Update error:", error);
        return NextResponse.json({
            error: "Failed to update article",
            details: error.message
        }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;   // ← Await params

        await connectDB();

        const deletedArticle = await Article.findByIdAndDelete(id);

        if (!deletedArticle) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Article deleted successfully"
        });
    } catch (error: any) {
        console.error("Delete error:", error);
        return NextResponse.json({
            error: "Failed to delete article",
            details: error.message
        }, { status: 500 });
    }
}