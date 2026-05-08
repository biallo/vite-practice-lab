export const performanceTroubleshootingLesson = {
  id: "performance-troubleshooting",
  title: "14. 性能排查与构建分析",
  summary: "学习定位慢启动、慢刷新、依赖缓存和产物体积问题。",
  tags: ["performance", "debug"],
  explain: [
    "开发慢启动常见原因包括依赖预构建反复失效、插件 transform 过重、依赖体积过大或 monorepo 文件扫描范围过宽。",
    "依赖缓存异常时可以用 vite --force 重新优化依赖，也可以检查 lockfile、配置、linked package 和浏览器强缓存。",
    "生产体积排查应先看 Network 和构建输出，再判断是否需要动态 import、手动分包或替换过重依赖。"
  ],
  code: `npm run dev -- --force
npm run build -- --debug

# 浏览器检查重点：
# 1. 首屏 JS/CSS 体积
# 2. 是否有意外的大依赖
# 3. 动态 chunk 是否按需加载
# 4. 静态资源是否命中缓存`,
  codeLanguage: "bash",
  review: [
    {
      question: "什么时候使用 vite --force？",
      answer: "当依赖预构建缓存可能过期或异常时，可以强制 Vite 重新优化依赖。"
    },
    {
      question: "开发阶段慢刷新优先怀疑什么？",
      answer: "优先检查最近改动的插件、超大的模块转换、CSS 处理链和被 HMR 影响的模块范围。"
    },
    {
      question: "生产包体积过大时应该先做什么？",
      answer: "先确认哪些资源最大、是否进入首屏入口，再决定是否动态导入、拆分 chunk 或替换依赖。"
    },
    {
      question: "为什么 linked package 容易影响依赖缓存？",
      answer: "本地链接包的变化不一定像 lockfile 变化那样被自动识别，可能需要手动 force 重新优化。"
    }
  ]
};
