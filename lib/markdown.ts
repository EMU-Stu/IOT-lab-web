import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentKind = "guidance" | "projects" | "alumni";

const contentRoot = path.join(process.cwd(), "content");

export function listMarkdownSlugs(kind: ContentKind): string[] {
  const dir = path.join(contentRoot, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md")) 
    .map((f) => path.basename(f, ".md")); 
}

export function readMarkdownFile(kind: ContentKind, slug: string) {
  const filePath = path.join(contentRoot, kind, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    data: data as Record<string, unknown>,
    content,
  };
}
