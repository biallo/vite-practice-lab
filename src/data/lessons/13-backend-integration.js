export const backendIntegrationLesson = {
  id: "backend-integration",
  title: "13. 后端联调与代理",
  summary: "理解 server.proxy、CORS、manifest 和传统后端集成。",
  tags: ["proxy", "backend"],
  explain: [
    "前后端分离开发时，server.proxy 可以把 /api 请求转发到后端服务，浏览器仍然只访问 Vite dev server。",
    "如果 HTML 由后端模板输出，开发环境通常需要注入 @vite/client 和入口脚本，生产环境则读取构建 manifest 获取带 hash 的资源。",
    "跨源访问要区分两类问题：浏览器 CORS 限制、以及资源 URL 是否指向了正确的 Vite 或后端地址。"
  ],
  code: `export default defineConfig({
  server: {
    // 允许后端页面直接加载 Vite dev server 的模块和 HMR 客户端。
    cors: {
      origin: "http://localhost:3000"
    },

    proxy: {
      // 浏览器请求 /api/users，Vite 转发到 http://localhost:3000/api/users。
      "/api": {
        target: "http://localhost:3000",

        // 修改代理请求的 Origin，减少后端基于 Host/Origin 的拦截。
        changeOrigin: true
      }
    }
  },

  build: {
    // 生产资源带 hash，manifest 让后端模板能找到真实文件名。
    manifest: true
  }
});`,
  codeLanguage: "javascript",
  review: [
    {
      question: "server.proxy 解决的核心问题是什么？",
      answer: "它让本地浏览器请求先到 Vite dev server，再由 Vite 转发到后端，从而简化本地跨源联调。"
    },
    {
      question: "传统后端集成为什么常需要 build.manifest？",
      answer: "生产资源会带 hash，manifest 能把源码入口映射到真实输出文件，方便后端模板正确引用。"
    },
    {
      question: "后端输出 HTML 时，开发环境需要注入什么？",
      answer: "通常需要注入 Vite 的 /@vite/client 和应用入口脚本，让 HMR 和模块加载正常工作。"
    },
    {
      question: "CORS 和资源路径错误有什么区别？",
      answer: "CORS 是浏览器拦截跨源响应，路径错误通常表现为资源请求 404 或请求到了错误主机。"
    }
  ]
};
