// 版本管理接口
import config from '@/config'
import request from '@/utils/request'


const baseUrl = config.nodeApiUrl


/**
 * 检查版本更新
 * @param {Object} version 客户端版本号
 */
export function checkVersion(version) {
	return request({
		'url': `${baseUrl}/checkVersion`,
		'method': 'get',
		'data': {
			'version': version
		}
	})
}