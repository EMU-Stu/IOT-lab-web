import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listLabBlogPosts, readLabBlogPost } from "@/lib/blog";
import { MarkdownBody } from "@/components/MarkdownBody";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = listLabBlogPosts();
  if (posts.length === 0) {
    // output: "export" 要求动态路由至少预渲染一个路径
    return [{ slug: "__empty__" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = readLabBlogPost(slug);
  if (!post) return { title: "未找到" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = readLabBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="space-y-6">
      <Link
        href="/blog"
        className="inline-flex text-sm text-[#0071e3] transition hover:underline"
      >
        ← 返回博客列表
      </Link>
      <div className="lab-glass rounded-3xl px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#6e6e73]">
          <span className="lab-chip rounded-md bg-black/[0.04] px-2 py-0.5">{post.category}</span>
          <span>{post.date}</span>
          <span>{post.author}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        <div className="mt-8 border-t border-black/5 pt-8">
          <MarkdownBody content={post.content} />
        </div>
      </div>
    </article>
  );
}
