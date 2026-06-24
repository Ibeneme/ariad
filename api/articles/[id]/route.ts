import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, unique: true },
    category: String,
    excerpt: String,
    content: String,
    image_url: String,
    og_image_url: String,
    meta_title: String,
    meta_description: String,
    canonical_url: String,
    structured_data: Object,
    created_at: { type: Date, default: Date.now },
});

const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema);


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        if (!process.env.MONGODB_URI) throw new Error("Database configuration error");

        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const deleted = await Article.findByIdAndDelete(params.id);

        if (!deleted) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}