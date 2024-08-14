<template>
	<view class="main">
		<up-loading-page :loading="loading == true" loading-text="正在拼命加载中"></up-loading-page>
		<view v-show="loading == false" class="main_content">
			<!-- 地区选择 -->
			<view class="card province_select">
				<view class="province_select_content">
					<view><text style="font-size: 25px;">{{data.provinceCheck.PROVINCE_NAME}}</text><text style="margin-left: 10px;font-size: 16px;">今日日期：{{nowDate}}</text></view>
					<view><up-button size="normal" text="切换省市查看油价" shape="circle" @click="openPopup" style="width: 80%;"></up-button></view>
				</view>
			</view>
			<!-- 汽油、柴油列表 -->
			<!-- 89号汽油-->
			<!-- 			<view class="card card_bg oil_price_select " v-if="data.provinceData?.GAS_89 != undefined">
				<view class="oil_price_select_content">
					<view class="label">89号</view>
					<view class="oil_class">汽油</view>
					<view class="price"><text class="price_value">{{data.provinceData.GAS_89}}</text><text class="oil_class">(元/升)</text></view>
				</view>
			</view> -->
			<!-- 92号汽油-->
			<view class="card card_bg oil_price_select " v-if="data.provinceData?.GAS_92 != undefined">
				<view class="oil_price_select_content">
					<view class="label">92号</view>
					<view class="oil_class">汽油</view>
					<view class="price">
						<view class="price_status">
							<image src="../../static/images/icon/oil_up.png" width="40" draggable="false" v-if="data.provinceData.GAS_92_STATUS > 0" />
							<image src="../../static/images/icon/oil_down.png" draggable="false" v-if="data.provinceData.GAS_92_STATUS < 0" />
							<text>{{data.provinceData.GAS_92_STATUS}}</text>
						</view>
						<text class="price_value">{{data.provinceData.GAS_92}}</text>
						<text class="oil_class">(元/升)</text>
					</view>
				</view>
			</view>
			<view class="card card_bg oil_price_select " v-if="data.provinceData?.E92 != undefined">
				<view class="oil_price_select_content">
					<view class="label">E92号</view>
					<view class="oil_class">汽油</view>
					<view class="price">
						<view class="price_status">
							<image src="/static/images/icon/oil_up.png" width="40" draggable="false" v-if="data.provinceData.E92_STATUS > 0" />
							<image src="/static/images/icon/oil_down.png" draggable="false" v-if="data.provinceData.E92_STATUS < 0" />
							<text>{{data.provinceData.E92_STATUS}}</text>
						</view>
						<text class="price_value">{{data.provinceData.E92}}</text>
						<text class="oil_class">(元/升)</text>
					</view>
				</view>
			</view>
			<!-- 			
			<view class="card card_bg oil_price_select " v-if="data.provinceData?.AIPAOE92 != undefined">
				<view class="oil_price_select_content">
					<view class="label">爱跑E92号</view>
					<view class="oil_class">汽油</view>
					<view class="price"><text class="price_value">{{data.provinceData.AIPAOE92}}</text><text class="oil_class">(元/升)</text></view>
				</view>
			</view> -->
			<!--95号汽油-->
			<view class="card card_bg oil_price_select" v-if="data.provinceData?.GAS_95 != undefined">
				<view class="oil_price_select_content">
					<view class="label">95号</view>
					<view class="oil_class">汽油</view>
					<view class="price">
						<view class="price_status">
							<image src="/static/images/icon/oil_up.png" width="40" draggable="false" v-if="data.provinceData.GAS_95_STATUS > 0" />
							<image src="/static/images/icon/oil_down.png" draggable="false" v-if="data.provinceData.GAS_95_STATUS < 0" />
							<text>{{data.provinceData.GAS_95_STATUS}}</text>
						</view>
						<text class="price_value">{{data.provinceData.GAS_95}}</text>
						<text class="oil_class">(元/升)</text>
					</view>
				</view>
			</view>
			<view class="card card_bg oil_price_select" v-if="data.provinceData?.AIPAO_GAS_95 != undefined">
				<view class="oil_price_select_content">
					<view class="label">爱跑95号</view>
					<view class="oil_class">汽油</view>
					<view class="price">
						<view class="price_status">
							<image src="/static/images/icon/oil_up.png" width="40" draggable="false" v-if="data.provinceData.AIPAO_GAS_95_STATUS > 0" />
							<image src="/static/images/icon/oil_down.png" draggable="false" v-if="data.provinceData.AIPAO_GAS_95_STATUS < 0" />
							<text>{{data.provinceData.AIPAO_GAS_95_STATUS}}</text>
						</view>
						<text class="price_value">{{data.provinceData.AIPAO_GAS_95}}</text>
						<text class="oil_class">(元/升)</text>
					</view>
				</view>
			</view>

			<view class="card card_bg oil_price_select" v-if="data.provinceData?.E95 != undefined">
				<view class="oil_price_select_content">
					<view class="label">E95号</view>
					<view class="oil_class">汽油</view>
					<view class="price">
						<view class="price_status">
							<image src="/static/images/icon/oil_up.png" width="40" draggable="false" v-if="data.provinceData.E95_STATUS > 0" />
							<image src="/static/images/icon/oil_down.png" draggable="false" v-if="data.provinceData.E95_STATUS < 0" />
							<text>{{data.provinceData.E95_STATUS}}</text>
						</view>
						<text class="price_value">{{data.provinceData.E95}}</text>
						<text class="oil_class">(元/升)</text>
					</view>
				</view>
			</view>
			<!--
			<view class="card card_bg oil_price_select" v-if="data.provinceData?.AIPAOE95 != undefined">
				<view class="oil_price_select_content">
					<view class="label">爱跑E95号</view>
					<view class="oil_class">汽油</view>
					<view class="price"><text class="price_value">{{data.provinceData.AIPAOE95}}</text><text class="oil_class">(元/升)</text></view>
				</view>
			</view> -->
			<!-- 98号汽油-->
			<view class="card card_bg oil_price_select" v-if="data.provinceData?.GAS_98 != undefined">
				<view class="oil_price_select_content">
					<view class="label">98号</view>
					<view class="oil_class">汽油</view>
					<view class="price">
						<view class="price_status">
							<image src="/static/images/icon/oil_up.png" width="40" draggable="false" v-if="data.provinceData.GAS_98_STATUS > 0" />
							<image src="/static/images/icon/oil_down.png" draggable="false" v-if="data.provinceData.GAS_98_STATUS < 0" />
							<text>{{data.provinceData.GAS_98_STATUS}}</text>
						</view>
						<text class="price_value">{{data.provinceData.GAS_98}}</text>
						<text class="oil_class">(元/升)</text>
					</view>
				</view>
			</view>
			<view class="card card_bg oil_price_select" v-if="data.provinceData?.AIPAO_GAS_98 != undefined">
				<view class="oil_price_select_content">
					<view class="label">爱跑98</view>
					<view class="oil_class">汽油</view>
					<view class="price">
						<view class="price_status">
							<image src="/static/images/icon/oil_up.png" width="40" draggable="false" v-if="data.provinceData.AIPAO_GAS_98_STATUS > 0" />
							<image src="/static/images/icon/oil_down.png" draggable="false" v-if="data.provinceData.AIPAO_GAS_98_STATUS < 0" />
							<text>{{data.provinceData.AIPAO_GAS_98_STATUS}}</text>
						</view>
						<text class="price_value">{{data.provinceData.AIPAO_GAS_98}}</text>
						<text class="oil_class">(元/升)</text>
					</view>
				</view>
			</view>

			<view class="card card_bg oil_price_select" v-if="data.provinceData?.AIPAO_GAS_E98 != undefined">
				<view class="oil_price_select_content">
					<view class="label">爱跑E98</view>
					<view class="oil_class">汽油</view>
					<view class="price">
						<view class="price_status">
							<image src="/static/images/icon/oil_up.png" width="40" draggable="false" v-if="data.provinceData.AIPAO_GAS_E98_STATUS > 0" />
							<image src="/static/images/icon/oil_down.png" draggable="false" v-if="data.provinceData.AIPAO_GAS_E98_STATUS < 0" />
							<text>{{data.provinceData.AIPAO_GAS_E98_STATUS}}</text>
						</view>
						<text class="price_value">{{data.provinceData.AIPAO_GAS_E98}}</text>
						<text class="oil_class">(元/升)</text>
					</view>
				</view>
			</view>

			<!-- 			<view class="card card_bg oil_price_select" v-if="data.provinceData?.AIPAO_GAS_E98 != undefined">
				<view class="oil_price_select_content">
					<view class="label">爱跑98</view>
					<view class="oil_class">汽油</view>
					<view class="price"><text class="price_value">{{data.provinceData.AIPAO98}}</text><text class="oil_class">(元/升)</text></view>
				</view>
			</view>
			<view class="card card_bg oil_price_select" v-if="data.provinceData?.E98 != undefined">
				<view class="oil_price_select_content">
					<view class="label">E98</view>
					<view class="oil_class">汽油</view>
					<view class="price"><text class="price_value">{{data.provinceData.E98}}</text><text class="oil_class">(元/升)</text></view>
				</view>
			</view> -->


			<!-- 0号柴油 -->
			<view class="card card_bg oil_price_select" v-if="data.provinceData?.CHECHAI_0 != undefined">
				<view class="oil_price_select_content">
					<view class="label">0号</view>
					<view class="oil_class">柴油</view>
					<view class="price">
						<view class="price_status">
							<image src="/static/images/icon/oil_up.png" width="40" draggable="false" v-if="data.provinceData.CHECHAI_0_STATUS > 0" />
							<image src="/static/images/icon/oil_down.png" draggable="false" v-if="data.provinceData.CHECHAI_0_STATUS < 0" />
							<text>{{data.provinceData.CHECHAI_0_STATUS}}</text>
						</view>
						<text class="price_value">{{data.provinceData.CHECHAI_0}}</text>
						<text class="oil_class">(元/升)</text>
					</view>
				</view>
			</view>
			<!-- -10号柴油 -->
			<!-- 			<view class="card card_bg oil_price_select" v-if="data.provinceData?.CHAI_10 != undefined">
				<view class="oil_price_select_content">
					<view class="label">-10号</view>
					<view class="oil_class">柴油</view>
					<view class="price"><text class="price_value">{{data.provinceData.CHAI_10}}</text><text class="oil_class">(元/升)</text></view>
				</view>
			</view> -->
			<!-- -20号柴油 -->
			<!-- 			<view class="card card_bg oil_price_select" v-if="data.provinceData?.CHECHAI_20 != undefined">
				<view class="oil_price_select_content">
					<view class="label">-20号</view>
					<view class="oil_class">柴油</view>
					<view class="price"><text class="price_value">{{data.provinceData.CHECHAI_20}}</text><text class="oil_class">(元/升)</text></view>
				</view>
			</view> -->
			<!-- -35号柴油 -->
			<!-- 			<view class="card card_bg oil_price_select" v-if="data.provinceData?.CHECHAI_35 != undefined">
				<view class="oil_price_select_content">
					<view class="label">-35号</view>
					<view class="oil_class">柴油</view>
					<view class="price"><text class="price_value">{{data.provinceData.CHECHAI_35}}</text><text class="oil_class">(元/升)</text></view>
				</view>
			</view> -->
		</view>
		<!-- 弹出层组件 -->
		<!-- #ifdef WEB -->
		<up-popup :show="popupShow" mode="bottom" @close="closePopup" closeOnClickOverlay duration="0" round="10" :customStyle="{height: '470px', padding: '15px 5px'}">
			<up-row justify="start" gutter="10" v-for="item in cityList" style="margin-bottom: 10px;">
				<up-col span="3" v-for="c in item.list" :key="c.provinceId">
					<up-button :text="c.name" size="normal" @click="queryProvince(c.provinceId)"></up-button>
				</up-col>
			</up-row>
		</up-popup>
		<!-- #endif -->

		<!-- #ifdef APP -->
		<up-popup :show="popupShow" mode="bottom" @close="closePopup" closeOnClickOverlay duration="0" round="10" :customStyle="{height: '440px', padding: '15px 5px'}">
			<up-row justify="start" gutter="10" v-for="item in cityList" style="margin-bottom: 10px;">
				<up-col span="3" v-for="c in item.list" :key="c.provinceId">
					<up-button :text="c.name" size="normal" @click="queryProvince(c.provinceId)"></up-button>
				</up-col>
			</up-row>
		</up-popup>
		<!-- #endif -->

	</view>
