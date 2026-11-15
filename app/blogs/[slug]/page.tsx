import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ShareButton from "@/components/ShareButton";
import { Arrow } from "@/components/icons";
import { blogPosts, postDate } from "@/lib/blogs";
import { BUSINESS_ID, absoluteUrl, breadcrumbs, pageMeta, shareImage } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blogs/${post.slug}`,
    image: shareImage(`/og/blog/${post.slug}.jpg`, post.title),
    article: { publishedTime: postDate(post).toISOString(), authors: [post.author] },
  });
}

export default async function PostPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const path = `/blogs/${post.slug}`;

  return (
    <article className="page wrap page-end">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: absoluteUrl(`/og/blog/${post.slug}.jpg`),
            datePublished: postDate(post).toISOString(),
            url: absoluteUrl(path),
            mainEntityOfPage: absoluteUrl(path),
            articleSection: post.category,
            author: { "@id": BUSINESS_ID },
            publisher: { "@id": BUSINESS_ID },
          },
          breadcrumbs([["Home", "/"], ["Journal", "/blogs"], [post.title, path]]),
        ]}
      />
      <header className="article-head">
        <Link className="ul label crumb" href="/blogs">Back to the journal</Link>
        <span className="label muted">{post.category}</span>
        <h1 className="display">{post.title}</h1>
        <div className="meta label">
          <time dateTime={postDate(post).toISOString().slice(0, 10)}>{post.date}</time>
          <span>{post.author}</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      <div className="article-ph">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" />
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
