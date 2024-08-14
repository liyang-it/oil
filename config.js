// 应用全局配置
const config = {
	nodeApiUrl: 'https://public.api.liyangme.top/api', // node.js服务地址
	// 中国农业农村部 API接口地址
	zdscxxApiUrl: 'http://zdscxx.moa.gov.cn:8080/nyb', // 使用node.js服务请求
	// 中国石化油价 API 接口地址
	sinopecsalesApiUrl: 'https://cx.sinopecsales.com/yjkqiantai/data', // 使用node.js服务请求
	// 应用信息
	appInfo: {
		// apk版本
		version: 1,
		// 网页地址
		web_url: "http://liyangme.top/oil",
		// apk下载连接
		apk_url: "http://liyangme.top/oil/oil.apk"
	}
}
export default config