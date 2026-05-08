export const globDynamicImportLesson = {
  id: "glob-dynamic-import",
  title: "11. import.meta.glob 与动态导入",
  summary: "学习批量收集模块、懒加载页面和控制构建分包。",
  tags: ["glob", "dynamic import"],
  explain: [
    "import.meta.glob 是 Vite 提供的编译期能力，适合从文件系统批量收集页面、文章、组件或练习模块。",
    "默认生成的是懒加载函数，调用时才会通过动态 import 拉取模块，生产构建中通常会形成独立 chunk。",
    "glob 参数必须是字面量，不能把运行时变量拼进匹配表达式；需要立即加载时可以使用 eager 选项。"
  ],
  code: `const pages = import.meta.glob("./pages/*.js");

for (const [path, loadPage] of Object.entries(pages)) {
  loadPage().then((module) => {
    console.log(path, module.default);
  });
}

const eagerPages = import.meta.glob("./pages/*.js", {
  eager: true,
  import: "default"
});`,
  codeLanguage: "javascript",
  review: [
    {
      question: "import.meta.glob 默认返回什么？",
      answer: "默认返回一个对象，key 是匹配到的路径，value 是懒加载函数，调用后通过动态 import 加载对应模块。"
    },
    {
      question: "为什么 glob 参数不能使用普通变量？",
      answer: "glob 是 Vite 的编译期转换能力，构建工具需要在转换源码时静态分析匹配范围。"
    },
    {
      question: "什么时候使用 eager: true？",
      answer: "当模块需要在入口阶段立即执行，或需要静态导入以配合 tree-shaking 时，可以使用 eager。"
    },
    {
      question: "动态 import 对生产构建有什么影响？",
      answer: "动态导入通常会产生可按需加载的独立 chunk，降低首屏入口包体积。"
    }
  ]
};
