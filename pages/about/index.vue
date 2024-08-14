<template>
	<view class="main">
		<!-- 加载页 -->
		<up-loading-page :loading="pageLoading == true" loading-text="拼命加载中..."></up-loading-page>
		<view v-show="pageLoading == false">
			<view class="content">
				<view class="content-title">说明</view>
				<view class="desc">程序所有数据均来自互联网,程序不保存任何数据,该程序仅用于学习测试。</view>
			</view>
			<!-- WEB环境显示,参考 https://uniapp.dcloud.net.cn/tutorial/platform.html -->
			<!-- #ifdef WEB -->
			<view class="content">
				<view class="content-title">APP下载</view>
				<view><up-button text="点击下载" color="linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)" @click="handleApp"></up-button></view>
			</view>
			<!-- #endif -->

			<!-- #ifdef APP -->
			<view class="content">
				<view class="content-title">访问网页版</view>
				<view><up-button text="点击访问" color="linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)" @click="handleWeb"></up-button></view>
			</view>
			<view class="content">
				<view class="content-title">更新</view>
				<view><up-button text="检查更新" color="linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)" @click="handleCheckVersion"></up-button></view>
			</view>
			<!-- #endif -->
		</view>

	</view>
</template>

<script lang="js">
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	import config from '@/config'
	import {
		checkVersion
	} from '@/api/version'
	export default {
		data() {
			return {
				webUrl: config.appInfo.web_url,
				apkUrl: config.appInfo.apk_url,
				version: config.appInfo.version,
				pageLoading: false,
			}
		},
		props: {
			src: {
				type: [String],
				default: null
			}
		},
		methods: {
			// 检查更新
			handleCheckVersion() {
				const _this = this
				_this.pageLoading = true

				checkVersion(_this.version).then((res) => {
					if (res) {
						_this.pageLoading = false
						uni.showModal({
							title: '提示',
							content: '检查到新版本,是否确定下载更新',
							success: function(res) {
								if (res.confirm) {
									// _this.downloadFile(_this.apkUrl, 'oil.apk');
									plus.runtime.openURL(
										_this.apkUrl,
										function(err) {
											console.log(err);
										}
									);
								}
							}
						});


					} else {
						_this.pageLoading = false
						uni.showToast({
							title: "当前已经是最新版本",
							icon: 'none'
						})

					}
				})
			},
			// app端打开网页版
			handleWeb() {
				uniCopy({
					content: `${this.webUrl}`,
					success: (res) => {
						uni.showToast({
							title: "已复制链接,请使用浏览器访问~",
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
			// web端下载apk文件
			async handleApp() {
				this.pageLoading = true
				await this.downloadFile(this.apkUrl, 'oil.apk');
				this.pageLoading = false
			},
			async downloadFile(url, fileName) {
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', fileName); // 设置文件名
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		},
		created() {

		},
		onLoad() {
			// #ifdef APP
			plus.runtime.getProperty(plus.runtime.appid, function(wgtInfo) {
				that.version = wgtInfo.version; //例子:获取版本号
				console.log("launchLoadedTime: " + plus.runtime.launchLoadedTime);
				console.log("launcher: " + plus.runtime.launcher);
				console.log("appId: " + wgtInfo.appid);
				console.log("version: " + wgtInfo.version);
				console.log("code: " + wgtInfo.version.code);
				console.log("innerVersion:" + plus.runtime.innerVersion);
				console.log("name: " + wgtInfo.name);
				console.log("description: " + wgtInfo.description);
				console.log("author: " + wgtInfo.author);
				console.log("license: " + wgtInfo.license);
				console.log("licensehref: " + wgtInfo.licensehref);
				console.log("features: " + wgtInfo.features);
			});
			// #endif


		}
	}
</script>
<style scoped>
	.main {
		padding: 5px 24px;
		box-sizing: border-box;
		margin: 0;
		width: 100%;
	}

	.content-title {
		text-align: left;
		font-size: 20px;
		display: block;
		margin-block-start: 0.83em;
		margin-block-end: 0.83em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold;
		unicode-bidi: isolate;
	}

	.desc {
		text-align: left;
		font-size: 16px;
		text-indent: 2em;
	}
</style>