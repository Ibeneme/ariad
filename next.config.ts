/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**', // Temporary — allows all domains (use only during development)
      },
      // Supabase storage (covers all project subdomains)
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      // Supabase storage alternative CDN
      {
        protocol: "https",
        hostname: "*.supabase.in",
      },


    ],
  },
};

module.exports = nextConfig;