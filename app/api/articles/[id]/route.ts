// app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    console.log("🚀 [API GET Article] Request received");
    console.log("📍 Params received:", params);

    try {
        const { id } = await params;
        console.log("🔑 Extracted param (id/slug):", id);
        console.log("📏 Length of id:", id.length);

        await connectDB();
        console.log("✅ MongoDB connected successfully");

        let article;

        if (id.length > 15) {
            console.log("🔍 Looking up by SLUG:", id);
            article = await Article.findOne({ slug: id }).lean();
        } else {
            console.log("🔍 Looking up by ID:", id);
            article = await Article.findById(id).lean();
        }

        console.log("📊 Article found?", !!article);

        if (article) {
            console.log("✅ Article title:", article.title);
            console.log("✅ Article slug:", article.slug);
        } else {
            console.log("❌ No article found for:", id);
        }

        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error: any) {
        console.error("❌ GET article error:", error);
        console.error("❌ Error stack:", error.stack);
        return NextResponse.json({
            error: "Failed to fetch article",
            details: error.message
        }, { status: 500 });
    }
}

// Re-export for use in Server Components
export async function getArticleBySlug(slug: string) {
    console.log("🔄 [getArticleBySlug] Called with slug:", slug);

    try {
        await connectDB();
        console.log("✅ MongoDB connected in getArticleBySlug");

        const post = await Article.findOne({ slug }).lean();
        console.log("📊 Post found in getArticleBySlug?", !!post);

        if (post) {
            console.log("✅ Found article title:", post.title);
        }

        return post ? JSON.parse(JSON.stringify(post)) : null;
    } catch (error: any) {
        console.error("❌ getArticleBySlug error:", error);
        console.error("❌ Error message:", error.message);
        return null;
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
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
            slug: updatedArticle.slug,
        });
    } catch (error: any) {
        console.error("Update error:", error);
        return NextResponse.json({
            error: "Failed to update article",
            details: error.message,
        }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();

        const deletedArticle = await Article.findByIdAndDelete(id);

        if (!deletedArticle) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Article deleted successfully",
        });
    } catch (error: any) {
        console.error("Delete error:", error);
        return NextResponse.json({
            error: "Failed to delete article",
            details: error.message,
        }, { status: 500 });
    }
}