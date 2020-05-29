<template>
	<view class="lg-container">
		<uni-nav-bar title="网络错误"></uni-nav-bar><view class="content">
			<image class="image" src="@/static/system/notNetwork.png" />
			<view class="text">网络出问题了</view>
			<view class="text">快去检查一下吧！</view>
			<button class="primary" @tap="onReload">重新加载</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {},
	onShow() {
		const pages = getCurrentPages()
		console.log(pages)
	},
	methods: {
		onReload() {
			uni.navigateBack({ delta: 1 });
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.content{
		padding: 30rpx;
		box-sizing: border-box;
		width: 100%;
		.image{
			width: 520rpx;
			height: 330rpx;
			margin: 0 auto;
			display: block;
			padding-top: 150rpx;
		}
		.text{
			text-align: center;
			color: #888;
		}
		.primary{
			margin-top: 60rpx;
		}
	}
}
</style>
