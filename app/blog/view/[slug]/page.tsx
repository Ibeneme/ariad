// app/blog/view/[slug]/page.tsx

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  // Always await params in modern Next.js
  const { slug } = await params;

  return (
    <div style={{ paddingTop: 300 }}>
      <h1>Viewing Blog Post</h1>
      <p>The post ID/slug is: {slug}</p>
      {/* Add your data fetching logic here using the slug */}
    </div>
  );
}
