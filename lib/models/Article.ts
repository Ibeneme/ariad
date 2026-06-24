// models/Article.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define the TypeScript interface for the document
export interface IArticle extends Document {
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    image_url: string;
    og_image_url: string;
    meta_title: string;
    meta_description: string;
    canonical_url: string;
    structured_data: Record<string, any>;
    created_at: Date;
    _id?: any;
    supabase_id?: any
}

// 2. Define the Mongoose Schema
const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true, index: true },
    category: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    image_url: { type: String },
    og_image_url: { type: String },
    meta_title: { type: String },
    meta_description: { type: String },
    canonical_url: { type: String },
    structured_data: { type: Object },
    created_at: { type: Date, default: Date.now },
    supabase_id: { type: String, index: true },

});

// 3. Export the model
// We check if the model already exists to prevent overwrite errors in Next.js Hot Module Replacement
const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;