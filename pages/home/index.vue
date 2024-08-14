<template>
	<view class="main">
		<up-loading-page :loading="tableLoading == true" loading-text="正在拼命加载中"></up-loading-page>
		<!-- 查询表单 -->
		<view>
			<up-row gutter="5">
				<up-col span="6.5">
					<up-search placeholder="请输入农产品" v-model="queryData.product" :clearabled="true" :show-action="false"></up-search>
				</up-col>
				<up-col span="2.5">
					<up-button type="success" size="small" icon="search" text="搜索" @click="confirmSearch"></up-button>
				</up-col>
				<up-col span="2.5">
					<up-button type="primary" size="small" icon="share-square" text="更多筛选" @click="moreScreeningShow = !moreScreeningShow"></up-button>
				</up-col>
			</up-row>
			<!-- 更多筛选 默认隐藏 -->
			<view v-show="moreScreeningShow == true">
				<up-form labelPosition="left" :model="queryData" ref="queryData" labelWidth="80px" labelAlign="center">

					<up-form-item label="农产品" prop="queryData.subType" borderBottom>
						<up-button text="所有农产品" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" size="small" @click="openConditionsPicker" :loading="conditionsPickerLoading"></up-button>
					</up-form-item>
					<up-form-item label="价格单位" prop="queryData.unit" borderBottom>
						<up-radio-group v-model="queryData.unit" placement="row">
							<up-radio activeColor="red" label="元/斤" name="1" style="margin-right: 10px;"></up-radio>
							<up-radio activeColor="red" label="元/公斤" name="2" style="margin-right: 10px;"></up-radio>
						</up-radio-group>
					</up-form-item>
					<up-form-item label="显示方式" prop="queryData.showType" borderBottom>
						<up-radio-group v-model="queryData.showType" placement="row">
							<up-radio activeColor="red" label="列表" name="1" style="margin-right: 10px;"></up-radio>
							<up-radio activeColor="red" label="表格" name="2" style="margin-right: 10px;"></up-radio>
						</up-radio-group>
					</up-form-item>
					<up-form-item label="查询类型" prop="queryData.subType" borderBottom>
						<up-radio-group v-model="queryData.subType" placement="row">
							<up-radio activeColor="red" label="农产品批发价格" name="农产品批发价格" style="margin-right: 10px;"></up-radio>
							<up-radio activeColor="red" label="综合" name="综合" style="margin-right: 10px;"></up-radio>
						</up-radio-group>
					</up-form-item>
					<up-form-item label="范围类型" prop="queryData.type" borderBottom>
						<up-radio-group v-model="queryData.type" placement="row">
							<up-radio activeColor="red" label="周度数据" name="周度数据" style="margin-right: 10px;" @change="changeType(1)"></up-radio>
							<up-radio activeColor="red" label="月度数据" name="月度数据" style="margin-right: 10px;" @change="changeType(2)"></up-radio>
							<up-radio activeColor="red" label="年度数据" name="年度数据" @change="changeType(3)"></up-radio>
						</up-radio-group>
					</up-form-item>
					<up-form-item label="时间范围" prop="queryData.time" borderBottom>
						<!-- 日期选择组件，根据范围类型选择日期类型，周度数据需要额外调整，手动格式化日期，日期使用输入框显示，根据显示日期组件调用 -->
						<up-row gutter="5">
							<up-col span="4">
								<up-datetime-picker title="选择日期,会自动格式化" :show="datetimePicker.show1" v-model="datetimePicker.value1" mode="date" @close="datetimePicker.show1 = false" @cancel="datetimePicker.show1 = false" :closeOnClickOverlay="true" @confirm="timeConfirm1"></up-datetime-picker>
								<up-input placeholder="选择日期" border="surround" v-model="queryData.time[0]" readonly style="pointer-events: none;"></up-input>
								<view @click="timeFocus(0)" style="background-color: rgba(255, 0, 0, 0);height: 50px; margin-top: -50px;" />
							</up-col>
							<up-col span="4">
								<up-datetime-picker title="选择日期,会自动格式化" :show="datetimePicker.show2" v-model="datetimePicker.value2" mode="date" @close="datetimePicker.show2 = false" @cancel="datetimePicker.show2 = false" :closeOnClickOverlay="true" @confirm="timeConfirm2"></up-datetime-picker>
								<up-input placeholder="选择日期" border="surround" v-model="queryData.time[1]" readonly style="pointer-events: none;"></up-input>
								<view @click="timeFocus(1)" style="background-color: rgba(255, 0, 0, 0);height: 50px; margin-top: -50px;" />
							</up-col>
						</up-row>
					</up-form-item>
					<up-form-item label="每页条数" prop="queryData.rows" borderBottom>
						<up-input border="bottom" v-model="queryData.rows" maxlength="2" type="number" placeholder="默认10条,限制最大99条" clearable></up-input>
					</up-form-item>
				</up-form>
			</view>


			<!-- 表格显示组件 -->
			<view v-show="tableLoading == false" class="main_table">
				<view>
					<table class="table">
						<thead class="thead">
							<tr class="tr">
								<td v-for="(item, index) in tableData.title" :key="item.name" class="td">{{item.display}}</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in tableData.pageInfo.table" :key="index" class="tr">
								<td class="td">{{item.time}}</td>
								<td class="td">{{item.product}}</td>
								<td class="td">{{item.item}}</td>
								<td class="td">{{item.area}}</td>
								<td class="td">{{item.unit}}</td>
								<td class="td" style="background-color: red; color: #ffffff;">{{item.value}}</td>
							</tr>
						</tbody>
					</table>
				</view>
				<!-- 分页按钮组-->
				<view class="bottom_btns">
					<view style="padding: 0px 20px;">
						<uni-pagination :total="tableData.pageInfo.total" :pageSize="tableData.pageInfo.pageSize" :current="tableData.pageInfo.current" prev-text="上一页" next-text="下一页" @change="changePage" />
					</view>
					<view class="btn-view">
						<view>
							<text class="example-info">当前页：{{ tableData.pageInfo.current }}，数据总量：{{ tableData.pageInfo.total }}条，每页数据：{{ tableData.pageInfo.pageSize }}条</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 列表显示组件 -->

			<!-- 所有农场品品类选择组件 -->
			<up-picker duration="0" :show="conditionsPickerShow" ref="uPickerRef" :columns="conditionsPickerColumns" @change="conditionsPickerChangeHandler" closeOnClickOverlay @cancel="conditionsPickerShow = false" @close="conditionsPickerShow = false"
				@confirm="conditionsPickerConfirmHandler"></up-picker>
		</view>
	</view>
