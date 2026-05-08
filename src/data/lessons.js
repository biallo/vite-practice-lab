export const lessons = [
  {
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
npm run dev
npm run build
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
  },
  {
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
  },
  {
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
    include: ["lodash-es"],
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
  },
  {
    id: "assets-css",
    title: "04. 静态资源与 CSS",
    summary: "练习 public、src 内资源、CSS import 和 URL 处理。",
    tags: ["assets", "css"],
    explain: [
      "public 目录中的资源会原样复制到构建输出目录，适合 favicon、manifest、robots.txt 这类固定路径资源。",
      "src 内通过 import 或 CSS url() 引用的资源会进入构建图，生产构建时会自动加 hash 以便长期缓存。",
      "CSS 可以直接从 JS 中 import，Vite 会处理 @import、url()、CSS Modules 和 PostCSS 配置。"
    ],
    code: `import "./style.css";
import logoUrl from "./assets/logo.svg";

document.querySelector("img").src = logoUrl;`,
    codeLanguage: "javascript",
    review: [
      {
        question: "哪些资源更适合放在 public 目录？",
        answer: "需要固定公开路径、无需进入构建图的资源，例如 favicon、manifest、robots.txt。"
      },
      {
        question: "src 内 import 的资源和 public 资源有什么不同？",
        answer: "src 内资源会进入构建图，生产构建时可被 hash、压缩和重写路径；public 资源会原样复制。"
      },
      {
        question: "生产资源文件名带 hash 的价值是什么？",
        answer: "它让浏览器可以长期缓存资源，同时文件内容变化后会生成新 URL，避免用户拿到旧资源。"
      },
      {
        question: "CSS 中 url() 引用本地资源时由谁处理路径？",
        answer: "Vite 会解析 CSS url()，把相关资源纳入构建处理并在生产产物中重写路径。"
      }
    ]
  },
  {
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
  },
  {
    id: "config",
    title: "06. 配置文件",
    summary: "学习 vite.config.js 的常用配置和 defineConfig 的价值。",
    tags: ["config", "base"],
    explain: [
      "vite.config.js 可以导出对象，也可以导出函数；当配置需要根据 command 或 mode 切换时，函数形式更清晰。",
      "defineConfig 不改变运行时行为，主要提供类型提示和更稳定的编辑体验。",
      "部署到 GitHub Pages 的子路径项目通常需要设置 base，否则生产资源会从域名根路径加载。"
    ],
    code: `import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => ({
  base: "/vite-practice-lab/",
  server: {
    open: command === "serve" && mode === "development"
  }
}));`,
    codeLanguage: "javascript",
    review: [
      {
        question: "base 配置会影响什么？",
        answer: "它会影响生产构建中的资源 URL，子路径部署时需要设置为对应的公开路径。"
      },
      {
        question: "什么时候使用 defineConfig 的函数形式？",
        answer: "当配置需要根据 command 或 mode 动态变化时，函数形式能更清晰地表达条件。"
      },
      {
        question: "server、build、preview 分别对应哪些阶段？",
        answer: "server 配开发服务器，build 配生产构建，preview 配本地预览生产产物的静态服务。"
      },
      {
        question: "GitHub Pages 子路径部署最容易漏掉什么？",
        answer: "最容易漏掉 base，导致 JS、CSS、manifest 或图标资源从域名根路径加载而 404。"
      }
    ]
  },
  {
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
    resolveId(source) {
      return source === id ? "\\0" + id : null;
    },
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
  },
  {
    id: "build-preview",
    title: "08. 生产构建与预览",
    summary: "掌握构建输出、分包、压缩和本地预览检查。",
    tags: ["build", "preview"],
    explain: [
      "npm run build 会生成 dist，Vite 会对 JS、CSS 和静态资源做生产优化。",
      "构建阶段会进行 tree-shaking、代码分割、资源 hash 和压缩，最终产物应通过静态服务器访问。",
      "npm run preview 不是开发服务器，它用于检查生产构建结果是否能在接近真实部署的环境中运行。"
    ],
    code: `npm run build
npm run preview`,
    codeLanguage: "bash",
    review: [
      {
        question: "preview 前为什么必须先 build？",
        answer: "preview 服务的是 dist 中的生产产物，不会实时编译源码。"
      },
      {
        question: "生产构建通常会做哪些优化？",
        answer: "包括 tree-shaking、代码分割、资源 hash、CSS/JS 压缩和静态资源复制。"
      },
      {
        question: "如何检查构建后的资源路径是否正确？",
        answer: "运行 preview 后打开 Network 面板，确认 JS、CSS、图标和 manifest 都从预期路径返回 200。"
      }
    ]
  },
  {
    id: "deployment",
    title: "09. 静态部署",
    summary: "学习 GitHub Pages 等静态站点部署中的路径和缓存问题。",
    tags: ["pages", "deploy"],
    explain: [
      "Vite 应用构建后是静态资源，可以部署到 GitHub Pages、Netlify、Vercel 或任意静态服务器。",
      "子路径部署时需要让 base 与仓库路径一致，例如 /vite-practice-lab/。",
      "HTML 通常不做长期强缓存，带 hash 的 JS、CSS 和图片可以使用长期缓存策略。"
    ],
    code: `export default defineConfig({
  base: "/vite-practice-lab/"
});`,
    codeLanguage: "javascript",
    review: [
      {
        question: "为什么本地 dev 正常，部署到 Pages 后资源可能 404？",
        answer: "本地开发常运行在根路径或由 dev server 兜底，Pages 子路径部署需要正确设置 base。"
      },
      {
        question: "Vite 默认构建输出目录是什么？",
        answer: "默认是 dist，GitHub Pages workflow 通常上传这个目录。"
      },
      {
        question: "静态部署后优先检查哪些资源？",
        answer: "优先检查 HTML 中引用的 JS、CSS、manifest、favicon 和移动端图标路径。"
      },
      {
        question: "哪些资源适合长期缓存？",
        answer: "带内容 hash 的 JS、CSS、图片适合长期缓存；HTML 通常不适合长期强缓存。"
      }
    ]
  },
  {
    id: "migration",
    title: "10. 从 Webpack 迁移思路",
    summary: "对比 Webpack 与 Vite 的入口、配置、插件和资源处理。",
    tags: ["migration", "webpack"],
    explain: [
      "Webpack 往往以 JS entry 为中心，HTML 由插件生成；Vite 则以 HTML 为入口，更贴近浏览器加载模型。",
      "Webpack 的 loader 链在 Vite 中通常对应内置能力、插件或直接使用浏览器原生能力。",
      "迁移时先保证入口、路径别名、环境变量和静态资源工作，再逐步替换构建优化与插件。"
    ],
    code: `// Webpack: entry -> bundle -> html plugin
// Vite: index.html -> module script -> source modules`,
    codeLanguage: "javascript",
    review: [
      {
        question: "Webpack 和 Vite 的入口模型有什么差异？",
        answer: "Webpack 常以 JS entry 为中心再生成 HTML；Vite 以 index.html 为入口，再进入 module script。"
      },
      {
        question: "迁移时应优先检查哪些配置？",
        answer: "优先检查入口、路径别名、环境变量、静态资源路径和生产部署 base。"
      },
      {
        question: "Webpack loader 是否都要迁移为 Vite 插件？",
        answer: "不一定。很多能力在 Vite 中已内置，或可以交给浏览器原生能力、PostCSS、框架插件处理。"
      },
      {
        question: "如何降低迁移风险？",
        answer: "用小步提交逐项迁移，每一步都运行 build 和预览检查，避免把入口、资源、插件问题混在一起。"
      }
    ]
  }
];
