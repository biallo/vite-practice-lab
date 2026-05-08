export const configLesson = {
  id: "config",
  title: "06. 配置文件",
  summary: "学习 vite.config.js 的常用配置和 defineConfig 的价值。",
  tags: ["config", "base"],
  explain: [
    "vite.config.js 可以导出对象，也可以导出函数；当配置需要根据 command 或 mode 切换时，函数形式更清晰。",
    "defineConfig 不改变运行时行为，主要提供类型提示和更稳定的编辑体验。",
    "应用部署在域名子路径下时通常需要设置 base，否则生产资源会默认从域名根路径加载。"
  ],
  code: `import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => ({
  base: "/app/",
  server: {
    open: command === "serve" && mode === "development"
  }
}));`,
  codeLanguage: "javascript",
  review: [
    {
      question: "base 配置会影响什么？",
      answer: "它会影响生产构建中的资源 URL，子路径部署时需要设置为对应的公开路径。"
    },
    {
      question: "什么时候使用 defineConfig 的函数形式？",
      answer: "当配置需要根据 command 或 mode 动态变化时，函数形式能更清晰地表达条件。"
    },
    {
      question: "server、build、preview 分别对应哪些阶段？",
      answer: "server 配开发服务器，build 配生产构建，preview 配本地预览生产产物的静态服务。"
    },
    {
      question: "非根路径部署最容易漏掉什么？",
      answer: "最容易漏掉 base，导致 JS、CSS、manifest 或图标资源从域名根路径加载而 404。"
    }
  ]
};
