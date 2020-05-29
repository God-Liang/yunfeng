<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="我的客服" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="service-container">
			<view class="my-service">
				<text class="txt1">您好，感谢您使用依米医生！</text>
				<text class="txt2">您可以通过联系客服来吐槽不好用的功能、错误内容、报告您发现的问题，提交您的使用需求等</text>
				<text class="txt3">客服电话：（0571）8671 9136</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			onLeftTap() {
				uni.navigateBack({ delta: 1 });
			}
		};
	}
};
</script>

<style lang="scss">
.lg-container {
	width: 100vw;
	height: 100vh;
	background-color: #f4f4f4;
	box-sizing: border-box;
	.service-container {
		padding: 40rpx 20rpx 0;
		.my-service {
			background-color: #fff;
			height: 375rpx;
			width: 100%;
			border-radius: 10rpx;
			padding: 54rpx 52rpx 0 36rpx;
			box-sizing: border-box;
			.txt1 {
				color: #333333;
				font-size: 24rpx;
				line-height: 40rpx;
				display: block;
			}
			.txt2 {
				color: #333333;
				font-size: 24rpx;
				line-height: 40rpx;
				margin-bottom: 50rpx;
				display: block;
			}
			.txt3 {
				color: #333333;
				font-size: 30rpx;
			}
		}
	}
}
</style>
