import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		port: 3000,
		proxy: {
			'/aapi': {
				target: 'https://cx.sinopecsales.com', // 中国石化接口 用于 WEB端 请求转发配置代理解决跨域(这个只用于开发环境, 弃用改为使用Node.js请求)，参考：https://blog.csdn.net/m0_53536475/article/details/130144830
				changeOrigin: true,
				rewrite: path => path.replace(/^\/aapi/, '')
			}
		}
	}
})