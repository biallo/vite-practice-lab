export const advancedViteLesson = {
  id: "advanced-vite",
  title: "16. SSR、Library Mode 与 JavaScript API",
  summary: "了解 Vite 在应用之外的高级使用方式。",
  tags: ["SSR", "library", "api"],
  explain: [
    "SSR 场景中，Vite 既要处理客户端资源，也要为服务端渲染提供模块加载、转换和开发时 HMR 支持。",
    "Library Mode 适合打包组件库或工具库，关注 external、输出格式、类型声明和包入口，而不是完整页面应用。",
    "JavaScript API 允许在 Node.js 中调用 createServer、build、preview 和 resolveConfig，用于自定义脚手架、测试工具或后端集成。"
  ],
  code: `import { build, createServer, resolveConfig } from "vite";

const config = await resolveConfig({}, "build");
console.log(config.root);

await build({
  build: {
    lib: {
      entry: "src/index.js",
      name: "MyLibrary",
      formats: ["es", "umd"]
    }
  }
});

const server = await createServer({ server: { port: 5173 } });
await server.listen();
server.printUrls();`,
  codeLanguage: "javascript",
  review: [
    {
      question: "SSR 和普通 SPA 构建最大的差异是什么？",
      answer: "SSR 同时关心服务端渲染入口和客户端 hydration 资源，模块需要能在服务端环境中执行。"
    },
    {
      question: "Library Mode 的重点和应用构建有什么不同？",
      answer: "库构建更关注输出格式、external 依赖、包入口和类型声明，而不是 HTML 页面和路由部署。"
    },
    {
      question: "什么时候使用 Vite JavaScript API？",
      answer: "当需要把 Vite 嵌入自定义 Node 工具、后端服务、测试流程或脚手架时，可以使用 JavaScript API。"
    },
    {
      question: "这些高级能力适合放在基础课前半部分吗？",
      answer: "不适合。应先掌握入口、配置、资源、构建和部署，再进入 SSR、库构建和自定义 API。"
    }
  ]
};
