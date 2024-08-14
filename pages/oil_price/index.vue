<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="`${url}`"></web-view>
	</view>
</template>

<script lang="js">
	export default {
		data() {
			return {
				url: 'https://cx.sinopecsales.com/yjkqiantai/core/main',
				webviewStyles: {
					progress: {
						color: "#FF3333"
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
		onLoad(event) {

		}
	}
</script>