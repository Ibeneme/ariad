// app/shop/[id]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  console.warn(slug);
  return <h1 style={{ marginTop: 320 }}>Product ID: {slug}</h1>;
}