</template>

<script lang="js">
	import {
		getFrequencyConditions,
		getFrequencyData
	} from '@/api/zdscxx'
	export default {
		data() {
			return {
				conditionsPickerShow: false,
				conditionsPickerLoading: false,
				conditionsPickerColumns: [], // 一级三维数组数据， 下标0用于存放一级数据，下标1用于存放与一级数据对应的二级数据
				conditionsPickerTwoColumns: [], // 二级多维数组数据
				pageLoading: true,
				tableLoading: true,
				tableData: {
					title: [],
					pageInfo: {
						table: [],
						total: 0,
						current: 1,
						pageSize: 10
					}
				},
				moreScreeningShow: false,
				datetimePicker: {
					show1: false,
					show2: false,
					value1: "",
					value2: "",
				},
				queryData: {
					page: 1,
					rows: 10,
					type: "月度数据",
					subType: "农产品批发价格",
					level: 2,
					time: ["", ""],
					unit: "1",
					showType: "1",
					product: ''
				},
				bgColors: [
					"linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)",
					"linear-gradient(-90deg, #29bdd9 0%, #276ace 100%)",
					"linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)",
					"linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)"
				]
			}
		},
		onLoad() {},
		methods: {
			// 打开 所有农场品品类选择组件
			openConditionsPicker() {
				this.conditionsPickerLoading = true
				if (this.conditionsPickerColumns.length == 0) {
					getFrequencyConditions().then((res) => {
						// 加载数据
						const result = res.data.result.品类.data
						if (result != null || result != undefined) {

							// 构建默认一级级联数据,一共两级，(本来有三级，但是组件不太支持三级级联，将一级与二级字符串合并显示)
							const conditionsPickerColumns = [
								[],
								[]
							]
							const conditionsPickerTwoColumns = []

							// 二级数据下标
							let threeIndex = 0;
							result.forEach((item, index) => {

								// 遍历当前一级下的二级数据
								item.children.forEach((towItem) => {

									// 将一级与二级名称合并，变为一级
									const oneName = `${item.name} - ${towItem.name}`
									conditionsPickerColumns[0].push(oneName)
									console.info('一级数据', oneName)

									// 遍历三级数据, 判断下标位置是否为空数组，进行初始化 避免空指针异常, 将三级数据存放的位置与二级下标一致，这样直接可以用二级下标取三级数据
									towItem.children.forEach((threeItem) => {
										if (conditionsPickerTwoColumns[threeIndex] != undefined) {
											conditionsPickerTwoColumns[threeIndex].push(threeItem.name)
										} else {
											conditionsPickerTwoColumns[threeIndex] = []
											conditionsPickerTwoColumns[threeIndex].push(threeItem.name)
										}
										console.info('二级数据', threeItem.name, threeIndex, conditionsPickerTwoColumns[threeIndex])
									})
									threeIndex = threeIndex + 1;
								})
							})

							// 二级数据对应的默认三级数据(一级多维数组下标0存放的是一级列表，下标1存放的是 与下标0数组首个元素对应的二级列表，直接取 二级数据中的0下标)
							conditionsPickerColumns[1] = conditionsPickerTwoColumns[0]

							this.conditionsPickerColumns = conditionsPickerColumns
							this.conditionsPickerTwoColumns = conditionsPickerTwoColumns

							this.conditionsPickerLoading = false
							this.conditionsPickerShow = true
						}
					})
				} else {
					this.conditionsPickerLoading = false
					this.conditionsPickerShow = true
				}
			},
			// 所有农产品品类选择改变事件
			conditionsPickerChangeHandler(e) {
				const {
					columnIndex, // 改变的列下标(0就是一级)
					index // 改变的行下标
				} = e
				// 根据变动的一级下标自动设置变动下标对应的二级联数据
				if (columnIndex == 0) {
					// 只有一级下标改变 才设置对应的二级列表(下标0为一级数据，下标1为二级数据列表)
					this.$refs.uPickerRef.setColumnValues(1, this.conditionsPickerTwoColumns[index])
				}
			},
			// 品类选择事件
			conditionsPickerConfirmHandler(e) {
				console.info('选择的品类', e.value)
				this.queryData.product = e.value[1]
				this.conditionsPickerShow = false
				this.confirmSearch()
			},
			/**
			 * 点击上一页、下一页事件
			 * @param {Object} e e={type,current} current为当前页，type值为：next(下一页)/prev
			 */
			changePage(e) {
				this.queryData.page = e.current
				this.confirmSearch()
			},
			// 确认搜索
			confirmSearch() {
				if (this.tableLoading == false) {
					this.tableLoading = true
				}
				if (this.queryData.rows.length == 0) {
					this.queryData.rows = 10
				}


				getFrequencyData(this.queryData).then((res) => {
					// 直接请求农业部接口的结果处理方式, 改为node.js方式，所有计算逻辑都在node.js中计算好直接返回
					/*
					if (res.message == 'success') {
						this.tableData.title = res.result.title
						// 处理 价格单位
						if (this.queryData.unit == '1') {
							this.tableData.pageInfo.table = []
							// 将 公斤价格数据 / 2 转换为斤
							for (let i = 0, size = res.result.pageInfo.table.length; i < size; i++) {
								// this.tableData.pageInfo.table = res.result.pageInfo.table
								console.info(res.result.pageInfo.table[i])
								res.result.pageInfo.table[i].unit = '元/斤'
								let price = Number(res.result.pageInfo.table[i].value)
								price = price / 2
								price = parseFloat(price.toFixed(2))
								res.result.pageInfo.table[i].value = price
								this.tableData.pageInfo.table.push(res.result.pageInfo.table[i])
							}

						} else {
							this.tableData.pageInfo.table = res.result.pageInfo.table
						}

						this.tableData.pageInfo.current = res.result.pageInfo.page
						this.tableData.pageInfo.total = res.result.pageInfo.rows
					} else {
						uni.showToast("获取农产品价格数据失败")
					}
					*/
					if (res.code == 200) {
						this.tableData.title = res.data.result.title
						this.tableData.pageInfo.table = res.data.result.pageInfo.table
						this.tableData.pageInfo.current = res.data.result.pageInfo.page
						this.tableData.pageInfo.total = res.data.result.pageInfo.rows
					} else {
						uni.showToast(res.message)
					}

					setTimeout(() => {
						this.tableLoading = false
					}, 200)
				})
			},
			// 日期范围改变，重新初始化日期
			changeType(value) {
				const time = new Date().getTime()
				let now;
				switch (value) {
					case 1:
						now = this.formatYearWeek(time)
						break;
					case 2:
						now = this.timestampToDate('yyyy-MM', time)
						break;
					case 3:
						now = this.timestampToDate('yyyy', time)
						break;
					default:
						break;
				}
				this.datetimePicker.value1 = now
				this.datetimePicker.value2 = now
				this.queryData.time[0] = now
				this.queryData.time[1] = now
			},
			timestampToDate(type, timestamp) {
				const date = new Date(timestamp); // 将时间戳转换为毫秒
				const year = date.getFullYear();

				// const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() 返回的是 0-11 的月份，所以需要加 1

				// 默认返回上一个月的日期
				const month = (date.getMonth()).toString().padStart(2, '0');
				if (type == 'yyyy-MM') {
					return `${year}-${month}`;
				} else if (type == 'yyyy-MM-dd') {
					const day = date.getDate().toString().padStart(2, '0');
					return `${year}-${month}-${day}`;
				} else {
					return `${year}`;
				}

			},
			// 日期组件确认事件
			timeConfirm1(e) {
				let date;
				if (this.queryData.type == '周度数据') {
					// 转换周日期
					date = this.formatYearWeek(e.value)
				} else if (this.queryData.type == '月度数据') {
					// 转换月日期
					date = this.timestampToDate('yyyy-MM', e.value)
				} else {
					// 转换年日期
					date = this.timestampToDate('yyyy', e.value)
				}
				this.queryData.time[0] = date
				this.datetimePicker.value1 = date
				this.datetimePicker.show1 = false

			},
			timeConfirm2(e) {
				let date;
				if (this.queryData.type == '周度数据') {
					// 转换周日期
					date = this.formatYearWeek(e.value)
				} else if (this.queryData.type == '月度数据') {
					// 转换月日期
					date = this.timestampToDate('yyyy-MM', e.value)
				} else {
					// 转换年日期
					date = this.timestampToDate('yyyy', e.value)
				}
				this.queryData.time[1] = date
				this.datetimePicker.value2 = date
				this.datetimePicker.show2 = false
			},
			// 日期输入框聚焦事件
			timeFocus(index) {
				if (index == 0) {
					this.datetimePicker.show1 = true
				} else {
					this.datetimePicker.show2 = true
				}
			},
			// 将 yyyy-MM-dd 日期格式化为 yyyy-WW
			formatYearWeek(dateStr) {
				let date;
				if (dateStr) {
					// 如果提供了日期字符串，则尝试解析它
					date = new Date(dateStr);
					if (isNaN(date.getTime())) {
						throw new Error('Invalid date string provided.');
					}
				} else {
					// 如果没有提供日期字符串，则使用当前日期
					date = new Date();
				}

				const year = date.getFullYear();
				const firstDayOfYear = new Date(year, 0, 1);
				const dayOfYear = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
				const week = Math.ceil(dayOfYear / 7);

				return `${year}-${week.toString().padStart(2, '0')}`;
			}
		},
		created() {
			// 根据默认查询的 时间范围类型格式化 - 将当前日期格式化为月
			const _this = this
			setTimeout(() => {
				this.changeType(2)
				this.confirmSearch()
			}, 200)

		}
	}
</script>

<style scoped>
	.main {
		padding: 10px 5px;
	}

	.main_table {
		margin-top: 8px;
	}

	.thead .th {
		background-color: #f7f7f7;
	}

	.thead .tr {
		background-color: #3c9cff;
		color: #ffffff;
	}

	.table {
		border-collapse: collapse;
		width: 100%;
		/* 设置最大高度 */
		max-height: 50px;
		/* 设置垂直滚动条 */
		overflow-y: auto;

	}



	.th,
	.td {
		border: 1px solid #ccc;
		padding: 8px;
		text-align: center;
	}

	.th {
		background-color: #f2f2f2;
		font-weight: bold;
	}


	.bottom_btns {
		padding: 0px !important;
		background: #ffffff;
		text-align: center;
		line-height: 20px;
		width: 100%;
		margin-top: 10px;
	}

	.btn-view {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		text-align: center;
		background-color: #fff;
		justify-content: center;
		align-items: center;
	}

	.btn-flex {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>