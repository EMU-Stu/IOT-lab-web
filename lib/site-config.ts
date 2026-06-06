export const siteConfig = {
  name: "物联网实验室（AKA 数字孪生暨虚拟现实实验室）",
  tagline: "面向新生的实验室导览：路径选择、技术博客、学长学姐联络。",
  description: "实验室新生指南与资源门户",
  /** 与 EMU-Stu-Blog frontmatter 中 labs 字段对应 */
  labCode: "IoT-Lab",
  /** 部署后替换为真实站点 URL，用于 metadata */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emu-stu.github.io/IOT-lab-web/",
  /** 仓库地址：README 与首页按钮可引用 */
  repoUrl: process.env.NEXT_PUBLIC_REPO_URL ?? "https://github.com/EMU-Stu/IOT-lab-web",
  /** 博客内容仓库，供 README 与页脚引用 */
  blogRepoUrl:
    process.env.NEXT_PUBLIC_BLOG_REPO_URL ?? "https://github.com/EMU-Stu/EMU-Stu-Blog",
};
