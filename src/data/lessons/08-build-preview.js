export const buildPreviewLesson = {
  id: "build-preview",
  title: "08. 生产构建与预览",
  summary: "掌握构建输出、分包、压缩和本地预览检查。",
  tags: ["build", "preview"],
  explain: [
    "npm run build 会生成 dist，Vite 会对 JS、CSS 和静态资源做生产优化。",
    "构建阶段会进行 tree-shaking、代码分割、资源 hash 和压缩，最终产物应通过静态服务器访问。",
    "npm run preview 不是开发服务器，它用于检查生产构建结果是否能在接近真实部署的环境中运行。"
  ],
  code: `# 先生成 dist 生产产物。
npm run build

# 再用静态服务检查 dist 的资源路径和运行结果。
npm run preview`,
  codeLanguage: "bash",
  review: [
    {
      question: "preview 前为什么必须先 build？",
      answer: "preview 服务的是 dist 中的生产产物，不会实时编译源码。"
    },
    {
      question: "生产构建通常会做哪些优化？",
      answer: "包括 tree-shaking、代码分割、资源 hash、CSS/JS 压缩和静态资源复制。"
    },
    {
      question: "如何检查构建后的资源路径是否正确？",
      answer: "运行 preview 后打开 Network 面板，确认 JS、CSS、图标和 manifest 都从预期路径返回 200。"
    }
  ]
};
