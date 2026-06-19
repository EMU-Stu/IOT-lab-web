// build / dev 前生成实验室专属热力图数据 → public/lab-stats.json
// 数据源：本仓库 git log + fetch-blog 拉取的 content/blog/articles（labs 过滤）
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); //获取当前文件的目录
const root = path.join(__dirname, "..");

const LAB_CODE = (process.env.LAB_CODE ?? "IoT-Lab").toLowerCase();
const articlesDir = path.join(root, "content", "blog", "articles");
const outputPath = path.join(root, "public", "lab-stats.json");
const STATS_START = "2025-05-01";

function getLabCodes(data) {
  const raw = data.labs ?? data.lab; // 获取实验室代码
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String); // 将实验室代码转换为数组
  return [String(raw)]; // 将实验室代码转换为字符串
}

function belongsToLab(data) {
  return getLabCodes(data).some((code) => code.toLowerCase() === LAB_CODE);
}

function normalizeDate(raw) {
  if (typeof raw !== "string" || !raw.trim()) return null; // 如果日期不是字符串或者为空，则返回 null
  const match = raw.trim().match(/^(\d{4}-\d{2}-\d{2})/); // 匹配日期格式
  return match ? match[1] : null;
}

function collectGitCommits(statsMap) {
  try {
    const log = execFileSync("git", ["log", "--pretty=format:%ad", "--date=short"], {
      cwd: root,
      encoding: "utf8",
    });
    for (const date of log.split("\n").filter(Boolean)) {
      if (date < STATS_START) continue;
      if (!statsMap[date]) statsMap[date] = { commits: 0, articles: 0 };
      statsMap[date].commits += 1;
    }
  } catch {
    console.warn("[generate-stats] 未能读取 git log，跳过提交统计");
  }
}

function collectLabArticles(statsMap) {
  if (!fs.existsSync(articlesDir)) {
    console.warn("[generate-stats] content/blog/articles 不存在，跳过文章统计");
    return;
  }

  for (const file of fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"))) {
    const raw = fs.readFileSync(path.join(articlesDir, file), "utf8"); // 读取博客文件
    const { data } = matter(raw);
    if (!belongsToLab(data)) continue;

    const date = normalizeDate(data.date);
    if (!date || date < STATS_START) continue;

    if (!statsMap[date]) statsMap[date] = { commits: 0, articles: 0 };
    statsMap[date].articles += 1;
  }
}

function main() {
  const statsMap = {};
  collectGitCommits(statsMap);
  collectLabArticles(statsMap);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(statsMap, null, 2));
  console.log(
    `[generate-stats] 已写入 public/lab-stats.json（${Object.keys(statsMap).length} 天有活动）`,
  );
}

main();
