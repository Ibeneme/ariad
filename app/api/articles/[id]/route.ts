// app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }   // ← Must match folder [id]
) {
    try {
        const { id } = await params;
        await connectDB();

        // Support both ObjectId lookup AND slug lookup
        let article;

        if (id.length > 15) {
            // Likely a slug (longer than typical MongoDB ID)
            article = await Article.findOne({ slug: id }).lean();
        } else {
            article = await Article.findById(id).lean();
        }

        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error("GET article error:", error);
        return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
    }
}

// Re-export for use in Server Components
export async function getArticleBySlug(slug: string) {
    try {
        await connectDB();
        const post = await Article.findOne({ slug }).lean();
        return post ? JSON.parse(JSON.stringify(post)) : null;
    } catch (error) {
        console.error("getArticleBySlug error:", error);
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