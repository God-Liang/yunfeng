<template>
	<view class="lg-container">
		<uni-nav-bar title="随访"></uni-nav-bar>
		<view class="banner-container">
			<image class="img" src="@/static/followUp/banner.jpg" mode=""></image>
		</view>
		<view class="newPlan" @tap="onJumpPermission('/pages/followUp/newPlanPatient')">
			<view class="newPlan_btn"></view>
			<view class="newPlan_txt">新建随访计划</view>
		</view>
		<uni-grid :column="3" :showBorder="false" :square="false">
			<uni-grid-item>
				<view class="grid-item-box" @tap="onJumpPermission('/pages/followUp/gauges?topBtn=0')">
					<image class="grid-item-box_img" src="@/static/followUp/waitScale.png" mode=""></image>
					<text class="grid-item-box_txt">待完成量表</text>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view class="grid-item-box" @tap="onJumpPermission('/pages/followUp/gauges?topBtn=1')">
					<image class="grid-item-box_img" src="@/static/followUp/sumbitScale.png" mode=""></image>
					<text class="grid-item-box_txt">已提交量表</text>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view class="grid-item-box" @tap="onJumpPermission('/pages/followUp/gauges?topBtn=2')">
					<image class="grid-item-box_img" src="@/static/followUp/notScale.png" mode=""></image>
					<text class="grid-item-box_txt">未按时提交量表</text>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view class="grid-item-box" @tap="onJumpPermission('/pages/followUp/temporary')">
					<image class="grid-item-box_img" src="@/static/followUp/temporary.png" mode=""></image>
					<text class="grid-item-box_txt">临时随访</text>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view class="grid-item-box" @tap="onJumpPermission('/pages/followUp/myPatients')">
					<image class="grid-item-box_img" src="@/static/followUp/myPatient.png" mode=""></image>
					<text class="grid-item-box_txt">我的患者</text>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view class="grid-item-box" @tap="onJumpPermission('/pages/followUp/mySolution')">
					<image class="grid-item-box_img" src="@/static/followUp/mySolution.png" mode=""></image>
					<text class="grid-item-box_txt">我的方案</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
import common from '@/mixins/common';
import { mapGetters } from 'vuex';
export default {
	mixins: [common],
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {};
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	background-color: #fff;
	// #ifdef H5
	height: calc(100vh - 50px);
	// #endif
	.banner-container {
		width: 100vw;
		height: 320rpx;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.newPlan {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: -36rpx;
		&_btn {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			background-color: #FDBB59;
			position: relative;
			&::after {
				content: '';
				display: inline-block;
				width: 100rpx;
				height: 8rpx;
				background-color: #fff;
				border-radius: 4rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
			&::before {
				content: '';
				display: inline-block;
				width: 8rpx;
				height: 100rpx;
				background-color: #fff;
				border-radius: 4rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}
		&_txt {
			margin-top: 20rpx;
		}
	}
	.grid-item-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
		&_img {
			width: 129rpx;
			height: 129rpx;
		}
		&_txt {
			color: #333333;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
	}
}
</style>
