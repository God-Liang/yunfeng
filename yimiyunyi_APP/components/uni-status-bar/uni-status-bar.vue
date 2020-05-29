<template>
	<!-- <view :style="{ height: statusBarHeight }" class="uni-status-bar"> -->
	<view class="uni-status-bar">
		<slot />
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default {
		name: 'UniStatusBar',
		data() {
			return {
				statusBarHeight: statusBarHeight
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-status-bar {
		width: 750rpx;
		// #ifndef H5
		height: 48rpx;
		// #endif
		/* height: var(--status-bar-height);
 */
	}
</style>