export const esmHmrLesson = {
  id: "esm-hmr",
  title: "02. 原生 ESM 与 HMR",
  summary: "学习 Vite 为什么启动快，以及热更新如何局部生效。",
  tags: ["ESM", "HMR"],
  explain: [
    "开发阶段 Vite 直接利用浏览器原生 ESM，源码文件会保留模块边界，修改一个模块时只需要重新转换受影响的部分。",
    "HMR 通过 import.meta.hot 暴露运行时 API，框架插件会在内部接管更新边界，普通应用也可以手写 accept 回调。",
    "依赖和源码的处理路径不同：依赖更稳定，会进入预构建；源码变化频繁，保持按需转换。"
  ],
  code: `if (import.meta.hot) {
  import.meta.hot.accept((nextModule) => {
    console.log("module updated", nextModule);
  });
}`,
  codeLanguage: "javascript",
  review: [
    {
      question: "Vite 开发阶段为什么修改单个文件后反馈很快？",
      answer: "源码保持 ESM 模块边界，变更时通常只需要重新转换受影响的模块，而不是重新打完整包。"
    },
    {
      question: "HMR 和整页刷新有什么区别？",
      answer: "HMR 会在运行时替换可接受更新的模块，尽量保留页面状态；整页刷新会重新加载整个应用。"
    },
    {
      question: "import.meta.hot 应该在什么环境下使用？",
      answer: "它只面向开发环境，生产构建中不应依赖它提供业务能力。"
    }
  ]
};
