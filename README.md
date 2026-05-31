# 实验室门户（lab-portal）

Next.js + Tailwind 的**纯前端优先**实验室站点：新生导览、毕业路径文章、项目索引、学长学姐占位（预留 API）。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。

## 环境变量（可选）

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 站点绝对地址，用于 metadata |
| `NEXT_PUBLIC_REPO_URL` | GitHub 仓库地址，用于首页与页脚链接 |
| `NEXT_PUBLIC_API_BASE_URL` | 后续接后端时填写，例如 `https://api.lab.example` |

复制 `.env.example` 为 `.env.local` 后修改。

## 通过 Git 更新文章（推荐工作流）

1. Fork 或克隆本仓库。
2. 在对应目录新增或编辑 Markdown：
   - 毕业路径：`content/guidance/*.md`（文件名即 URL 中的 `slug`，如 `job.md` → `/guidance/job`）
   - 项目说明：`content/projects/*.md`
3. 在文章顶部使用 YAML front matter 写标题，例如：

```yaml
---
title: 直接就业路径
description: 简短摘要（可选）
---
```

4. 推送分支并发起 **Pull Request**，维护者 Review 通过后合并，站点重新部署即可上线。
5. 如需添加个人信息在学长学姐页面，请在 `content/alumni` 目录下新增 Markdown 文件。格式为：
```yaml
---
name: "张三"
path: "就业 · 字节跳动"
cohort: 在学校的专业班级"
focus: "计算机视觉 / 智能机器人"
contact: "zhangsan@bytedance.com"
github: ""
---
张三学长在实验室期间主要负责 LiDAR 点云数据处理算法的开发。
为人非常热情，指导了多位本科生的毕业设计，毕业后顺利斩获大厂 Offer。
欢迎各位学弟学妹邮件咨询关于求职和简历修改的问题！
```