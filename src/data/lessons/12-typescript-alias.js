export const typescriptAliasLesson = {
  id: "typescript-alias",
  title: "12. TypeScript、路径别名与类型声明",
  summary: "掌握 Vite 项目中的 TS 入口、环境变量类型和路径别名。",
  tags: ["typescript", "alias"],
  explain: [
    "Vite 原生支持 TypeScript 转换，但类型检查通常交给 tsc、vue-tsc 或编辑器完成，开发服务器不会默认阻塞在类型错误上。",
    "import.meta.env 和自定义 VITE_ 变量可以通过 vite-env.d.ts 补类型，让编辑器获得更准确的提示。",
    "路径别名需要同时考虑 Vite 的 resolve.alias 和 TypeScript 的 compilerOptions.paths，避免运行时能解析但编辑器报错。"
  ],
  code: `// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      // Vite 运行时会用这个别名解析 @/xxx 到 src/xxx。
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});

// vite-env.d.ts
// 引入 Vite 客户端类型，包括 import.meta.env 和资源导入声明。
/// <reference types="vite/client" />

// 为自定义 VITE_ 环境变量补类型。
interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
}`,
  codeLanguage: "javascript",
  review: [
    {
      question: "Vite 开发服务器默认会做完整 TypeScript 类型检查吗？",
      answer: "不会。Vite 主要负责快速转译，完整类型检查应由 tsc、框架工具或编辑器完成。"
    },
    {
      question: "为什么要保留 vite-env.d.ts 中的 vite/client 引用？",
      answer: "它提供 Vite 客户端类型，例如 import.meta.env、import.meta.hot 和资源导入声明。"
    },
    {
      question: "路径别名只配置 resolve.alias 够吗？",
      answer: "对 Vite 运行时解析够用，但 TypeScript 项目还应同步配置 tsconfig paths，保证类型系统能理解同一个别名。"
    },
    {
      question: "声明 ImportMetaEnv 的价值是什么？",
      answer: "它让自定义 VITE_ 环境变量在代码中拥有明确类型，减少拼写错误和不确定值。"
    }
  ]
};
