import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const nav = [
  { href: "/guidance", label: "未来指引" },
  { href: "/blog", label: "技术博客" },
  { href: "/alumni", label: "学长学姐" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f5f5f7]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
            {siteConfig.name}
          </span>
          <span className="hidden font-mono text-[10px] text-[#6e6e73] sm:inline">~/onboarding</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-[#424245] transition hover:bg-black/[0.05] hover:text-[#1d1d1f]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
