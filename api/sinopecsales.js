// 中国石化各省 汽油、柴油价格
import config from '@/config'

import request from '@/utils/request'
import cryptoHandler from '@/utils/cryptoHandler'

const baseUrl = config.nodeApiUrl


/**
 * 查询某个省汽油柴油价格 - WEB/APP环境 - 使用node.js中间件进行请求(需要自己搭建api-service服务)
 * @param {Object} provinceId 省份ID
	 {
		 provinceId: 省份ID
	 }
 * <br>
 * 示例：
	 {
		 provinceId: "31"
	 }
 */
export function switchProvinceByNode(provinceId) {
	return request({
		'url': `${baseUrl}/switchProvince`,
		'method': 'get',
		'data': {
			'provinceId': provinceId
		}
	})
}

/**
 * 查询某个省汽油柴油价格 - APP 环境调用
 * @param {Object} provinceId 省份ID
	 {
		 provinceId: 省份ID
	 }
 * <br>
 * 示例：
	 {
		 provinceId: "31"
	 }
 */
export function switchProvinceByApp(provinceId) {
	return request({
		'url': 'https://cx.sinopecsales.com/yjkqiantai/data/switchProvince',
		'headers': {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		'method': 'post',
		'data': {
			'provinceId': provinceId
		}
	})
}