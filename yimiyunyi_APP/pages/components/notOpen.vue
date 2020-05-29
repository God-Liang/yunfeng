<template>
	<view class="content_status">
		<image class="image" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/notOpen.png" />
		<view class="text">该功能正在开发中</view>
		<view class="text">敬请期待！</view>
		<button class="primary" @tap="onBack">返回</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			onBack() {
				uni.navigateBack({ delta: 1 });
			}
		}
	};
</script>

<style lang="scss" scope>
	.content_status{
		padding: 30rpx;
		box-sizing: border-box;
		width: 100%;
		.image {
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
</style>
