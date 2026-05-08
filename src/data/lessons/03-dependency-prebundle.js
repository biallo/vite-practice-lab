export const dependencyPrebundleLesson = {
  id: "dependency-prebundle",
  title: "03. 依赖预构建",
  summary: "掌握 node_modules 依赖为什么会被预构建，以及缓存在哪里。",
  tags: ["依赖", "缓存"],
  explain: [
    "Vite 会用 esbuild 或 Rolldown 相关能力把 CommonJS、UMD 等依赖转换成浏览器更容易消费的 ESM。",
    "预构建还会把依赖中大量细碎的内部模块合并，减少浏览器在开发阶段发出的请求数量。",
    "预构建缓存默认放在 node_modules/.vite，依赖版本、配置或 lockfile 变化时会重新计算。"
  ],
  code: `export default {
  optimizeDeps: {
    // include 用于提前预构建自动扫描没有发现的依赖。
    include: ["lodash-es"],

    // exclude 用于跳过不适合预构建的依赖，例如本地联调包。
    exclude: ["some-local-linked-package"]
  }
};`,
  codeLanguage: "javascript",
  review: [
    {
      question: "依赖预构建主要解决哪两个问题？",
      answer: "把非 ESM 依赖转换成 ESM，并合并依赖内部碎片模块，减少浏览器请求数量。"
    },
    {
      question: "什么时候考虑使用 optimizeDeps.include？",
      answer: "当某个依赖没有被自动发现，但开发时确实需要提前预构建时，可以显式 include。"
    },
    {
      question: "依赖缓存异常时可以怎么处理？",
      answer: "可以清理 node_modules/.vite，或使用 Vite 的 --force 重新生成预构建缓存。"
    }
  ]
};
