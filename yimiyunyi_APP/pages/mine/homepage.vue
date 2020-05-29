<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="我的主页" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="section-container">
			<view class="my-container">
				<view class="avatar">
					<image v-if="myInfo.avatar" class="img-yes" :src="myInfo.avatar" mode="aspectFill"></image>
					<image v-if="!myInfo.avatar && myInfo.sex" class="img-yes" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/doctor_woman.jpg" mode=""></image>
					<image v-if="!myInfo.avatar && !myInfo.sex" class="img-yes" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/doctor_man.jpg" mode=""></image>
				</view>
				<view class="my-info">
					<text class="name">{{ myInfo.nick || '暂无昵称' }}</text>
					<text class="type">{{ myInfo.doctor.department || '暂无科室' }} {{ myInfo.doctor.doctorHospital || '暂无医院' }}</text>
				</view>
				<navigator url="/pages/mine/homeInfo" class="editor"><image src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/editor.png"></image></navigator>
			</view>
		</view>
		<navigator url="/pages/mine/myDynamic" class="my-dynamic">
			<image class="dynamic" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/dynamic.png" mode=""></image>
			<text class="editor-name">我的动态</text>
			<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
		</navigator>
		<scroll-view scroll-y class="message-container">
			<view class="message-item">
				<view class="title"><text>我的简介</text></view>
				<view class="content">
					<text>{{ myInfo.doctor.introduction || '暂无简介' }}</text>
				</view>
			</view>
			<view class="message-item">
				<view class="title"><text>擅长手术</text></view>
				<view class="content">
					<text>{{ myInfo.doctor.operation || '暂无擅长手术' }}</text>
				</view>
			</view>
			<view class="message-item">
				<view class="title"><text>擅长疾病</text></view>
				<view class="content">
					<text>{{ myInfo.doctor.disease || '暂无擅长疾病' }}</text>
				</view>
			</view>
			<view class="message-item">
				<view class="title"><text>荣誉证书</text></view>
				<view v-if="honorCertificates.length === 0" class="certificate-list">
					<view class="certificate-null"><text>暂无荣誉证书</text></view>
				</view>
				<view v-else class="certificate-list">
					<view class="certificate-item" @tap="onPreview(index)" v-for="(item, index) in honorCertificates" :key="index"><image :src="item" mode="aspectFill"></image></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			honorCertificates: []
		};
	},
	computed: {
		...mapGetters(['winInfo', 'myInfo'])
	},
	onShow() {
		this.honorCertificates = this.myInfo.doctor.honorCertificates ? this.myInfo.doctor.honorCertificates.split(','): []
	},
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.onLeftTap()
		return false;
	},
	methods: {
		onLeftTap() {
			this.$helper.toTab('/pages/tabBar/mine')
		},
		onPreview(index) {
			uni.previewImage({
				urls: this.honorCertificates,
				current: index,
				longPressActions: {
					success: function(data) {},
					fail: function(err) {}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: #f4f4f4;
	.section-container {
		width: 100%;
		height: 116rpx;
		background: linear-gradient(270deg, rgba(92, 204, 205, 1), rgba(3, 169, 172, 1));
		position: relative;
		padding: 1px 0;
		margin: -1px 0;
		box-sizing: border-box;
		.my-container {
			width: 710rpx;
			height: 170rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 10rpx 0px rgba(3, 169, 172, 0.41);
			border-radius: 10rpx;
			position: absolute;
			left: 50%;
			top: 22rpx;
			transform: translateX(-50%);
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.avatar {
				width: 114rpx;
				height: 114rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 2rpx solid rgba(220, 220, 220, 1);
				border-radius: 50%;
				overflow: hidden;
				.img-null {
					width: 64rpx;
					height: 61rpx;
				}
				.img-yes {
					width: 114rpx;
					height: 114rpx;
				}
			}
			.my-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-left: 30rpx;
				.name {
					color: #333333;
					font-size: 30rpx;
				}
				.type {
					margin-top: 10rpx;
					color: #888888;
					font-size: 24rpx;
				}
			}
			.editor {
				width: 36rpx;
				height: 35rpx;
				image {
					width: 36rpx;
					height: 35rpx;
				}
			}
		}
	}
	.my-dynamic {
		width: 100%;
		padding: 0 40rpx;
		height: 100rpx;
		margin-top: 97rpx;
		margin-bottom: 18rpx;
		background-color: #fff;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.dynamic {
			width: 40rpx;
			height: 40rpx;
		}
		.editor-name {
			color: #333333;
			font-size: 26rpx;
			flex: 1;
			margin-left: 24rpx;
		}
	}
	.message-container {
		height: calc(100vh - 415rpx);
		// #ifndef H5
		height: calc(100vh - 453rpx);
		// #endif
		width: 100%;
		.message-item {
			padding: 28rpx 58rpx 36rpx 40rpx;
			background-color: #fff;
			margin-bottom: 2rpx;
			&:last-child {
				margin-bottom: 0;
				padding: 28rpx 40rpx 36rpx 40rpx;
			}
			.title {
				margin-bottom: 20rpx;
				text {
					color: #333333;
					font-size: 26rpx;
				}
			}
			.content {
				color: #888888;
				font-size: 24rpx;
				line-height: 36rpx;
			}
			.certificate-list {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				.certificate-null {
					width: 100%;
					height: 40rpx;
					text {
						color: #888888;
						font-size: 24rpx;
					}
				}
				.certificate-item {
					width: 140rpx;
					height: 140rpx;
					background: rgba(244, 244, 244, 1);
					border-radius: 10rpx;
					margin: 0 37rpx 37rpx 0;
					overflow: hidden;
					&:nth-child(4n) {
						margin: 0 0 37rpx 0;
					}
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
}
</style>
