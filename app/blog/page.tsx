// app/blog/page.tsx
import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title:
    "Blog | Insights on Mental Health, ADHD & Autism | ARIAD Psychological",
  description:
    "Expert articles on ADHD, autism, parenting, neurodiversity, and psychological wellness from the clinicians at ARIAD Psychological Services in Dallas & Houston.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
  openGraph: {
    title: "ARIAD Psychological Blog — Thoughtful Insights",
    description:
      "Clinical wisdom, parenting tips, and neurodiversity-affirming guidance.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    type: "website",
  },
  keywords: [
    "ADHD blog",
    "autism parenting",
    "psychological insights",
    "neurodiversity",
    "Dallas psychologist",
  ],
};

export default function BlogPage() {
  return <BlogClient />;
}
