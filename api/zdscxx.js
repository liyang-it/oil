// 中国农业农村部接口
import config from '@/config'

import request from '@/utils/request'

// node.js转发服务地址
const baseUrl = config.nodeApiUrl

/** 获取农产品分类信息*/
export function getFrequencyConditions() {
	return request({
		'url': `${baseUrl}/getFrequencyConditions`,
		'method': 'get'
	})
}

/**
 * 查询各农村部 表格数据
 * @param {Object} data 请求数据
	 {
		 page: 当前页,
		 rows: 返回条数,
		 type: 查询范围可选值(周度数据、月度数据、年度数据),
		 subType: 查询类型可选值(农产品批发价格、综合),
		 level: 固定值 2,
		 time: 时间范围数组，根据 type 查询的范围传递对应数据(周(["2020-31","2024-31"])、月(["2020-08","2024-08"])、年(["2024","2024"])),
		 product: 查询的品类,例如 牛肉、羊肉
	 }
 * <br>
 * 示例：
	 {
		 page: 1,
		 rows: 20,
		 type: 月度数据,
		 subType: 农产品批发价格,
		 level: 2,
		 time: ["2020-08","2024-08"],
		 product: '牛肉'
	 }
 */
export function getFrequencyData(data) {
	return request({
		'url': `${baseUrl}/getFrequencyData`,
		'headers': {
			'Content-Type': 'application/json'
		},
		'method': 'post',
		'data': {
			page: data.page,
			rows: data.rows,
			type: data.type,
			subType: data.subType,
			level: 2,
			time: data.time,
			product: data.product
		}
	})
}