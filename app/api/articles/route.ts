// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/lib/models/Article';


export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();

        let slug = formData.get('slug') as string;
        let title = formData.get('title') as string;

        if (!title || !slug) {
            return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
        }

        // Check if slug exists
        const existingArticle = await Article.findOne({ slug });

        if (existingArticle) {
            const timestamp = Date.now().toString().slice(-4);
            slug = `${slug}-${timestamp}`;
        }

        const articleData = {
            title,
            slug,
            category: formData.get('category') || 'General',
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            meta_title: formData.get('meta_title'),
            meta_description: formData.get('meta_description'),
            canonical_url: formData.get('canonical_url'),
            structured_data: formData.get('structured_data')
                ? JSON.parse(formData.get('structured_data') as string)
                : {},
            // image and ogImage should be handled if you're storing URLs
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

export async function GET() {
    try {
        await connectDB();
        // Fetch all articles, sorted by newest first
        const articles = await Article.find({}).sort({ created_at: -1 });
        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
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


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const data = await req.json();

        // Update the document by ID
        const updatedArticle = await Article.findByIdAndUpdate(params.id, data, {
            new: true // Returns the updated document
        });

        if (!updatedArticle) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, slug: updatedArticle.slug });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
    }
}
