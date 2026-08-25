// 构建 / 开发前自动拉取 UEM-Stu-Blog 到 content/blog，并同步图片到 public/blog-images。
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const REPO = process.env.BLOG_REPO ?? "https://github.com/UEM-Stu/UEM-Stu-Blog.git";
const BRANCH = process.env.BLOG_BRANCH ?? "main";
const BLOG_DIR = path.join(root, "content", "blog");
const IMAGES_SRC = path.join(BLOG_DIR, "articles", "images");
const IMAGES_DST = path.join(root, "public", "blog-images");

const git = (args, opts = {}) => execFileSync("git", args, { stdio: "inherit", ...opts });

try {
  if (existsSync(path.join(BLOG_DIR, ".git"))) {
    console.log(`[fetch-blog] 已存在 content/blog/，拉取最新 ${BRANCH} …`);
    git(["fetch", "--depth", "1", "origin", BRANCH], { cwd: BLOG_DIR });
    git(["reset", "--hard", `origin/${BRANCH}`], { cwd: BLOG_DIR }); // 只拉取指定分支，避免拉取过多历史记录
  } else {
    console.log(`[fetch-blog] 克隆 ${REPO} → content/blog/ …`);
    rmSync(BLOG_DIR, { recursive: true, force: true }); // 删除旧的博客目录
    mkdirSync(path.dirname(BLOG_DIR), { recursive: true }); // 创建新的博客目录
    git(["clone", "--depth", "1", "--branch", BRANCH, REPO, BLOG_DIR]); // 克隆指定分支的博客仓库
  }

  rmSync(IMAGES_DST, { recursive: true, force: true });
  mkdirSync(IMAGES_DST, { recursive: true });

  if (existsSync(IMAGES_SRC)) {
    for (const file of readdirSync(IMAGES_SRC)) {
      cpSync(path.join(IMAGES_SRC, file), path.join(IMAGES_DST, file));
    }
    console.log(`[fetch-blog] 已同步 ${readdirSync(IMAGES_DST).length} 张图片 → public/blog-images/`);
  }

  console.log("[fetch-blog] 完成 ✓");
} catch (err) {
  console.error("[fetch-blog] 失败:", err.message);
  process.exit(1);
}
