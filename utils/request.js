import {
	toast,
	showConfirm,
	tansParams
} from '@/utils/common'

// 超时时间(毫秒)
const timeout = 5000

const request = config => {
	// get请求映射params参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	}
	return new Promise((resolve, reject) => {
		console.info('请求地址', config.url)
		// #ifdef APP
		uni.request({
				method: config.method,
				timeout: timeout,
				url: config.url,
				data: config.data,
				header: config.headers
			}).then(response => {
				console.info('请求成功', response)
				resolve(response.data)
			})
			.catch(error => {
				console.info('请求异常', error)
				toast(error)
				reject(error)
			})
		// #endif

		// #ifdef WEB
		uni.request({
				method: config.method,
				timeout: timeout,
				url: config.url,
				data: config.data,
				header: config.headers
			}).then(response => {
				if (response.statusCode != 200) {
					console.info('请求失败', response)
					reject("请求失败", response)
					return
				}
				console.info('请求成功', response)
				resolve(response.data)
			})
			.catch(error => {
				let {
					message
				} = error
				console.info('请求异常', message)
				toast(message)
				reject(error)
			})
		// #endif

	})
}

export default request