</template>

<script lang="js">
	import {
		switchProvinceByNode,
		switchProvinceByApp
	} from '@/api/sinopecsales'
	export default {
		data() {
			return {
				popupShow: false,
				loading: false,
				nowDate: null,
				cityList: [{
						"id": 1,
						"list": [{
							"provinceId": "11",
							"name": "北京"
						}, {
							"provinceId": "12", 
							"name": "天津"
						}, {
							"provinceId": "13",
							"name": "河北"
						}, {
							"provinceId": "14",
							"name": "山西"
						}]
					},
					{
						"id": 2,
						"list": [{
							"provinceId": "41",
							"name": "河南"
						}, {
							"provinceId": "37",
							"name": "山东"
						}, {
							"provinceId": "31",
							"name": "上海"
						}, {
							"provinceId": "32",
							"name": "江苏"
						}]
					},
					{
						"id": 3,
						"list": [{
								"provinceId": "33",
								"name": "浙江"
							},
							{
								"provinceId": "34",
								"name": "安徽"
							},
							{
								"provinceId": "35",
								"name": "福建"
							},
							{
								"provinceId": "36",
								"name": "江西"
							}
						]
					},
					{
						"id": 4,
						"list": [{
								"provinceId": "42",
								"name": "湖北"
							},
							{
								"provinceId": "43",
								"name": "湖南"
							},
							{
								"provinceId": "44",
								"name": "广东"
							},
							{
								"provinceId": "45",
								"name": "广西"
							}
						]
					},
					{
						"id": 5,
						"list": [{
								"provinceId": "53",
								"name": "云南"
							},
							{
								"provinceId": "52",
								"name": "贵州"
							},
							{
								"provinceId": "46",
								"name": "海南"
							},
							{
								"provinceId": "50",
								"name": "重庆"
							}
						]
					},
					{
						"id": 6,
						"list": [{
								"provinceId": "51",
								"name": "四川"
							},
							{
								"provinceId": "65",
								"name": "新疆"
							},
							{
								"provinceId": "15",
								"name": "内蒙古"
							},
							{
								"provinceId": "21",
								"name": "辽宁"
							}
						]
					},
					{
						"id": 7,
						"list": [{
								"provinceId": "22",
								"name": "吉林"
							},
							{
								"provinceId": "64",
								"name": "宁夏"
							},
							{
								"provinceId": "61",
								"name": "陕西"
							},
							{
								"provinceId": "23",
								"name": "黑龙江"
							}
						]
					},
					{
						"id": 8,
						"list": [{
								"provinceId": "54",
								"name": "西藏"
							},
							{
								"provinceId": "63",
								"name": "青海"
							},
							{
								"provinceId": "62",
								"name": "甘肃"
							}
						]
					}
				],
				data: {
					"provinceCheck": {
						"AREA_ID": 44000,
						"GAS_95": "Y",
						"CHAI_35": "N",
						"AIPAOE98": "N",
						"CHAI_10": "N",
						"LNG": "N",
						"AIPAOE95": "N",
						"GAS_98": "Y",
						"AIPAOE92": "N",
						"AREADESC_ISDISPLAY": "N",
						"USER_ID": "",
						"AREA_LEVEL": "1",
						"L_CNG": "N",
						"AREA_DESC": "表格中包含消费税、增值税以及城建税和教育附加。",
						"CHAI_0": "Y",
						"PROVINCE_ID": 44,
						"IS_DEL": "N",
						"E92": "N",
						"E95": "N",
						"GAS_89": "N",
						"ISSHOWOTHER": "Y",
						"AREA_NAME": "",
						"E98": "N",
						"CHAI_20": "N",
						"USER_NAME": "",
						"PROVINCE_NAME": "广东",
						"CHAI_ZYK": "N",
						"USER_PHONE": "",
						"CREATE_BY": "",
						"AIPAO98": "Y",
						"GAS_92": "Y",
						"CNG": "N",
						"AIPAO95": "N"
					},
					"area": [],
					"provinceData": {
						GAS_89: 0,
						GAS_92: 0,
						GAS_95: 0,
						GAS_98: 0,
						E92: 0,
						E95: 0,
						E98: 0,
						AIPAO_GAS_98: 0,
						AIPAO_GAS_95: 0,
						AIPAO_GAS_E92: 0,
						AIPAO_GAS_E95: 0,
						AIPAO_GAS_E98: 0,
						CHECHAI_0: 0,
						CHECHAI_10: 0,
						CHAI_20: 0,
						CHAI_35: 0
					}
				}
			}
		},
		props: {
			src: {
				type: [String],
				default: null
			}
		},
		async created() {
			const nowDate = await this.getNowDate()
			this.nowDate = nowDate
			await this.queryProvince()

		},
		methods: {
			async queryProvince(provinceId) {
				this.popupShow = false
				this.loading = true
				// 如果为空默认请求广东地区
				provinceId = provinceId || '44'
				switchProvinceByNode(provinceId).then((res) => {
					const data = res.data.data
					this.data = data
					if (data.area.length > 0) {
						// 该地区油价并不是按照省统一设置的，不同市油价有差异，例如北方地区，这种情况可以 将该省所有不同价格显示出来，也可以固定显示一条
						this.data.provinceData = data.area[0].areaData
					}
					setTimeout(() => {
						this.loading = false
					}, 100)
				}).catch((e) => {
					this.popupShow = false
					setTimeout(() => {
						this.loading = false
					}, 100)
				})
			},
			openPopup() {
				this.popupShow = true
			},
			closePopup() {
				this.popupShow = false
			},
			async getNowDate() {
				const date = new Date();
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() 返回的是 0-11 的月份，所以需要加 1
				const day = date.getDate().toString().padStart(2, '0');
				return `${year}-${month}-${day}`
			}
		},
		onLoad(event) {

		}
	}
