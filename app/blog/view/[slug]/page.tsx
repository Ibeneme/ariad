import { supabase } from "@/lib/configs/supabase";

export const dynamic = "force-dynamic"; // or remove if you want static

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <>{slug}</>;
}
