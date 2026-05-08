export const migrationLesson = {
  id: "migration",
  title: "10. 从 Webpack 迁移思路",
  summary: "对比 Webpack 与 Vite 的入口、配置、插件和资源处理。",
  tags: ["migration", "webpack"],
  explain: [
    "Webpack 往往以 JS entry 为中心，HTML 由插件生成；Vite 则以 HTML 为入口，更贴近浏览器加载模型。",
    "Webpack 的 loader 链在 Vite 中通常对应内置能力、插件或直接使用浏览器原生能力。",
    "迁移时先保证入口、路径别名、环境变量和静态资源工作，再逐步替换构建优化与插件。"
  ],
  code: `// Webpack: entry -> bundle -> html plugin
// Vite: index.html -> module script -> source modules`,
  codeLanguage: "javascript",
  review: [
    {
      question: "Webpack 和 Vite 的入口模型有什么差异？",
      answer: "Webpack 常以 JS entry 为中心再生成 HTML；Vite 以 index.html 为入口，再进入 module script。"
    },
    {
      question: "迁移时应优先检查哪些配置？",
      answer: "优先检查入口、路径别名、环境变量、静态资源路径和生产部署 base。"
    },
    {
      question: "Webpack loader 是否都要迁移为 Vite 插件？",
      answer: "不一定。很多能力在 Vite 中已内置，或可以交给浏览器原生能力、PostCSS、框架插件处理。"
    },
    {
      question: "如何降低迁移风险？",
      answer: "用小步提交逐项迁移，每一步都运行 build 和预览检查，避免把入口、资源、插件问题混在一起。"
    }
  ]
};
