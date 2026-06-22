import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  // ⚠️  DO NOT add `output: 'export'` — it breaks all dynamic routes like
  // /blog/[slug] in production. Next.js static export pre-renders only pages
  // known at build time; Supabase-backed slugs don't exist yet, so they 404.
  // Vercel handles SSR natively — no output setting needed.
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.in",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
 
export default nextConfig;
 