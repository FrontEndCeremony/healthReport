import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      postcss: {
        plugins: [
          postcssPxToViewport({
            viewportWidth: 390, // 视窗的宽度，对应的是我们设计稿的宽度，一般是 375
            unitPrecision: 5, // 指定 `px` 转换为视窗单位值的小数位数
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用 vw
            selectorBlackList: ['ignore', 'keep-px'], // 指定不转换为视窗单位的类名
            minPixelValue: 1, // 小于或等于 `1px` 不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false, // 允许在媒体查询中转换 `px`
            exclude: [/node_modules/], // 忽略 node_modules 目录下的文件
          }),
        ],
      },
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 3008,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          ws: true,
          /** 路径重写 */
          // rewrite: (path) => path.replace(/^\/api/, ''),
          /** 是否允许跨域 */
          changeOrigin: true,
        },
        '/socket': {
          target: env.VITE_WS_BASE_URL, // WebSocket 后端地址
          changeOrigin: true,            // 允许跨域
          ws: true,                      // 启用 WebSocket 代理
          rewrite: (path) => path.replace(/^\/socket/, ''),
        },
      },
    }
  }
})