// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';

export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();

        // Helper to safely extract strings from FormData
        function getString(val: FormDataEntryValue | null): string | null {
            return typeof val === 'string' ? val : null;
        }

        let slug = getString(formData.get('slug'));
        let title = getString(formData.get('title'));

        if (!title || !slug) {
            return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
        }

        const existingArticle = await Article.findOne({ slug });
        if (existingArticle) {
            const timestamp = Date.now().toString().slice(-4);
            slug = `${slug}-${timestamp}`;
        }

        const articleData = {
            title: title!, // The ! tells TS we know it's not null due to the early check
            slug: slug!,
            category: getString(formData.get('category')) || 'General',
            // Use || "" to ensure it is always a string, satisfying the Schema
            excerpt: getString(formData.get('excerpt')) || "",
            content: getString(formData.get('content')) || "",
            meta_title: getString(formData.get('meta_title')) || "",
            meta_description: getString(formData.get('meta_description')) || "",
            canonical_url: getString(formData.get('canonical_url')) || "",
            structured_data: formData.get('structured_data')
                ? JSON.parse(getString(formData.get('structured_data')) || '{}')
                : {},
        };

        const newArticle = await Article.create(articleData);

        return NextResponse.json({
            success: true,
            slug: newArticle.slug,
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating article:", error);
        return NextResponse.json({
            error: "Failed to create article.",
            details: error.message
        }, { status: 500 });
    }
}

export async function getArticleBySlug(slug: string) {
    console.log("🔍 getArticleBySlug called with:", slug);

    try {
        await connectDB();

        let article = await Article.findOne({ slug }).lean();

        // Case-insensitive fallback
        if (!article) {
            article = await Article.findOne({
                slug: { $regex: new RegExp(`^${slug}$`, 'i') }
            }).lean();
        }

        console.log("✅ Article found:", article ? article.title : null);

        return article;
    } catch (error: any) {
        console.error("❌ getArticleBySlug error:", error);
        return null;
    }
}

// Optional: Get all articles for listing / generateStaticParams
export async function getAllArticles() {
    try {
        await connectDB();
        return await Article.find({}).sort({ created_at: -1 }).lean();
    } catch (error) {
        console.error("Error fetching all articles:", error);
        return [];
    }
}


export async function GET() {
    try {
        await connectDB();
        const articles = await Article.find({}).sort({ created_at: -1 });
        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}

