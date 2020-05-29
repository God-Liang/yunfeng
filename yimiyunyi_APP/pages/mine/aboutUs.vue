<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="关于我们" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="logo-container">
			<image src="/static/mine/logo.png"></image>
		</view>
		<view class="aboutus-info">
			<view class="aboutus-item">
				<text class="name">{{yimiPublicNumber.name}}</text>
				<text class="result">{{yimiPublicNumber.value}}</text>
			</view>
			<view class="aboutus-item">
				<text class="name">{{feedbackMail.name}}</text>
				<text class="result">{{feedbackMail.value}}</text>
			</view>
			<view class="aboutus-item">
				<text class="name">{{currentVersion.name}}</text>
				<text class="result">{{currentVersion.value}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { aboutUs } from '@/api/mine';
export default {
	data() {
		return {
			currentVersion: {},
			feedbackMail: {},
			yimiPublicNumber: {}
		};
	},
	onShow() {
		this.getInfo()
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		getInfo() {
			const data = {
				key: 'yimiPublicNumber,feedbackMail,currentVersion'
			}
			aboutUs(data, res => {
				this.currentVersion = res.data.list.currentVersion
				this.feedbackMail = res.data.list.feedbackMail
				this.yimiPublicNumber = res.data.list.yimiPublicNumber
			})
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	width: 100vw;
	height: 100vh;
	background-color: #FFFFFF;
	.logo-container {
		width: 100%;
		height: 294rpx;
		padding-top: 83rpx;
		box-sizing: border-box;
		text-align: center;
		image {
			width: 290rpx;
			height: 85rpx;
		}
	}
	.aboutus-info {
		.aboutus-item {
			padding: 0 42rpx 0 38rpx;
			height: 96rpx;
			width: 100%;
			border-bottom: 2rpx solid #F4F4F4;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			.name {
				color: #333333;
				font-size: 26rpx;
			}
			.result {
				color: #888888;
				font-size: 26rpx;
			}
		}
	}
}
</style>
