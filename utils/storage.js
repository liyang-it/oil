import constant from './constant'
import { getFrequencyConditions } from '@/api/zdscxx'

// 存储变量名
let storageKey = 'storage_data'

// 存储节点变量名
let storageNodeKeys = [constant.wholesalePricesAndCategoriesOfAgriculturalProducts]

// 核心缓存键
const coreCacheKeys = ['storage_data', '__DC_STAT_UUID']

const storage = {
	set: function (key, value) {
		if (storageNodeKeys.indexOf(key) != -1) {
			let tmp = uni.getStorageSync(storageKey)
			if (typeof tmp === 'object' && tmp !== null) {
				tmp = tmp!;
			} else {
				tmp = {};
			}
			tmp[key] = value
			uni.setStorageSync(storageKey, tmp)
		}
	},
	get: function (key) {
		let storageData = uni.getStorageSync(storageKey) || {}
		return storageData[key] || ""
	},
	remove: function (key) {
		let storageData = uni.getStorageSync(storageKey) || {}
		delete storageData[key]
		uni.setStorageSync(storageKey, storageData)
	},
	/**
	 * 只清空 缓存键为 ：storage_data 的缓存
	 */
	clean: function () {
		uni.removeStorageSync(storageKey)
	},
	/**
	 * 除了 "__DC_STAT_UUID"、"storage_data" 其他的全部清除
	 */
	clearCommonly: function () {
		const keys = uni.getStorageInfoSync().keys
		for (let i = 0, size = keys.length; i < size; i++) {
			if (coreCacheKeys.indexOf(keys[i]) == -1) {
				uni.removeStorage({
					'key': keys[i]
				})
			}
		}
		uni.showToast({
			title: '操作成功',
			duration: 1000
		})
	},
	/**
	 * 获取 农产品价格品类缓存
	 * @param mode 1 不更新缓存获取，2 更新缓存获取
	 */
	getWholesalePricesAndCategoriesOfAgriculturalProductsCache: function (mode) {
		if (mode == 2) {
			// 更新
			getFrequencyConditions().then((res) => {
				const result = res.result.品类
				if (result != null || result != undefined) {
					this.set(constant.wholesalePricesAndCategoriesOfAgriculturalProducts, JSON.stringify(result))
				}
			})
		}

		let v = this.get(constant.wholesalePricesAndCategoriesOfAgriculturalProducts) || null
		if (v == null) {
			// 更新
			getFrequencyConditions().then((res) => {
				const result = res.result.品类
				if (result != null || result != undefined) {
					const stringCache = JSON.stringify(result)
					this.set(constant.wholesalePricesAndCategoriesOfAgriculturalProducts, stringCache)
					v = stringCache
				}
			})
		}

		console.info('获取缓存', v)

		return v;

	}
}

export default storage