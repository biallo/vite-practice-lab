export const envModeLesson = {
  id: "env-mode",
  title: "05. 环境变量与模式",
  summary: "理解 .env 文件、VITE_ 前缀和 mode 的关系。",
  tags: ["env", "mode"],
  explain: [
    "Vite 只会把 VITE_ 前缀的环境变量暴露给客户端代码，避免无意泄漏服务端密钥。",
    "import.meta.env.MODE 表示当前模式，DEV 和 PROD 可以用于开发或生产分支判断。",
    ".env、.env.local、.env.[mode] 可以组合使用，越具体的文件优先级越高。"
  ],
  code: `console.log(import.meta.env.MODE);
console.log(import.meta.env.DEV);
console.log(import.meta.env.VITE_API_BASE);`,
  codeLanguage: "javascript",
  review: [
    {
      question: "为什么客户端可见变量需要 VITE_ 前缀？",
      answer: "这是 Vite 的安全边界，避免把没有明确声明的服务端密钥暴露到浏览器代码中。"
    },
    {
      question: "mode 和 NODE_ENV 是一回事吗？",
      answer: "不是。mode 用来选择环境配置文件和应用模式，NODE_ENV 更偏向运行时的开发或生产语义。"
    },
    {
      question: "如何为 staging 和 production 准备不同配置？",
      answer: "可以创建 .env.staging 和 .env.production，并通过 --mode 指定要加载的模式。"
    }
  ]
};
