export const pluginsLesson = {
  id: "plugins",
  title: "07. 插件系统",
  summary: "理解 Vite 插件与 Rollup 插件钩子的关系。",
  tags: ["plugin", "rollup"],
  explain: [
    "Vite 插件扩展了 Rollup 插件接口，同一插件可以参与开发服务器、中间件、模块转换和生产构建。",
    "常见钩子包括 config、configureServer、resolveId、load、transform、generateBundle。",
    "插件顺序会影响解析与转换结果，复杂项目应保持插件职责单一，避免一个插件做过多事情。"
  ],
  code: `function virtualMessagePlugin() {
  const id = "virtual:message";

  return {
    name: "virtual-message",

    // resolveId 把用户导入的模块 ID 映射到插件内部 ID。
    resolveId(source) {
      return source === id ? "\\0" + id : null;
    },

    // load 为虚拟模块提供源码，不需要真实文件存在。
    load(resolvedId) {
      return resolvedId === "\\0" + id
        ? "export default 'hello vite'"
        : null;
    }
  };
}`,
  codeLanguage: "javascript",
  review: [
    {
      question: "Vite 插件和 Rollup 插件是什么关系？",
      answer: "Vite 插件兼容并扩展 Rollup 插件接口，可同时参与开发服务器和生产构建。"
    },
    {
      question: "虚拟模块为什么常用 \\0 前缀？",
      answer: "它能标记该模块不是普通文件路径，并避免被其他解析逻辑继续处理。"
    },
    {
      question: "resolveId、load、transform 分别适合做什么？",
      answer: "resolveId 负责解析模块 ID，load 提供模块源码，transform 对已有源码做转换。"
    },
    {
      question: "插件顺序为什么重要？",
      answer: "解析和转换是按顺序进入管线的，前一个插件的结果可能会影响后续插件的输入。"
    },
    {
      question: "如何控制插件复杂度？",
      answer: "让插件职责单一，优先围绕一个明确问题组织钩子，避免把无关逻辑塞进同一个插件。"
    }
  ]
};
