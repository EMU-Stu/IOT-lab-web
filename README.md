# 实验室门户（lab-portal）

Next.js + Tailwind 的**纯前端优先**实验室站点：新生导览、毕业路径文章、技术博客、学长学姐占位（预留 API）。

## 本地开发

```bash
npm install
npm run dev
```

`predev` 会自动从 [EMU-Stu-Blog](https://github.com/EMU-Stu/EMU-Stu-Blog) 拉取最新文章到 `content/blog/`。

浏览器打开 `http://localhost:3000`。

## 环境变量（可选）

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 站点绝对地址，用于 metadata |
| `NEXT_PUBLIC_REPO_URL` | GitHub 仓库地址，用于首页与页脚链接 |
| `NEXT_PUBLIC_BLOG_REPO_URL` | 博客内容仓库地址，用于说明链接 |
| `BLOG_REPO` | 构建时 clone 的博客仓库 URL（默认 EMU-Stu-Blog） |
| `BLOG_BRANCH` | 博客仓库分支（默认 `main`） |
| `NEXT_PUBLIC_API_BASE_URL` | 后续接后端时填写，例如 `https://api.lab.example` |

复制 `.env.example` 为 `.env.local` 后修改。

## 通过 Git 更新内容

### 毕业路径 / 学长学姐（本仓库）

1. Fork 或克隆本仓库。
2. 在对应目录新增或编辑 Markdown：
   - 毕业路径：`content/guidance/*.md`（文件名即 URL 中的 `slug`，如 `job.md` → `/guidance/job`）
=======
   - 学长学姐：`content/alumni/*.md`
3. 推送分支并发起 **Pull Request**，维护者 Review 通过后合并，站点重新部署即可上线。

### 技术博客（EMU-Stu-Blog 仓库）

博客文章统一投稿到 [EMU-Stu-Blog](https://github.com/EMU-Stu/EMU-Stu-Blog)。本站 build 时自动拉取，并按 frontmatter 中的 `labs` 字段过滤，只展示本实验室（`IoT-Lab`）的文章。

投稿时在 frontmatter 中标注所属实验室：
>>>>>>> 23d5701 (技术博客从blog仓库里获取带有IOT-Lab的文章并展示在网站中)

```yaml
---
title: 文章标题
excerpt: 摘要（可选）
category: 技术分享
author: 你的名字
date: 2026-06-06
labs: [IoT-Lab]
---

# 文章标题

正文……
```

图片放在博客仓库的 `articles/images/`，Markdown 中用 `./images/xxx.png` 引用。

## 学长学姐 Markdown 格式

```yaml
---
name: "张三"
path: "就业 · 字节跳动"
cohort: "在学校的专业班级"
focus: "计算机视觉 / 智能机器人"
contact: "zhangsan@bytedance.com"
github: ""
---
张三学长在实验室期间主要负责 LiDAR 点云数据处理算法的开发。
<<<<<<< HEAD
为人非常热情，指导了多位本科生的毕业设计，毕业后顺利斩获大厂 Offer。
欢迎各位学弟学妹邮件咨询关于求职和简历修改的问题！
=======
>>>>>>> 23d5701 (技术博客从blog仓库里获取带有IOT-Lab的文章并展示在网站中)
```
