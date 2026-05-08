export const gettingStartedLesson = {
  id: "getting-started",
  title: "01. 创建项目与启动服务",
  summary: "理解 Vite 项目的最小结构、脚本命令和开发服务器。",
  tags: ["脚手架", "dev server"],
  explain: [
    "Vite 项目以原生 ESM 为开发入口，浏览器请求模块时再按需转换源码，因此启动阶段不需要先完成整包编译。",
    "根目录的 index.html 是应用入口，Vite 会解析其中的 module script，并把 /src/main.js 纳入模块图。",
    "npm run dev 启动开发服务器，npm run build 生成生产产物，npm run preview 用本地静态服务检查 dist。"
  ],
  code: `npm install

// vite
npm run dev

// vite build
npm run build

// vite preview
npm run preview`,
  codeLanguage: "bash",
  review: [
    {
      question: "为什么 Vite 项目里的 index.html 不是普通静态文件？",
      answer: "它是 Vite 的应用入口。Vite 会解析其中的 module script，并从这里建立源码模块图。"
    },
    {
      question: "dev、build、preview 三个命令分别解决什么问题？",
      answer: "dev 启动开发服务器，build 生成生产产物，preview 用静态服务检查生产构建结果。"
    }
  ]
};
