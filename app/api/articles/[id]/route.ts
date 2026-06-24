// app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;   // ← Important: Await the params Promise

        await connectDB();
        const article = await Article.findById(id);

        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }
        return NextResponse.json(article);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
    }
}

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