import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const modules = [
  {
    href: "/guidance",
    title: "未来指引",
    subtitle: "就业 · 考研 · 留学",
    hint: "PATHS",
  },
  {
    href: "/blog",
    title: "技术博客",
    subtitle: "实验室成员的技术分享与实战记录",
    hint: "BLOG",
  },
  {
    href: "/alumni",
    title: "学长学姐",
    subtitle: "履历与联系入口（占位）",
    hint: "NETWORK",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="lab-glass rounded-3xl px-6 py-10 sm:px-10 sm:py-12">
        <p className="lab-chip mb-3 text-[#0071e3]">{">"} lab.init()</p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
          {siteConfig.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/guidance"
            className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed]"
          >
            开始了解
          </Link>
          <Link
            href={siteConfig.repoUrl}
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/80 px-6 py-3 text-sm font-medium text-[#1d1d1f] transition hover:bg-white"
          >
            参与贡献（GitHub）
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">模块</h2>
            <p className="mt-1 text-sm text-[#6e6e73]">前端先行，接口位预留，后续可接 CMS / 鉴权。</p>
          </div>
          <span className="lab-chip hidden rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[#6e6e73] sm:inline">
            v0.1 · static
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group lab-glass rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{m.title}</h3>
                <span className="lab-chip rounded-md bg-black/[0.04] px-2 py-0.5 text-[#6e6e73] group-hover:text-[#0071e3]">
                  {m.hint}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{m.subtitle}</p>
              <p className="mt-4 font-mono text-xs text-[#00c853]">→ read_more()</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="lab-glass rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-semibold">给新生的快速说明</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#6e6e73]">
          <li className="flex gap-2">
            <span className="font-mono text-[#0071e3]">01</span>
            先通读「未来指引」里与你目标一致的路径文章。
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-[#0071e3]">02</span>
            浏览「技术博客」，了解实验室成员的技术分享与项目实践。
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-[#0071e3]">03</span>
            需要一对一建议时，到「学长学姐」按方向筛选联系人（后续接后端与权限）。
          </li>
        </ul>
      </section>
    </div>
  );
}
