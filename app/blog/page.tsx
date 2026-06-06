import Link from "next/link";
import { listLabBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export default function BlogIndexPage() {
  const posts = listLabBlogPosts();

  return (
    <div className="space-y-10">
      <header className="lab-glass rounded-3xl px-6 py-8 sm:px-8">
        <p className="lab-chip text-[#0071e3]">module: blog</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">技术博客</h1>
        <p className="mt-3 max-w-2xl text-[#6e6e73]">
          内容来自{" "}
          <a
            href={siteConfig.blogRepoUrl}
            className="text-[#0071e3] underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            EMU-Stu-Blog
          </a>
          ，仅展示 frontmatter 中{" "}
          <code className="rounded bg-black/[0.06] px-1.5 py-0.5 font-mono text-xs">
            labs: [{siteConfig.labCode}]
          </code>{" "}
          的文章。向博客仓库投稿时在 frontmatter 标注所属实验室即可同步到本站。
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.length === 0 ? (
          <p className="text-sm text-[#6e6e73]">
            暂无本实验室文章。请在 EMU-Stu-Blog 投稿，并在 frontmatter 中添加{" "}
            <code className="rounded bg-black/[0.06] px-1.5 py-0.5 font-mono text-xs">
              labs: [{siteConfig.labCode}]
            </code>
            。
          </p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="lab-glass group rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6e6e73]">
                <span className="lab-chip rounded-md bg-black/[0.04] px-2 py-0.5">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#6e6e73]">
                {post.excerpt}
              </p>
              <p className="mt-4 text-sm font-medium text-[#0071e3] group-hover:underline">阅读全文</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
