export const assetsCssLesson = {
  id: "assets-css",
  title: "04. 静态资源与 CSS",
  summary: "练习 public、src 内资源、CSS import 和 URL 处理。",
  tags: ["assets", "css"],
  explain: [
    "public 目录中的资源会原样复制到构建输出目录，适合 favicon、manifest、robots.txt 这类固定路径资源。",
    "src 内通过 import 或 CSS url() 引用的资源会进入构建图，生产构建时会自动加 hash 以便长期缓存。",
    "CSS 可以直接从 JS 中 import，Vite 会处理 @import、url()、CSS Modules 和 PostCSS 配置。"
  ],
  code: `import "./style.css";
import logoUrl from "./assets/logo.svg";

document.querySelector("img").src = logoUrl;`,
  codeLanguage: "javascript",
  review: [
    {
      question: "哪些资源更适合放在 public 目录？",
      answer: "需要固定公开路径、无需进入构建图的资源，例如 favicon、manifest、robots.txt。"
    },
    {
      question: "src 内 import 的资源和 public 资源有什么不同？",
      answer: "src 内资源会进入构建图，生产构建时可被 hash、压缩和重写路径；public 资源会原样复制。"
    },
    {
      question: "生产资源文件名带 hash 的价值是什么？",
      answer: "它让浏览器可以长期缓存资源，同时文件内容变化后会生成新 URL，避免用户拿到旧资源。"
    },
    {
      question: "CSS 中 url() 引用本地资源时由谁处理路径？",
      answer: "Vite 会解析 CSS url()，把相关资源纳入构建处理并在生产产物中重写路径。"
    }
  ]
};