</script>
<style scoped>
	.main {
		font-family: PingFang-SC-Regular, Microsoft YaHei, Tahoma, Arial, sans-serif;
		color: #444;
		background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
		padding-bottom: 1.06 rem;
		width: 100%;
		height: 100%;
		position: fixed;
		overflow-y: scroll;
	}

	.main_content {
		padding: 30px 30px;
	}

	.card {
		overflow: hidden;
		position: relative;
		box-shadow: 0.01rem 0 0.1rem rgba(156, 162, 200, .5);
		border-radius: 0.5rem;
		width: 100%;
		height: 100px;
		color: white;
	}

	.card_bg {
		background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
	}

	.province_select {
		height: 130px;
		background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%) !important;
	}

	.province_select_content {
		text-align: center;
		width: 100%;
		margin: auto;
		line-height: 70px;
		font-size: 20px;
	}

	.oil_price_select {
		height: 50px;
		margin-top: 15px;
	}

	.oil_price_select_content {
		line-height: 50px;
		display: flex;
		position: relative;
	}

	.oil_price_select_content .label {
		margin-left: 10px;
		width: 65px;
	}

	.oil_price_select_content .oil_class {
		font-size: 12px;

	}

	.oil_price_select_content .price {
		position: absolute;
		right: 10px;
	}

	.price .price_value {
		margin-right: 20px;
		font-size: 24px;
	}

	.price .price_status {
		position: absolute;
		right: 100px;
		top: 8px;
		width: 90px;
	}

	.price .price_status image {
		width: 30px;
		height: 30px;
	}

	.price .price_status text {
		position: absolute;
		top: -5px;
		left: 22px;
	}

	.province_btns {
		/* 使用Grid布局 */
		display: grid;
		/* 每行四个子元素，每个子元素宽度与 .btn 子元素一致*/
		grid-template-columns: repeat(4, 80px);
		/* 水平居中 */
		justify-content: center;
		/* 间隔 */
		grid-gap: 5px;
		/* 居中容器本身，如果需要 */
		margin: 0 auto;

	}

	.btn {
		width: 80px;
		/* 可选间距 */
		margin: 2px;
		/* 子元素内部文本居中 */
		text-align: center;
	}
</style>