export const browserCompatibilityLesson = {
  id: "browser-compatibility",
  title: "15. 构建目标与浏览器兼容",
  summary: "理解 build.target、Baseline 和旧浏览器兼容边界。",
  tags: ["target", "compatibility"],
  explain: [
    "build.target 决定生产构建会把语法转换到什么浏览器能力范围，目标越旧，转换和兼容成本通常越高。",
    "Vite 8 默认使用 baseline-widely-available 作为构建目标，面向已经广泛可用的现代浏览器能力。",
    "Vite 不会自动为所有旧浏览器补齐运行时 API；如果需要兼容很旧的环境，需要明确评估 polyfill、框架支持和测试矩阵。"
  ],
  code: `export default defineConfig({
  build: {
    // 使用 Vite 默认推荐的现代浏览器兼容范围。
    target: "baseline-widely-available"
  }
});

// 也可以按项目需要指定更明确的目标：
export default defineConfig({
  build: {
    // 明确列出目标浏览器时，要和项目真实支持矩阵保持一致。
    target: ["chrome111", "firefox114", "safari16.4"]
  }
});`,
  codeLanguage: "javascript",
  review: [
    {
      question: "build.target 控制什么？",
      answer: "它控制生产构建的语法转换目标，也间接影响输出代码形态和可运行的浏览器范围。"
    },
    {
      question: "target 设置得更旧一定更好吗？",
      answer: "不一定。更旧的目标可能增加转换成本和产物复杂度，应根据真实用户浏览器范围决定。"
    },
    {
      question: "Vite 会自动补齐所有旧浏览器 API 吗？",
      answer: "不会。语法转换和运行时 API polyfill 是两类问题，旧环境兼容需要额外评估。"
    },
    {
      question: "兼容性问题应该在哪里验证？",
      answer: "应在项目声明支持的浏览器和设备上验证，而不是只依赖本地现代浏览器。"
    }
  ]
};
