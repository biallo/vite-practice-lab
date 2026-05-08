export const deploymentLesson = {
  id: "deployment",
  title: "09. 静态部署",
  summary: "学习 GitHub Pages 等静态站点部署中的路径和缓存问题。",
  tags: ["pages", "deploy"],
  explain: [
    "Vite 应用构建后是静态资源，可以部署到 GitHub Pages、Netlify、Vercel 或任意静态服务器。",
    "子路径部署时需要让 base 与仓库路径一致，例如 /vite-practice-lab/。",
    "HTML 通常不做长期强缓存，带 hash 的 JS、CSS 和图片可以使用长期缓存策略。"
  ],
  code: `export default defineConfig({
  // 项目部署在 https://<user>.github.io/vite-practice-lab/ 时需要这个前缀。
  base: "/vite-practice-lab/"
});`,
  codeLanguage: "javascript",
  review: [
    {
      question: "为什么本地 dev 正常，部署到 Pages 后资源可能 404？",
      answer: "本地开发常运行在根路径或由 dev server 兜底，Pages 子路径部署需要正确设置 base。"
    },
    {
      question: "Vite 默认构建输出目录是什么？",
      answer: "默认是 dist，GitHub Pages workflow 通常上传这个目录。"
    },
    {
      question: "静态部署后优先检查哪些资源？",
      answer: "优先检查 HTML 中引用的 JS、CSS、manifest、favicon 和移动端图标路径。"
    },
    {
      question: "哪些资源适合长期缓存？",
      answer: "带内容 hash 的 JS、CSS、图片适合长期缓存；HTML 通常不适合长期强缓存。"
    }
  ]
};
