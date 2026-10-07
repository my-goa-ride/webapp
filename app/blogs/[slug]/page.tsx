import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButton from "@/components/ShareButton";
import { Arrow } from "@/components/icons";
import { blogPosts } from "@/lib/blogs";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image], type: "article" },
  };
}

export default async function PostPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="page wrap page-end">
      <header className="article-head">
        <Link className="ul label crumb" href="/blogs">Back to the journal</Link>
        <span className="label muted">{post.category}</span>
        <h1 className="display">{post.title}</h1>
        <div className="meta label">
          <span>{post.date}</span>
          <span>{post.author}</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      <div className="article-ph">
        <Image src={post.image} alt="" fill priority sizes="100vw" />
      </div>

      {/* Post bodies are our own static HTML from lib/blogs.ts. */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="article-foot">
        <ShareButton title={post.title} />
        <Link className="btn" href="/cars">
          Choose your car <Arrow />
        </Link>
      </div>
    </article>
  );
}
